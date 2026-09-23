import world1 from "./worlds/world1.js";
import world2 from "./worlds/world2.js";
import { SYNC_URL } from "./config.js";
import { icons as W1_ICONS, defs as W1_DEFS } from "./icons/world1.js";

// ---------- which world ----------
// ?world=w2 opens a world; otherwise the game reopens the last one played.
const WORLDS = [world1, world2];
const WKEY = "alchemy.world";
let wanted = new URLSearchParams(location.search).get("world");
if (!WORLDS.some((w) => w.id === wanted)) { try { wanted = localStorage.getItem(WKEY); } catch {} }
const world = WORLDS.find((w) => w.id === wanted) ?? world1;
try { localStorage.setItem(WKEY, world.id); } catch {}
// World 1's icons are drawn; any other world shows its table's emoji until its own are.
const ICONS = world.id === "w1" ? W1_ICONS : {};
const ICON_DEFS = world.id === "w1" ? W1_DEFS : "";

// ---------- data ----------
const byId = new Map(world.items.map((i) => [i.id, i]));
const pairKey = (a, b) => [a, b].sort().join("+");
const recipes = new Map(); // pairKey -> result id
for (const it of world.items) if (it.recipe) recipes.set(pairKey(...it.recipe), it.id);
const discoveries = world.items.filter((i) => !i.seed);

// Hints cost credits. Only a discovery you guessed earns one.
const START_CREDITS = 2;
const EARN = 1;
const COST = { name: 1, recipe: 5 };

// ---------- state ----------
const KEY = `alchemy.${world.id}`;
const rid = () => Math.random().toString(36).slice(2, 10);
const fresh = () => ({
  version: world.version,
  playId: rid(),           // this run of this world; one uploaded log per play, so a replay never overwrites an earlier one
  owned: [...world.seeds],
  tried: [],               // pairKeys that produced nothing (for the log, never shown)
  named: [world.summit],   // undiscovered ids whose name the player knows
  recipesKnown: [],        // ids whose recipe was revealed
  hintedPairs: [],         // kept for older saves; no hint hands over pairs any more
  credits: START_CREDITS,
  startedAt: Date.now(),
  finishedAt: null,
  log: [],                 // { t, kind: "try"|"hint", ... }
});
let S = load();
function load() {
  try {
    const raw = localStorage.getItem(KEY);
    if (raw) {
      const s = JSON.parse(raw);
      if (s.version === world.version) {
        const merged = { ...fresh(), ...s };
        if (!s.playId) { merged.playId = rid(); try { localStorage.setItem(KEY, JSON.stringify(merged)); } catch {} }
        return merged;
      }
    }
  } catch {}
  return fresh();
}
function save() { try { localStorage.setItem(KEY, JSON.stringify(S)); } catch {} scheduleSync(); }
const owned = () => new Set(S.owned);

// ---------- who is playing, and uploading the play ----------
const PKEY = "alchemy.player";
let player = null;
try { player = JSON.parse(localStorage.getItem(PKEY)); } catch {}
function setPlayer(name) {
  player = { id: player?.id ?? Math.random().toString(36).slice(2, 10), name: name.trim().slice(0, 40) };
  try { localStorage.setItem(PKEY, JSON.stringify(player)); } catch {}
}
let syncTimer;
const SYNC_ON = SYNC_URL && !new URLSearchParams(location.search).has("nolog");   // ?nolog plays without uploading
function scheduleSync() { if (!SYNC_ON || !player) return; clearTimeout(syncTimer); syncTimer = setTimeout(sync, 3000); }
// keepalive lets the request outlive a closing tab, but browsers cap keepalive bodies at 64 KB
function sync(leaving = false) {
  if (!SYNC_ON || !player) return;
  clearTimeout(syncTimer); syncTimer = null;
  const body = JSON.stringify({ player, state: S });
  fetch(`${SYNC_URL}/w/${world.id}/${S.playId}`, { method: "PUT", keepalive: leaving && body.length < 60_000,
    headers: { "content-type": "application/json" }, body }).catch(() => {});
}
document.addEventListener("visibilitychange", () => { if (document.visibilityState === "hidden" && syncTimer) sync(true); });

// ---------- dom ----------
const $ = (id) => document.getElementById(id);
const el = { goal: $("goal"), slotA: $("slotA"), slotB: $("slotB"), result: $("result"), bench: $("bench"), grid: $("grid"),
  named: $("named"), hidden: $("hidden"), hiddenLabel: $("hiddenLabel"), note: $("note"), credits: $("credits"),
  toast: $("toast"), stage: $("stage"), elapsed: $("elapsed"), menuBtn: $("menuBtn"), sheet: $("sheet") };

// An item's drawing; the table's emoji stands in for a world whose icons are not drawn yet.
document.body.insertAdjacentHTML("afterbegin", ICON_DEFS);
const ic = (id) => `<span class="ic">${ICONS[id] ?? `<span class="emoji">${byId.get(id).icon}</span>`}</span>`;
const HEX = `<svg class="hex" viewBox="0 0 12 12" aria-hidden="true"><path d="M6 .8l4.5 2.6v5.2L6 11.2 1.5 8.6V3.4z" fill="currentColor"/></svg>`;

let selected = null;      // id of the card in the first slot
let justMade = null;      // id to pop into the grid
let justNamed = null;     // id to pop into the chips
let lastResult = null;    // id shown in the result slot
let resultState = "idle"; // idle | found | dud
let armed = false, armTimer, dudTimer;

$("worldName").textContent = world.name;
document.title = `${world.name} · Alchemy`;

// ---------- rendering ----------
function render() {
  const own = owned();
  const found = S.owned.filter((id) => !byId.get(id).seed).length;
  el.credits.textContent = S.credits;

  // goal: progress is the ring round its icon
  const goal = byId.get(world.summit), reached = own.has(goal.id);
  el.goal.className = "summit" + (reached ? " reached" : "") + (justNamed === goal.id ? " new" : "");
  el.goal.style.setProperty("--p", reached ? 1 : found / discoveries.length);
  el.goal.innerHTML = `${ic(goal.id)}<div class="goal">${goal.name}</div>` +
    `<div class="progress">${reached ? "reached" : `<b>${found}</b> / ${discoveries.length}`}</div>`;
  if (!reached) el.goal.appendChild(recipeOrHint(goal));

  // bench
  el.slotA.innerHTML = selected ? ic(selected) + `<span class="nm">${byId.get(selected).name}</span>` : "";
  el.slotB.innerHTML = "";
  const r = byId.get(lastResult);
  el.result.className = "slot result " + (resultState === "found" ? "found" : resultState === "dud" ? "dud" : "");
  el.result.innerHTML = resultState === "found" && r ? ic(r.id) + `<span class="nm">${r.name}</span>` : resultState === "dud" ? "nothing" : "";

  // owned grid: seeds first, then in discovery order
  el.grid.innerHTML = "";
  for (const id of S.owned) {
    const card = document.createElement("button");
    card.className = "card" + (id === selected ? " picked" : "") + (id === justMade ? " new" : "");
    card.innerHTML = `${ic(id)}<span class="n">${byId.get(id).name}</span>`;
    card.onclick = () => pick(id);
    el.grid.appendChild(card);
  }
  justMade = null;

  // named-but-unmade things on glass, everything else as question marks
  el.named.innerHTML = "";
  const namedLeft = S.named.filter((id) => !own.has(id) && id !== world.summit);
  for (const id of namedLeft) {
    const t = byId.get(id), row = document.createElement("div");
    row.className = "named" + (id === justNamed ? " new" : "");
    row.innerHTML = `${ic(id)}<span class="nm">${t.name}</span>`;
    if (S.recipesKnown.includes(id)) row.insertAdjacentHTML("beforeend", `<span class="eq">=</span>`);
    row.appendChild(recipeOrHint(t));
    el.named.appendChild(row);
  }
  justNamed = null;
  const unknown = discoveries.filter((d) => !own.has(d.id) && !S.named.includes(d.id)).length;
  el.hiddenLabel.textContent = unknown + namedLeft.length ? `${unknown + namedLeft.length} to discover` : "";
  el.hidden.innerHTML = "";
  for (let i = 0; i < unknown; i++) {
    const sq = document.createElement("button");
    sq.className = "sq" + (i === 0 && armed ? " armed" : "");
    sq.innerHTML = i === 0 && armed ? `Name one · ${HEX}${COST.name}` : "?";
    sq.onclick = square;
    el.hidden.appendChild(sq);
  }
}

// A recipe you bought, or the button that buys it.
function recipeOrHint(t) {
  if (S.recipesKnown.includes(t.id)) {
    const rec = document.createElement("span");
    rec.className = "rec";
    rec.innerHTML = t.recipe.map((x) => `<span>${ic(x)}${byId.get(x).name}</span>`).join(`<span class="plus">+</span>`);
    return rec;
  }
  const btn = document.createElement("button");
  btn.className = "hint";
  btn.innerHTML = `Recipe · ${HEX}${COST.recipe}`;
  btn.onclick = (e) => { e.stopPropagation(); revealRecipe(t.id); };
  return btn;
}

// ---------- play ----------
// Tap a card to pick it up, tap another (or the same one again) to combine. Tap the first slot to put it back.
function pick(id) {
  disarm(); el.note.textContent = "";
  if (!selected) { selected = id; lastResult = null; resultState = "idle"; render(); return; }
  const a = selected; selected = null;
  combine(a, id);
}
el.slotA.onclick = () => { if (selected) { selected = null; render(); } };

function combine(a, b) {
  const k = pairKey(a, b);
  const result = recipes.get(k);
  const own = owned();
  if (result && !own.has(result)) {
    const guessed = !S.recipesKnown.includes(result) && !S.hintedPairs.includes(k);
    S.owned.push(result);
    if (guessed) S.credits += EARN;
    S.log.push({ t: Date.now(), kind: "try", a, b, result, guessed });
    if (result === world.summit && !S.finishedAt) S.finishedAt = Date.now();
    lastResult = result; resultState = "found";
    save(); render();
    reveal(result, a, b, guessed);
  } else if (result) {
    S.log.push({ t: Date.now(), kind: "try", a, b, result, repeat: true });
    save(); render();
    toast(`You already made ${byId.get(result).name} this way.`);
  } else {
    if (!S.tried.includes(k)) S.tried.push(k);
    S.log.push({ t: Date.now(), kind: "try", a, b, result: null });
    resultState = "dud";
    save(); render();
    el.bench.classList.remove("shake"); void el.bench.offsetWidth; el.bench.classList.add("shake");
    // "nothing" is a beat of feedback, not a state: it clears once the shake has been seen.
    clearTimeout(dudTimer);
    dudTimer = setTimeout(() => { if (resultState === "dud") { resultState = "idle"; render(); } }, 1200);
  }
}

// ---------- the discovery moment: collide, medium ----------
// All motion is Web Animations with pixel values. CSS variables inside keyframes are unreliable on iOS.
const K = { dur: 650, stop: 100, kick: 7, flash: 3, ring: 4, fly: 110, sparks: 14 };
function reveal(id, a, b, guessed) {
  const it = byId.get(id), A = byId.get(a), B = byId.get(b), st = el.stage;
  const isSummit = id === world.summit;
  const T = K.dur, STOP = K.stop, d0 = T + STOP + 500;
  let stats = "";
  const next = WORLDS[WORLDS.indexOf(world) + 1];
  if (isSummit) {
    const mins = Math.round((S.finishedAt - S.startedAt) / 60000);
    const tries = S.log.filter((e) => e.kind === "try").length;
    const hints = S.log.filter((e) => e.kind === "hint").length;
    const found = S.owned.filter((x) => !byId.get(x).seed).length;
    stats = `<div class="stats in" style="animation-delay:${d0 + 650}ms">${mins} min · ${tries} attempts · ${hints} hints · ${found} of ${discoveries.length} found<br>${next ? `${next.name} is open: find it in the menu.` : "The next world is not built yet. You can keep exploring this one."}</div>`;
  }
  const sparks = Array.from({ length: K.sparks }, () => `<div class="anchor spark"><div></div></div>`).join("");
  st.className = "stage show";
  st.innerHTML = `<div class="backdrop"></div><div class="who" id="who">
    <div class="arena">
      <div class="anchor ing a"><div>${ic(a)}</div></div><div class="anchor ing b"><div>${ic(b)}</div></div>
      <div class="anchor flash"><div></div></div><div class="anchor ring"><div></div></div><div class="anchor glow"><div></div></div>${sparks}
      <div class="anchor out"><div>${ic(id)}</div></div>
    </div>
    <div class="pair in" style="animation-delay:${d0}ms">${ic(a)} ${A.name} <span class="plus">+</span> ${ic(b)} ${B.name}</div>
    <div class="name in" style="animation-delay:${d0 + 100}ms">${it.name}</div>
    <div class="blurb in" style="animation-delay:${d0 + 250}ms">${it.blurb}</div>
    <div class="credit in ${guessed ? "" : "none"}" style="animation-delay:${d0 + 450}ms">${guessed ? `+${EARN} credit` : "hinted · no credit"}</div>${stats}</div>`;

  const q = (sel) => st.querySelector(sel);
  const fwd = (duration, delay = 0, easing = "ease-out") => ({ duration, delay, easing, fill: "forwards" });
  const ease = "cubic-bezier(.7,-.3,1,.5)"; // negative overshoot: the pull-back before the flight
  const meet = { transform: "translate(0px, 0px) scale(.5)", opacity: 0 };
  q(".ing.a > div").animate([{ transform: "translate(-120px, 0px)", opacity: 1 }, { opacity: 1, offset: .95 }, meet], fwd(T, 0, ease));
  q(".ing.b > div").animate([{ transform: "translate(120px, 0px)", opacity: 1 }, { opacity: 1, offset: .95 }, meet], fwd(T, 0, ease));
  q(".flash > div").animate([{ transform: "scale(.2)", opacity: 1 }, { transform: `scale(${K.flash})`, opacity: 0 }], fwd(300, T));
  q(".ring > div").animate([{ transform: "scale(.2)", opacity: 1 }, { transform: `scale(${K.ring})`, opacity: 0 }], fwd(600, T));
  const kk = K.kick;
  q("#who").animate([{ transform: "none" }, { transform: `translate(${-kk}px, ${kk * .6}px)`, offset: .2 }, { transform: `translate(${kk * .7}px, ${-kk * .4}px)`, offset: .45 }, { transform: `translate(${-kk * .3}px, ${kk * .2}px)`, offset: .7 }, { transform: "none" }], { duration: 300, delay: T, easing: "cubic-bezier(.2,.8,.2,1)" });
  q(".glow > div").animate([{ transform: "scale(.2)", opacity: 0 }, { opacity: 1, offset: .4 }, { transform: "scale(1.6)", opacity: .35 }], fwd(1200, T + STOP));
  st.querySelectorAll(".spark > div").forEach((s, i) => {
    const ang = Math.round(i * 360 / K.sparks);
    s.animate([{ transform: `rotate(${ang}deg) translateX(0px)`, opacity: 1 }, { transform: `rotate(${ang}deg) translateX(${K.fly}px)`, opacity: 0 }], fwd(900, T + STOP + (i % 3) * 50));
  });
  q(".out > div").animate([{ transform: "scale(.2)", opacity: 0 }, { transform: "scale(1)", opacity: 1 }], fwd(600, T + STOP, "cubic-bezier(.2,1.6,.4,1)"));

  // The moment has shown the find and the grid pops it in, so the bench empties.
  st.onclick = () => { st.className = "stage"; st.innerHTML = ""; justMade = id; lastResult = null; resultState = "idle"; render(); };
}

let toastTimer;
function toast(msg, ms = 3000) {
  el.toast.textContent = msg; el.toast.classList.add("show");
  clearTimeout(toastTimer); toastTimer = setTimeout(() => el.toast.classList.remove("show"), ms);
}

// ---------- hints ----------
function pay(type) {
  if (S.credits < COST[type]) { toast(`Not enough credits. That one costs ${COST[type]}, you have ${S.credits}.`); return false; }
  S.credits -= COST[type];
  return true;
}
function nameIt(id) { if (!S.named.includes(id) && !owned().has(id)) S.named.push(id); }

// A ? square, tapped twice, names something the player can make right now from what they own.
function arm() { armed = true; clearTimeout(armTimer); armTimer = setTimeout(disarm, 3000); render(); }
function disarm() { if (armed) { armed = false; clearTimeout(armTimer); render(); } }
function square() {
  if (selected) { selected = null; }
  if (!armed) { arm(); return; }
  armed = false; clearTimeout(armTimer);
  const own = owned();
  const cands = discoveries.filter((d) => !own.has(d.id) && !S.named.includes(d.id) && d.recipe.every((p) => own.has(p)));
  if (!cands.length) { el.note.textContent = "Everything you could make right now, you already know about."; render(); return; }
  if (!pay("name")) { render(); return; }
  const c = cands[Math.floor(Math.random() * cands.length)];
  nameIt(c.id); justNamed = c.id;
  S.log.push({ t: Date.now(), kind: "hint", type: "name", revealed: c.id });
  el.note.innerHTML = `${ic(c.id)} ${c.name} can be made from what you have.`;
  save(); render();
}

function revealRecipe(tid) {
  if (S.recipesKnown.includes(tid) || !pay("recipe")) return;
  const t = byId.get(tid);
  S.recipesKnown.push(tid);
  for (const p of t.recipe) nameIt(p);
  S.log.push({ t: Date.now(), kind: "hint", type: "recipe", target: tid });
  save(); render();
}

// ---------- menu: the time played, and the tools that are ours rather than the player's ----------
function menu(open) { el.sheet.hidden = !open; el.menuBtn.setAttribute("aria-expanded", open); }
el.menuBtn.onclick = (e) => { e.stopPropagation(); menu(el.sheet.hidden); };
document.addEventListener("click", (e) => { if (!el.sheet.hidden && !el.sheet.contains(e.target)) menu(false); });
// One line per world; the one being played is marked, the others open it. Keeps ?nolog.
$("worlds").innerHTML = WORLDS.map((w, i) => {
  const q = new URLSearchParams(location.search); q.set("world", w.id);
  return w === world ? `<span class="here">World ${i + 1} · ${w.name}</span>` : `<a href="?${q}">World ${i + 1} · ${w.name}</a>`;
}).join("");
$("copyLog").onclick = async () => {
  menu(false);
  const text = JSON.stringify({ world: world.id, ...S }, null, 0);
  try { await navigator.clipboard.writeText(text); toast("Play log copied."); }
  catch { prompt("Copy this:", text); }
};
$("reset").onclick = () => {
  menu(false);
  if (!confirm("Start over? This wipes your progress in this world.")) return;
  S = fresh(); selected = null; lastResult = null; resultState = "idle"; save(); render();
};
setInterval(() => {
  const end = S.finishedAt ?? Date.now();
  el.elapsed.textContent = `${Math.floor((end - S.startedAt) / 60000)} min`;
}, 1000);

// ---------- pwa ----------
if ("serviceWorker" in navigator) navigator.serviceWorker.register("sw.js").catch(() => {});

render();

// First launch with uploading on: ask who's playing, then upload whatever is already saved.
if (SYNC_ON && !player) {
  el.stage.className = "stage show form";
  el.stage.innerHTML = `<div class="backdrop"></div><div class="who">
    ${ic(world.summit)}
    <h2>Who's playing?</h2>
    <p>Your name goes on the play log, so we know whose discoveries are whose. Nothing else is collected.</p>
    <form id="nameForm"><input id="nameInput" maxlength="40" placeholder="your name" autocomplete="off" required> <button type="submit">Play</button></form></div>`;
  el.stage.onclick = null;
  $("nameForm").onsubmit = (e) => { e.preventDefault(); setPlayer($("nameInput").value); el.stage.className = "stage"; el.stage.innerHTML = ""; sync(); };
  $("nameInput").focus();
} else if (SYNC_ON) {
  sync();
}
