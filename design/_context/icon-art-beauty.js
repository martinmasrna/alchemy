// Round 8. The brief changed at the root: the game is a celebration of the beauty of the
// Universe, Nature and consciousness.
//
// That rules out everything competent-and-neutral. Glass was clean, and clean is a UI value.
// Beautiful is an art value, and it is the product here rather than the decoration on it.
// Reverence is allowed now. It is, in fact, the point.
//
// Four traditions that exist BECAUSE someone wanted to celebrate something. Not four
// rendering techniques: four bodies of work with a reason. Three are ornamental and one is
// sublime-realist, which is the real fork underneath.
//
// Colour still obeys round 7: a thing is the colour a person expects it to be.
// The three nouns are also the three prologue worlds, so a style that can only do space is
// disqualified however good it looks here. Organic form is a first-class test, not a later one.

const A = (body, defs = "") => `<svg viewBox="0 0 48 48" fill="none" aria-hidden="true">${defs}${body}</svg>`;
// Radial repetition, which is what nearly all ornament is made of.
const radial = (n, body, cx = 24, cy = 24) =>
  Array.from({ length: n }, (_, i) => `<g transform="rotate(${((360 / n) * i).toFixed(2)} ${cx} ${cy})">${body}</g>`).join("");

const P = {
  gold: "#E3B44A", goldLt: "#F7E3A6", goldDk: "#8E6418",
  lapis: "#22409A", lapisDk: "#101F4E",
  verm: "#C23B22", vermLt: "#E8733F",
  mala: "#2E8B63", malaLt: "#5FBE86",
  sea: "#2E82C6", seaDk: "#123E68", sky: "#9FE0FA",
  sun: "#FFC63F", sunDk: "#E07C1C", hot: "#FFF7E0",
  neb: "#8E6BE8", nebWarm: "#E265A6", nebCool: "#4FC7D8", nebDk: "#2B1B54",
  ink: "#16243A", lead: "#0E0C12", cloud: "#F4F8FB",
};

// ---- 1. haeckel: Kunstformen der Natur, 1904 -------------------------------------------
// A book whose entire purpose was to argue that nature is beautiful. Fine ink over jewel
// colour, radial symmetry, obsessive small detail, the specimen centred and adored.
// It is also the one tradition here built on organic form, so worlds 2 and 3 are free.
const H = (body) => A(`<g stroke="${P.ink}" stroke-width=".7" stroke-linejoin="round" stroke-linecap="round">${body}</g>`);
const haeckel = {
  energy: H(`
    <circle cx="24" cy="24" r="20.4" fill="${P.sunDk}"/>
    ${radial(16, `<path d="M24 4.2c1.5 3.4 1.5 6.4 0 9.6-1.5-3.2-1.5-6.2 0-9.6z" fill="${P.sun}"/>`)}
    ${radial(8, `<circle cx="24" cy="15.4" r="1.15" fill="${P.goldLt}"/>`)}
    <circle cx="24" cy="24" r="9.6" fill="${P.sun}"/>
    ${radial(12, `<path d="M24 14.6v3.4" />`)}
    <circle cx="24" cy="24" r="5" fill="${P.hot}"/>`),
  gravity: H(`
    <path d="M2.6 13.4c10 0 11.6 5.6 15.4 12.8 2.2 4.2 3.8 5.8 6 5.8s3.8-1.6 6-5.8c3.8-7.2 5.4-12.8 15.4-12.8v5.6c-6.6 0-7.8 4.2-11.2 10.8-2.8 5.4-5.8 8.2-10.2 8.2s-7.4-2.8-10.2-8.2C10.4 23.2 9.2 19 2.6 19z" fill="${P.lapis}"/>
    ${radial(9, `<path d="M24 34.6v4.2" />`, 24, 38)}
    <circle cx="24" cy="38" r="7" fill="${P.sunDk}"/>
    <circle cx="24" cy="38" r="4.6" fill="${P.sun}"/>
    <circle cx="22.4" cy="36.4" r="1.4" fill="${P.hot}"/>`),
  star: H(`
    ${radial(24, `<path d="M24 2.8c.7 4 .7 7 0 10.6-.7-3.6-.7-6.6 0-10.6z" fill="${P.sun}"/>`)}
    ${radial(12, `<path d="M24 8.6c1.1 4 1.1 6.6 0 10-1.1-3.4-1.1-6 0-10z" fill="${P.sunDk}"/>`)}
    <circle cx="24" cy="24" r="10.6" fill="${P.sunDk}"/>
    ${radial(16, `<path d="M24 13.6v3.2"/>`)}
    <circle cx="24" cy="24" r="7.2" fill="${P.sun}"/>
    ${radial(6, `<circle cx="24" cy="19.6" r="1" fill="${P.goldLt}"/>`)}
    <circle cx="24" cy="24" r="3.4" fill="${P.hot}"/>`),
  nebula: H(`
    <path d="M11 20c0-6.4 7-10.2 12.4-7.6 6-5.6 16.4-1.8 16.4 6.4 4 2.6 3.6 10-2.4 12-3.8 6.2-14 6.4-18.6 2.2-8 .4-11-7.6-7.8-13z" fill="${P.nebDk}"/>
    <ellipse cx="20" cy="21" rx="8.6" ry="6.6" fill="${P.neb}"/>
    <ellipse cx="29.4" cy="26" rx="7.4" ry="5.6" fill="${P.nebWarm}"/>
    <ellipse cx="24.4" cy="23.6" rx="4.4" ry="3.6" fill="${P.nebCool}"/>
    ${radial(10, `<circle cx="24" cy="15.6" r=".85" fill="${P.goldLt}"/>`, 24, 23)}
    <circle cx="13.6" cy="15" r="1.5" fill="${P.cloud}"/><circle cx="37.4" cy="33.4" r="1.2" fill="${P.cloud}"/>`),
  water: H(`
    <path d="M24 5c8 10 12.4 16.4 12.4 22a12.4 12.4 0 0 1-24.8 0C11.6 21.4 16 15 24 5z" fill="${P.seaDk}"/>
    <path d="M24 9.6c6.4 8.4 9.8 13.6 9.8 18.2a9.8 9.8 0 0 1-19.6 0c0-4.6 3.4-9.8 9.8-18.2z" fill="${P.sea}"/>
    ${radial(12, `<path d="M24 18.6v4.4"/>`, 24, 27.4)}
    <circle cx="24" cy="27.4" r="5.4" fill="${P.sky}"/>
    <circle cx="24" cy="27.4" r="2.4" fill="${P.cloud}"/>`),
  earth: H(`
    <circle cx="24" cy="24" r="19.4" fill="${P.seaDk}"/>
    <circle cx="24" cy="24" r="17.6" fill="${P.sea}"/>
    <path d="M10.6 18.4c4.4-1.6 7.4.6 10.6 0 3-.6 4.4-3.2 8-2.4 2.6.6 3.4 3.2 1.6 5-2.6 2.6-6.8 1.6-9.8 3.4-3 1.8-2.4 5-6.2 5.2-3.4.2-5.6-2.4-5.6-5.6z" fill="${P.mala}"/>
    <path d="M17.4 34c2.6-1.8 5.6-.4 8.6-1 2.4-.4 4-2 6-1 1.8.9 1.4 3.4-.6 4.6-3.6 2.2-8.2 3-11.6 1.8-2.4-.8-3.4-3-2.4-4.4z" fill="${P.mala}"/>
    <g opacity=".55"><path d="M6.6 17.6h34.8M4.8 24h38.4M6.6 30.4h34.8M24 4.6v38.8"/>
      <path d="M24 4.6c-5.4 6-5.4 32.8 0 38.8M24 4.6c5.4 6 5.4 32.8 0 38.8"/></g>
    <circle cx="24" cy="24" r="19.4" fill="none" stroke-width="1.1"/>
    ${radial(24, `<path d="M24 3.2v1.6" stroke-width=".9"/>`)}`),
};

// ---- 2. glass (stained): a window built to make light into something worth looking at ---
// Lead line, jewel field, and the colour only exists because light is coming through it.
// The oldest technology for celebrating something, and it is literally about illumination.
const S = (body) => A(`<g stroke="${P.lead}" stroke-width="2.2" stroke-linejoin="round" stroke-linecap="round">${body}</g>`);
const stained = {
  energy: S(`
    <circle cx="24" cy="24" r="21" fill="${P.sunDk}"/>
    ${radial(8, `<path d="M24 3.6l5.4 12.6h-10.8z" fill="${P.sun}"/>`)}
    ${radial(8, `<path d="M24 12.6l3.4 8h-6.8z" fill="${P.vermLt}"/>`)}
    <circle cx="24" cy="24" r="7.4" fill="${P.goldLt}"/>`),
  gravity: S(`
    <path d="M2.6 13.4c10 0 11.6 5.6 15.4 12.8 2.2 4.2 3.8 5.8 6 5.8s3.8-1.6 6-5.8c3.8-7.2 5.4-12.8 15.4-12.8v6c-6.6 0-7.8 4-11.2 10.6-2.8 5.4-5.8 8.2-10.2 8.2s-7.4-2.8-10.2-8.2C10.4 23.4 9.2 19.4 2.6 19.4z" fill="${P.lapis}"/>
    <circle cx="24" cy="38.4" r="7.2" fill="${P.sun}"/>
    <path d="M24 31.2a7.2 7.2 0 0 1 0 14.4z" fill="${P.sunDk}"/>`),
  star: S(`
    ${radial(8, `<path d="M24 2.8l4.6 13.4h-9.2z" fill="${P.sunDk}"/>`)}
    ${radial(4, `<path d="M24 6.4l6 14.6h-12z" fill="${P.sun}"/>`)}
    <circle cx="24" cy="24" r="8.4" fill="${P.gold}"/>
    <circle cx="24" cy="24" r="3.8" fill="${P.goldLt}"/>`),
  nebula: S(`
    <path d="M11 20c0-6.4 7-10.2 12.4-7.6 6-5.6 16.4-1.8 16.4 6.4 4 2.6 3.6 10-2.4 12-3.8 6.2-14 6.4-18.6 2.2-8 .4-11-7.6-7.8-13z" fill="${P.neb}"/>
    <path d="M23.4 12.4c6-5.6 16.4-1.8 16.4 6.4 4 2.6 3.6 10-2.4 12-3.8 6.2-14 6.4-18.6 2.2" fill="${P.nebWarm}"/>
    <path d="M19.6 22.4c2.6-4 9-4.4 11.6-.6 2.4 3.4-.6 8.4-5.4 8.6-4.8.2-8-4.4-6.2-8z" fill="${P.nebCool}"/>
    <path d="M20.4 20c2.2-2.6 6.6-2.4 8 .6 1.2 2.6-1.4 5.4-4.8 5.2-3.4-.2-5-3.4-3.2-5.8z" fill="${P.goldLt}" stroke-width="1.6"/>`),
  water: S(`
    <path d="M24 5c8 10 12.4 16.4 12.4 22a12.4 12.4 0 0 1-24.8 0C11.6 21.4 16 15 24 5z" fill="${P.sea}"/>
    <path d="M24 5c8 10 12.4 16.4 12.4 22a12.4 12.4 0 0 1-12.4 12.4z" fill="${P.seaDk}"/>
    <path d="M18 29.6a6 6 0 0 1 12 0 6 6 0 0 1-12 0z" fill="${P.sky}"/>`),
  earth: S(`
    <circle cx="24" cy="24" r="19.4" fill="${P.sea}"/>
    <path d="M10.6 18.4c4.4-1.6 7.4.6 10.6 0 3-.6 4.4-3.2 8-2.4 2.6.6 3.4 3.2 1.6 5-2.6 2.6-6.8 1.6-9.8 3.4-3 1.8-2.4 5-6.2 5.2-3.4.2-5.6-2.4-5.6-5.6z" fill="${P.mala}"/>
    <path d="M17.4 34c2.6-1.8 5.6-.4 8.6-1 2.4-.4 4-2 6-1 1.8.9 1.4 3.4-.6 4.6-3.6 2.2-8.2 3-11.6 1.8-2.4-.8-3.4-3-2.4-4.4z" fill="${P.mala}"/>
    <path d="M5.4 18.6h37.2M5.4 29.4h37.2" stroke-width="1.6"/>
    <path d="M24 4.6c-5.6 6-5.6 32.8 0 38.8M24 4.6c5.6 6 5.6 32.8 0 38.8" stroke-width="1.6"/>`),
};

// ---- 3. illuminated: gold leaf on pigment, every thing worth a frame -------------------
// A manuscript page treats its subject as sacred by construction: the roundel, the burnished
// gold, the ornament in the margin. Also the closest thing here to actual alchemy.
const I = (body) => A(`
  <circle cx="24" cy="24" r="22.2" fill="${P.lapisDk}"/>
  <circle cx="24" cy="24" r="22.2" fill="none" stroke="${P.gold}" stroke-width="1.6"/>
  <circle cx="24" cy="24" r="19.6" fill="none" stroke="${P.goldDk}" stroke-width=".8"/>
  ${radial(8, `<circle cx="24" cy="4" r="1.2" fill="${P.gold}"/>`)}
  <g stroke="${P.goldDk}" stroke-width=".7" stroke-linejoin="round" stroke-linecap="round">${body}</g>`);
const illuminated = {
  energy: I(`
    ${radial(12, `<path d="M24 7.4l2.6 8.6h-5.2z" fill="${P.gold}"/>`)}
    <circle cx="24" cy="24" r="8.2" fill="${P.verm}"/>
    ${radial(6, `<path d="M24 16.6v2.6"/>`)}
    <circle cx="24" cy="24" r="4.2" fill="${P.goldLt}"/>`),
  gravity: I(`
    <path d="M6 15.6c7.4 0 8.6 4.6 11.4 10.2 1.7 3.4 2.9 4.6 4.8 4.6h3.6c1.9 0 3.1-1.2 4.8-4.6 2.8-5.6 4-10.2 11.4-10.2v4.4c-4.8 0-5.8 3.4-8.4 8.6-2.2 4.4-4.4 6.6-7.8 6.6h-3.6c-3.4 0-5.6-2.2-7.8-6.6-2.6-5.2-3.6-8.6-8.4-8.6z" fill="${P.lapis}"/>
    <circle cx="24" cy="36.4" r="6" fill="${P.gold}"/>
    <circle cx="24" cy="36.4" r="2.6" fill="${P.goldLt}"/>`),
  star: I(`
    ${radial(8, `<path d="M24 5.2l3 10.2h-6z" fill="${P.gold}"/>`)}
    ${radial(8, `<path d="M24 12.4l1.8 5.6h-3.6z" fill="${P.goldLt}"/>`, 24, 24)}
    <circle cx="24" cy="24" r="8" fill="${P.verm}"/>
    <circle cx="24" cy="24" r="4.4" fill="${P.gold}"/>
    <circle cx="24" cy="24" r="1.8" fill="${P.goldLt}"/>`),
  nebula: I(`
    <path d="M12.6 21.4c0-5.4 6-8.6 10.6-6.4 5-4.8 14-1.6 14 5.4 3.4 2.2 3 8.4-2 10.2-3.2 5.2-11.8 5.4-15.8 1.8-6.8.4-9.4-6.4-6.8-11z" fill="${P.neb}"/>
    <path d="M22 22c2.4-3.6 8.2-4 10.6-.6 2.2 3.2-.6 7.6-5 7.8-4.4.2-7.2-4-5.6-7.2z" fill="${P.nebWarm}"/>
    ${radial(7, `<circle cx="24" cy="13.4" r="1.05" fill="${P.gold}"/>`, 24, 23.6)}
    <circle cx="24" cy="24" r="2.4" fill="${P.goldLt}"/>`),
  water: I(`
    <path d="M24 9c6.2 7.8 9.6 12.8 9.6 17.2a9.6 9.6 0 0 1-19.2 0c0-4.4 3.4-9.4 9.6-17.2z" fill="${P.lapis}"/>
    <path d="M24 14.4c4 5.2 6.2 8.4 6.2 11.2a6.2 6.2 0 0 1-12.4 0c0-2.8 2.2-6 6.2-11.2z" fill="${P.sea}"/>
    <circle cx="24" cy="27" r="2.6" fill="${P.goldLt}"/>`),
  earth: I(`
    <circle cx="24" cy="24" r="15.4" fill="${P.sea}"/>
    <path d="M13.4 20c3.6-1.3 6-.5 8.6-1 2.4-.5 3.6-2.6 6.4-2 2.1.5 2.7 2.6 1.3 4-2.1 2.1-5.5 1.3-7.9 2.7-2.4 1.5-1.9 4-5 4.2-2.7.2-4.5-1.9-4.5-4.5z" fill="${P.mala}"/>
    <path d="M18.6 31.8c2.1-1.4 4.5-.3 6.9-.8 1.9-.3 3.2-1.6 4.8-.8 1.4.7 1.1 2.7-.5 3.7-2.9 1.8-6.6 2.4-9.3 1.4-1.9-.6-2.7-2.4-1.9-3.5z" fill="${P.mala}"/>
    <circle cx="24" cy="24" r="15.4" fill="none" stroke="${P.gold}" stroke-width="1.3"/>
    <path d="M24 8.6v30.8M8.6 24h30.8" stroke="${P.gold}" stroke-width=".8" opacity=".8"/>`),
};

// ---- 4. cosmic: the sublime, painted straight ------------------------------------------
// Bonestell and every space-art plate since. No ornament at all: the argument is that the
// thing itself is overwhelming and the painter's only job is to not get in the way.
// The one non-ornamental answer, and the only one that cannot obviously draw a cell.
const cosmic = {
  energy: A(`
    <circle cx="24" cy="24" r="23" fill="url(#co-e-h)"/>
    ${radial(4, `<path d="M24 24L21.6 1.6h4.8z" fill="url(#co-e-r)"/>`)}
    ${radial(4, `<path d="M24 24L22.6 6.4h2.8z" fill="url(#co-e-r)" opacity=".7"/>`, 24, 24)}
    <circle cx="24" cy="24" r="8" fill="url(#co-e-c)"/>`,
    `<defs>
      <radialGradient id="co-e-h"><stop offset=".1" stop-color="#FFB63C" stop-opacity=".62"/><stop offset="1" stop-color="#FF6A2A" stop-opacity="0"/></radialGradient>
      <linearGradient id="co-e-r" x1="0" y1="1" x2="0" y2="0"><stop offset="0" stop-color="#FFF7E0"/><stop offset="1" stop-color="#FFB63C" stop-opacity="0"/></linearGradient>
      <radialGradient id="co-e-c"><stop offset=".3" stop-color="#FFFFFF"/><stop offset="1" stop-color="#FFC63F" stop-opacity=".2"/></radialGradient>
    </defs>`),
  gravity: A(`
    <ellipse cx="24" cy="30" rx="23" ry="13" fill="url(#co-g-h)"/>
    ${[0, 1, 2, 3].map((i) => `<path d="M${2 + i * 1.4} ${13 + i * 3.4}q${10 - i} 0 ${15.4 - i * 1.2} ${12 + i * 1.6}q2.6 ${5 + i} ${6.6 - i * .2} ${5 + i}t${6.6 - i * .2} -${5 + i}Q${31 + i * 1.2} ${13 + i * 3.4} ${46 - i * 1.4} ${13 + i * 3.4}" stroke="#93B6F0" stroke-width="${1.1 - i * .15}" fill="none" opacity="${.85 - i * .18}"/>`).join("")}
    <circle cx="24" cy="34.6" r="9" fill="url(#co-g-h2)"/>
    <circle cx="24" cy="34.6" r="5" fill="url(#co-g-b)"/>`,
    `<defs>
      <radialGradient id="co-g-h"><stop offset=".2" stop-color="#5C7FD8" stop-opacity=".42"/><stop offset="1" stop-color="#5C7FD8" stop-opacity="0"/></radialGradient>
      <radialGradient id="co-g-h2"><stop offset=".3" stop-color="#FFD98A" stop-opacity=".8"/><stop offset="1" stop-color="#FFD98A" stop-opacity="0"/></radialGradient>
      <radialGradient id="co-g-b" cx=".34" cy=".3"><stop offset="0" stop-color="#FFF7E0"/><stop offset=".6" stop-color="#FFC63F"/><stop offset="1" stop-color="#C96A15"/></radialGradient>
    </defs>`),
  star: A(`
    <circle cx="24" cy="24" r="23.4" fill="url(#co-s-h)"/>
    <path d="M24 7.2c2.2 9.8 6.8 14.4 16.6 16.6-9.8 2.2-14.4 6.8-16.6 16.6-2.2-9.8-6.8-14.4-16.6-16.6 9.8-2.2 14.4-6.8 16.6-16.6z" fill="url(#co-s-b)"/>
    <circle cx="24" cy="24" r="9.4" fill="url(#co-s-c)"/>`,
    `<defs>
      <radialGradient id="co-s-h"><stop offset=".12" stop-color="#FFD15C" stop-opacity=".8"/><stop offset=".5" stop-color="#FF7A3C" stop-opacity=".25"/><stop offset="1" stop-color="#FF7A3C" stop-opacity="0"/></radialGradient>
      <radialGradient id="co-s-b"><stop offset="0" stop-color="#FFFFFF"/><stop offset=".4" stop-color="#FFE08A"/><stop offset="1" stop-color="#FF9A3C" stop-opacity=".5"/></radialGradient>
      <radialGradient id="co-s-c"><stop offset=".35" stop-color="#FFFFFF"/><stop offset="1" stop-color="#FFFFFF" stop-opacity="0"/></radialGradient>
    </defs>`),
  nebula: A(`
    <g filter="url(#co-n-b)">
      <ellipse cx="19" cy="20" rx="15" ry="11.6" fill="#8E6BE8" opacity=".92"/>
      <ellipse cx="30" cy="27" rx="13.6" ry="10" fill="#E265A6" opacity=".72"/>
      <ellipse cx="24" cy="24" rx="8.6" ry="6.6" fill="#4FC7D8" opacity=".6"/>
      <ellipse cx="24" cy="23" rx="4" ry="3" fill="#FFF6E4" opacity=".55"/>
    </g>
    <circle cx="12.4" cy="13" r="1.5" fill="#FFF"/><circle cx="37" cy="16" r="1.1" fill="#FFF" opacity=".9"/>
    <circle cx="34" cy="36" r="1.3" fill="#FFF" opacity=".85"/><circle cx="15" cy="35" r="1" fill="#FFF" opacity=".7"/>
    <circle cx="42" cy="27" r=".9" fill="#FFF" opacity=".6"/>`,
    `<defs><filter id="co-n-b" x="-30%" y="-30%" width="160%" height="160%"><feGaussianBlur stdDeviation="2.8"/></filter></defs>`),
  water: A(`
    <path d="M24 5c8 10 12.4 16.4 12.4 22a12.4 12.4 0 0 1-24.8 0C11.6 21.4 16 15 24 5z" fill="url(#co-w-b)"/>
    <ellipse cx="19" cy="29.4" rx="3" ry="5" fill="#EAF8FF" opacity=".8" transform="rotate(-18 19 29.4)"/>
    <ellipse cx="26.6" cy="35.6" rx="4" ry="2" fill="#BFF0FF" opacity=".5"/>
    <path d="M24 5c8 10 12.4 16.4 12.4 22a12.4 12.4 0 0 1-24.8 0" stroke="url(#co-w-r)" stroke-width="1.3" fill="none"/>`,
    `<defs>
      <radialGradient id="co-w-b" cx=".36" cy=".28" r=".9"><stop offset="0" stop-color="#A8ECFF"/><stop offset=".55" stop-color="#2E82C6"/><stop offset="1" stop-color="#0B2A4E"/></radialGradient>
      <linearGradient id="co-w-r" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#EAF8FF" stop-opacity=".95"/><stop offset="1" stop-color="#EAF8FF" stop-opacity="0"/></linearGradient>
    </defs>`),
  earth: A(`
    <circle cx="24" cy="24" r="22" fill="url(#co-t-a)"/>
    <circle cx="24" cy="24" r="18.4" fill="url(#co-t-s)"/>
    <g clip-path="url(#co-t-c)" opacity=".95">
      <path d="M9 19c5-2 8.4.6 12 0 3.4-.6 5-3.2 9-2.4 3 .6 3.8 3.4 1.8 5.4-2.8 2.6-7.4 1.6-10.6 3.4-3.4 2-2.8 5.4-6.8 5.6-3.8.2-6.4-2.4-6.4-6z" fill="#3E9E6B"/>
      <path d="M17 35c3-2 6-.4 9.4-1 2.8-.4 4.6-2.2 6.8-1 2 1 1.6 3.6-.6 5-4 2.4-9 3.2-12.8 2-2.6-.8-3.8-3-2.8-5z" fill="#3E9E6B"/>
      <path d="M8 13q7-3.4 14 .6" stroke="#F4F8FB" stroke-width="2.6" fill="none" opacity=".8"/>
      <path d="M26 37q6-2.6 12 .4" stroke="#F4F8FB" stroke-width="2.2" fill="none" opacity=".6"/>
      <circle cx="24" cy="24" r="18.4" fill="url(#co-t-t)"/>
    </g>
    <path d="M24 5.6a18.4 18.4 0 0 1 13 5.4" stroke="#CFF3FF" stroke-width="1.5" fill="none" stroke-linecap="round"/>`,
    `<defs>
      <clipPath id="co-t-c"><circle cx="24" cy="24" r="18.4"/></clipPath>
      <radialGradient id="co-t-a"><stop offset=".84" stop-color="#7FD6FF" stop-opacity="0"/><stop offset=".92" stop-color="#7FD6FF" stop-opacity=".5"/><stop offset="1" stop-color="#7FD6FF" stop-opacity="0"/></radialGradient>
      <radialGradient id="co-t-s" cx=".36" cy=".3" r=".9"><stop offset="0" stop-color="#5FBEF0"/><stop offset=".68" stop-color="#1D5E9E"/><stop offset="1" stop-color="#0A2036"/></radialGradient>
      <radialGradient id="co-t-t" cx=".34" cy=".28" r=".92"><stop offset=".48" stop-color="#000" stop-opacity="0"/><stop offset="1" stop-color="#00040B" stop-opacity=".85"/></radialGradient>
    </defs>`),
};

export const beautyStyles = { haeckel, stained, illuminated, cosmic };
export const beautyNotes = {
  haeckel: "Kunstformen der Natur, 1904: a book made to argue that nature is beautiful. Fine ink over jewel colour, radial symmetry, obsessive small detail. Built on organic form, so worlds 2 and 3 are already paid for.",
  stained: "A stained window. Lead line and jewel field, and the colour only exists because light is coming through it. The oldest technology for celebrating something, and it is literally about illumination.",
  illuminated: "Gold leaf on pigment. A manuscript treats its subject as sacred by construction: the roundel, the burnished gold, the ornament in the margin. Also the closest thing here to actual alchemy.",
  cosmic: "The sublime, painted straight. No ornament at all. The argument is that the thing itself is overwhelming and the painter's job is to not get in the way.",
};
export const beautySubjects = [
  ["energy", "Energy"], ["gravity", "Gravity"], ["star", "Star"],
  ["nebula", "Nebula"], ["water", "Water"], ["earth", "Earth"],
];
