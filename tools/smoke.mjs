// Plays world 1 start to summit in headless Chrome and checks the app holds up.
// Usage: node tools/smoke.mjs [url]   (expects a server, e.g. python -m http.server 8765)
// SHOT=path.png saves a phone-size screenshot of the first render.
import { spawn } from "node:child_process";
import { mkdtempSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import world from "../worlds/world1.js";

const URL_ = process.argv[2] ?? "http://127.0.0.1:8765/";
const CHROME = process.env.CHROME ?? "C:/Program Files/Google/Chrome/Application/chrome.exe";
const PORT = 9333;
const profile = mkdtempSync(join(tmpdir(), "alchemy-smoke-"));
const chrome = spawn(CHROME, [`--headless=new`, `--disable-gpu`, `--no-first-run`, `--remote-debugging-port=${PORT}`,
  `--user-data-dir=${profile}`, `--window-size=390,844`, "about:blank"], { stdio: "ignore" });
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

let ws, nextId = 1; const pending = new Map();
async function connect() {
  for (let i = 0; i < 40; i++) {
    try {
      const targets = await (await fetch(`http://127.0.0.1:${PORT}/json`)).json();
      const page = targets.find((t) => t.type === "page");
      if (page) { ws = new WebSocket(page.webSocketDebuggerUrl); break; }
    } catch {}
    await sleep(250);
  }
  if (!ws) throw new Error("chrome did not come up");
  await new Promise((r) => (ws.onopen = r));
  ws.onmessage = (m) => { const d = JSON.parse(m.data); if (d.id && pending.has(d.id)) { pending.get(d.id)(d); pending.delete(d.id); } };
}
function send(method, params = {}) {
  const id = nextId++;
  return new Promise((res) => { pending.set(id, res); ws.send(JSON.stringify({ id, method, params })); });
}
async function evalJs(expr) {
  const r = await send("Runtime.evaluate", { expression: expr, awaitPromise: true, returnByValue: true });
  if (r.result?.exceptionDetails) throw new Error(r.result.exceptionDetails.exception?.description ?? "js error");
  return r.result?.result?.value;
}
const fails = [];
const check = (cond, msg) => { if (!cond) fails.push(msg); console.log(`${cond ? "ok " : "FAIL"} ${msg}`); };

const HELPERS = `
  window.__card = n => [...document.querySelectorAll('#grid .card')].find(c => c.querySelector('.name').textContent === n);
  window.__names = () => [...document.querySelectorAll('#grid .card .name')].map(n => n.textContent);
  window.__combine = (a, b) => { __card(a).click(); __card(b).click(); const o = document.getElementById('overlay'); const shown = o.classList.contains('show'); if (shown) document.getElementById('closeReveal').click(); return shown; };
  window.__state = () => JSON.parse(localStorage.getItem('alchemy.${world.id}'));
  window.__credits = () => +document.getElementById('credits').textContent;
  window.__toast = () => document.getElementById('toast').textContent;
  true`;

try {
  await connect();
  await send("Page.enable"); await send("Runtime.enable");
  await send("Emulation.setDeviceMetricsOverride", { width: 390, height: 844, deviceScaleFactor: 2, mobile: true });
  await send("Page.navigate", { url: URL_ });
  await sleep(1200);
  // pretend the player already gave a name, so the who's-playing form never blocks the test
  await evalJs(`localStorage.setItem('alchemy.player', JSON.stringify({ id: 'smoketest', name: 'Smoke Test' })); true`);
  await send("Page.reload"); await sleep(1200);
  if (process.env.SHOT) {
    const shot = await send("Page.captureScreenshot", { format: "png" });
    writeFileSync(process.env.SHOT, Buffer.from(shot.result.data, "base64"));
  }
  await evalJs(HELPERS);

  const total = world.items.filter((i) => !i.seed).length;
  check((await evalJs("__names().length")) === 4, "starts with 4 seeds");
  check((await evalJs("document.getElementById('total').textContent")) === String(total), "total counter matches table");
  check((await evalJs("document.querySelectorAll('#hidden .sq').length")) === total - 1, "one ? square per undiscovered item, summit excluded");
  const widths = await evalJs(`JSON.stringify({ viewport: innerWidth, page: document.documentElement.scrollWidth })`);
  check(JSON.parse(widths).page <= JSON.parse(widths).viewport, `no horizontal overflow at 390px ${widths}`);
  const c0 = await evalJs("__credits()");

  // a dud
  check((await evalJs("__combine('Energy','Energy')")) === false, "Energy + Energy makes nothing");
  check((await evalJs("__state().tried.includes('energy+energy')")), "dud is remembered as tried");
  await evalJs("__card('Energy').click()");
  check((await evalJs("__card('Energy').classList.contains('tried')")), "tried pair is dimmed when first card selected");
  await evalJs("__card('Energy').click()"); // completes Energy + Energy again, a dud, clears the pick
  await evalJs("__card('Space').click(); document.getElementById('slotA').click()");
  check((await evalJs("document.querySelectorAll('#grid .card.selected').length")) === 0, "tapping the first slot puts the card down");

  // a hit earns a credit
  check((await evalJs("__combine('Energy','Matter')")) === true, "Energy + Matter shows a reveal");
  check((await evalJs("__names().includes('Particle')")), "Particle appears in the grid");
  check((await evalJs("document.querySelectorAll('#grid .card.selected').length")) === 0, "nothing stays highlighted after a combine");
  check((await evalJs("__credits()")) === c0 + 1, "a discovery earns one credit");
  check((await evalJs("document.querySelectorAll('#hidden .sq').length")) === total - 2, "its ? square disappears");

  // recipe hint on the summit costs 3
  await evalJs("document.querySelector('#goal .target.summit button').click()");
  check((await evalJs("document.querySelector('#goal .target.summit .recipe').textContent")).includes("Ocean"), "summit 'how?' reveals Ocean + Air");
  check((await evalJs("__credits()")) === c0 + 1 - 3, "recipe hint cost 3");
  check((await evalJs("document.querySelectorAll('#named .target').length")) === 2, "Ocean and Air show as named squares");

  // not enough credits for another recipe
  await evalJs("document.querySelector('#named .target button').click()");
  check((await evalJs("__toast()")).includes("Not enough"), "refuses a hint you can't afford");

  // earn, then buy a name with two taps
  await evalJs("__combine('Particle','Particle')"); // Hydrogen, +1
  const before = await evalJs("__credits()");
  await evalJs("document.querySelector('#hidden .sq').click()");
  check((await evalJs("document.querySelectorAll('#hidden .sq.armed').length")) === 1, "first tap arms a ? square");
  await evalJs("document.querySelector('#hidden .sq.armed').click()");
  check((await evalJs("__credits()")) === before - 1, "second tap buys the name for 1");
  check((await evalJs("__state().named.length")) === 4, "named list grew by one");

  // bottom-up hint prefers the path to the summit
  await evalJs("__combine('Matter','Matter')"); // Gravity, +1
  await evalJs("__combine('Energy','Space')");  // Light, +1
  const c1 = await evalJs("__credits()");
  await evalJs("__card('Hydrogen').click(); document.getElementById('hintLeads').click()");
  const named = await evalJs("__state().named");
  check(["nebula", "helium", "water"].some((id) => named.includes(id)), "'leads to' on Hydrogen names something on the path to the summit");
  check((await evalJs("__credits()")) === c1 - 2, "bottom-up hint cost 2");

  // persistence across reload
  await send("Page.reload"); await sleep(1200); await evalJs(HELPERS);
  check((await evalJs("__names().includes('Hydrogen')")), "progress survives reload");

  // play to the summit
  const byId = new Map(world.items.map((i) => [i.id, i]));
  const owned = new Set([...world.seeds, "particle", "hydrogen", "gravity", "light"]);
  let grew = true;
  while (grew) {
    grew = false;
    for (const it of world.items) if (it.recipe && !owned.has(it.id) && it.recipe.every((p) => owned.has(p))) {
      const [a, b] = it.recipe.map((p) => byId.get(p).name);
      const shown = await evalJs(`__combine(${JSON.stringify(a)}, ${JSON.stringify(b)})`);
      if (!shown) fails.push(`${a} + ${b} did not reveal ${it.name}`);
      owned.add(it.id); grew = true;
    }
  }
  const st = await evalJs("__state()");
  check(st.owned.includes(world.summit), "summit reached");
  check(st.owned.length === world.items.length, `every item discovered (${st.owned.length}/${world.items.length})`);
  check(!!st.finishedAt, "finish time recorded");
  check((await evalJs("document.querySelectorAll('#hidden .sq, #named .target').length")) === 0, "no undiscovered squares left");
  check((await evalJs("document.querySelector('#goal .target.summit').textContent")).includes("reached"), "goal chip shows reached");
  check((await evalJs("__combine('Energy','Matter')")) === false, "repeat combination shows no reveal");
} catch (e) {
  fails.push(String(e));
  console.error(e);
} finally {
  chrome.kill();
}
console.log(fails.length ? `\n${fails.length} problem(s):\n - ${fails.join("\n - ")}` : "\nall good");
process.exit(fails.length ? 1 : 0);
