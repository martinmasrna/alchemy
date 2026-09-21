// Round 13. Clay won alone. Mosaic, embroidery and ceramic all lost, and they lost together:
// each of them put a repeating surface treatment in front of the form. Tesserae, stitches,
// crazing. Clay is the only one of the four where the form itself is the subject and the
// surface stays quiet.
//
// So this round holds clay's logic — a solid object, softly lit, no support, sitting on the
// dark card — and varies the one property that actually separates one solid from another:
// what light does when it arrives.
//
//   glass    light goes through, and bends on the way out
//   wax      light goes in, scatters, and comes back out somewhere else
//   felt     light stops dead; there is no specular anywhere
//   crystal  light bounces off flat planes that disagree with each other
//
// Materials that impose their own colour are excluded on the expected-colour rule, which is
// why there is no bronze, marble or wood here: a bronze Water is just a bronze thing.
//
// Clay's one failure is fixed in all four. Everything in an icon took the same light model,
// so the Bitcoin glyph and the Calculus curve sank into the body. Accents now get their own
// contrast rather than inheriting the form's.
import { hues, parts } from "./shapes.js";

const box = (body, defs = "") => `<svg viewBox="0 0 48 48" fill="none" aria-hidden="true">${defs}${body}</svg>`;
const tone = (id, t) => hues[id][t] ?? hues[id].base;
const draw = (p, fill, extra = "") =>
  p.w ? `<path d="${p.d}" stroke="${fill}" stroke-width="${p.w}" fill="none" stroke-linecap="round" stroke-linejoin="round" ${extra}/>`
      : `<path d="${p.d}" fill="${fill}" ${extra}/>`;
const shadow = (o = ".42") => `<ellipse cx="24" cy="43.4" rx="13.5" ry="2.4" fill="#000" opacity="${o}" filter="url(#r13-soft)"/>`;
// The clay lesson: a part that is meant to read as detail cannot share the body's light model.
const isDetail = (p) => p.tone === "accent" || p.tone === "light";

// Per-part tone ramps. The whole point of round 12's clay failure was that every part shared
// the body's light model; fixing that by painting details with the BODY's light tone was the
// same bug wearing a hat, and it turned Earth's green land pale blue. A part's ramp has to be
// built from that part's own colour.
const hex = (h) => [1, 3, 5].map((i) => parseInt(h.slice(i, i + 2), 16));
const mixTo = (c, t, target) => "#" + hex(c).map((v) => Math.round(v + (target - v) * t).toString(16).padStart(2, "0")).join("");
const lighter = (c, t) => mixTo(c, t, 255);
const darker = (c, t) => mixTo(c, t, 0);

// ---- 1. glass: light goes through, and bends on the way out -----------------------------
// The middle is the thinnest part so it is the brightest, the turned-away edge is the
// thickest so it is the most saturated, and a caustic lands on the surface underneath
// because that is where the light that went through has to end up.
const glass = (id) => {
  const h = hues[id];
  const g = `gl-${id}`;
  let defs = "", body = "";
  parts[id].forEach((p, i) => {
    const c = tone(id, p.tone), r = `${g}-${i}`;
    if (p.w) { body += draw(p, lighter(c, .35)); return; }
    defs += `<radialGradient id="${r}" cx=".42" cy=".36" r=".82">
      <stop offset="0" stop-color="${lighter(c, .62)}"/><stop offset=".55" stop-color="${c}"/>
      <stop offset="1" stop-color="${darker(c, .42)}"/></radialGradient>`;
    body += draw(p, `url(#${r})`, 'opacity=".92"')
      + draw(p, lighter(c, .8), 'opacity=".45" transform="scale(.6)" transform-origin="24 24" filter="url(#r13-soft)"')
      + draw(p, "#fff", 'opacity=".85" transform="translate(-2 -2.4) scale(.28)" transform-origin="24 24"');
  });
  return box(
    `<ellipse cx="25" cy="42.6" rx="10" ry="3" fill="${h.base}" opacity=".5" filter="url(#r13-soft)"/>
     ${shadow(".3")}${body}`, `<defs>${defs}</defs>`);
};

// ---- 2. wax: light goes in, scatters, comes back out somewhere else ---------------------
// Subsurface scattering, which is the reason a candle looks alive and a plastic candle does
// not. The glow sits inside the form rather than on it, the thin parts near the edge carry
// light they were never lit by, and there is no hard highlight anywhere.
const wax = (id) => {
  const g = `wx-${id}`;
  let defs = "", body = "";
  parts[id].forEach((p, i) => {
    const c = tone(id, p.tone), r = `${g}-${i}`;
    if (p.w) { body += draw(p, c); return; }
    defs += `<radialGradient id="${r}" cx=".36" cy=".3" r=".95">
      <stop offset="0" stop-color="${lighter(c, .5)}"/><stop offset=".5" stop-color="${c}"/>
      <stop offset="1" stop-color="${darker(c, .38)}"/></radialGradient>`;
    body += draw(p, lighter(c, .3), 'opacity=".5" filter="url(#r13-bleed)"')
      + draw(p, `url(#${r})`)
      + draw(p, lighter(c, .7), 'opacity=".6" transform="translate(-1.4 -2.2) scale(.5)" transform-origin="24 24" filter="url(#r13-soft)"');
  });
  return box(`${shadow(".34")}${body}`, `<defs>${defs}</defs>`);
};

// ---- 3. felt: light stops dead ----------------------------------------------------------
// The opposite extreme from ceramic, which is exactly why it is here. No specular at all,
// ever. Form has to come entirely from a soft gradient, and the silhouette is fuzzy because
// a fibre surface has no edge, only a place where there is less of it. Details are separate
// pieces of felt lying on top, each with its own small shadow.
const felt = (id) => {
  const g = `ft-${id}`;
  let defs = "", body = "";
  parts[id].forEach((p, i) => {
    const c = tone(id, p.tone), r = `${g}-${i}`;
    if (p.w) { body += draw(p, c); return; }
    defs += `<linearGradient id="${r}" x1=".2" y1="0" x2=".8" y2="1">
      <stop offset="0" stop-color="${lighter(c, .35)}"/><stop offset=".45" stop-color="${c}"/>
      <stop offset="1" stop-color="${darker(c, .34)}"/></linearGradient>`;
    body += draw(p, c, 'opacity=".7" transform="scale(1.06)" transform-origin="24 24" filter="url(#r13-fuzz)"')
      + (isDetail(p) ? draw(p, "#000", 'opacity=".3" transform="translate(.7 1.1)" filter="url(#r13-soft)"') : "")
      + draw(p, `url(#${r})`);
  });
  return box(`${shadow(".38")}<g filter="url(#r13-fibre)">${body}</g>`, `<defs>${defs}</defs>`);
};

// ---- 4. crystal: light bounces off flat planes that disagree ------------------------------
// The only faceted one. Form stops being a smooth turn and becomes a small argument between
// planes, so the shading is banded rather than graded and every highlight has a hard edge.
const crystal = (id) => {
  const g = `cr-${id}`;
  let defs = "", body = "";
  parts[id].forEach((p, i) => {
    const c = tone(id, p.tone), m = `${g}-m${i}`;
    defs += `<mask id="${m}">${p.w
      ? `<path d="${p.d}" stroke="#fff" stroke-width="${p.w + 1}" fill="none" stroke-linecap="round" stroke-linejoin="round"/>`
      : `<path d="${p.d}" fill="#fff"/>`}</mask>`;
    body += `<g mask="url(#${m})">
        <rect width="48" height="48" fill="${c}"/>
        <path d="M-8 -8h34L4 56h-12z" fill="${lighter(c, .5)}" opacity=".75"/>
        <path d="M26 -8h30v30L20 56z" fill="${darker(c, .45)}" opacity=".8"/>
        <path d="M14 -8h16l6 64H8z" fill="#fff" opacity=".18"/>
        <path d="M-8 31h64v25h-64z" fill="${darker(c, .35)}" opacity=".5"/>
      </g>`;
  });
  return box(`${shadow(".36")}${body}`, `<defs>${defs}</defs>`);
};

const build = (fn) => Object.fromEntries(Object.keys(parts).map((id) => [id, fn(id)]));
export const round13Styles = {
  glass: build(glass), wax: build(wax), felt: build(felt), crystal: build(crystal),
};
export const round13Notes = {
  glass: "Light goes through and bends on the way out. The middle is thinnest so it is brightest, the turned-away edge is thickest so it is most saturated, and a caustic lands underneath because the light that went through has to end up somewhere.",
  wax: "Light goes in, scatters, and comes back out somewhere else. Subsurface scattering is the reason a candle looks alive and a plastic candle does not. The glow sits inside the form rather than on it, and there is no hard highlight anywhere.",
  felt: "Light stops dead. The opposite extreme from ceramic, with no specular at all, ever. Form comes entirely from a soft gradient, and the silhouette is fuzzy because a fibre surface has no edge, only a place where there is less of it.",
  crystal: "Light bounces off flat planes that disagree with each other. The only faceted one: form stops being a smooth turn and becomes a small argument between planes, so shading is banded and every highlight has a hard edge.",
};
export const R13_DEFS = `<svg width="0" height="0" style="position:absolute"><defs>
  <filter id="r13-soft" x="-50%" y="-50%" width="200%" height="200%"><feGaussianBlur stdDeviation="1.8"/></filter>
  <filter id="r13-bleed" x="-50%" y="-50%" width="200%" height="200%"><feGaussianBlur stdDeviation="3.2"/></filter>
  <filter id="r13-fuzz" x="-50%" y="-50%" width="200%" height="200%"><feGaussianBlur stdDeviation="1.15"/></filter>
  <filter id="r13-fibre" x="-20%" y="-20%" width="140%" height="140%">
    <feTurbulence type="fractalNoise" baseFrequency="1.1" numOctaves="2" seed="14" result="n"/>
    <feColorMatrix in="n" type="saturate" values="0" result="g"/>
    <feComponentTransfer in="g" result="a"><feFuncA type="linear" slope=".2"/></feComponentTransfer>
    <feComposite in="a" in2="SourceGraphic" operator="in" result="fib"/>
    <feMerge><feMergeNode in="SourceGraphic"/><feMergeNode in="fib"/></feMerge>
  </filter>
</defs></svg>`;
export { subjects } from "./shapes.js";
