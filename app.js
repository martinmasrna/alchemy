import world from "./worlds/world1.js";
import { SYNC_URL } from "./config.js";

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
const fresh = () => ({
  version: world.version,
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
    if (raw) { const s = JSON.parse(raw); if (s.version === world.version) return { ...fresh(), ...s }; }
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
function scheduleSync() { if (!SYNC_URL || !player) return; clearTimeout(syncTimer); syncTimer = setTimeout(sync, 3000); }
// keepalive lets the request outlive a closing tab, but browsers cap keepalive bodies at 64 KB
function sync(leaving = false) {
  if (!SYNC_URL || !player) return;
  clearTimeout(syncTimer); syncTimer = null;
  const body = JSON.stringify({ player, state: S });
  fetch(`${SYNC_URL}/w/${world.id}/${player.id}`, { method: "PUT", keepalive: leaving && body.length < 60_000,
    headers: { "content-type": "application/json" }, body }).catch(() => {});
}
document.addEventListener("visibilitychange", () => { if (document.visibilityState === "hidden" && syncTimer) sync(true); });

// ---------- dom ----------
const $ = (id) => document.getElementById(id);
const el = { goal: $("goal"), slotA: $("slotA"), slotB: $("slotB"), result: $("result"), bench: $("bench"), grid: $("grid"), ownCount: $("ownCount"),
  named: $("named"), hidden: $("hidden"), hiddenCount: $("hiddenCount"), note: $("note"), count: $("count"), total: $("total"), credits: $("credits"),
  toast: $("toast"), stage: $("stage"), elapsed: $("elapsed") };

let selected = null;      // id of the card in the first slot
let justMade = null;      // id to pop into the grid
let justNamed = null;     // id to pop into the chips
let lastResult = null;    // id shown in the result slot
let resultState = "idle"; // idle | found | dud
let armed = false, armTimer;

$("worldName").textContent = world.name;
document.title = `${world.name} · Alchemy`;
el.total.textContent = discoveries.length;

// ---------- rendering ----------
function render() {
  const own = owned();
  const found = S.owned.filter((id) => !byId.get(id).seed).length;
  el.count.textContent = found;
  el.credits.textContent = S.credits;
  el.ownCount.textContent = S.owned.length;
  el.hiddenCount.textContent = discoveries.length - found;

  // goal
  el.goal.innerHTML = "";
  el.goal.appendChild(chip(byId.get(world.summit), own.has(world.summit)));

  // bench
  const sel = selected ? byId.get(selected) : null;
  el.slotA.className = "slot" + (sel ? " filled" : "");
  el.slotA.innerHTML = sel ? `<span class="i">${sel.icon}</span><span class="n">${sel.name}</span>` : `<span>tap a card</span>`;
  el.slotB.innerHTML = `<span>${sel ? "then another, or the same again" : "then another"}</span>`;
  const r = byId.get(lastResult);
  el.result.className = "slot result " + (resultState === "found" ? "found" : resultState === "dud" ? "dud" : "");
  el.result.innerHTML = resultState === "found" && r ? `<span class="i">${r.icon}</span><span class="n">${r.name}</span>` : resultState === "dud" ? `<span>nothing</span>` : `<span>?</span>`;

  // owned grid: seeds first, then in discovery order
  el.grid.innerHTML = "";
  for (const id of S.owned) {
    const it = byId.get(id);
    const card = document.createElement("div");
    card.className = "card" + (id === selected ? " picked" : "") + (id === justMade ? " new" : "");
    card.innerHTML = `<span class="i">${it.icon}</span><span class="n">${it.name}</span>`;
    card.onclick = () => pick(id);
    el.grid.appendChild(card);
  }
  justMade = null;

  // named-but-unmade items as chips, everything else as ? squares
  el.named.innerHTML = "";
  for (const id of S.named) if (!own.has(id) && id !== world.summit) el.named.appendChild(chip(byId.get(id), false));
  justNamed = null;
  const unknown = discoveries.filter((d) => !own.has(d.id) && !S.named.includes(d.id)).length;
  el.hidden.innerHTML = "";
  for (let i = 0; i < unknown; i++) {
    const sq = document.createElement("div");
    sq.className = "sq" + (i === 0 && armed ? " armed" : "");
    sq.textContent = i === 0 && armed ? `⬡ ${COST.name}` : "?";
    sq.onclick = square;
    el.hidden.appendChild(sq);
  }
}

function chip(t, reached) {
  const c = document.createElement("div");
  c.className = "target" + (t.id === world.summit ? " summit" : "") + (t.id === justNamed ? " new" : "");
  if (reached) { c.innerHTML = `<span>${t.icon} ${t.name} — reached</span>`; return c; }
  c.innerHTML = `<span>${t.icon} ${t.name}</span>`;
  if (S.recipesKnown.includes(t.id)) {
    const [a, b] = t.recipe.map((x) => byId.get(x));
    c.innerHTML += `<span class="r">= ${a.icon} ${a.name} + ${b.icon} ${b.name}</span>`;
  } else {
    const btn = document.createElement("button");
    btn.textContent = `how? · ${COST.recipe}`;
    btn.onclick = (e) => { e.stopPropagation(); revealRecipe(t.id); };
    c.appendChild(btn);
  }
  return c;
}

// ---------- play ----------
// Tap a card to pick it up, tap another (or the same one again) to combine. Tap the first slot to put it back.
function pick(id) {
  disarm(); el.note.textContent = "";
  if (!selected) { selected = id; render(); return; }
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
  if (isSummit) {
    const mins = Math.round((S.finishedAt - S.startedAt) / 60000);
    const tries = S.log.filter((e) => e.kind === "try").length;
    const hints = S.log.filter((e) => e.kind === "hint").length;
    const found = S.owned.filter((x) => !byId.get(x).seed).length;
    stats = `<div class="stats in" style="animation-delay:${d0 + 650}ms">${mins} min · ${tries} attempts · ${hints} hints · ${found} of ${discoveries.length} found<br>World 2 is not built yet. You can keep exploring this one.</div>`;
  }
  const sparks = Array.from({ length: K.sparks }, () => `<div class="anchor spark"><div></div></div>`).join("");
  st.className = "stage show";
  st.innerHTML = `<div class="backdrop"></div><div class="who" id="who">
    <div class="arena">
      <div class="anchor ing a"><div>${A.icon}</div></div><div class="anchor ing b"><div>${B.icon}</div></div>
      <div class="anchor flash"><div></div></div><div class="anchor ring"><div></div></div><div class="anchor glow"><div></div></div>${sparks}
      <div class="anchor out"><div>${it.icon}</div></div>
    </div>
    <div class="pair in" style="animation-delay:${d0}ms">${A.icon} ${A.name} + ${B.icon} ${B.name}</div>
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

  st.onclick = () => { st.className = "stage"; st.innerHTML = ""; justMade = id; render(); };
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
  el.note.textContent = `${c.icon} ${c.name} can be made from what you have.`;
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

// ---------- footer ----------
$("copyLog").onclick = async () => {
  const text = JSON.stringify({ world: world.id, ...S }, null, 0);
  try { await navigator.clipboard.writeText(text); toast("Play log copied."); }
  catch { prompt("Copy this:", text); }
};
$("reset").onclick = () => {
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
if (SYNC_URL && !player) {
  el.stage.className = "stage show form";
  el.stage.innerHTML = `<div class="backdrop"></div><div class="who">
    <div class="icon">👋</div>
    <h2>Who's playing?</h2>
    <p>Your name goes on the play log, so we know whose discoveries are whose. Nothing else is collected.</p>
    <form id="nameForm"><input id="nameInput" maxlength="40" placeholder="your name" autocomplete="off" required> <button type="submit">Play</button></form></div>`;
  el.stage.onclick = null;
  $("nameForm").onsubmit = (e) => { e.preventDefault(); setPlayer($("nameInput").value); el.stage.className = "stage"; el.stage.innerHTML = ""; sync(); };
  $("nameInput").focus();
} else if (SYNC_URL) {
  sync();
}
