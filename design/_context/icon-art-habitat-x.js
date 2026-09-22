// Habitat's depiction crossed with the two renderings still standing.
//
// The final three were not competing on the same question. Editorial and glass are both
// answers to "how is a thing rendered": pale tile with flat grainy shapes, or dark and
// translucent and lit. Habitat answers a different question, "what else is in the frame",
// and its own rendering happens to be a modelled solid close to clay.
//
// So habitat's context is separable, and this file separates it. Three columns: habitat as it
// was, habitat rendered as editorial, habitat rendered as glass. Nothing about the depiction
// changes across the three; only the paint does.
import { hues, parts } from "./shapes.js";

const box = (b, d = "") => `<svg viewBox="0 0 48 48" fill="none" aria-hidden="true">${d}${b}</svg>`;
const tone = (id, t) => hues[id][t] ?? hues[id].base;
const draw = (p, fill, extra = "") =>
  p.w ? `<path d="${p.d}" stroke="${fill}" stroke-width="${p.w}" fill="none" stroke-linecap="round" stroke-linejoin="round" ${extra}/>`
      : `<path d="${p.d}" fill="${fill}" ${extra}/>`;
const hx = (h) => [1, 3, 5].map((i) => parseInt(h.slice(i, i + 2), 16));
const mix = (a, b, t) => { const [x, y] = [hx(a), hx(b)];
  return "#" + x.map((v, i) => Math.round(v + (y[i] - v) * t).toString(16).padStart(2, "0")).join(""); };
const mixTo = (c, t, target) => "#" + hx(c).map((v) => Math.round(v + (target - v) * t).toString(16).padStart(2, "0")).join("");
const lighter = (c, t) => mixTo(c, t, 255);
const darker = (c, t) => mixTo(c, t, 0);
// Editorial's register: every hue pulled a third of the way to a warm grey and taken down a
// little. It is what makes that column look considered rather than bright.
const muted = (c) => darker(mix(c, "#8A8272", .34), .06);

const ids = Object.keys(parts);
const build = (fn) => Object.fromEntries(ids.map((id) => [id, fn(id)]));

// ---- the one piece of world, parameterised so it can sit on paper or in the dark ---------
// Same element for every column: what changes is whether it is drawn in ink or in light.
const worldFor = (t) => ({
  star: `<g fill="${t.spark}">${[[8, 10, 1], [40, 9, .8], [38, 37, .9], [10, 38, .7], [43, 23, .65]]
    .map(([x, y, r]) => `<circle cx="${x}" cy="${y}" r="${r}" opacity="${t.dark ? .9 : .5}"/>`).join("")}</g>`,
  water: `<ellipse cx="24" cy="41" rx="13" ry="2.4" fill="${t.wet}" opacity=".5"/>
    <ellipse cx="24" cy="41.4" rx="17" ry="3.2" fill="none" stroke="${t.wet}" stroke-width=".9" opacity=".45"/>
    <ellipse cx="24" cy="42" rx="21" ry="4" fill="none" stroke="${t.wet}" stroke-width=".7" opacity=".28"/>`,
  earth: t.dark
    ? `<circle cx="41" cy="9" r="4.4" fill="url(#hx-sun)"/>`
    : `<circle cx="41" cy="9" r="3.4" fill="${t.warm}"/><g stroke="${t.warm}" stroke-width=".9" stroke-linecap="round" opacity=".7">
       <path d="M41 2.6v1.6M41 13.8v1.6M34.6 9h1.6M45.8 9h1.6M36.6 4.6l1.1 1.1M44.3 12.3l1.1 1.1M45.4 4.6l-1.1 1.1M37.7 12.3l-1.1 1.1"/></g>`,
  life: `<path d="M4 36h40v10H4z" fill="${t.soil}"/><path d="M5 36h38" stroke="${t.line}" stroke-width="1.2" stroke-linecap="round"/>`,
  human: `<path d="M5 41h38" stroke="${t.line}" stroke-width="2.4" stroke-linecap="round"/>
    <path d="M27 41q9-1.4 16-5.4" stroke="${t.shadow}" stroke-width="3.6" fill="none" stroke-linecap="round" opacity="${t.dark ? .4 : .25}"/>`,
  fire: `${t.dark ? `<ellipse cx="24" cy="41" rx="16" ry="3.6" fill="url(#hx-glow)"/>` : ""}
    <path d="M12 40.6q12-4.4 24 0" stroke="${t.soil}" stroke-width="3.2" fill="none" stroke-linecap="round"/>`,
  hunting: `<path d="M5 42h38" stroke="${t.line}" stroke-width="1.8" stroke-linecap="round"/>
    <g fill="${t.soil}" opacity=".85"><ellipse cx="17" cy="39" rx="1.8" ry="1.2"/>
      <ellipse cx="25" cy="40.4" rx="1.8" ry="1.2"/><ellipse cx="33" cy="38.6" rx="1.8" ry="1.2"/></g>`,
  tribe: `${t.dark ? `<ellipse cx="24" cy="43" rx="19" ry="4" fill="url(#hx-glow)"/>` : ""}
    <path d="M5 44h38" stroke="${t.line}" stroke-width="1.6" stroke-linecap="round"/>`,
  city: `<circle cx="40" cy="9" r="3.6" fill="${t.warm}" opacity=".9"/>
    <path d="M4 45.4h40" stroke="${t.line}" stroke-width="2" stroke-linecap="round"/>`,
  car: `<path d="M2 40h44v6H2z" fill="${t.road}"/>
    <path d="M8 43h7M20 43h7M32 43h7" stroke="${t.dash}" stroke-width="1" opacity=".7" stroke-linecap="round"/>`,
  calculus: `<g stroke="${t.grid}" stroke-width=".5" opacity="${t.dark ? .3 : .45}">
    <path d="M17 9v33M25 9v33M33 9v33M9 16h32M9 25h32M9 34h32"/></g>`,
  bitcoin: `<ellipse cx="24" cy="42" rx="13" ry="2.8" fill="${t.shadow}" opacity="${t.dark ? .45 : .22}" filter="url(#hx-soft)"/>
    <path d="M4 44.4h40" stroke="${t.road}" stroke-width="3" stroke-linecap="round"/>`,
});
const DARK = worldFor({ dark: true, spark: "#F0F6FA", wet: "#2E82C6", warm: "#F5B93C", soil: "#6E4229",
  line: "#2A2118", shadow: "#000", road: "#1C232E", dash: "#8A929C", grid: "#4A7FA8" });
const PAPER = worldFor({ dark: false, spark: "#6E6858", wet: "#5E7F96", warm: "#C8A24A", soil: "#8A7256",
  line: "#9A907C", shadow: "#4A4438", road: "#B6AC98", dash: "#E9E2D5", grid: "#7E8C96" });

// ---- 1. habitat as it was: a modelled solid ---------------------------------------------
const own = build((id) => {
  const g = `hn-${id}`;
  let defs = "", body = DARK[id];
  parts[id].forEach((p, i) => {
    const c = tone(id, p.tone), r = `${g}-${i}`;
    if (p.w) { body += draw(p, c); return; }
    defs += `<radialGradient id="${r}" cx=".36" cy=".3" r=".92">
      <stop offset="0" stop-color="${lighter(c, .42)}"/><stop offset=".55" stop-color="${c}"/>
      <stop offset="1" stop-color="${darker(c, .32)}"/></radialGradient>`;
    body += draw(p, `url(#${r})`);
  });
  return box(body, `<defs>${defs}</defs>`);
});

// ---- 2. habitat rendered as editorial: paper tile, flat muted shapes, grain ---------------
// The context has to change ink with the ground. A glow under a fire says nothing on paper,
// so the fire gets its logs and no halo, and the star's companions become dark specks.
const editorial = build((id) => {
  const body = parts[id].map((p) => draw(p, muted(tone(id, p.tone)))).join("");
  return box(
    `<g filter="url(#hx-grain)">
       <rect x="2" y="2" width="44" height="44" rx="8" fill="#E9E2D5"/>
       <g clip-path="url(#hx-tile)">${PAPER[id]}${body}</g>
     </g>`);
});

// ---- 3. habitat rendered as glass: translucent, lit, a facet seam and a hard specular -----
const glass = build((id) => {
  const g = `hg-${id}`;
  let defs = "", body = DARK[id];
  parts[id].forEach((p, i) => {
    const c = tone(id, p.tone), r = `${g}-${i}`, cl = `${g}-c${i}`;
    if (p.w) { body += draw(p, lighter(c, .45)); return; }
    defs += `<clipPath id="${cl}"><path d="${p.d}"/></clipPath>
      <linearGradient id="${r}" x1=".22" y1="0" x2=".78" y2="1">
        <stop offset="0" stop-color="${lighter(c, .7)}"/><stop offset=".45" stop-color="${c}"/>
        <stop offset="1" stop-color="${darker(c, .45)}"/></linearGradient>
      <linearGradient id="${r}-rim" x1="0" y1="1" x2="1" y2="0">
        <stop offset="0" stop-color="${lighter(c, .85)}" stop-opacity=".9"/>
        <stop offset=".7" stop-color="${lighter(c, .85)}" stop-opacity="0"/></linearGradient>`;
    body += draw(p, `url(#${r})`)
      + `<g clip-path="url(#${cl})"><path d="M24 -8 56 24 24 56z" fill="${darker(c, .55)}" opacity=".42"/></g>`
      + `<path d="${p.d}" stroke="url(#${r}-rim)" stroke-width="1.1" fill="none"/>`
      + draw(p, "#fff", 'opacity=".9" transform="translate(-2.4 -2.8) scale(.24)" transform-origin="24 24"');
  });
  return box(body, `<defs>${defs}</defs>`);
});

export const habitatX = { own, editorial, glass };
export const habitatXNotes = {
  own: "Habitat as it won round 16: a modelled solid, lit from the upper left, with its one piece of world. This is the reference.",
  editorial: "The same depiction rendered as editorial. Paper tile, flat shapes, grain over everything, and every hue pulled a third of the way to a warm grey. The context changes ink with the ground: a glow under a fire says nothing on paper, so the fire keeps its logs and loses its halo.",
  glass: "The same depiction rendered as glass. Translucent bodies, a facet seam down each shape, a lit rim and one hard specular. The context stays in the dark register, so fire keeps its halo and the star keeps its white companions.",
};
export const HX_DEFS = `<svg width="0" height="0" style="position:absolute"><defs>
  <clipPath id="hx-tile"><rect x="2" y="2" width="44" height="44" rx="8"/></clipPath>
  <filter id="hx-soft" x="-60%" y="-60%" width="220%" height="220%"><feGaussianBlur stdDeviation="1.7"/></filter>
  <radialGradient id="hx-sun"><stop offset=".3" stop-color="#FFF7E0"/><stop offset="1" stop-color="#F5B93C" stop-opacity="0"/></radialGradient>
  <radialGradient id="hx-glow"><stop offset="0" stop-color="#F5B93C" stop-opacity=".5"/><stop offset="1" stop-color="#F5B93C" stop-opacity="0"/></radialGradient>
  <filter id="hx-grain" x="-5%" y="-5%" width="110%" height="110%">
    <feTurbulence type="fractalNoise" baseFrequency="1.2" numOctaves="2" seed="5" result="n"/>
    <feColorMatrix in="n" type="saturate" values="0" result="g"/>
    <feComponentTransfer in="g" result="a"><feFuncA type="linear" slope=".3"/></feComponentTransfer>
    <feComposite in="a" in2="SourceGraphic" operator="in" result="grain"/>
    <feMerge><feMergeNode in="SourceGraphic"/><feMergeNode in="grain"/></feMerge>
  </filter>
</defs></svg>`;
export { subjects } from "./shapes.js";
