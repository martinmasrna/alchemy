// The playable skeleton every direction in this round shares: world 1's real table, the locked
// icons, a mid-play save, and the loop (pick, combine, dud, find). The directions differ in CSS
// and in two layout options, never in content or behaviour, so they are compared on looks alone.
//
// ?at=late shows the grid near the end of the world, where the bench has scrolled away today.
// ?state=picked holds a Star in the first slot; ?state=dud holds a failed Star + Space.
import world from "../../worlds/world1.js";
import { w1icons, W1_DEFS } from "../_context/icon-art-w1.js";
import { HR_DEFS } from "../_context/icon-art-habitat-r.js";

const byId = new Map(world.items.map((i) => [i.id, i]));
const key = (a, b) => [a, b].sort().join("+");
const recipes = new Map(world.items.filter((i) => i.recipe).map((i) => [key(...i.recipe), i.id]));
const discoveries = world.items.filter((i) => !i.seed);

const q = new URLSearchParams(location.search);
const SAVES = {
  mid: { owned: ["energy", "matter", "space", "time", "particle", "light", "gravity", "hydrogen", "nebula", "star",
    "helium", "carbon", "oxygen", "water", "rainbow", "supernova"], named: ["comet"], known: ["comet"], credits: 3, min: 14 },
  late: { owned: world.items.map((i) => i.id).filter((id) => !["air", "ocean", "cloud", "earth"].includes(id)),
    named: ["air"], known: ["air"], credits: 5, min: 41 },
};
const save = structuredClone(SAVES[q.get("at")] ?? SAVES.mid);

export const HEX = `<svg class="hex" viewBox="0 0 12 12" aria-hidden="true"><path d="M6 .8l4.5 2.6v5.2L6 11.2 1.5 8.6V3.4z" fill="currentColor"/></svg>`;
const icon = (id) => `<span class="ic">${w1icons[id]}</span>`;

export function mount(opts = {}) {
  const { darkInGrid = false, darkLabel = (n) => `Undiscovered · ${n}`, markStyle = () => "" } = opts;
  document.body.insertAdjacentHTML("afterbegin", W1_DEFS + HR_DEFS);
  const app = document.getElementById("app");
  let a = null, b = null, result = null, outcome = null, justMade = null, armed = false, menu = false, timer;

  if (q.get("state") === "picked") a = "star";
  if (q.get("state") === "dud") { a = "star"; b = "space"; outcome = "dud"; }

  const own = () => new Set(save.owned);
  const slot = (id, cls) => `<div class="slot ${cls}${id ? " full" : ""}" data-slot="${cls}">${id ? icon(id) + `<span class="nm">${byId.get(id).name}</span>` : ""}</div>`;

  function render() {
    const o = own();
    const found = save.owned.filter((id) => !byId.get(id).seed).length;
    const dark = discoveries.filter((d) => !o.has(d.id) && !save.named.includes(d.id) && d.id !== world.summit).length;
    const named = save.named.filter((id) => !o.has(id)).map((id) => {
      const it = byId.get(id);
      const rec = save.known.includes(id)
        ? `<span class="rec">${it.recipe.map((r) => icon(r) + `<span>${byId.get(r).name}</span>`).join(`<span class="plus">+</span>`)}</span>`
        : `<button class="hint">Recipe · ${HEX}5</button>`;
      return `<div class="named">${icon(id)}<span class="nm">${it.name}</span><span class="eq">=</span>${rec}</div>`;
    }).join("");
    const marks = Array.from({ length: dark }, (_, i) =>
      `<button class="mark${i === 0 && armed ? " armed" : ""}" data-mark style="${markStyle(i, dark)}">${i === 0 && armed ? `Name one · ${HEX}1` : ""}</button>`).join("");
    const items = save.owned.map((id) =>
      `<button class="item${id === a && !b ? " picked" : ""}${id === justMade ? " new" : ""}" data-id="${id}">${icon(id)}<span class="nm">${byId.get(id).name}</span></button>`).join("");
    const summit = byId.get(world.summit);

    app.innerHTML = `
      <header class="top">
        <div class="bar">
          <h1 class="world">${world.name}</h1>
          <span class="credits" title="Hint credits">${HEX}<b>${save.credits}</b></span>
          <button class="menu" data-menu aria-label="Menu"><i></i><i></i><i></i></button>
          ${menu ? `<div class="sheet"><span>${save.min} min</span><button>Copy play log</button><button>Start over</button></div>` : ""}
        </div>
        <div class="summit" style="--p:${found / discoveries.length}">
          ${icon(summit.id)}
          <div class="goal"><span class="k">Goal</span><span class="v">${summit.name}</span></div>
          <div class="progress"><span class="num"><b>${found}</b> / ${discoveries.length}</span><span class="track"><i style="width:${(found / discoveries.length) * 100}%"></i></span></div>
          <button class="hint">Recipe · ${HEX}5</button>
        </div>
      </header>
      <section class="bench${outcome === "dud" ? " dud" : ""}${outcome === "found" ? " found" : ""}" id="bench">
        ${slot(a, "a")}<span class="op">+</span>${slot(b, "b")}<span class="op">=</span>${slot(result, "r")}
      </section>
      <section class="items">${items}${darkInGrid ? named.replace(/class="named"/g, 'class="named cell"') + marks : ""}</section>
      ${darkInGrid ? "" : `<section class="dark"><h2 class="lbl">${darkLabel(dark + save.named.filter((id) => !o.has(id)).length)}</h2>${named}<div class="marks">${marks}</div></section>`}`;
    justMade = null;
  }

  function combine(x, y) {
    b = y;
    const r = recipes.get(key(x, y));
    if (r) { result = r; outcome = "found"; if (!own().has(r)) { save.owned.push(r); save.named = save.named.filter((n) => n !== r); justMade = r; } }
    else outcome = "dud";
    render();
    if (outcome === "dud") { const el = document.getElementById("bench"); el.animate([{ transform: "translateX(0)" }, { transform: "translateX(-6px)" }, { transform: "translateX(6px)" }, { transform: "translateX(0)" }], 300); }
    clearTimeout(timer);
    timer = setTimeout(() => { a = b = result = outcome = null; render(); }, 1400);
  }

  app.addEventListener("click", (e) => {
    const t = e.target.closest("[data-id],[data-slot],[data-mark],[data-menu]");
    menu = t?.hasAttribute("data-menu") ? !menu : false;
    if (!t) return render();
    if (t.dataset.id) {
      if (outcome) { clearTimeout(timer); a = b = result = outcome = null; }
      if (!a) { a = t.dataset.id; render(); } else combine(a, t.dataset.id);
      return;
    }
    if (t.dataset.slot === "a" && a && !b) a = null;
    if (t.hasAttribute("data-mark")) armed = !armed;
    render();
  });
  render();
}
