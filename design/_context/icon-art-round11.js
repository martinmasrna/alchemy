// Round 11. Oil and inkwash won; stipple and mesh were rejected.
//
// The two winners are both physical media: a tool, a liquid, and pigment behaving the way
// pigment behaves. The two rejects are both systematic textures a machine makes, a dot grid
// and a gradient with noise over it, neither of which carries the mark of anything.
// So the axis now reads as hand and material over system.
//
// Second note, and it applies to every column: a support has to earn its place. A near-black
// tile on an already dark card is just a darker square. Here a tile exists only when the
// medium implies one — paper for a print, plaster for a fresco, toned ground for pastel —
// and gouache gets none at all, because opaque paint does not need its support shown.
import { hues, parts } from "./shapes.js";

const box = (body, defs = "") => `<svg viewBox="0 0 48 48" fill="none" aria-hidden="true">${defs}${body}</svg>`;
const tone = (id, t) => hues[id][t] ?? hues[id].base;
const draw = (p, fill, extra = "") =>
  p.w ? `<path d="${p.d}" stroke="${fill}" stroke-width="${p.w}" fill="none" stroke-linecap="round" stroke-linejoin="round" ${extra}/>`
      : `<path d="${p.d}" fill="${fill}" ${extra}/>`;
const tile = (fill) => `<rect x="2" y="2" width="44" height="44" rx="7" fill="${fill}"/>`;
const clip = (id) => `<clipPath id="${id}"><rect x="2" y="2" width="44" height="44" rx="7"/></clipPath>`;
// Mix two hex colours, for supports that are derived from the subject rather than invented.
const mix = (a, b, t) => {
  const p = (h) => [1, 3, 5].map((i) => parseInt(h.slice(i, i + 2), 16));
  const [x, y] = [p(a), p(b)];
  return "#" + x.map((v, i) => Math.round(v + (y[i] - v) * t).toString(16).padStart(2, "0")).join("");
};

// ---- 1. gouache: opaque body colour, and no support at all -----------------------------
// Gouache is paint that hides what is under it, so there is nothing to show. The icon sits
// straight on the card. Matte, chalky at the edges, and every shape carries two brush marks
// that do not quite follow its outline, because a loaded brush never does.
const gouache = (id) => {
  const h = hues[id];
  const body = parts[id].map((p) => {
    if (p.w) return draw(p, tone(id, p.tone));
    return [
      draw(p, tone(id, p.tone)),
      draw(p, h.dark, 'opacity=".5" transform="translate(1.4 1.6) scale(.94)" transform-origin="24 24"'),
      draw(p, h.light, 'opacity=".45" transform="translate(-1.2 -1.4) scale(.82)" transform-origin="24 24"'),
    ].join("");
  }).join("");
  return box(`<g filter="url(#r11-chalk)">${body}</g>`);
};

// ---- 2. woodcut: carved, inked, pressed onto paper --------------------------------------
// The support is the point here: a print is ink sitting on a sheet, so the sheet is drawn.
// Each ink is pulled separately and never lands quite where the last one did, and the cut
// edge is ragged because a gouge is a blade in wood, not a pen.
const woodcut = (id) => {
  const h = hues[id];
  const ink = (colour, dx, dy, o) => parts[id]
    .map((p) => draw(p, colour, `opacity="${o}" transform="translate(${dx} ${dy})"`))
    .join("");
  return box(
    `${tile("#E9DFC8")}
     <g clip-path="url(#r11-wc)" filter="url(#r11-cut)">
       ${ink(h.dark, 0.9, 1.1, ".9")}
       ${ink(tone(id, "base"), -0.5, -0.6, ".92")}
       ${parts[id].filter((p) => p.tone === "light" || p.tone === "accent")
          .map((p) => draw(p, p.tone === "accent" ? h.accent : h.light, 'opacity=".9"')).join("")}
     </g>
     ${tile("url(#r11-sheet)")}`,
    `<defs>${clip("r11-wc")}
      <linearGradient id="r11-sheet" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0" stop-color="#fff" stop-opacity=".07"/><stop offset="1" stop-color="#7A6A4E" stop-opacity=".07"/></linearGradient>
    </defs>`);
};

// ---- 3. pastel: dry pigment dragged over toned paper -------------------------------------
// The support is derived rather than invented: the ground is the subject's own dark tone
// pulled most of the way to a warm grey, which is exactly how a pastellist picks a paper.
// Colour sits in the tooth of it, so nothing is ever solid and nothing has a hard edge.
const pastel = (id) => {
  const h = hues[id];
  const ground = mix(h.dark, "#6E665C", 0.72);
  const body = parts[id].map((p) => {
    if (p.w) return draw(p, tone(id, p.tone), 'opacity=".92"');
    return [
      draw(p, tone(id, p.tone), 'opacity=".95"'),
      draw(p, h.light, 'opacity=".55" transform="translate(-1.3 -1.5) scale(.8)" transform-origin="24 24"'),
      draw(p, h.dark, 'opacity=".4" transform="translate(1.5 1.8) scale(.9)" transform-origin="24 24"'),
    ].join("");
  }).join("");
  return box(
    `${tile(ground)}
     <g clip-path="url(#r11-ps)" filter="url(#r11-tooth)">${body}</g>
     ${tile("url(#r11-grain-ov)")}`,
    `<defs>${clip("r11-ps")}
      <linearGradient id="r11-grain-ov" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0" stop-color="#fff" stop-opacity=".05"/><stop offset="1" stop-color="#000" stop-opacity=".12"/></linearGradient>
    </defs>`);
};

// ---- 4. fresco: earth pigment into wet plaster ------------------------------------------
// The oldest of the four and the one that suits a game called Alchemy. Pigment goes into the
// wall rather than onto it, so nothing is saturated and nothing is crisp. A colour matrix
// pulls every hue toward earth, and the shapes are eroded so some of the wall shows through.
const fresco = (id) => {
  const body = parts[id].map((p) => draw(p, tone(id, p.tone))).join("");
  return box(
    `${tile("#E4D9C2")}
     <g clip-path="url(#r11-fr)">
       <g filter="url(#r11-plaster)" mask="url(#r11-erode)">${body}</g>
       <path d="M6 14q9 3 16-1t20 4M9 38q10-5 18-1t14-2M22 4v12M33 30v14" stroke="#A8977A"
         stroke-width=".5" fill="none" opacity=".45"/>
     </g>`,
    `<defs>${clip("r11-fr")}</defs>`);
};

const build = (fn) => Object.fromEntries(Object.keys(parts).map((id) => [id, fn(id)]));
export const round11Styles = {
  gouache: build(gouache), woodcut: build(woodcut), pastel: build(pastel), fresco: build(fresco),
};
export const round11Notes = {
  gouache: "Opaque body colour, and no support at all: gouache hides what is under it, so there is nothing to show and the icon sits straight on the card. Matte, chalky at the edges, two brush marks per shape that do not quite follow its outline.",
  woodcut: "Carved, inked and pressed onto a sheet, so the sheet is drawn. Each ink is pulled separately and never lands quite where the last one did, and the cut edge is ragged because a gouge is a blade in wood.",
  pastel: "Dry pigment dragged over toned paper. The ground is derived rather than invented: the subject's own dark tone pulled most of the way to a warm grey, which is how a pastellist picks a sheet. Nothing is solid, nothing has a hard edge.",
  fresco: "Earth pigment taken into wet plaster rather than laid on it. Nothing saturated, nothing crisp, every hue pulled toward earth, and the shapes eroded so some of the wall comes through. The oldest of the four, and apt for a game called Alchemy.",
};
export const R11_DEFS = `<svg width="0" height="0" style="position:absolute"><defs>
  <filter id="r11-chalk" x="-20%" y="-20%" width="140%" height="140%">
    <feTurbulence type="fractalNoise" baseFrequency=".09" numOctaves="3" seed="21" result="n"/>
    <feDisplacementMap in="SourceGraphic" in2="n" scale="2.2" xChannelSelector="R" yChannelSelector="G" result="d"/>
    <feTurbulence type="fractalNoise" baseFrequency="1.4" numOctaves="2" seed="8" result="g"/>
    <feColorMatrix in="g" type="saturate" values="0" result="gg"/>
    <feComponentTransfer in="gg" result="ga"><feFuncA type="linear" slope=".18"/></feComponentTransfer>
    <feComposite in="ga" in2="d" operator="in" result="grain"/>
    <feMerge><feMergeNode in="d"/><feMergeNode in="grain"/></feMerge>
  </filter>
  <filter id="r11-cut" x="-20%" y="-20%" width="140%" height="140%">
    <feTurbulence type="turbulence" baseFrequency=".28" numOctaves="2" seed="4" result="n"/>
    <feDisplacementMap in="SourceGraphic" in2="n" scale="1.7" xChannelSelector="R" yChannelSelector="G"/>
  </filter>
  <filter id="r11-tooth" x="-20%" y="-20%" width="140%" height="140%">
    <feTurbulence type="fractalNoise" baseFrequency=".14" numOctaves="4" seed="17" result="n"/>
    <feDisplacementMap in="SourceGraphic" in2="n" scale="3" xChannelSelector="R" yChannelSelector="G" result="d"/>
    <feTurbulence type="fractalNoise" baseFrequency=".9" numOctaves="3" seed="2" result="t"/>
    <feColorMatrix in="t" type="saturate" values="0" result="tt"/>
    <feComponentTransfer in="tt" result="ta"><feFuncA type="linear" slope=".32"/></feComponentTransfer>
    <feComposite in="ta" in2="d" operator="in" result="tooth"/>
    <feMerge><feMergeNode in="d"/><feMergeNode in="tooth"/></feMerge>
  </filter>
  <filter id="r11-plaster" x="-20%" y="-20%" width="140%" height="140%">
    <feTurbulence type="fractalNoise" baseFrequency=".1" numOctaves="3" seed="31" result="n"/>
    <feDisplacementMap in="SourceGraphic" in2="n" scale="2.4" xChannelSelector="R" yChannelSelector="G" result="d"/>
    <feColorMatrix in="d" type="matrix"
      values="0.80 0.16 0.04 0 0  0.12 0.78 0.06 0 0.01  0.08 0.14 0.72 0 0.02  0 0 0 1 0"/>
  </filter>
  <mask id="r11-erode">
    <rect x="0" y="0" width="48" height="48" fill="#fff"/>
    <g filter="url(#r11-flake)"><rect x="0" y="0" width="48" height="48" fill="#fff"/></g>
  </mask>
  <filter id="r11-flake">
    <feTurbulence type="fractalNoise" baseFrequency=".22" numOctaves="3" seed="9" result="n"/>
    <feColorMatrix in="n" type="matrix"
      values="0 0 0 0 1  0 0 0 0 1  0 0 0 0 1  0.55 0 0 0 -0.06"/>
  </filter>
</defs></svg>`;
export { subjects } from "./shapes.js";
