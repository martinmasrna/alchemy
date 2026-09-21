// Round 14. Glass and wax won; felt and crystal lost.
//
// Felt stops light dead and crystal bounces it off flat planes. Glass and wax both let light
// INTO the material and give it back changed. So the property being selected for is
// translucency and internal light.
//
// The risk, named out loud: that is two narrowing rounds in a row, and glass and wax already
// converge at 34px. Four grades of glow would be exactly the sub-class problem from round 12.
// So all four here are translucent and lit from within, and what varies is the structural
// relationship between the form and the light, which is a real difference and not a dial:
//
//   lantern  the form is an opaque shell and the light is inside it
//   liquid   there is no surface at all; form is only where the pigment is dense
//   gel      a soft translucent body with a real skin and surface tension
//   plasma   the light IS the material; the form is where the gas is contained
import { hues, parts } from "./shapes.js";

const box = (body, defs = "") => `<svg viewBox="0 0 48 48" fill="none" aria-hidden="true">${defs}${body}</svg>`;
const tone = (id, t) => hues[id][t] ?? hues[id].base;
const draw = (p, fill, extra = "") =>
  p.w ? `<path d="${p.d}" stroke="${fill}" stroke-width="${p.w}" fill="none" stroke-linecap="round" stroke-linejoin="round" ${extra}/>`
      : `<path d="${p.d}" fill="${fill}" ${extra}/>`;
const line = (p, colour, w, extra = "") =>
  `<path d="${p.d}" stroke="${colour}" stroke-width="${w}" fill="none" stroke-linecap="round" stroke-linejoin="round" ${extra}/>`;
const shadow = (o) => `<ellipse cx="24" cy="43.4" rx="13" ry="2.3" fill="#000" opacity="${o}" filter="url(#r14-soft)"/>`;
// Every part's ramp is built from that part's own colour. Round 13 proved twice that sharing
// the body's tones is how details disappear.
const hx = (h) => [1, 3, 5].map((i) => parseInt(h.slice(i, i + 2), 16));
const mixTo = (c, t, target) => "#" + hx(c).map((v) => Math.round(v + (target - v) * t).toString(16).padStart(2, "0")).join("");
const lighter = (c, t) => mixTo(c, t, 255);
const darker = (c, t) => mixTo(c, t, 0);

// ---- 1. lantern: an opaque shell with the light inside it --------------------------------
// The only one where the form itself is dark. Light escapes at the rim, bleeds through where
// the shell is thin, and throws a halo onto the card. The object is not lit; it is a lamp.
const lantern = (id) => {
  let body = "";
  parts[id].forEach((p) => {
    const c = tone(id, p.tone);
    if (p.w) { body += line(p, lighter(c, .55), p.w); return; }
    body += draw(p, lighter(c, .45), 'opacity=".55" transform="scale(1.1)" transform-origin="24 24" filter="url(#r14-halo)"')
      + draw(p, darker(c, .62))
      + draw(p, lighter(c, .35), 'opacity=".5" transform="scale(.62)" transform-origin="24 24" filter="url(#r14-soft)"')
      + line(p, lighter(c, .7), 1.1, 'opacity=".95"');
  });
  return box(`${shadow(".3")}${body}`);
};

// ---- 2. liquid: no surface at all ---------------------------------------------------------
// Ink going into water. There is no skin anywhere, so the form exists only as a gradient of
// concentration: dense in the middle, thinning outward, with a wisp or two that has drifted
// off the shape entirely. The most fragile of the four and the least like an icon.
const liquid = (id) => {
  let body = "";
  parts[id].forEach((p) => {
    const c = tone(id, p.tone);
    if (p.w) { body += line(p, c, p.w + 2.5, 'opacity=".45" filter="url(#r14-diffuse)"') + line(p, lighter(c, .3), p.w, 'opacity=".9" filter="url(#r14-soft)"'); return; }
    body += draw(p, c, 'opacity=".4" transform="scale(1.18)" transform-origin="24 24" filter="url(#r14-diffuse)"')
      + draw(p, c, 'opacity=".6" transform="scale(1.02)" transform-origin="24 24" filter="url(#r14-bloom)"')
      + draw(p, lighter(c, .35), 'opacity=".85" transform="scale(.78)" transform-origin="24 24" filter="url(#r14-soft)"')
      + draw(p, lighter(c, .7), 'opacity=".75" transform="translate(-1.2 -1.6) scale(.42)" transform-origin="24 24" filter="url(#r14-soft)"');
  });
  return box(body);
};

// ---- 3. gel: a translucent body with a real skin ------------------------------------------
// Where liquid has no surface, this one is mostly surface: a bright taut rim all the way
// round, two wobbling speculars that sit on top rather than inside, and a body you can see
// the card faintly through. Soft, heavy, and slightly squashed by its own weight.
const gel = (id) => {
  const g = `gl-${id}`;
  let defs = "", body = "";
  parts[id].forEach((p, i) => {
    const c = tone(id, p.tone), r = `${g}-${i}`;
    if (p.w) { body += line(p, lighter(c, .3), p.w, 'opacity=".9"'); return; }
    defs += `<radialGradient id="${r}" cx=".38" cy=".3" r=".9">
      <stop offset="0" stop-color="${lighter(c, .45)}" stop-opacity=".95"/>
      <stop offset=".62" stop-color="${c}" stop-opacity=".8"/>
      <stop offset="1" stop-color="${darker(c, .25)}" stop-opacity=".92"/></radialGradient>`;
    body += draw(p, `url(#${r})`)
      + line(p, lighter(c, .75), 1.3, 'opacity=".8"')
      + draw(p, "#fff", 'opacity=".55" transform="translate(-2.4 -3) scale(.26)" transform-origin="24 24" filter="url(#r14-soft)"')
      + draw(p, "#fff", 'opacity=".3" transform="translate(3 3.4) scale(.16)" transform-origin="24 24" filter="url(#r14-soft)"');
  });
  return box(`${shadow(".26")}<g transform="translate(0 .6) scale(1 .985)" transform-origin="24 24">${body}</g>`,
    `<defs>${defs}</defs>`);
};

// ---- 4. plasma: the light is the material --------------------------------------------------
// Gas held in a shape and excited until it emits. Brightest at the boundary where the field
// is strongest, thinner through the middle, with filaments crossing it. Nothing here is a
// surface or a pigment: the only thing present is emission.
const plasma = (id) => {
  const g = `pl-${id}`;
  let defs = "", body = "";
  parts[id].forEach((p, i) => {
    const c = tone(id, p.tone), m = `${g}-m${i}`;
    const shape = p.w
      ? `<path d="${p.d}" stroke="#fff" stroke-width="${p.w + 1.5}" fill="none" stroke-linecap="round" stroke-linejoin="round"/>`
      : `<path d="${p.d}" fill="#fff"/>`;
    defs += `<mask id="${m}">${shape}</mask>`;
    body += draw(p, c, 'opacity=".5" transform="scale(1.06)" transform-origin="24 24" filter="url(#r14-halo)"')
      + `<g mask="url(#${m})">
          <rect width="48" height="48" fill="${darker(c, .45)}" opacity=".8"/>
          <g filter="url(#r14-soft)">
            <path d="M2 14q12 6 22 0t22 3M2 27q10-7 23-1t21-2M4 38q11 5 20-1t20 2" stroke="${lighter(c, .55)}"
              stroke-width="1.5" fill="none" opacity=".75"/>
          </g>
        </g>`
      + line(p, lighter(c, .85), p.w ? p.w : 1.6, 'opacity=".95" filter="url(#r14-soft)"')
      + line(p, "#fff", p.w ? p.w * .6 : .9, 'opacity=".9"');
  });
  return box(body, `<defs>${defs}</defs>`);
};

const build = (fn) => Object.fromEntries(Object.keys(parts).map((id) => [id, fn(id)]));
export const round14Styles = {
  lantern: build(lantern), liquid: build(liquid), gel: build(gel), plasma: build(plasma),
};
export const round14Notes = {
  lantern: "The form is an opaque shell and the light is inside it. The only one where the body itself is dark: light escapes at the rim, bleeds through where the shell is thin, and throws a halo onto the card. The object is not lit, it is a lamp.",
  liquid: "No surface anywhere. Ink going into water, so form exists only as a gradient of concentration: dense in the middle, thinning outward, with a wisp that has drifted off the shape entirely.",
  gel: "Where liquid has no surface, this is mostly surface. A bright taut rim all the way round, two wobbling speculars sitting on top rather than inside, and a body you can faintly see the card through. Heavy, and slightly squashed by its own weight.",
  plasma: "The light is the material. Gas held in a shape and excited until it emits: brightest at the boundary where the field is strongest, thinner through the middle, filaments crossing it. No surface and no pigment, only emission.",
};
export const R14_DEFS = `<svg width="0" height="0" style="position:absolute"><defs>
  <filter id="r14-soft" x="-60%" y="-60%" width="220%" height="220%"><feGaussianBlur stdDeviation="1.7"/></filter>
  <filter id="r14-halo" x="-70%" y="-70%" width="240%" height="240%"><feGaussianBlur stdDeviation="3.4"/></filter>
  <filter id="r14-bloom" x="-60%" y="-60%" width="220%" height="220%"><feGaussianBlur stdDeviation="2.4"/></filter>
  <filter id="r14-diffuse" x="-80%" y="-80%" width="260%" height="260%">
    <feGaussianBlur stdDeviation="3.6" result="b"/>
    <feTurbulence type="fractalNoise" baseFrequency=".06" numOctaves="3" seed="23" result="n"/>
    <feDisplacementMap in="b" in2="n" scale="7" xChannelSelector="R" yChannelSelector="G"/>
  </filter>
</defs></svg>`;
export { subjects } from "./shapes.js";
