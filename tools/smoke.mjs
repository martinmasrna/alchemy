// Plays world 1 start to summit in headless Chrome and checks the app holds up.
// Usage: node tools/smoke.mjs [url]   (expects a server, e.g. python -m http.server 8765)
import { spawn } from "node:child_process";
import { mkdtempSync } from "node:fs";
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

try {
  await connect();
  await send("Page.enable"); await send("Runtime.enable");
  await send("Emulation.setDeviceMetricsOverride", { width: 390, height: 844, deviceScaleFactor: 2, mobile: true });
  await send("Page.navigate", { url: URL_ });
  await sleep(1200);
  if (process.env.SHOT) {
    const { writeFileSync } = await import("node:fs");
    const shot = await send("Page.captureScreenshot", { format: "png" });
    writeFileSync(process.env.SHOT, Buffer.from(shot.result.data, "base64"));
  }

  // helpers inside the page
  await evalJs(`
    window.__card = n => [...document.querySelectorAll('.card')].find(c => c.querySelector('.name').textContent === n);
    window.__names = () => [...document.querySelectorAll('.card .name')].map(n => n.textContent);
    window.__combine = (a, b) => { __card(a).click(); __card(b).click(); const o = document.getElementById('overlay'); const shown = o.classList.contains('show'); if (shown) document.getElementById('closeReveal').click(); return shown; };
    window.__state = () => JSON.parse(localStorage.getItem('alchemy.${world.id}'));
    true`);

  check((await evalJs("__names().length")) === 4, "starts with 4 seeds");
  check((await evalJs("document.getElementById('total').textContent")) === String(world.items.filter((i) => !i.seed).length), "total counter matches table");
  const widths = await evalJs(`JSON.stringify({ viewport: innerWidth, page: document.documentElement.scrollWidth, wide: [...document.querySelectorAll('body *')].filter(e => e.getBoundingClientRect().right > innerWidth).slice(0, 6).map(e => e.tagName + '.' + e.className + ':' + Math.round(e.getBoundingClientRect().right)) })`);
  check(JSON.parse(widths).page <= JSON.parse(widths).viewport, `no horizontal overflow at 390px ${widths}`);

  // a dud
  check((await evalJs("__combine('Energy','Energy')")) === false, "Energy + Energy makes nothing");
  check((await evalJs("__state().tried.includes('energy+energy')")), "dud is remembered as tried");
  await evalJs("__card('Energy').click()");
  check((await evalJs("__card('Energy').classList.contains('tried')")), "tried pair is dimmed when first card selected");
  await evalJs("__card('Energy').click()"); // completes the pair again (dud) to clear selection

  // a hit
  check((await evalJs("__combine('Energy','Matter')")) === true, "Energy + Matter shows a reveal");
  check((await evalJs("__names().includes('Particle')")), "Particle appears in the grid");
  check((await evalJs("document.getElementById('count').textContent")) === "1", "counter is 1");

  // hints
  await evalJs("document.querySelector('.target.summit button').click()");
  check((await evalJs("document.querySelector('.target.summit .recipe').textContent")).includes("Ocean"), "summit 'how?' reveals Ocean + Air");
  check((await evalJs("__state().targets.includes('ocean') && __state().targets.includes('air')")), "ingredients become known targets");
  await evalJs("__card('Particle').click(); document.getElementById('hintLeads').click()");
  check((await evalJs("__state().targets.includes('hydrogen')")), "'leads to' on Particle reveals Hydrogen");

  // persistence across reload
  await send("Page.reload"); await sleep(1200);
  await evalJs(`window.__card = n => [...document.querySelectorAll('.card')].find(c => c.querySelector('.name').textContent === n);
    window.__names = () => [...document.querySelectorAll('.card .name')].map(n => n.textContent);
    window.__combine = (a, b) => { __card(a).click(); __card(b).click(); const o = document.getElementById('overlay'); const shown = o.classList.contains('show'); if (shown) document.getElementById('closeReveal').click(); return shown; };
    window.__state = () => JSON.parse(localStorage.getItem('alchemy.${world.id}')); true`);
  check((await evalJs("__names().includes('Particle')")), "progress survives reload");

  // play to the summit in table order
  const byId = new Map(world.items.map((i) => [i.id, i]));
  const owned = new Set(world.seeds); owned.add("particle");
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
  check((await evalJs("document.querySelector('.target.summit').textContent")).includes("reached"), "goal chip shows reached");
  check((await evalJs("__combine('Energy','Matter')")) === false, "repeat combination shows no reveal");

  const errors = await evalJs("window.__errs ?? 0");
  check(errors === 0, "no uncaught errors");
} catch (e) {
  fails.push(String(e));
  console.error(e);
} finally {
  chrome.kill();
}
console.log(fails.length ? `\n${fails.length} problem(s):\n - ${fails.join("\n - ")}` : "\nall good");
process.exit(fails.length ? 1 : 0);
