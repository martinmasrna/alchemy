// Round 9. Twelve subjects that are certain to be in the game, spanning the whole diamond
// rather than the prologue: Star, Water, Earth, Life, Human, Fire, Hunting, Tribe, City,
// Car, Calculus, Bitcoin.
//
// That set kills a style faster than any amount of looking at a nebula. Half of it is scenes
// with people in them, and two of them have no physical appearance at all. Haeckel, stained
// and illuminated are out. Cosmic goes through and gets three opponents it has not met.
//
// Each new column is chosen to be strong exactly where the others break:
//   screenprint  scenes and places
//   harper       wit, and the reduction that makes a thing readable at any size
//   editorial    ideas with no picture
//
// Colour still obeys the expected-colour rule wherever a thing has one. Calculus and Bitcoin
// do not, and how each column answers that is the point of including them.

const A = (body, defs = "") => `<svg viewBox="0 0 48 48" fill="none" aria-hidden="true">${defs}${body}</svg>`;
const radial = (n, body, cx = 24, cy = 24) =>
  Array.from({ length: n }, (_, i) => `<g transform="rotate(${((360 / n) * i).toFixed(2)} ${cx} ${cy})">${body}</g>`).join("");
// Everything in screenprint and harper is clipped to a rounded tile: a poster has edges.
const TILE = `<clipPath id="tile"><rect x="2" y="2" width="44" height="44" rx="7"/></clipPath>`;

// ======================================================================================
// 1. SCREENPRINT — the national park poster. Flat inks, a horizon, light doing the work.
// ======================================================================================
const S = {
  sky: "#F2C46B", skyHi: "#F6DFA8", sun: "#E8762F", rust: "#B03E1E",
  far: "#3E7F86", mid: "#265E66", near: "#12383F", ink: "#0C242A",
  sea: "#2E82C6", seaDk: "#16456E", foam: "#F2E3C4",
  green: "#4E8C4A", greenDk: "#2B5A32", stone: "#8A7A63", cream: "#F2E3C4",
};
const sp = (body) => A(`<rect x="2" y="2" width="44" height="44" rx="7" fill="${S.sky}"/><g clip-path="url(#tile)">${body}</g>`, `<defs>${TILE}</defs>`);
const screenprint = {
  star: sp(`
    <circle cx="24" cy="21" r="11" fill="${S.sun}"/>
    ${radial(12, `<path d="M24 2.4l1.9 5.6h-3.8z" fill="${S.skyHi}"/>`, 24, 21)}
    <circle cx="24" cy="21" r="6.4" fill="${S.skyHi}"/>
    <path d="M2 34h44v12H2z" fill="${S.near}"/>
    <path d="M2 34q11-6 22 0t22 0v3H2z" fill="${S.mid}"/>`),
  water: sp(`
    <rect x="2" y="2" width="44" height="26" fill="${S.skyHi}"/>
    <circle cx="24" cy="13" r="6" fill="${S.sun}"/>
    <path d="M2 26h44v20H2z" fill="${S.sea}"/>
    <path d="M2 30q6-3 11 0t11 0 11 0 11 0v4H2z" fill="${S.seaDk}"/>
    <path d="M2 37q6-3 11 0t11 0 11 0 11 0v9H2z" fill="${S.foam}" opacity=".85"/>
    <path d="M2 41q6-3 11 0t11 0 11 0 11 0v5H2z" fill="${S.seaDk}"/>`),
  earth: sp(`
    <rect x="2" y="2" width="44" height="44" fill="${S.ink}"/>
    <circle cx="24" cy="26" r="17" fill="${S.sea}"/>
    <path d="M9 21c5-2 8 .6 11.6 0 3.4-.6 5-3 9-2.2 3 .6 3.6 3.2 1.6 5-2.8 2.4-7 1.4-10 3.2-3.2 1.8-2.6 5-6.4 5.2-3.6.2-6-2.2-6-5.6z" fill="${S.green}"/>
    <path d="M17 36c3-1.8 6-.4 9.2-1 2.6-.4 4.2-2 6.2-1 1.8 1 1.4 3.2-.6 4.4-3.6 2-8.2 2.8-11.6 1.6-2.4-.8-3.4-2.8-3.2-4z" fill="${S.greenDk}"/>
    <path d="M24 9a17 17 0 0 1 12 5" stroke="${S.foam}" stroke-width="2" fill="none" stroke-linecap="round"/>`),
  life: sp(`
    <path d="M2 36h44v10H2z" fill="${S.greenDk}"/>
    <circle cx="34" cy="14" r="7" fill="${S.sun}"/>
    <path d="M24 46V22" stroke="${S.greenDk}" stroke-width="3"/>
    <path d="M24 28c-8 0-13-5-13-11 7-1.4 13 3 13 11z" fill="${S.green}"/>
    <path d="M24 24c0-7 6-12 12-10.6C36 20 31 24 24 24z" fill="${S.far}"/>`),
  human: sp(`
    <rect x="2" y="2" width="44" height="30" fill="${S.skyHi}"/>
    <circle cx="35" cy="12" r="6" fill="${S.sun}"/>
    <path d="M2 32q10-7 22-3t22-1v18H2z" fill="${S.mid}"/>
    <path d="M2 40q12-4 22 0t22-2v8H2z" fill="${S.near}"/>
    <circle cx="20" cy="18" r="4.4" fill="${S.ink}"/>
    <path d="M20 23c-4.4 0-7.4 3.4-7.6 8l1.6 9h3l.8-8 2.2 8h3l2.2-8 .8 8h3l1.6-9c-.2-4.6-3.2-8-7.6-8z" fill="${S.ink}"/>`),
  fire: sp(`
    <rect x="2" y="2" width="44" height="44" fill="${S.ink}"/>
    <path d="M24 5c9 9 14 15 14 21a14 14 0 0 1-28 0c0-6 5-12 14-21z" fill="${S.rust}"/>
    <path d="M24 14c6 6 9.4 10 9.4 14a9.4 9.4 0 0 1-18.8 0c0-4 3.4-8 9.4-14z" fill="${S.sun}"/>
    <path d="M24 24c3 3.4 4.6 5.4 4.6 7.4a4.6 4.6 0 0 1-9.2 0c0-2 1.6-4 4.6-7.4z" fill="${S.skyHi}"/>`),
  hunting: sp(`
    <rect x="2" y="2" width="44" height="30" fill="${S.skyHi}"/>
    <circle cx="12" cy="11" r="5.4" fill="${S.sun}"/>
    <path d="M2 32q10-6 22-2t22-2v18H2z" fill="${S.mid}"/>
    <path d="M2 41q12-4 22 0t22-2v7H2z" fill="${S.near}"/>
    <path d="M9 14l16 9" stroke="${S.ink}" stroke-width="1.6" stroke-linecap="round"/>
    <circle cx="9.4" cy="21.6" r="3" fill="${S.ink}"/>
    <path d="M9.4 25c-3 0-5 2.4-5.2 5.6l1.2 6h2l.6-5.4 1.4 5.4h2l1.4-5.4.6 5.4h2l1.2-6c-.2-3.2-2.2-5.6-5.2-5.6z" fill="${S.ink}"/>
    <path d="M33 30c0-4 2.6-6.6 6-6.6s6 2.6 6 6.6l-1 6h-2l-.6-4-1 4h-2l-1-4-.6 4h-2z" fill="${S.ink}"/>
    <path d="M36.4 23.4l-2.4-4M42.6 23.4l2.4-4" stroke="${S.ink}" stroke-width="1.5" stroke-linecap="round"/>`),
  tribe: sp(`
    <rect x="2" y="2" width="44" height="44" fill="${S.near}"/>
    <path d="M24 22c5 5 7.6 8.4 7.6 11.6a7.6 7.6 0 0 1-15.2 0C16.4 30.4 19 27 24 22z" fill="${S.sun}"/>
    <path d="M24 29c2.4 2.4 3.6 4 3.6 5.4a3.6 3.6 0 0 1-7.2 0c0-1.4 1.2-3 3.6-5.4z" fill="${S.skyHi}"/>
    ${[
      [8, 16], [40, 16], [7, 34], [41, 34],
    ].map(([x, y]) => `<g fill="${S.ink}"><circle cx="${x}" cy="${y}" r="3.2"/><path d="M${x} ${y + 3.6}c-3 0-5 2.4-5.2 5.6l1 5h1.8l.6-4.6 1.2 4.6h1.2l1.2-4.6.6 4.6h1.8l1-5c-.2-3.2-2.2-5.6-5.2-5.6z"/></g>`).join("")}
    <path d="M2 43h44v3H2z" fill="${S.ink}"/>`),
  city: sp(`
    <rect x="2" y="2" width="44" height="30" fill="${S.sky}"/>
    <circle cx="24" cy="17" r="8" fill="${S.sun}"/>
    <path d="M2 28h6v18H2zM10 20h7v26h-7zM19 25h5v21h-5zM26 14h7v32h-7zM35 23h6v23h-6zM43 30h3v16h-3z" fill="${S.near}"/>
    <g fill="${S.sky}" opacity=".9">
      <rect x="11.4" y="23" width="1.6" height="2"/><rect x="14.4" y="23" width="1.6" height="2"/>
      <rect x="11.4" y="28" width="1.6" height="2"/><rect x="14.4" y="28" width="1.6" height="2"/>
      <rect x="27.4" y="18" width="1.8" height="2.2"/><rect x="30.4" y="18" width="1.8" height="2.2"/>
      <rect x="27.4" y="24" width="1.8" height="2.2"/><rect x="30.4" y="24" width="1.8" height="2.2"/>
      <rect x="36.4" y="27" width="1.6" height="2"/><rect x="39" y="27" width="1.6" height="2"/>
    </g>`),
  car: sp(`
    <rect x="2" y="2" width="44" height="30" fill="${S.skyHi}"/>
    <circle cx="37" cy="12" r="5.4" fill="${S.sun}"/>
    <path d="M2 30q10-4 22-1t22-2v19H2z" fill="${S.far}"/>
    <path d="M2 38h44v8H2z" fill="${S.near}"/>
    <path d="M7 34c1-4 3-6.6 6-6.6h5.4l4-5h8.6c2 0 3.4 1.4 4.4 5l4 .6c1.6.3 2.6 1.6 2.6 3.4V34z" fill="${S.rust}"/>
    <path d="M20.4 27.4h8.2l-2.4-4h-6z" fill="${S.skyHi}"/>
    <path d="M18.6 27.4h-5.2c-1.6 0-2.6 1.4-3.2 4h8.4z" fill="${S.skyHi}"/>
    <circle cx="15" cy="35.6" r="4.4" fill="${S.ink}"/><circle cx="15" cy="35.6" r="1.8" fill="${S.cream}"/>
    <circle cx="34" cy="35.6" r="4.4" fill="${S.ink}"/><circle cx="34" cy="35.6" r="1.8" fill="${S.cream}"/>`),
  // The one honest screenprint answer to an abstraction: make it a landscape.
  // The area under a curve is a hillside, and that IS an integral.
  calculus: sp(`
    <rect x="2" y="2" width="44" height="44" fill="${S.skyHi}"/>
    <circle cx="36" cy="12" r="5" fill="${S.sun}"/>
    <path d="M2 40q7-22 16-22t10 10 16-14v26H2z" fill="${S.far}"/>
    <g stroke="${S.ink}" stroke-width=".9" opacity=".75">
      <path d="M9 40V27.6M14 40V21M19 40V18.4M24 40V20.6M29 40V26M34 40V22.4M39 40V16"/>
    </g>
    <path d="M2 40q7-22 16-22t10 10 16-14" stroke="${S.rust}" stroke-width="2.2" fill="none" stroke-linecap="round"/>
    <path d="M2 40h44" stroke="${S.ink}" stroke-width="2"/>`),
  // And the other: a currency is a sun that rises. Orange is already its expected colour.
  bitcoin: sp(`
    <rect x="2" y="2" width="44" height="44" fill="${S.sky}"/>
    <path d="M2 34h44v12H2z" fill="${S.near}"/>
    <circle cx="24" cy="24" r="13" fill="${S.sun}"/>
    <circle cx="24" cy="24" r="10.4" fill="${S.rust}" opacity=".35"/>
    <g fill="${S.skyHi}">
      <path d="M19 16.6h3v14.8h-3zM23.4 16.6h3v14.8h-3z"/>
      <path d="M20 18h7.4c2.6 0 4.4 1.6 4.4 3.8s-1.8 3.8-4.4 3.8H20zM20 25.6h8c2.8 0 4.6 1.6 4.6 3.8S30.8 33.2 28 33.2h-8z"/>
    </g>
    <path d="M2 34q11-5 22 0t22 0v3H2z" fill="${S.mid}"/>`),
};

// ======================================================================================
// 2. HARPER — Charley Harper's "minimal realism". A thing reduced to the fewest shapes
// that still make it that thing, flat colour, no outline, and a joke in the reduction.
// ======================================================================================
const H = {
  paper: "#EFE7D2", ink: "#1E1C18", red: "#C4452F", mustard: "#E0A82E",
  teal: "#2C7A78", olive: "#6E8C3A", blue: "#2F6FA8", brown: "#7A5230",
  cream: "#F7F1E0", pink: "#D98B7A", sky: "#8FBEC9",
};
const hp = (body) => A(`<rect x="2" y="2" width="44" height="44" rx="7" fill="${H.paper}"/><g clip-path="url(#tile)">${body}</g>`, `<defs>${TILE}</defs>`);
const harper = {
  star: hp(`
    ${radial(8, `<path d="M24 4l3.4 9.4h-6.8z" fill="${H.mustard}"/>`)}
    <circle cx="24" cy="24" r="9.4" fill="${H.mustard}"/>
    <path d="M24 14.6a9.4 9.4 0 0 1 0 18.8z" fill="${H.red}"/>
    <circle cx="24" cy="24" r="3" fill="${H.cream}"/>`),
  water: hp(`
    <path d="M24 8c8 10 12 16 12 21a12 12 0 0 1-24 0c0-5 4-11 12-21z" fill="${H.blue}"/>
    <path d="M24 8c8 10 12 16 12 21a12 12 0 0 1-12 12z" fill="${H.teal}"/>
    <circle cx="19.6" cy="30" r="3" fill="${H.cream}"/>`),
  earth: hp(`
    <circle cx="24" cy="24" r="17" fill="${H.blue}"/>
    <path d="M11 20c4-1.4 6.6.6 9.4 0 2.8-.6 4-2.8 7.2-2.2 2.4.6 3 2.8 1.4 4.4-2.4 2.2-6 1.4-8.6 3-2.8 1.6-2.2 4.4-5.6 4.6-3 .2-5-2-5-5z" fill="${H.olive}"/>
    <path d="M18 34c2.4-1.6 5-.4 7.8-.8 2.2-.4 3.6-1.8 5.4-1 1.6.8 1.2 3-.6 4-3.2 2-7.4 2.6-10.4 1.6-2.2-.7-3-2.6-2.2-3.8z" fill="${H.olive}"/>`),
  life: hp(`
    <path d="M24 42V24" stroke="${H.olive}" stroke-width="2.6" stroke-linecap="round"/>
    <path d="M24 26c-9 0-14-5-14-11 8-1.6 14 3 14 11z" fill="${H.olive}"/>
    <path d="M24 22c0-8 6-13 13-11.6C37 17 32 22 24 22z" fill="${H.teal}"/>
    <circle cx="24" cy="10" r="3.4" fill="${H.red}"/>`),
  human: hp(`
    <circle cx="24" cy="15" r="6.6" fill="${H.brown}"/>
    <path d="M24 23c-6.4 0-10.6 4.6-10.6 11.4V44h4.6l1.4-12 1.4 12h6.4l1.4-12 1.4 12h4.6v-9.6C34.6 27.6 30.4 23 24 23z" fill="${H.red}"/>
    <circle cx="21.6" cy="14.2" r="1.2" fill="${H.cream}"/>
    <circle cx="26.4" cy="14.2" r="1.2" fill="${H.cream}"/>`),
  fire: hp(`
    <path d="M24 6l11 22H13z" fill="${H.red}"/>
    <path d="M24 16l7 14H17z" fill="${H.mustard}"/>
    <path d="M24 24l3.4 6.6h-6.8z" fill="${H.cream}"/>
    <path d="M10 32h28l-3 10H13z" fill="${H.brown}"/>`),
  hunting: hp(`
    <path d="M13 40V16" stroke="${H.brown}" stroke-width="2.2" stroke-linecap="round"/>
    <path d="M13 16l-3.4 5h6.8z" fill="${H.ink}"/>
    <path d="M22 26h20" stroke="${H.ink}" stroke-width="1.6" stroke-linecap="round"/>
    <path d="M42 26l-5-3v6z" fill="${H.red}"/>
    <path d="M25 30c0-5 3.4-8.4 8-8.4s8 3.4 8 8.4l-1.2 10h-2.4l-.8-6.6-1.4 6.6h-4.4l-1.4-6.6-.8 6.6h-2.4z" fill="${H.brown}"/>
    <path d="M28.6 21.6l-2.6-5M37.4 21.6l2.6-5" stroke="${H.brown}" stroke-width="1.8" stroke-linecap="round"/>`),
  tribe: hp(`
    <circle cx="24" cy="26" r="6" fill="${H.mustard}"/>
    <path d="M24 20l4.4 8.6h-8.8z" fill="${H.red}"/>
    ${radial(5, `<g><circle cx="24" cy="9" r="3.4" fill="${H.brown}"/><path d="M24 13c-3.2 0-5.4 2.4-5.4 5.8l.6 3.4h1.8l.6-2.8.8 2.8h3.2l.8-2.8.6 2.8h1.8l.6-3.4c0-3.4-2.2-5.8-5.4-5.8z" fill="${H.teal}"/></g>`)}`),
  city: hp(`
    <path d="M4 44V22h7v22zM13 44V12h8v32zM23 44V28h6v16zM31 44V18h7v26zM40 44V26h4v18z" fill="${H.ink}"/>
    <g fill="${H.mustard}">
      <rect x="15" y="16" width="2" height="3"/><rect x="18" y="16" width="2" height="3"/>
      <rect x="15" y="22" width="2" height="3"/><rect x="18" y="22" width="2" height="3"/>
      <rect x="33" y="22" width="2" height="3"/><rect x="36" y="22" width="2" height="3"/>
      <rect x="33" y="28" width="2" height="3"/><rect x="36" y="28" width="2" height="3"/>
      <rect x="6" y="27" width="2" height="3"/><rect x="25" y="33" width="2" height="3"/>
    </g>
    <circle cx="36" cy="9" r="4" fill="${H.mustard}"/>`),
  car: hp(`
    <path d="M6 34c0-5 2.4-8 6-8h4l4-6h9c2 0 3.2 1.6 4 6l4 .6c1.8.3 3 1.6 3 3.4V34z" fill="${H.red}"/>
    <path d="M21.6 26h7l-2.4-4h-5.2z" fill="${H.sky}"/>
    <path d="M19.4 26h-3.2c-1.4 0-2.2 1.4-2.8 4h6z" fill="${H.sky}"/>
    <circle cx="15" cy="34" r="5" fill="${H.ink}"/><circle cx="15" cy="34" r="1.8" fill="${H.paper}"/>
    <circle cx="34" cy="34" r="5" fill="${H.ink}"/><circle cx="34" cy="34" r="1.8" fill="${H.paper}"/>
    <path d="M4 39h40" stroke="${H.ink}" stroke-width="1.6" stroke-linecap="round"/>`),
  // Harper's move on an abstraction is the same as on a bird: find the geometry and stop.
  // Calculus is the rectangles under a curve, which is literally how it was invented.
  calculus: hp(`
    <g fill="${H.teal}">
      <rect x="8" y="33" width="5.4" height="7"/><rect x="14" y="28" width="5.4" height="12"/>
      <rect x="20" y="22" width="5.4" height="18"/><rect x="26" y="17" width="5.4" height="23"/>
      <rect x="32" y="13" width="5.4" height="27"/>
    </g>
    <path d="M6 38q12-2 16-12t16-18" stroke="${H.red}" stroke-width="2.4" fill="none" stroke-linecap="round"/>
    <path d="M6 40h36M8 42V10" stroke="${H.ink}" stroke-width="1.6" stroke-linecap="round"/>`),
  bitcoin: hp(`
    <circle cx="24" cy="24" r="15" fill="${H.mustard}"/>
    <g fill="${H.ink}">
      <path d="M19.4 13h3v22h-3zM24 13h3v22h-3z"/>
      <path d="M20 16.4h7.6c3 0 5 1.8 5 4.4s-2 4.4-5 4.4H20zM20 25.2h8.2c3.2 0 5.2 1.8 5.2 4.4s-2 4.4-5.2 4.4H20z"/>
    </g>`),
};

// ======================================================================================
// 3. EDITORIAL — the style that exists to draw ideas. Limited palette, flat shapes with
// grain, one metaphor per picture, notation used as an object when there is no object.
// ======================================================================================
const E = {
  paper: "#E9E2D5", ink: "#1E2430", clay: "#C96F4A", mustard: "#D9A43F",
  sage: "#6E8F73", slate: "#4A6480", plum: "#7A4E72", cream: "#F3EEE3", sky: "#9FBCCB",
};
const ed = (body) => A(`<g filter="url(#ed-grain)"><rect x="2" y="2" width="44" height="44" rx="7" fill="${E.paper}"/><g clip-path="url(#tile)">${body}</g></g>`, `<defs>${TILE}</defs>`);
const editorial = {
  star: ed(`
    <circle cx="24" cy="24" r="12" fill="${E.mustard}"/>
    <circle cx="20.4" cy="20.4" r="12" fill="${E.clay}" opacity=".55"/>
    ${radial(16, `<path d="M24 7.4v-3.6" stroke="${E.ink}" stroke-width="1.3" stroke-linecap="round"/>`)}`),
  water: ed(`
    <path d="M24 8c8 10 12 16.4 12 21.4a12 12 0 0 1-24 0C12 24.4 16 18 24 8z" fill="${E.slate}"/>
    <path d="M24 8c8 10 12 16.4 12 21.4a12 12 0 0 1-12 12z" fill="${E.sky}" opacity=".5"/>
    <path d="M12 36q6-3 12 0t12 0" stroke="${E.cream}" stroke-width="1.6" fill="none" stroke-linecap="round" opacity=".8"/>`),
  earth: ed(`
    <circle cx="24" cy="24" r="16.6" fill="${E.slate}"/>
    <path d="M11.6 20c4-1.4 6.6.6 9.4 0 2.8-.6 4-2.8 7-2.2 2.4.6 3 2.8 1.4 4.4-2.4 2.2-6 1.4-8.6 3-2.8 1.6-2.2 4.4-5.4 4.6-3 .2-4.8-2-4.8-5z" fill="${E.sage}"/>
    <path d="M18 33.6c2.4-1.6 5-.4 7.6-.8 2.2-.4 3.6-1.8 5.2-1 1.6.8 1.2 3-.6 4-3.2 2-7.2 2.6-10 1.6-2.2-.7-3-2.6-2.2-3.8z" fill="${E.sage}"/>
    <path d="M24 7.4a16.6 16.6 0 0 1 11.8 4.8" stroke="${E.cream}" stroke-width="1.6" fill="none" stroke-linecap="round"/>`),
  life: ed(`
    <path d="M6 34h36v10H6z" fill="${E.clay}" opacity=".35"/>
    <path d="M24 42V20" stroke="${E.sage}" stroke-width="2.4" stroke-linecap="round"/>
    <path d="M24 24c-8 0-12.6-4.6-12.6-10C19 12.6 24 16.6 24 24z" fill="${E.sage}"/>
    <path d="M24 20c0-7.4 5.4-12 12.6-10.6C36.6 15 32 20 24 20z" fill="${E.mustard}" opacity=".9"/>
    <path d="M6 34h36" stroke="${E.ink}" stroke-width="1.4"/>`),
  human: ed(`
    <path d="M13 44c0-9 5-15 11-15s11 6 11 15z" fill="${E.slate}"/>
    <circle cx="24" cy="19" r="9.4" fill="${E.clay}"/>
    <path d="M24 9.6a9.4 9.4 0 0 1 0 18.8z" fill="${E.ink}" opacity=".18"/>
    ${radial(9, `<path d="M24 6.6V3.4" stroke="${E.mustard}" stroke-width="1.4" stroke-linecap="round"/>`, 24, 19)}
    <circle cx="24" cy="19" r="3.4" fill="${E.cream}"/>`),
  fire: ed(`
    <path d="M24 6c9.4 9.4 14.4 15.6 14.4 21.4a14.4 14.4 0 0 1-28.8 0C9.6 21.6 14.6 15.4 24 6z" fill="${E.clay}"/>
    <path d="M24 17c5.6 5.6 8.6 9.4 8.6 12.8a8.6 8.6 0 0 1-17.2 0c0-3.4 3-7.2 8.6-12.8z" fill="${E.mustard}"/>
    <path d="M24 27c2.4 2.4 3.6 4 3.6 5.4a3.6 3.6 0 0 1-7.2 0c0-1.4 1.2-3 3.6-5.4z" fill="${E.cream}"/>`),
  hunting: ed(`
    <path d="M12 8c8 6 8 26 0 32" stroke="${E.clay}" stroke-width="2.6" fill="none" stroke-linecap="round"/>
    <path d="M12 8c-2 8-2 24 0 32" stroke="${E.ink}" stroke-width="1.2" fill="none" stroke-linecap="round"/>
    <path d="M14 24h24" stroke="${E.ink}" stroke-width="1.8" stroke-linecap="round"/>
    <path d="M40 24l-6.4-4v8z" fill="${E.clay}"/>
    <g fill="${E.sage}" opacity=".85">
      <ellipse cx="19" cy="37" rx="2.2" ry="1.5"/><ellipse cx="26" cy="39" rx="2.2" ry="1.5"/>
      <ellipse cx="33" cy="36.6" rx="2.2" ry="1.5"/></g>`),
  tribe: ed(`
    <circle cx="14" cy="21" r="7.4" fill="${E.clay}"/>
    <circle cx="34" cy="21" r="7.4" fill="${E.sage}"/>
    <circle cx="24" cy="27" r="7.4" fill="${E.mustard}"/>
    <path d="M4 44c0-6.6 4.4-11 10-11s10 4.4 10 11z" fill="${E.clay}" opacity=".85"/>
    <path d="M24 44c0-6.6 4.4-11 10-11s10 4.4 10 11z" fill="${E.sage}" opacity=".85"/>
    <path d="M14 44c0-6.6 4.4-11 10-11s10 4.4 10 11z" fill="${E.mustard}"/>`),
  city: ed(`
    <path d="M4 44V24h8v20zM14 44V14h9v30zM25 44V30h6v14zM33 44V19h7v25zM42 44V28h4v16z" fill="${E.slate}"/>
    <g fill="${E.mustard}">
      <rect x="16.4" y="18" width="2" height="3"/><rect x="19.6" y="18" width="2" height="3"/>
      <rect x="16.4" y="24" width="2" height="3"/><rect x="19.6" y="24" width="2" height="3"/>
      <rect x="35" y="23" width="2" height="3"/><rect x="37.8" y="23" width="2" height="3"/>
      <rect x="35" y="29" width="2" height="3"/><rect x="6.4" y="29" width="2" height="3"/>
    </g>
    <circle cx="38" cy="10" r="4.4" fill="${E.mustard}" opacity=".9"/>`),
  car: ed(`
    <path d="M7 33c0-4.6 2.4-7.4 5.8-7.4h4.2l4-5.6h8.6c2 0 3.2 1.6 4.2 5.6l4 .6c1.8.3 2.8 1.6 2.8 3.4V33z" fill="${E.clay}"/>
    <path d="M21.6 25.6h7.2l-2.4-4h-5z" fill="${E.sky}"/>
    <path d="M19.6 25.6h-3.2c-1.4 0-2.2 1.4-2.8 3.8h6z" fill="${E.sky}"/>
    <circle cx="15" cy="33.6" r="4.6" fill="${E.ink}"/><circle cx="15" cy="33.6" r="1.7" fill="${E.paper}"/>
    <circle cx="34" cy="33.6" r="4.6" fill="${E.ink}"/><circle cx="34" cy="33.6" r="1.7" fill="${E.paper}"/>
    <path d="M5 39h38" stroke="${E.ink}" stroke-width="1.4" stroke-linecap="round"/>`),
  // No object exists, so the notation becomes the object. This is what editorial does when
  // it has to draw inflation, or grief, or a tax code.
  calculus: ed(`
    <path d="M8 40q10-2 13-13T34 8" stroke="${E.slate}" stroke-width="2.2" fill="none" stroke-linecap="round"/>
    <path d="M8 40h32M10 42V10" stroke="${E.ink}" stroke-width="1.4" stroke-linecap="round"/>
    <path d="M31 12c2.6-4 6.6-3.4 6.6-.6 0 4.6-7.2 8-7.2 16.6 0 3 4 3.6 6.6-.4"
      stroke="${E.clay}" stroke-width="2.6" fill="none" stroke-linecap="round"/>`),
  bitcoin: ed(`
    <circle cx="24" cy="24" r="15" fill="${E.mustard}"/>
    <circle cx="21.4" cy="21.4" r="15" fill="${E.clay}" opacity=".4"/>
    <g fill="${E.ink}">
      <path d="M19.4 13.4h2.8v21.2h-2.8zM23.8 13.4h2.8v21.2h-2.8z"/>
      <path d="M20 16.6h7.2c2.9 0 4.8 1.7 4.8 4.2s-1.9 4.2-4.8 4.2H20zM20 25h7.8c3.1 0 5 1.7 5 4.2s-1.9 4.2-5 4.2H20z"/>
    </g>`),
};


// ======================================================================================
// 0. COSMIC — carried forward and extended to all twelve, drawn as fairly as I can.
// Its system is one thing lit against darkness. That turns out to have an answer for a
// scene (silhouette against a glow) and even for an abstraction (make the notation emit).
// ======================================================================================
const K = { void: "#080B14" };
const ck = (body, defs = "") =>
  A(`<rect x="2" y="2" width="44" height="44" rx="7" fill="${K.void}"/><g clip-path="url(#tile)">${body}</g>`,
    `<defs>${TILE}${defs}</defs>`);
const cosmic = {
  star: ck(`<circle cx="24" cy="24" r="21" fill="url(#ck-s-h)"/>
    <path d="M24 7.2c2.2 9.8 6.8 14.4 16.6 16.6-9.8 2.2-14.4 6.8-16.6 16.6-2.2-9.8-6.8-14.4-16.6-16.6 9.8-2.2 14.4-6.8 16.6-16.6z" fill="url(#ck-s-b)"/>
    <circle cx="24" cy="24" r="8" fill="#FFFDF6"/>`,
    `<radialGradient id="ck-s-h"><stop offset=".12" stop-color="#FFD15C" stop-opacity=".85"/><stop offset=".55" stop-color="#FF7A3C" stop-opacity=".25"/><stop offset="1" stop-color="#FF7A3C" stop-opacity="0"/></radialGradient>
     <radialGradient id="ck-s-b"><stop offset="0" stop-color="#FFFFFF"/><stop offset=".4" stop-color="#FFE08A"/><stop offset="1" stop-color="#FF9A3C" stop-opacity=".5"/></radialGradient>`),
  water: ck(`<path d="M24 6c8.4 10.4 13 17 13 22.4a13 13 0 0 1-26 0C11 23 15.6 16.4 24 6z" fill="url(#ck-w-b)"/>
    <ellipse cx="18.6" cy="31" rx="3" ry="5" fill="#EAF8FF" opacity=".8" transform="rotate(-18 18.6 31)"/>
    <path d="M24 6c8.4 10.4 13 17 13 22.4a13 13 0 0 1-26 0" stroke="url(#ck-w-r)" stroke-width="1.3" fill="none"/>`,
    `<radialGradient id="ck-w-b" cx=".36" cy=".28" r=".9"><stop offset="0" stop-color="#A8ECFF"/><stop offset=".55" stop-color="#2E82C6"/><stop offset="1" stop-color="#0B2A4E"/></radialGradient>
     <linearGradient id="ck-w-r" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#EAF8FF" stop-opacity=".95"/><stop offset="1" stop-color="#EAF8FF" stop-opacity="0"/></linearGradient>`),
  earth: ck(`<circle cx="24" cy="24" r="20" fill="url(#ck-t-a)"/><circle cx="24" cy="24" r="17" fill="url(#ck-t-s)"/>
    <g clip-path="url(#ck-t-c)" opacity=".95">
      <path d="M10 19.6c4.6-1.8 7.8.6 11 0 3.2-.6 4.6-3 8.4-2.2 2.8.6 3.6 3.2 1.6 5-2.6 2.4-6.8 1.4-9.8 3.2-3.2 1.8-2.6 5-6.2 5.2-3.6.2-6-2.2-6-5.6z" fill="#3E9E6B"/>
      <path d="M17 34c2.8-1.8 5.6-.4 8.6-1 2.6-.4 4.2-2 6.2-1 1.8 1 1.4 3.2-.6 4.6-3.6 2.2-8 3-11.6 1.8-2.4-.8-3.6-2.8-2.6-4.4z" fill="#3E9E6B"/>
      <circle cx="24" cy="24" r="17" fill="url(#ck-t-t)"/></g>
    <path d="M24 7.2a17 17 0 0 1 12 5" stroke="#CFF3FF" stroke-width="1.4" fill="none" stroke-linecap="round"/>`,
    `<clipPath id="ck-t-c"><circle cx="24" cy="24" r="17"/></clipPath>
     <radialGradient id="ck-t-a"><stop offset=".82" stop-color="#7FD6FF" stop-opacity="0"/><stop offset=".9" stop-color="#7FD6FF" stop-opacity=".5"/><stop offset="1" stop-color="#7FD6FF" stop-opacity="0"/></radialGradient>
     <radialGradient id="ck-t-s" cx=".36" cy=".3" r=".9"><stop offset="0" stop-color="#5FBEF0"/><stop offset=".68" stop-color="#1D5E9E"/><stop offset="1" stop-color="#0A2036"/></radialGradient>
     <radialGradient id="ck-t-t" cx=".34" cy=".28" r=".92"><stop offset=".48" stop-color="#000" stop-opacity="0"/><stop offset="1" stop-color="#00040B" stop-opacity=".85"/></radialGradient>`),
  life: ck(`<ellipse cx="24" cy="30" rx="20" ry="16" fill="url(#ck-l-h)"/>
    <path d="M24 43V22" stroke="#9FE08A" stroke-width="2.2" stroke-linecap="round"/>
    <path d="M24 26c-8.4 0-13-4.8-13-10.4C19.4 14 24 18 24 26z" fill="url(#ck-l-a)"/>
    <path d="M24 21c0-7.6 5.6-12.4 13-11-.4 5.6-5 10.4-13 11z" fill="url(#ck-l-b)"/>
    <circle cx="24" cy="13" r="3" fill="#FFF3C4"/>`,
    `<radialGradient id="ck-l-h"><stop offset=".1" stop-color="#5BE08A" stop-opacity=".35"/><stop offset="1" stop-color="#5BE08A" stop-opacity="0"/></radialGradient>
     <linearGradient id="ck-l-a" x1="0" x2="1"><stop offset="0" stop-color="#2E7A4E"/><stop offset="1" stop-color="#9FE08A"/></linearGradient>
     <linearGradient id="ck-l-b" x1="1" x2="0"><stop offset="0" stop-color="#2E7A4E"/><stop offset="1" stop-color="#C8F0A0"/></linearGradient>`),
  human: ck(`<circle cx="24" cy="18" r="19" fill="url(#ck-h-h)"/>
    <path d="M12 44c0-9.4 5.4-15.6 12-15.6S36 34.6 36 44z" fill="#070B16"/>
    <circle cx="24" cy="18" r="8.6" fill="#070B16"/>
    <circle cx="24" cy="18" r="5" fill="url(#ck-h-m)"/>`,
    `<radialGradient id="ck-h-h"><stop offset=".1" stop-color="#9FD8FF" stop-opacity=".55"/><stop offset=".6" stop-color="#6B7BE8" stop-opacity=".2"/><stop offset="1" stop-color="#6B7BE8" stop-opacity="0"/></radialGradient>
     <radialGradient id="ck-h-m"><stop offset="0" stop-color="#FFFFFF"/><stop offset=".55" stop-color="#9FD8FF"/><stop offset="1" stop-color="#9FD8FF" stop-opacity="0"/></radialGradient>`),
  fire: ck(`<ellipse cx="24" cy="28" rx="19" ry="18" fill="url(#ck-f-h)"/>
    <path d="M24 6c9.6 9.6 14.6 15.8 14.6 21.6a14.6 14.6 0 0 1-29.2 0C9.4 21.8 14.4 15.6 24 6z" fill="url(#ck-f-a)"/>
    <path d="M24 17c5.8 5.8 8.8 9.6 8.8 13a8.8 8.8 0 0 1-17.6 0c0-3.4 3-7.2 8.8-13z" fill="url(#ck-f-b)"/>
    <path d="M24 27c2.4 2.4 3.6 4 3.6 5.4a3.6 3.6 0 0 1-7.2 0c0-1.4 1.2-3 3.6-5.4z" fill="#FFF6DC"/>`,
    `<radialGradient id="ck-f-h"><stop offset=".1" stop-color="#FF8A2E" stop-opacity=".5"/><stop offset="1" stop-color="#FF8A2E" stop-opacity="0"/></radialGradient>
     <linearGradient id="ck-f-a" x1="0" y1="1" x2="0" y2="0"><stop offset="0" stop-color="#FFB03C"/><stop offset="1" stop-color="#C4331A" stop-opacity=".7"/></linearGradient>
     <linearGradient id="ck-f-b" x1="0" y1="1" x2="0" y2="0"><stop offset="0" stop-color="#FFE9A8"/><stop offset="1" stop-color="#FF9A2E"/></linearGradient>`),
  hunting: ck(`<rect x="2" y="2" width="44" height="44" fill="url(#ck-n-sky)"/>
    <circle cx="33" cy="17" r="6.4" fill="url(#ck-n-sun)"/>
    <path d="M2 34q11-5 22-1t22-3v16H2z" fill="#05070E"/>
    <g fill="#05070E"><circle cx="11" cy="21" r="3"/>
      <path d="M11 24.4c-3 0-5 2.4-5.2 5.6l1.2 6h1.8l.6-5 1.4 5h1.8l1.4-5 .6 5h1.8l1.2-6c-.2-3.2-2.2-5.6-5.2-5.6z"/>
      <path d="M31 31.6c0-4 2.6-6.8 6-6.8s6 2.8 6 6.8l-1 5.4h-1.8l-.6-3.8-1 3.8h-3.2l-1-3.8-.6 3.8H32z"/>
      <path d="M34.4 25.2l-2.2-4.2M39.6 25.2l2.2-4.2" stroke="#05070E" stroke-width="1.5" stroke-linecap="round"/></g>
    <path d="M8 14l14 8" stroke="#FFD98A" stroke-width="1.3" stroke-linecap="round" opacity=".9"/>`,
    `<linearGradient id="ck-n-sky" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#2A2450"/><stop offset=".6" stop-color="#8A4A52"/><stop offset="1" stop-color="#E08A4A"/></linearGradient>
     <radialGradient id="ck-n-sun"><stop offset=".3" stop-color="#FFE9A8"/><stop offset="1" stop-color="#FFB03C" stop-opacity="0"/></radialGradient>`),
  tribe: ck(`<ellipse cx="24" cy="32" rx="21" ry="15" fill="url(#ck-b-h)"/>
    <path d="M24 23c5.2 5.2 8 8.8 8 12.2a8 8 0 0 1-16 0c0-3.4 2.8-7 8-12.2z" fill="url(#ck-b-f)"/>
    <path d="M24 30c2.4 2.4 3.6 4 3.6 5.2a3.6 3.6 0 0 1-7.2 0c0-1.2 1.2-2.8 3.6-5.2z" fill="#FFF6DC"/>
    <g fill="#05070E"><g><circle cx="8" cy="18" r="2.8"/><path d="M8 21.2c-2.8 0-4.6 2.2-4.8 5.2l1 4.6h1.6l.6-4.2 1 4.2h1.2l1-4.2.6 4.2h1.6l1-4.6c-.2-3-2-5.2-4.8-5.2z"/></g><g><circle cx="40" cy="18" r="2.8"/><path d="M40 21.2c-2.8 0-4.6 2.2-4.8 5.2l1 4.6h1.6l.6-4.2 1 4.2h1.2l1-4.2.6 4.2h1.6l1-4.6c-.2-3-2-5.2-4.8-5.2z"/></g><g><circle cx="7" cy="35" r="2.8"/><path d="M7 38.2c-2.8 0-4.6 2.2-4.8 5.2l1 4.6h1.6l.6-4.2 1 4.2h1.2l1-4.2.6 4.2h1.6l1-4.6c-.2-3-2-5.2-4.8-5.2z"/></g><g><circle cx="41" cy="35" r="2.8"/><path d="M41 38.2c-2.8 0-4.6 2.2-4.8 5.2l1 4.6h1.6l.6-4.2 1 4.2h1.2l1-4.2.6 4.2h1.6l1-4.6c-.2-3-2-5.2-4.8-5.2z"/></g></g>`,
    `<radialGradient id="ck-b-h"><stop offset=".1" stop-color="#FF9A3C" stop-opacity=".45"/><stop offset="1" stop-color="#FF9A3C" stop-opacity="0"/></radialGradient>
     <linearGradient id="ck-b-f" x1="0" y1="1" x2="0" y2="0"><stop offset="0" stop-color="#FFC24B"/><stop offset="1" stop-color="#C4331A" stop-opacity=".75"/></linearGradient>`),
  city: ck(`<rect x="2" y="2" width="44" height="44" fill="url(#ck-c-sky)"/>
    <circle cx="36" cy="13" r="8" fill="url(#ck-c-glow)"/>
    <path d="M2 44V26h7v18zM11 44V16h8v28zM21 44V30h6v14zM29 44V20h7v24zM38 44V28h8v16z" fill="#05070E"/>
    <g fill="#FFD98A">
      <rect x="13" y="20" width="1.8" height="2.4"/><rect x="16" y="20" width="1.8" height="2.4"/>
      <rect x="13" y="26" width="1.8" height="2.4"/><rect x="16" y="26" width="1.8" height="2.4"/>
      <rect x="31" y="24" width="1.8" height="2.4"/><rect x="34" y="24" width="1.8" height="2.4"/>
      <rect x="31" y="30" width="1.8" height="2.4"/><rect x="4" y="31" width="1.8" height="2.4"/>
      <rect x="40" y="33" width="1.8" height="2.4"/><rect x="23" y="35" width="1.8" height="2.4"/>
    </g>`,
    `<linearGradient id="ck-c-sky" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#141A34"/><stop offset="1" stop-color="#4A3A6A"/></linearGradient>
     <radialGradient id="ck-c-glow"><stop offset=".2" stop-color="#FFD98A" stop-opacity=".65"/><stop offset="1" stop-color="#FFD98A" stop-opacity="0"/></radialGradient>`),
  car: ck(`<rect x="2" y="2" width="44" height="44" fill="url(#ck-r-sky)"/>
    <path d="M2 32h44v14H2z" fill="#070B16"/>
    <ellipse cx="9" cy="31" rx="13" ry="7" fill="url(#ck-r-beam)"/>
    <path d="M8 32c0-4.8 2.6-7.6 6-7.6h4.4l4-5.8h8.8c2 0 3.4 1.6 4.4 5.8l4 .6c1.8.3 2.8 1.6 2.8 3.4V32z" fill="#0E1426"/>
    <path d="M21.6 24.4h7.4l-2.4-4.2h-5.2z" fill="#3A5680"/>
    <path d="M19.6 24.4h-3.2c-1.4 0-2.4 1.4-3 4h6.2z" fill="#3A5680"/>
    <circle cx="15" cy="32.6" r="4" fill="#05070E"/><circle cx="34" cy="32.6" r="4" fill="#05070E"/>
    <circle cx="9.4" cy="28.6" r="1.8" fill="#FFF3C4"/>`,
    `<linearGradient id="ck-r-sky" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#171C36"/><stop offset="1" stop-color="#7A4A5A"/></linearGradient>
     <radialGradient id="ck-r-beam"><stop offset=".1" stop-color="#FFE9A8" stop-opacity=".55"/><stop offset="1" stop-color="#FFE9A8" stop-opacity="0"/></radialGradient>`),
  calculus: ck(`<path d="M8 40h32M10 42V10" stroke="#5E7BA8" stroke-width="1.3" stroke-linecap="round"/>
    <path d="M10 40q11-2 14-13T36 10V40z" fill="url(#ck-x-a)"/>
    <path d="M10 40q11-2 14-13T36 10" stroke="url(#ck-x-l)" stroke-width="2.2" fill="none" stroke-linecap="round"/>
    <circle cx="24" cy="27" r="7" fill="url(#ck-x-g)"/>`,
    `<linearGradient id="ck-x-a" x1="0" y1="1" x2="0" y2="0"><stop offset="0" stop-color="#4FA8E8" stop-opacity=".45"/><stop offset="1" stop-color="#9FD8FF" stop-opacity=".05"/></linearGradient>
     <linearGradient id="ck-x-l" x1="0" x2="1"><stop offset="0" stop-color="#9FD8FF"/><stop offset="1" stop-color="#FFF3C4"/></linearGradient>
     <radialGradient id="ck-x-g"><stop offset=".1" stop-color="#FFF3C4" stop-opacity=".5"/><stop offset="1" stop-color="#FFF3C4" stop-opacity="0"/></radialGradient>`),
  bitcoin: ck(`<circle cx="24" cy="24" r="20" fill="url(#ck-z-h)"/>
    <circle cx="24" cy="24" r="14" fill="url(#ck-z-b)"/>
    <g fill="#2A1400">
      <path d="M19.6 13.8h2.6v20.4h-2.6zM23.8 13.8h2.6v20.4h-2.6z"/>
      <path d="M20 16.8h6.8c2.8 0 4.6 1.6 4.6 4s-1.8 4-4.6 4H20zM20 25h7.4c3 0 4.8 1.6 4.8 4s-1.8 4-4.8 4H20z"/>
    </g>`,
    `<radialGradient id="ck-z-h"><stop offset=".3" stop-color="#FFA83C" stop-opacity=".5"/><stop offset="1" stop-color="#FFA83C" stop-opacity="0"/></radialGradient>
     <radialGradient id="ck-z-b" cx=".34" cy=".3"><stop offset="0" stop-color="#FFE9A8"/><stop offset=".55" stop-color="#F7931A"/><stop offset="1" stop-color="#9A4E06"/></radialGradient>`),
};

export const twelveStyles = { cosmic, screenprint, harper, editorial };
export const twelveNotes = {
  cosmic: "Carried forward. The sublime painted straight, no ornament, the thing itself doing the work. It was the only survivor of the last round.",
  screenprint: "A national park poster. Flat inks, a horizon, and light doing all the work. Built to make a place look glorious, so a scene with people in it is native rather than awkward.",
  harper: "After Charley Harper, who spent a career reducing nature to the fewest shapes that still make it that thing. Flat colour, no outline, and the joke lives in the reduction.",
  editorial: "The style that exists to draw ideas. Limited palette, grain, one metaphor per picture, and notation used as the object when there is no object to draw.",
};
export const twelveSubjects = [
  ["star", "Star"], ["water", "Water"], ["earth", "Earth"], ["life", "Life"],
  ["human", "Human"], ["fire", "Fire"], ["hunting", "Hunting"], ["tribe", "Tribe"],
  ["city", "City"], ["car", "Car"], ["calculus", "Calculus"], ["bitcoin", "Bitcoin"],
];
export const ED_DEFS = `<svg width="0" height="0" style="position:absolute"><defs>
  <filter id="ed-grain" x="-5%" y="-5%" width="110%" height="110%">
    <feTurbulence type="fractalNoise" baseFrequency="1.2" numOctaves="2" seed="5" result="n"/>
    <feColorMatrix in="n" type="saturate" values="0" result="g"/>
    <feComponentTransfer in="g" result="a"><feFuncA type="linear" slope=".3"/></feComponentTransfer>
    <feComposite in="a" in2="SourceGraphic" operator="in" result="grain"/>
    <feMerge><feMergeNode in="SourceGraphic"/><feMergeNode in="grain"/></feMerge>
  </filter>
</defs></svg>`;
