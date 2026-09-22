// Habitat's framing is settled: a thing plus exactly one piece of the world it belongs to.
// The open question is what paint serves that framing best, and the incumbent — a modelled
// solid lit from the upper left — was never chosen for the job. It was inherited from clay.
//
// Habitat is different from every other depiction in one way that should decide the rendering:
// it already contains light and ground. A sun beside the Earth, a glow under the fire, a long
// shadow under the person, a ripple under the drop. Those are not decoration, they are a
// lighting setup. So the best rendering is one that treats the light as the system rather than
// as a per-item trick.
//
//   own         the incumbent, kept as reference: modelled solid, generic key light
//   goldenhour  one low warm sun shared by all thirty, so every shadow falls the same way
//   shadowbox   object and world are separate physical planes with real shadow between them
//   wash        object and world are one wet medium, so neither is pasted onto the other
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
// One sun and one sky, shared by the whole set. Lit sides go toward the sun, shade goes
// toward the sky, which is what makes a late afternoon look like a late afternoon.
const SUNLIT = "#FFD79A", SHADE = "#2E3A5E";
const warm = (c, t = .4) => mix(lighter(c, .22), SUNLIT, t);
const cool = (c, t = .34) => mix(darker(c, .3), SHADE, t);

const ids = Object.keys(parts);
const build = (fn) => Object.fromEntries(ids.map((id) => [id, fn(id)]));

// ---- the one piece of world, in three inks -----------------------------------------------
// `k` carries the palette a given rendering can actually use. The context is the same element
// every time; only what it is made of changes.
const worldFor = (k) => ({
  star: `<g fill="${k.spark}">${[[8, 10, 1], [40, 9, .8], [38, 37, .9], [10, 38, .7], [43, 23, .65]]
    .map(([x, y, r]) => `<circle cx="${x}" cy="${y}" r="${r}" opacity=".85"/>`).join("")}</g>`,
  water: `<ellipse cx="24" cy="41" rx="13" ry="2.4" fill="${k.wet}" opacity=".5"/>
    <ellipse cx="24" cy="41.4" rx="17" ry="3.2" fill="none" stroke="${k.wet}" stroke-width=".9" opacity=".45"/>
    <ellipse cx="24" cy="42" rx="21" ry="4" fill="none" stroke="${k.wet}" stroke-width=".7" opacity=".28"/>`,
  earth: `<circle cx="41" cy="9" r="4.4" fill="url(#hr-sun)"/>`,
  life: `<path d="M4 36h40v10H4z" fill="${k.soil}"/><path d="M5 36h38" stroke="${k.line}" stroke-width="1.2" stroke-linecap="round"/>`,
  human: `<path d="M5 41h38" stroke="${k.line}" stroke-width="2.4" stroke-linecap="round"/>`,
  fire: `<ellipse cx="24" cy="41" rx="16" ry="3.6" fill="url(#hr-glow)"/>
    <path d="M12 40.6q12-4.4 24 0" stroke="${k.soil}" stroke-width="3.2" fill="none" stroke-linecap="round"/>`,
  hunting: `<path d="M5 42h38" stroke="${k.line}" stroke-width="1.8" stroke-linecap="round"/>
    <g fill="${k.soil}" opacity=".85"><ellipse cx="17" cy="39" rx="1.8" ry="1.2"/>
      <ellipse cx="25" cy="40.4" rx="1.8" ry="1.2"/><ellipse cx="33" cy="38.6" rx="1.8" ry="1.2"/></g>`,
  tribe: `<ellipse cx="24" cy="43" rx="19" ry="4" fill="url(#hr-glow)"/>
    <path d="M5 44h38" stroke="${k.line}" stroke-width="1.6" stroke-linecap="round"/>`,
  city: `<circle cx="40" cy="9" r="3.6" fill="${k.warmDot}" opacity=".9"/>
    <path d="M4 45.4h40" stroke="${k.line}" stroke-width="2" stroke-linecap="round"/>`,
  car: `<path d="M2 40h44v6H2z" fill="${k.road}"/>
    <path d="M8 43h7M20 43h7M32 43h7" stroke="${k.dash}" stroke-width="1" opacity=".7" stroke-linecap="round"/>`,
  calculus: `<g stroke="${k.grid}" stroke-width=".5" opacity=".3">
    <path d="M17 9v33M25 9v33M33 9v33M9 16h32M9 25h32M9 34h32"/></g>`,
  bitcoin: `<path d="M4 44.4h40" stroke="${k.road}" stroke-width="3" stroke-linecap="round"/>`,
});
const INK = { spark: "#F0F6FA", wet: "#2E82C6", warmDot: "#F5B93C", soil: "#6E4229",
  line: "#2A2118", road: "#1C232E", dash: "#8A929C", grid: "#4A7FA8" };
const WORLD = worldFor(INK);
// Warm ground, because everything is standing in the same late light.
const WORLD_GOLD = worldFor({ ...INK, soil: "#7A4A26", line: "#3A2A1E", road: "#2A2634", spark: "#FFE9C4" });

// Every object casts its shadow the same way, to the right and long, because the sun is low
// and on the left. This is the single thing that makes thirty separate icons one afternoon.
const cast = (o = ".45") =>
  `<ellipse cx="30" cy="42.4" rx="14" ry="2.6" fill="#000" opacity="${o}" filter="url(#hr-soft)" transform="skewX(-22)"/>`;

// ---- 1. own: the incumbent, kept honest as a reference ------------------------------------
const own = build((id) => {
  const g = `ho-${id}`;
  let defs = "", body = WORLD[id];
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

// ---- 2. goldenhour: one low sun for the whole set ------------------------------------------
// The lit side goes toward the sun and the shade goes toward the sky, so shadows are blue and
// highlights are amber, which is what an hour before sunset actually does to colour. Habitat
// already had a sun beside the Earth and a glow under the fire; this makes them the system.
const goldenhour = build((id) => {
  const g = `hg-${id}`;
  let defs = "", body = WORLD_GOLD[id] + cast(".42");
  parts[id].forEach((p, i) => {
    const c = tone(id, p.tone), r = `${g}-${i}`;
    if (p.w) { body += draw(p, warm(c, .3)); return; }
    defs += `<linearGradient id="${r}" x1="0" y1=".15" x2="1" y2=".9">
      <stop offset="0" stop-color="${warm(c, .5)}"/><stop offset=".45" stop-color="${lighter(c, .1)}"/>
      <stop offset="1" stop-color="${cool(c, .42)}"/></linearGradient>`;
    body += draw(p, `url(#${r})`)
      + `<path d="${p.d}" stroke="${mix(SUNLIT, "#fff", .3)}" stroke-width=".9" fill="none"
          opacity=".55" clip-path="url(#hr-left)"/>`;
  });
  return box(body, `<defs>${defs}</defs>`);
});

// ---- 3. shadowbox: two physical planes with real air between them --------------------------
// The world is a sheet at the back, the thing is a sheet at the front, and the shadow one
// throws on the other is the only depth cue. Flat matte colour everywhere, because a cut
// piece of paper has no gradient. It is the most literal reading of "a thing in a place".
const shadowbox = build((id) => {
  let body = `<g opacity=".85">${WORLD[id]}</g>`;
  parts[id].forEach((p) => {
    const c = tone(id, p.tone);
    if (p.w) { body += draw(p, "#000", `opacity=".45" transform="translate(1.6 2.2)" filter="url(#hr-soft)"`) + draw(p, c); return; }
    body += draw(p, "#000", 'opacity=".5" transform="translate(1.8 2.4)" filter="url(#hr-soft)"')
      + draw(p, c)
      + draw(p, lighter(c, .18), 'transform="translate(-.5 -.6) scale(.9)" transform-origin="24 24" opacity=".5"');
  });
  return box(body);
});

// ---- 4. wash: one wet medium for the thing and its world -----------------------------------
// The complaint the other three cannot answer is that a piece of world looks pasted behind a
// sprite. Here both go through the same bleed, so the ground under the person and the person
// are made of the same wet pigment and the edge between them is where the water dried.
const wash = build((id) => {
  const g = `hw-${id}`;
  let defs = "", body = "";
  parts[id].forEach((p, i) => {
    const c = tone(id, p.tone), r = `${g}-${i}`;
    if (p.w) { body += draw(p, c, 'opacity=".9"'); return; }
    defs += `<radialGradient id="${r}" cx=".38" cy=".32" r=".95">
      <stop offset="0" stop-color="${lighter(c, .45)}"/><stop offset=".6" stop-color="${c}"/>
      <stop offset="1" stop-color="${darker(c, .18)}"/></radialGradient>`;
    body += draw(p, `url(#${r})`, 'opacity=".92"')
      + draw(p, darker(c, .35), 'opacity=".4" transform="translate(1 1.4) scale(.98)" transform-origin="24 24"');
  });
  return box(
    `<g filter="url(#hr-bleed)"><g opacity=".8">${WORLD[id]}</g>${body}</g>`,
    `<defs>${defs}</defs>`);
});

export const habitatR = { own, goldenhour, shadowbox, wash };
export const habitatRNotes = {
  own: "The incumbent, kept as reference. A modelled solid with a generic key light, inherited from clay rather than chosen for this job.",
  goldenhour: "One low sun for all thirty. Lit sides go toward amber, shaded sides toward blue sky, and every shadow falls the same way because there is only one light in the world. Habitat already had a sun beside the Earth and a glow under the fire; this turns those into the system instead of per-item tricks.",
  shadowbox: "Two physical planes with air between them. The world is a sheet at the back, the thing is a sheet at the front, and the shadow one throws on the other is the only depth cue. Flat matte colour, because cut paper has no gradient.",
  wash: "One wet medium for the thing and its world. The complaint the others cannot answer is that a piece of world looks pasted behind a sprite; here both go through the same bleed, so the ground and the person are the same pigment and the edge between them is where the water dried.",
};
export const HR_DEFS = `<svg width="0" height="0" style="position:absolute"><defs>
  <filter id="hr-soft" x="-60%" y="-60%" width="220%" height="220%"><feGaussianBlur stdDeviation="1.7"/></filter>
  <clipPath id="hr-left"><rect x="-4" y="-4" width="26" height="56"/></clipPath>
  <radialGradient id="hr-sun"><stop offset=".3" stop-color="#FFF7E0"/><stop offset="1" stop-color="#F5B93C" stop-opacity="0"/></radialGradient>
  <radialGradient id="hr-glow"><stop offset="0" stop-color="#F5B93C" stop-opacity=".5"/><stop offset="1" stop-color="#F5B93C" stop-opacity="0"/></radialGradient>
  <filter id="hr-bleed" x="-25%" y="-25%" width="150%" height="150%">
    <feGaussianBlur stdDeviation=".9" result="b"/>
    <feTurbulence type="fractalNoise" baseFrequency=".06" numOctaves="3" seed="13" result="n"/>
    <feDisplacementMap in="b" in2="n" scale="3.6" xChannelSelector="R" yChannelSelector="G" result="d"/>
    <feTurbulence type="fractalNoise" baseFrequency=".9" numOctaves="2" seed="4" result="g"/>
    <feColorMatrix in="g" type="saturate" values="0" result="gg"/>
    <feComponentTransfer in="gg" result="ga"><feFuncA type="linear" slope=".16"/></feComponentTransfer>
    <feComposite in="ga" in2="d" operator="in" result="grain"/>
    <feMerge><feMergeNode in="d"/><feMergeNode in="grain"/></feMerge>
  </filter>
</defs></svg>`;
export { subjects } from "./shapes.js";
