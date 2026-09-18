import world from "./worlds/world1.js";

// ---------- data ----------
const byId = new Map(world.items.map((i) => [i.id, i]));
const pairKey = (a, b) => [a, b].sort().join("+");
const recipes = new Map(); // pairKey -> result id
for (const it of world.items) if (it.recipe) recipes.set(pairKey(...it.recipe), it.id);
const children = (id) => world.items.filter((i) => i.recipe?.includes(id));
const discoveries = world.items.filter((i) => !i.seed);
const isDeadEnd = (id) => id !== world.summit && children(id).length === 0;
const critical = new Set([world.summit]);
(function walk(id) { for (const p of byId.get(id).recipe ?? []) if (!critical.has(p)) { critical.add(p); walk(p); } })(world.summit);

// Hints cost credits. Every discovery earns one. Tunable.
const START_CREDITS = 2;
const EARN = 1;
const COST = { name: 1, leads: 2, pairs: 2, recipe: 3 };

// Undiscovered squares sit in a fixed shuffled order so position leaks nothing.
const hash = (s) => [...s].reduce((h, c) => (h * 31 + c.charCodeAt(0)) >>> 0, 7);
const hiddenOrder = discoveries.map((i) => i.id).filter((id) => id !== world.summit).sort((a, b) => hash(a + world.id) - hash(b + world.id));

// ---------- state ----------
const KEY = `alchemy.${world.id}`;
const fresh = () => ({
  version: world.version,
  owned: [...world.seeds],
  tried: [],               // pairKeys that produced nothing
  named: [world.summit],   // undiscovered ids whose name the player knows
  recipesKnown: [],        // ids whose recipe was revealed
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
function save() { try { localStorage.setItem(KEY, JSON.stringify(S)); } catch {} }
const owned = () => new Set(S.owned);

// ---------- dom ----------
const $ = (id) => document.getElementById(id);
const el = { grid: $("grid"), hidden: $("hidden"), hiddenCount: $("hiddenCount"), goal: $("goal"), slotA: $("slotA"), slotB: $("slotB"), bench: $("bench"),
  hintLeads: $("hintLeads"), hintPairs: $("hintPairs"), count: $("count"), total: $("total"), credits: $("credits"),
  toast: $("toast"), overlay: $("overlay"), reveal: $("reveal"), elapsed: $("elapsed") };

let selected = null;   // id of first pick
let justMade = null;   // id to animate
let armed = null;      // hidden id waiting for a second tap to buy its name
let armTimer;

$("worldName").textContent = world.name;
document.title = `${world.name} · Alchemy`;
el.total.textContent = discoveries.length;
el.hintLeads.textContent = `What does this lead to? · ${COST.leads}`;
el.hintPairs.textContent = `What goes with this? · ${COST.pairs}`;

// ---------- rendering ----------
function render() {
  const own = owned();
  el.count.textContent = S.owned.filter((id) => !byId.get(id).seed).length;
  el.credits.textContent = S.credits;

  // goal
  const summit = byId.get(world.summit);
  el.goal.innerHTML = "";
  el.goal.appendChild(targetChip(summit, own.has(world.summit)));

  // bench
  const sel = selected ? byId.get(selected) : null;
  el.slotA.className = "slot" + (sel ? " filled" : "");
  el.slotA.innerHTML = sel ? `<span class="icon">${sel.icon}</span>${sel.name}` : "tap a card";
  el.slotB.className = "slot" + (sel ? " offer" : "");
  el.slotB.innerHTML = sel ? `<span class="icon">${sel.icon}</span><span class="dim">tap for 2× ${sel.name}</span>` : "then another";
  el.hintLeads.disabled = !sel || S.credits < COST.leads;
  el.hintPairs.disabled = !sel || S.credits < COST.pairs;

  // owned grid: seeds first, then in discovery order
  el.grid.innerHTML = "";
  for (const id of S.owned) {
    const it = byId.get(id);
    const card = document.createElement("div");
    card.className = "card";
    if (id === selected) card.classList.add("selected");
    if (selected) {
      const k = pairKey(selected, id);
      if (S.tried.includes(k)) card.classList.add("tried");
      else if (recipes.has(k) && own.has(recipes.get(k))) card.classList.add("made");
    }
    if (id === justMade) card.classList.add("new");
    card.innerHTML = `<div class="icon">${it.icon}</div><div class="name">${it.name}</div>`;
    card.onclick = () => pick(id);
    el.grid.appendChild(card);
  }
  justMade = null;

  // hidden grid: ? squares and named-but-unmade items
  el.hidden.innerHTML = "";
  let remaining = 0;
  for (const id of hiddenOrder) {
    if (own.has(id)) continue;
    remaining++;
    const it = byId.get(id);
    const card = document.createElement("div");
    if (S.named.includes(id)) {
      card.className = "card named";
      const known = S.recipesKnown.includes(id);
      const [a, b] = known ? it.recipe.map((x) => byId.get(x)) : [];
      card.innerHTML = `<div class="icon">${it.icon}</div><div class="name">${it.name}</div>` +
        (known ? `<div class="how">${a.icon} + ${b.icon}</div>` : `<button class="how">how? · ${COST.recipe}</button>`);
      if (!known) card.querySelector("button").onclick = (e) => { e.stopPropagation(); revealRecipe(id); };
    } else if (id === armed) {
      card.className = "card unknown armed";
      card.innerHTML = `<div class="icon">?</div><div class="name">name it · ${COST.name}</div>`;
      card.onclick = () => revealName(id);
    } else {
      card.className = "card unknown";
      card.innerHTML = `<div class="icon">?</div><div class="name">&nbsp;</div>`;
      card.onclick = () => arm(id);
    }
    el.hidden.appendChild(card);
  }
  el.hiddenCount.textContent = remaining;
}

function targetChip(t, reached) {
  const chip = document.createElement("div");
  chip.className = "target summit";
  if (reached) { chip.innerHTML = `<span>${t.icon} ${t.name} — reached</span>`; return chip; }
  chip.innerHTML = `<span>${t.icon} ${t.name}</span>`;
  if (S.recipesKnown.includes(t.id)) {
    const [a, b] = t.recipe.map((x) => byId.get(x));
    chip.innerHTML += `<span class="recipe">= ${a.icon} ${a.name} + ${b.icon} ${b.name}</span>`;
  } else {
    const btn = document.createElement("button");
    btn.textContent = `how? · ${COST.recipe}`;
    btn.onclick = (e) => { e.stopPropagation(); revealRecipe(t.id); };
    chip.appendChild(btn);
  }
  return chip;
}

// ---------- play ----------
// Tap a card to pick it up, tap it again to put it down, tap another to combine.
// Tap the empty second slot to combine the picked card with itself.
function pick(id) {
  disarm();
  if (!selected) { selected = id; render(); return; }
  if (selected === id) { selected = null; render(); return; }
  const a = selected; selected = null;
  combine(a, id);
}
el.slotA.onclick = () => { if (selected) { selected = null; render(); } };
el.slotB.onclick = () => { if (selected) { const a = selected; selected = null; combine(a, a); } };

function combine(a, b) {
  const k = pairKey(a, b);
  const result = recipes.get(k);
  const own = owned();
  if (result && !own.has(result)) {
    S.owned.push(result);
    S.credits += EARN;
    S.log.push({ t: Date.now(), kind: "try", a, b, result });
    if (result === world.summit && !S.finishedAt) S.finishedAt = Date.now();
    justMade = result;
    save(); render();
    showReveal(result, a, b);
  } else if (result) {
    S.log.push({ t: Date.now(), kind: "try", a, b, result, repeat: true });
    save(); render();
    toast(`You already made ${byId.get(result).name} this way.`);
  } else {
    if (!S.tried.includes(k)) S.tried.push(k);
    S.log.push({ t: Date.now(), kind: "try", a, b, result: null });
    save(); render();
    el.bench.classList.remove("shake"); void el.bench.offsetWidth; el.bench.classList.add("shake");
    toast("Nothing happens.");
  }
}

function showReveal(id, a, b) {
  const it = byId.get(id);
  const isSummit = id === world.summit;
  const A = byId.get(a), B = byId.get(b);
  let stats = "";
  if (isSummit) {
    const mins = Math.round((S.finishedAt - S.startedAt) / 60000);
    const tries = S.log.filter((e) => e.kind === "try").length;
    const hints = S.log.filter((e) => e.kind === "hint").length;
    const found = S.owned.filter((x) => !byId.get(x).seed).length;
    stats = `<div class="stats">${mins} min · ${tries} attempts · ${hints} hints · ${found} of ${discoveries.length} found<br>World 2 is not built yet. You can keep exploring this one.</div>`;
  }
  el.reveal.className = "reveal" + (isSummit ? " summit" : "");
  el.reveal.innerHTML = `
    <div class="icon">${it.icon}</div>
    <h2>${it.name}</h2>
    <div class="made">${A.icon} ${A.name} + ${B.icon} ${B.name} · +${EARN} credit</div>
    <p>${it.blurb}</p>
    <button id="closeReveal">${isSummit ? "Home." : "Go on"}</button>${stats}`;
  el.overlay.classList.add("show");
  $("closeReveal").onclick = closeReveal;
  el.overlay.onclick = (e) => { if (e.target === el.overlay) closeReveal(); };
}
function closeReveal() { el.overlay.classList.remove("show"); }

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

// Prefer what moves the player toward the summit; point at a dead end only when nothing else is left.
function pickChild(from) {
  const own = owned();
  const cands = children(from).filter((c) => !own.has(c.id));
  const rank = (c) => (critical.has(c.id) ? 0 : isDeadEnd(c.id) ? 2 : 1);
  cands.sort((a, b) => rank(a) - rank(b));
  return cands.length ? cands.filter((c) => rank(c) === rank(cands[0])) : [];
}
const oneOf = (arr) => arr[Math.floor(Math.random() * arr.length)];

function arm(id) { armed = id; clearTimeout(armTimer); armTimer = setTimeout(disarm, 3000); render(); }
function disarm() { if (armed) { armed = null; render(); } }

function revealName(id) {
  armed = null; clearTimeout(armTimer);
  if (!pay("name")) { render(); return; }
  nameIt(id);
  S.log.push({ t: Date.now(), kind: "hint", type: "name", revealed: id });
  save(); render();
  toast(`That one is ${byId.get(id).name}.`);
}

function revealRecipe(tid) {
  if (S.recipesKnown.includes(tid)) return;
  if (!pay("recipe")) return;
  const t = byId.get(tid);
  S.recipesKnown.push(tid);
  for (const p of t.recipe) nameIt(p);
  S.log.push({ t: Date.now(), kind: "hint", type: "recipe", target: tid });
  save(); render();
}

el.hintLeads.onclick = () => {
  const from = selected; const name = byId.get(from).name;
  const cands = pickChild(from);
  if (!children(from).length) { if (!pay("leads")) return; S.log.push({ t: Date.now(), kind: "hint", type: "leads", from, revealed: null }); toast(`${name} leads nowhere further. A dead end.`); }
  else if (!cands.length) { toast(`You've already made everything ${name} leads to.`); }
  else {
    const unnamed = cands.filter((c) => !S.named.includes(c.id));
    if (!unnamed.length) { toast(`${name} leads to ${cands.map((c) => c.name).join(", ")}. You knew that.`); }
    else { if (!pay("leads")) return; const c = oneOf(unnamed); nameIt(c.id); S.log.push({ t: Date.now(), kind: "hint", type: "leads", from, revealed: c.id }); toast(`${name} leads to ${c.name}.`); }
  }
  selected = null; save(); render();
};

el.hintPairs.onclick = () => {
  const from = selected; const name = byId.get(from).name;
  const cands = pickChild(from);
  if (!children(from).length) { if (!pay("pairs")) return; S.log.push({ t: Date.now(), kind: "hint", type: "pairs", from, partner: null }); toast(`${name} goes with nothing. A dead end.`); }
  else if (!cands.length) { toast(`You've already made everything ${name} leads to.`); }
  else {
    if (!pay("pairs")) return;
    const c = oneOf(cands);
    const partner = c.recipe[0] === from ? c.recipe[1] : c.recipe[0];
    if (partner === from) toast(`${name} goes with itself.`);
    else { nameIt(partner); toast(`${name} goes with ${byId.get(partner).name}.`); }
    S.log.push({ t: Date.now(), kind: "hint", type: "pairs", from, partner });
  }
  selected = null; save(); render();
};

// ---------- footer ----------
$("copyLog").onclick = async () => {
  const text = JSON.stringify({ world: world.id, ...S }, null, 0);
  try { await navigator.clipboard.writeText(text); toast("Play log copied."); }
  catch { prompt("Copy this:", text); }
};
$("reset").onclick = () => {
  if (!confirm("Start over? This wipes your progress in this world.")) return;
  S = fresh(); selected = null; save(); render();
};
setInterval(() => {
  const end = S.finishedAt ?? Date.now();
  el.elapsed.textContent = `${Math.floor((end - S.startedAt) / 60000)} min`;
}, 1000);

// ---------- pwa ----------
if ("serviceWorker" in navigator) navigator.serviceWorker.register("sw.js").catch(() => {});

render();
