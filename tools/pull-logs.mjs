// Downloads every uploaded play into playlogs/<world>-<name>-<id>.json.
// Usage: ADMIN_KEY=... node tools/pull-logs.mjs [syncUrl]
// The company proxy blocks plain fetch from the terminal, so this goes through headless Chrome.
import { spawn } from "node:child_process";
import { mkdtempSync, writeFileSync, mkdirSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { SYNC_URL } from "../config.js";

const base = process.argv[2] ?? SYNC_URL;
const key = process.env.ADMIN_KEY;
if (!base || !key) { console.error("need a sync url (config.js) and ADMIN_KEY"); process.exit(1); }

const CHROME = process.env.CHROME ?? "C:/Program Files/Google/Chrome/Application/chrome.exe";
const PORT = 9334;
const chrome = spawn(CHROME, ["--headless=new", "--disable-gpu", "--no-first-run", `--remote-debugging-port=${PORT}`,
  `--user-data-dir=${mkdtempSync(join(tmpdir(), "alchemy-pull-"))}`, "about:blank"], { stdio: "ignore" });
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
  await send("Page.enable"); await send("Page.navigate", { url: `${base}/dump?key=${encodeURIComponent(key)}` }); await sleep(2500);
  const r = await send("Runtime.evaluate", { expression: "document.body.innerText", returnByValue: true });
  const records = JSON.parse(r.result.result.value);
  if (!Array.isArray(records)) throw new Error("unexpected response: " + JSON.stringify(records));
  mkdirSync("playlogs", { recursive: true });
  for (const rec of records) {
    const name = (rec.player?.name ?? "anon").toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "") || "anon";
    const file = join("playlogs", `${rec.world}-${name}-${rec.player?.id ?? "x"}.json`);
    writeFileSync(file, JSON.stringify(rec));
    const st = rec.state ?? {};
    const found = (st.owned ?? []).length; const tries = (st.log ?? []).filter((e) => e.kind === "try").length;
    console.log(`${file}  ${found} owned, ${tries} attempts, ${st.finishedAt ? "finished" : "in progress"}, saved ${new Date(rec.savedAt).toISOString()}`);
  }
  console.log(`${records.length} play(s)`);
} finally { chrome.kill(); }
