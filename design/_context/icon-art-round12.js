// Round 12. Gouache and woodcut won, and the note that came with them is the important one:
// they are the same thing in dark mode and light mode. Opaque colour, textured edge, flat
// form. Two rounds of picking two from four had quietly narrowed the search into sub-classes
// of paint-on-a-surface, which is a property of the process rather than anybody's mistake.
//
// So this round deliberately widens. What carries forward is the constraints, not the family:
// expected colour, twelve subjects including scenes and things with no appearance, beauty
// worth celebrating, and a support only where it is earned.
//
// What changes is the material logic. None of these four is a way of applying pigment:
//
//   clay        one solid thing, modelled, lit
//   mosaic      an image that only exists because separate pieces are next to each other
//   embroidery  thread pulled through cloth
//   ceramic     a fired glass skin, which is the only glossy surface anyone has seen yet
import { hues, parts } from "./shapes.js";

const box = (body, defs = "") => `<svg viewBox="0 0 48 48" fill="none" aria-hidden="true">${defs}${body}</svg>`;
const tone = (id, t) => hues[id][t] ?? hues[id].base;
const draw = (p, fill, extra = "") =>
  p.w ? `<path d="${p.d}" stroke="${fill}" stroke-width="${p.w}" fill="none" stroke-linecap="round" stroke-linejoin="round" ${extra}/>`
      : `<path d="${p.d}" fill="${fill}" ${extra}/>`;
const tile = (fill) => `<rect x="2" y="2" width="44" height="44" rx="7" fill="${fill}"/>`;

// ---- 1. clay: one solid thing, modelled and lit -----------------------------------------
// Not a picture of a thing, a small object of it. Form comes from a single light source high
// and left, a soft core shadow opposite, and a contact shadow underneath, which is the whole
// reason it reads as something you could pick up. Matte, so no highlight is ever sharp.
const clay = (id) => {
  const h = hues[id];
  const g = `cl-${id}`;
  const body = parts[id].map((p, i) => {
    if (p.w) return draw(p, `url(#${g}-lit)`);
    return [
      draw(p, h.dark, 'opacity=".55" transform="translate(1.1 1.6)" filter="url(#r12-soft)"'),
      draw(p, `url(#${g}-form)`),
      draw(p, h.light, `opacity=".5" transform="translate(-1.6 -2) scale(.7)" transform-origin="24 24" filter="url(#r12-soft)"`),
    ].join("");
  }).join("");
  return box(
    `<ellipse cx="24" cy="43" rx="14" ry="2.6" fill="#000" opacity=".4" filter="url(#r12-soft)"/>
     ${body}`,
    `<defs>
      <radialGradient id="${g}-form" cx=".33" cy=".26" r=".95">
        <stop offset="0" stop-color="${h.light}"/><stop offset=".45" stop-color="${h.base}"/>
        <stop offset="1" stop-color="${h.dark}"/></radialGradient>
      <linearGradient id="${g}-lit" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0" stop-color="${h.light}"/><stop offset="1" stop-color="${h.base}"/></linearGradient>
    </defs>`);
};

// ---- 2. mosaic: an image that only exists because pieces sit next to each other ----------
// The picture is quantised before it is drawn, and the grout between the pieces is part of
// the picture rather than a gap in it. Nothing here is a brush mark; every edge is a stair.
// Three tile passes at different phases give the colour variation a real mosaic has.
const mosaic = (id) => {
  const h = hues[id];
  const g = `mo-${id}`;
  const tess = (pid, colour, size, off, o) =>
    `<pattern id="${pid}" width="4" height="4" patternUnits="userSpaceOnUse" patternTransform="translate(${off})">
       <rect x="${(4 - size) / 2}" y="${(4 - size) / 2}" width="${size}" height="${size}" rx=".5" fill="${colour}" opacity="${o}"/></pattern>`;
  let defs = "", body = "";
  parts[id].forEach((p, i) => {
    const m = `${g}-m${i}`, base = tone(id, p.tone);
    const shape = p.w
      ? `<path d="${p.d}" stroke="#fff" stroke-width="${p.w + 2}" fill="none" stroke-linecap="round" stroke-linejoin="round"/>`
      : `<path d="${p.d}" fill="#fff"/>`;
    defs += `<mask id="${m}">${shape}</mask>
      ${tess(`${m}-a`, base, 3.2, "0 0", "1")}
      ${tess(`${m}-b`, h.light, 3.2, "2 2", ".55")}
      ${tess(`${m}-c`, h.dark, 3.2, "2 0", ".5")}`;
    body += `<g mask="url(#${m})">
        <rect x="0" y="0" width="48" height="48" fill="#241F1A"/>
        <rect x="0" y="0" width="48" height="48" fill="url(#${m}-a)"/>
        <rect x="0" y="0" width="48" height="48" fill="url(#${m}-b)" mask="url(#${g}-fall)"/>
        <rect x="0" y="0" width="48" height="48" fill="url(#${m}-c)" mask="url(#${g}-rise)"/>
      </g>`;
  });
  return box(body,
    `<defs>
      <linearGradient id="${g}-f" x1=".1" y1="0" x2=".9" y2="1">
        <stop offset="0" stop-color="#fff"/><stop offset="1" stop-color="#000"/></linearGradient>
      <linearGradient id="${g}-r" x1=".9" y1="1" x2=".1" y2="0">
        <stop offset="0" stop-color="#fff"/><stop offset="1" stop-color="#000"/></linearGradient>
      <mask id="${g}-fall"><rect width="48" height="48" fill="url(#${g}-f)"/></mask>
      <mask id="${g}-rise"><rect width="48" height="48" fill="url(#${g}-r)"/></mask>
      ${defs}
    </defs>`);
};

// ---- 3. embroidery: thread pulled through cloth ------------------------------------------
// The cloth is drawn because thread cannot exist without it, which is the same argument the
// print made for its paper. Fill is satin stitch running one way, the outline is a chain of
// separate stitches, and the weave shows through everywhere the thread is not.
const embroidery = (id) => {
  const h = hues[id];
  const g = `em-${id}`;
  const stitch = (pid, colour, angle, o) =>
    `<pattern id="${pid}" width="3" height="3" patternUnits="userSpaceOnUse" patternTransform="rotate(${angle})">
       <rect x="0" y=".55" width="3" height="1.5" rx=".75" fill="${colour}" opacity="${o}"/></pattern>`;
  let defs = "", body = "";
  parts[id].forEach((p, i) => {
    const m = `${g}-m${i}`, base = tone(id, p.tone);
    const shape = p.w
      ? `<path d="${p.d}" stroke="#fff" stroke-width="${p.w + 1.4}" fill="none" stroke-linecap="round" stroke-linejoin="round"/>`
      : `<path d="${p.d}" fill="#fff"/>`;
    defs += `<mask id="${m}">${shape}</mask>
      ${stitch(`${m}-a`, base, 32 + i * 9, "1")}
      ${stitch(`${m}-b`, h.light, 32 + i * 9, ".45")}`;
    body += `<g mask="url(#${m})">
        <rect x="0" y="0" width="48" height="48" fill="${h.dark}" opacity=".85"/>
        <rect x="0" y="0" width="48" height="48" fill="url(#${m}-a)"/>
        <rect x="0" y="0" width="48" height="48" fill="url(#${m}-b)" mask="url(#${g}-fall)"/>
      </g>`;
    body += p.w ? "" :
      `<path d="${p.d}" stroke="${h.dark}" stroke-width="1.1" fill="none" stroke-dasharray="1.6 1.2" stroke-linecap="round" opacity=".85"/>`;
  });
  return box(
    `${tile("#E6DCC6")}${tile("url(#r12-weave)")}
     <g clip-path="url(#r12-clip)">${body}</g>`,
    `<defs>
      <linearGradient id="${g}-f" x1=".15" y1="0" x2=".85" y2="1">
        <stop offset="0" stop-color="#fff"/><stop offset="1" stop-color="#000"/></linearGradient>
      <mask id="${g}-fall"><rect width="48" height="48" fill="url(#${g}-f)"/></mask>
      ${defs}
    </defs>`);
};

// ---- 4. ceramic: a fired glass skin ------------------------------------------------------
// The one glossy surface in this whole search. Everything so far has been matte, luminous or
// printed; none of it reflects anything. Glaze pools darker where the form turns away, holds
// a hard specular where it does not, and crazes finely all over because it always does.
const ceramic = (id) => {
  const h = hues[id];
  const g = `ce-${id}`;
  const body = parts[id].map((p) => {
    if (p.w) return draw(p, `url(#${g}-glz)`);
    return [
      draw(p, h.dark),
      draw(p, `url(#${g}-glz)`, 'transform="scale(.955)" transform-origin="24 24"'),
      draw(p, "#fff", 'opacity=".55" transform="translate(-2.2 -2.6) scale(.5)" transform-origin="24 24" filter="url(#r12-soft)"'),
    ].join("");
  }).join("");
  return box(
    `<g>${body}</g>
     <g mask="url(#${g}-skin)">
       <path d="M8 12q7 5 14 2t18 3M5 26q9-4 17 1t22-2M11 39q8-6 16-2t17-3M17 5v38M31 4v40M23 6v36"
         stroke="#fff" stroke-width=".35" fill="none" opacity=".5"/>
     </g>`,
    `<defs>
      <radialGradient id="${g}-glz" cx=".32" cy=".24" r="1">
        <stop offset="0" stop-color="${h.light}"/><stop offset=".4" stop-color="${h.base}"/>
        <stop offset=".85" stop-color="${h.base}"/><stop offset="1" stop-color="${h.dark}"/></radialGradient>
      <mask id="${g}-skin">${parts[id].map((p) => p.w
        ? `<path d="${p.d}" stroke="#fff" stroke-width="${p.w}" fill="none"/>`
        : `<path d="${p.d}" fill="#fff"/>`).join("")}</mask>
    </defs>`);
};

const build = (fn) => Object.fromEntries(Object.keys(parts).map((id) => [id, fn(id)]));
export const round12Styles = {
  clay: build(clay), mosaic: build(mosaic), embroidery: build(embroidery), ceramic: build(ceramic),
};
export const round12Notes = {
  clay: "Not a picture of a thing but a small object of it. One light high and left, a soft core shadow opposite, a contact shadow underneath. Matte, so no highlight is ever sharp, and no support because the thing simply sits on the card.",
  mosaic: "An image that only exists because separate pieces sit next to each other. The picture is quantised before it is drawn and the grout is part of it rather than a gap in it. Every edge is a stair; nothing is a brush mark.",
  embroidery: "Thread pulled through cloth, so the cloth is drawn. Satin stitch running one way for the fill, a chain of separate stitches for the outline, and the weave showing through everywhere the thread is not.",
  ceramic: "A fired glass skin, and the only glossy surface in this entire search. Glaze pools darker where the form turns away, holds a hard specular where it does not, and crazes finely all over because it always does.",
};
export const R12_DEFS = `<svg width="0" height="0" style="position:absolute"><defs>
  <clipPath id="r12-clip"><rect x="2" y="2" width="44" height="44" rx="7"/></clipPath>
  <filter id="r12-soft" x="-40%" y="-40%" width="180%" height="180%">
    <feGaussianBlur stdDeviation="1.7"/></filter>
  <pattern id="r12-weave" width="2.4" height="2.4" patternUnits="userSpaceOnUse">
    <rect width="2.4" height="1.2" fill="#000" opacity=".045"/>
    <rect width="1.2" height="2.4" fill="#fff" opacity=".05"/>
  </pattern>
</defs></svg>`;
export { subjects } from "./shapes.js";
