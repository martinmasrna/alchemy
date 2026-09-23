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
  window.__card = n => [...document.querySelectorAll('#grid .card')].find(c => c.querySelector('.n').textContent === n);
  window.__names = () => [...document.querySelectorAll('#grid .card .n')].map(n => n.textContent);
  window.__combine = (a, b) => { __card(a).click(); __card(b).click(); const st = document.getElementById('stage'); const shown = st.classList.contains('show'); if (shown) st.click(); return shown; };
  window.__state = () => JSON.parse(localStorage.getItem('alchemy.${world.id}'));
  window.__credits = () => +document.getElementById('credits').textContent;
  window.__toast = () => document.getElementById('toast').textContent;
  window.__squares = () => document.querySelectorAll('#hidden .sq').length;
  true`;

try {
  await connect();
  await send("Page.enable"); await send("Runtime.enable");
  await send("Emulation.setDeviceMetricsOverride", { width: 390, height: 844, deviceScaleFactor: 2, mobile: true });
  // ?nolog keeps the test out of the play logs, and with it the who's-playing form never blocks the test
  await send("Page.navigate", { url: `${URL_}?nolog` });
  await sleep(1200);
  if (process.env.SHOT) {
    const shot = await send("Page.captureScreenshot", { format: "png" });
    writeFileSync(process.env.SHOT, Buffer.from(shot.result.data, "base64"));
  }
  await evalJs(HELPERS);

  const total = world.items.filter((i) => !i.seed).length;
  const byId = new Map(world.items.map((i) => [i.id, i]));
  check((await evalJs("__names().length")) === 4, "starts with 4 seeds");
  check((await evalJs("document.querySelector('#goal .progress').textContent")) === `0 / ${total}`, "progress counter matches table");
  check((await evalJs("__squares()")) === total - 1, "one ? square per unknown item, the named summit excluded");
  const widths = await evalJs(`JSON.stringify({ viewport: innerWidth, page: document.documentElement.scrollWidth })`);
  check(JSON.parse(widths).page <= JSON.parse(widths).viewport, `no horizontal overflow at 390px ${widths}`);
  const c0 = await evalJs("__credits()");

  // a dud: tap the same card twice
  check((await evalJs("__combine('Energy','Energy')")) === false, "Energy + Energy makes nothing");
  check((await evalJs("document.getElementById('result').classList.contains('dud')")), "result slot shows the dud");
  check((await evalJs("__state().tried.includes('energy+energy')")), "dud is remembered in the log");
  check((await evalJs("document.querySelectorAll('#grid .card.picked').length")) === 0, "nothing stays picked after a combine");
  await evalJs("__card('Space').click(); document.getElementById('slotA').click()");
  check((await evalJs("document.querySelectorAll('#grid .card.picked').length")) === 0, "tapping the first slot puts the card down");

  // a hit: full-screen moment, credit, square count
  check((await evalJs("__combine('Energy','Matter')")) === true, "Energy + Matter shows the discovery moment");
  check((await evalJs("__names().includes('Particle')")), "Particle appears in the grid");
  check((await evalJs("document.getElementById('result').textContent")).includes("Particle"), "result slot shows the last discovery");
  check((await evalJs("__credits()")) === c0 + 1, "a guessed discovery earns one credit");
  check((await evalJs("__squares()")) === total - 2, "one ? square fewer");

  // too poor for a recipe yet
  await evalJs("document.querySelector('#goal .hint').click()");
  check((await evalJs("__toast()")).includes("Not enough"), "refuses a hint you can't afford");

  // earn up, then the summit recipe costs 5 and names its ingredients
  await evalJs("__combine('Particle','Particle')"); // Hydrogen
  await evalJs("__combine('Matter','Matter')");     // Gravity
  await evalJs("__combine('Energy','Space')");      // Light
  check((await evalJs("__credits()")) === c0 + 4, "four guessed discoveries, four credits");
  await evalJs("document.querySelector('#goal .hint').click()");
  check((await evalJs("document.querySelector('#goal .rec').textContent")).includes("Ocean"), "summit 'how?' reveals Ocean + Air");
  check((await evalJs("__credits()")) === c0 + 4 - 5, "recipe hint cost 5");
  check((await evalJs("document.querySelectorAll('#named .named').length")) === 2, "Ocean and Air show as named chips");

  // a ? square names something makeable right now
  const before = await evalJs("__credits()");
  await evalJs("document.querySelector('#hidden .sq').click()");
  check((await evalJs("document.querySelectorAll('#hidden .sq.armed').length")) === 1, "first tap arms a ? square");
  await evalJs("document.querySelector('#hidden .sq.armed').click()");
  check((await evalJs("__credits()")) === before - 1, "second tap buys a name for 1");
  const st1 = await evalJs("__state()");
  const namedNow = st1.named.filter((id) => !st1.owned.includes(id) && id !== world.summit && !["ocean", "air"].includes(id));
  check(namedNow.length === 1 && byId.get(namedNow[0]).recipe.every((p) => st1.owned.includes(p)), `the name is something makeable now (${namedNow.map((id) => byId.get(id).name)})`);
  check((await evalJs("document.querySelectorAll('#named .named').length")) === 3, "it joins the named chips");

  // persistence across reload
  await send("Page.reload"); await sleep(1200); await evalJs(HELPERS);
  check((await evalJs("__names().includes('Hydrogen')")), "progress survives reload");
  check((await evalJs("document.querySelectorAll('#named .named').length")) === 3, "named chips survive reload");

  // play to the summit; everything left is guessed except Earth, whose recipe was bought
  const c3 = await evalJs("__credits()");
  const ownedNow = await evalJs("__state().owned");
  const owned = new Set(ownedNow);
  let grew = true;
  while (grew) {
    grew = false;
    for (const it of world.items) if (it.recipe && !owned.has(it.id) && it.recipe.every((p) => owned.has(p))) {
      const [a, b] = it.recipe.map((p) => byId.get(p).name);
      const shown = await evalJs(`__combine(${JSON.stringify(a)}, ${JSON.stringify(b)})`);
      if (!shown) fails.push(`${a} + ${b} did not show a discovery for ${it.name}`);
      owned.add(it.id); grew = true;
    }
  }
  const st = await evalJs("__state()");
  check(st.owned.includes(world.summit), "summit reached");
  check((await evalJs("__credits()")) === c3 + (world.items.length - ownedNow.length - 1), "every guessed discovery earned, the bought summit did not");
  check(st.owned.length === world.items.length, `every item discovered (${st.owned.length}/${world.items.length})`);
  check(!!st.finishedAt, "finish time recorded");
  check((await evalJs("__squares() + document.querySelectorAll('#named .named').length")) === 0, "nothing undiscovered left");
  check((await evalJs("document.querySelector('#goal .progress').textContent")).includes("reached"), "goal chip shows reached");
  check((await evalJs("__combine('Energy','Matter')")) === false, "repeat combination shows no discovery");
} catch (e) {
  fails.push(String(e));
  console.error(e);
} finally {
  chrome.kill();
}
console.log(fails.length ? `\n${fails.length} problem(s):\n - ${fails.join("\n - ")}` : "\nall good");
process.exit(fails.length ? 1 : 0);
