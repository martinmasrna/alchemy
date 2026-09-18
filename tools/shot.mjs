// Phone-emulated screenshots through headless Chrome, several pages per launch.
// Usage: node tools/shot.mjs out-dir name=url [name=url ...]
// Env: W (390), H (844), SCALE (2), FULL=1 for full-page capture.
import { spawn } from "node:child_process";
import { mkdtempSync, mkdirSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";

const [outDir, ...pairs] = process.argv.slice(2);
if (!outDir || !pairs.length) { console.error("usage: node tools/shot.mjs out-dir name=url ..."); process.exit(1); }
mkdirSync(outDir, { recursive: true });
const W = +(process.env.W ?? 390), H = +(process.env.H ?? 844), SCALE = +(process.env.SCALE ?? 2), FULL = !!process.env.FULL;
const CHROME = process.env.CHROME ?? "C:/Program Files/Google/Chrome/Application/chrome.exe";
const PORT = 9335;
const chrome = spawn(CHROME, ["--headless=new", "--disable-gpu", "--hide-scrollbars", "--no-first-run", `--remote-debugging-port=${PORT}`,
  `--user-data-dir=${mkdtempSync(join(tmpdir(), "alchemy-shot-"))}`, "about:blank"], { stdio: "ignore" });
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
let ws, nextId = 1; const pending = new Map();
for (let i = 0; i < 40 && !ws; i++) {
  try { const page = (await (await fetch(`http://127.0.0.1:${PORT}/json`)).json()).find((t) => t.type === "page"); if (page) ws = new WebSocket(page.webSocketDebuggerUrl); } catch {}
  if (!ws) await sleep(250);
}
await new Promise((r) => (ws.onopen = r));
ws.onmessage = (m) => { const d = JSON.parse(m.data); if (d.id && pending.has(d.id)) { pending.get(d.id)(d); pending.delete(d.id); } };
const send = (method, params = {}) => { const id = nextId++; return new Promise((res) => { pending.set(id, res); ws.send(JSON.stringify({ id, method, params })); }); };

try {
  await send("Page.enable");
  await send("Emulation.setDeviceMetricsOverride", { width: W, height: H, deviceScaleFactor: SCALE, mobile: true });
  for (const pair of pairs) {
    const [name, url] = pair.split(/=(.*)/s);
    await send("Page.navigate", { url }); await sleep(1200);
    const wide = await send("Runtime.evaluate", { expression: `document.documentElement.scrollWidth > innerWidth ? [...document.querySelectorAll('body *')].filter(e => e.getBoundingClientRect().right > innerWidth + 1).slice(0,5).map(e => e.tagName + '.' + e.className).join(', ') : ''`, returnByValue: true });
    const params = { format: "png" };
    if (FULL) {
      const h = await send("Runtime.evaluate", { expression: "document.documentElement.scrollHeight", returnByValue: true });
      params.clip = { x: 0, y: 0, width: W, height: h.result.result.value, scale: 1 }; params.captureBeyondViewport = true;
    }
    const shot = await send("Page.captureScreenshot", params);
    writeFileSync(join(outDir, `${name}.png`), Buffer.from(shot.result.data, "base64"));
    console.log(`${name}.png${wide.result.result.value ? "  OVERFLOW: " + wide.result.result.value : ""}`);
  }
} finally { chrome.kill(); }
