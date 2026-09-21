// Round 10. Cosmic and editorial won; screenprint and harper were rejected.
//
// What the two winners share: atmosphere and surface. One gets it from light and gradient,
// the other from grain and layered tone. Both keep the subject as a single object and both
// use a muted palette. What the two rejects share: flat vector, hard edges, bright poster
// colour, no texture anywhere.
//
// So the axis is read as texture and depth over flat graphic, and muted over saturated.
// These four all sit on that side of the line and spread from hand-made to screen-made:
//
//   oil       paint, on a dark ground, lit from one side
//   inkwash   pigment bleeding into paper, mostly paper
//   stipple   colour that only exists where enough dots agree
//   mesh      soft light with grain over it, the contemporary answer
//
// Every column renders the SAME parts and the SAME expected colours from shapes.js, so the
// medium is genuinely the only variable.
import { hues, parts } from "./shapes.js";

const box = (body, defs = "") => `<svg viewBox="0 0 48 48" fill="none" aria-hidden="true">${defs}${body}</svg>`;
const tone = (id, t) => hues[id][t] ?? hues[id].base;
// A part is a line when it carries a width, and a shape otherwise.
const draw = (p, fill, extra = "") =>
  p.w ? `<path d="${p.d}" stroke="${fill}" stroke-width="${p.w}" fill="none" stroke-linecap="round" stroke-linejoin="round" ${extra}/>`
      : `<path d="${p.d}" fill="${fill}" ${extra}/>`;

// ---- 1. oil: paint on a dark ground, lit from one side ---------------------------------
// Every shape is laid down three times: a dark underpainting offset into the shadow, the
// body, then a broken highlight on the lit side. That triple is what reads as paint rather
// than as a fill, and it is also how the thing was actually done for four hundred years.
const oil = (id) => {
  const h = hues[id];
  const body = parts[id].map((p) => {
    if (p.w) return draw(p, h.dark, 'opacity=".9" transform="translate(1.1 1.3)"') + draw(p, tone(id, p.tone));
    return [
      draw(p, h.dark, 'transform="translate(1.6 1.8)" opacity=".95"'),
      draw(p, tone(id, p.tone)),
      draw(p, h.light, 'transform="translate(-1 -1.2) scale(1)" opacity=".35" clip-path="url(#oil-lit)"'),
    ].join("");
  }).join("");
  return box(
    `<rect x="2" y="2" width="44" height="44" rx="7" fill="url(#oil-ground)"/>
     <g clip-path="url(#oil-tile)" filter="url(#oil-brush)">${body}</g>
     <rect x="2" y="2" width="44" height="44" rx="7" fill="url(#oil-veil)"/>`,
    `<defs>
      <clipPath id="oil-tile"><rect x="2" y="2" width="44" height="44" rx="7"/></clipPath>
      <clipPath id="oil-lit"><path d="M-6 -6h40L2 54h-8z"/></clipPath>
      <radialGradient id="oil-ground" cx=".34" cy=".28" r=".95">
        <stop offset="0" stop-color="#2A241E"/><stop offset="1" stop-color="#0E0B09"/></radialGradient>
      <radialGradient id="oil-veil" cx=".34" cy=".28" r=".9">
        <stop offset=".5" stop-color="#000" stop-opacity="0"/><stop offset="1" stop-color="#000" stop-opacity=".45"/></radialGradient>
    </defs>`);
};

// ---- 2. inkwash: pigment bleeding into paper, and mostly paper --------------------------
// The opposite bet to oil. A soft blurred wash carries the colour, a single darker
// concentrated pull gives it a wet edge, and a thin dry line does the structure. Most of the
// tile stays empty, which is the whole discipline.
const inkwash = (id) => {
  const h = hues[id];
  const wash = parts[id].map((p) =>
    p.w ? "" : draw(p, tone(id, p.tone), 'opacity=".55" transform="translate(-.6 -.8) scale(1.04)" transform-origin="24 24"')).join("");
  const pull = parts[id].map((p) =>
    p.w ? "" : draw(p, h.dark, 'opacity=".38" transform="translate(1.4 2) scale(.97)" transform-origin="24 24"')).join("");
  const line = parts[id].map((p) =>
    `<path d="${p.d}" stroke="${h.dark}" stroke-width="${p.w ?? 1}" fill="none" stroke-linecap="round" stroke-linejoin="round" opacity=".8"/>`).join("");
  return box(
    `<rect x="2" y="2" width="44" height="44" rx="7" fill="#EFE8D8"/>
     <g clip-path="url(#ink-tile)">
       <g filter="url(#ink-bleed)">${wash}${pull}</g>
       ${line}
     </g>`,
    `<defs>
      <clipPath id="ink-tile"><rect x="2" y="2" width="44" height="44" rx="7"/></clipPath>
      <filter id="ink-bleed" x="-25%" y="-25%" width="150%" height="150%">
        <feGaussianBlur stdDeviation="1.9" result="b"/>
        <feTurbulence type="fractalNoise" baseFrequency=".07" numOctaves="3" seed="11" result="n"/>
        <feDisplacementMap in="b" in2="n" scale="4.5" xChannelSelector="R" yChannelSelector="G"/>
      </filter>
    </defs>`);
};

// ---- 3. stipple: colour that only exists where enough dots agree ------------------------
// Seurat's argument, that the eye mixes two pigments more brightly than a palette does.
//
// Two implementation traps, both mine, both worth keeping written down. Loose circles
// scattered over the tile and then clipped give uniform density and therefore no form at all,
// so dots have to be a fill and not a sprinkle. And masking every part through one mask
// merges the accents into the body, which is how Bitcoin lost its glyph and the city lost its
// windows. Each part gets its own mask and its own three passes.
const stipple = (id) => {
  const h = hues[id];
  const g = `sp-${id}`;
  const dot = (pid, colour, r, off) =>
    `<pattern id="${pid}" width="2.6" height="2.6" patternUnits="userSpaceOnUse" patternTransform="translate(${off})">
       <circle cx="1.3" cy="1.3" r="${r}" fill="${colour}"/></pattern>`;
  let defs = "", body = "";
  parts[id].forEach((p, i) => {
    const m = `${g}-m${i}`, base = tone(id, p.tone);
    const shape = p.w
      ? `<path d="${p.d}" stroke="#fff" stroke-width="${p.w + 1.6}" fill="none" stroke-linecap="round" stroke-linejoin="round"/>`
      : `<path d="${p.d}" fill="#fff"/>`;
    defs += `<mask id="${m}">${shape}</mask>
      ${dot(`${m}-mid`, base, 1.05, "0 0")}${dot(`${m}-lit`, h.light, 0.85, "1.3 1.3")}`;
    body += `<g mask="url(#${m})">
        <rect x="0" y="0" width="48" height="48" fill="${h.dark}"/>
        <rect x="0" y="0" width="48" height="48" fill="url(#${m}-mid)"/>
        <rect x="0" y="0" width="48" height="48" fill="url(#${m}-lit)" mask="url(#${g}-light)"/>
      </g>`;
  });
  return box(
    `<rect x="2" y="2" width="44" height="44" rx="7" fill="#14151B"/>
     <g clip-path="url(#${g}-tile)">${body}</g>`,
    `<defs>
      <clipPath id="${g}-tile"><rect x="2" y="2" width="44" height="44" rx="7"/></clipPath>
      <linearGradient id="${g}-fall" x1=".1" y1="0" x2=".9" y2="1">
        <stop offset="0" stop-color="#fff"/><stop offset=".55" stop-color="#777"/><stop offset="1" stop-color="#000"/></linearGradient>
      <mask id="${g}-light"><rect x="0" y="0" width="48" height="48" fill="url(#${g}-fall)"/></mask>
      ${defs}
    </defs>`);
};

// ---- 4. mesh: soft light with grain over it --------------------------------------------
// The contemporary answer, and the closest thing to a straight cross of the two winners:
// cosmic's luminous blend with editorial's grain sitting on top of it. Shapes stay crisp;
// only the colour inside them is soft.
const mesh = (id) => {
  const h = hues[id];
  const gid = `me-${id}`;
  const body = parts[id].map((p, i) =>
    p.w ? draw(p, `url(#${gid}-l)`) : draw(p, `url(#${gid}-${i % 2 ? "b" : "a"})`)).join("");
  return box(
    `<rect x="2" y="2" width="44" height="44" rx="7" fill="url(#${gid}-bg)"/>
     <g clip-path="url(#${gid}-tile)">${body}</g>
     <rect x="2" y="2" width="44" height="44" rx="7" fill="#fff" opacity=".07" filter="url(#mesh-grain)"/>`,
    `<defs>
      <clipPath id="${gid}-tile"><rect x="2" y="2" width="44" height="44" rx="7"/></clipPath>
      <radialGradient id="${gid}-bg" cx=".3" cy=".25" r="1">
        <stop offset="0" stop-color="${h.dark}" stop-opacity=".55"/><stop offset="1" stop-color="#0B0C12"/></radialGradient>
      <linearGradient id="${gid}-a" x1=".15" y1="0" x2=".85" y2="1">
        <stop offset="0" stop-color="${h.light}"/><stop offset=".5" stop-color="${h.base}"/><stop offset="1" stop-color="${h.dark}"/></linearGradient>
      <linearGradient id="${gid}-b" x1=".85" y1="0" x2=".15" y2="1">
        <stop offset="0" stop-color="${h.accent}"/><stop offset="1" stop-color="${h.dark}"/></linearGradient>
      <linearGradient id="${gid}-l" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0" stop-color="${h.light}"/><stop offset="1" stop-color="${h.base}"/></linearGradient>
    </defs>`);
};

const build = (fn) => Object.fromEntries(Object.keys(parts).map((id) => [id, fn(id)]));
export const round10Styles = {
  oil: build(oil), inkwash: build(inkwash), stipple: build(stipple), mesh: build(mesh),
};
export const round10Notes = {
  oil: "Paint on a dark ground, lit from one side. Every shape is laid down three times: a dark underpainting pushed into the shadow, the body, then a broken highlight where the light lands. That triple is what reads as paint rather than as a fill.",
  inkwash: "The opposite bet. A soft blurred wash carries the colour, a darker pull gives it a wet edge, a thin dry line does the structure, and most of the tile stays empty. The discipline is how much paper is left alone.",
  stipple: "Colour that only exists where enough dots agree. Seurat's argument, that the eye mixes two pigments more brightly than a palette does. Density also gives shading for free, so a sphere turns without a gradient.",
  mesh: "Soft light with grain over it. The closest thing to a straight cross of the two winners: cosmic's luminous blend with editorial's grain on top. Shapes stay crisp and only the colour inside them is soft.",
};
export const MESH_DEFS = `<svg width="0" height="0" style="position:absolute"><defs>
  <filter id="mesh-grain" x="0" y="0" width="100%" height="100%">
    <feTurbulence type="fractalNoise" baseFrequency=".85" numOctaves="3" seed="3" result="n"/>
    <feColorMatrix in="n" type="saturate" values="0"/>
  </filter>
  <filter id="oil-brush" x="-15%" y="-15%" width="130%" height="130%">
    <feTurbulence type="fractalNoise" baseFrequency=".075" numOctaves="3" seed="6" result="n"/>
    <feDisplacementMap in="SourceGraphic" in2="n" scale="2.6" xChannelSelector="R" yChannelSelector="G"/>
  </filter>
</defs></svg>`;
export { subjects } from "./shapes.js";
