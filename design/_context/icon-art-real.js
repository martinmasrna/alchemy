// Round 7. The rule changed: colour is no longer a free variable.
//
// Every style below draws from the SAME palette, and that palette is what a person already
// expects a thing to be — sea is blue, land is green, a star is yellow-white, lava would be
// orange. Not what it "actually" is; what someone recognises without being told. The airbrush
// Earth was a purple planet with a ring, and it was only Earth because a label said so.
//
// So the only variable here is the art style: how a thing is drawn, never what colour it is.
import { furtherStyles } from "./icon-art-further.js";

// ---- the shared palette. Every column uses these and only these ------------------------
export const C = {
  hot: "#FFF7E0", sun: "#FFC63F", sunDeep: "#EF8A22", ember: "#BF4718",
  sky: "#8FD9F7", sea: "#2E82C6", seaDeep: "#14456F", abyss: "#0A2440",
  land: "#54AC63", landDeep: "#2E7442",
  cloud: "#F4F8FB",
  neb: "#8E6BE8", nebWarm: "#E265A6", nebCool: "#4FC7D8", nebDeep: "#2B1B54",
  field: "#37518A", fieldDeep: "#1A2544", fieldLine: "#9DB6DE",
};

const A = (body, defs = "") => `<svg viewBox="0 0 48 48" fill="none" aria-hidden="true">${defs}${body}</svg>`;
const STAR = "M24 7.2c2.2 9.8 6.8 14.4 16.6 16.6-9.8 2.2-14.4 6.8-16.6 16.6-2.2-9.8-6.8-14.4-16.6-16.6 9.8-2.2 14.4-6.8 16.6-16.6z";
const DROP = "M24 5c8 10 12.4 16.4 12.4 22a12.4 12.4 0 0 1-24.8 0C11.6 21.4 16 15 24 5z";
const BLOB = "M11 20c0-6.4 7-10.2 12.4-7.6 6-5.6 16.4-1.8 16.4 6.4 4 2.6 3.6 10-2.4 12-3.8 6.2-14 6.4-18.6 2.2-8 .4-11-7.6-7.8-13z";
// Continents that are not any real place, but are shaped enough like land to read as land.
const LAND_N = "M10 18c4.6-1.6 7.8.6 11 0 3.2-.6 4.6-3.2 8.4-2.4 2.8.6 3.6 3.2 1.6 5-2.6 2.6-7 1.6-10 3.4-3.2 1.8-2.6 5-6.4 5.2-3.6.2-5.8-2.4-5.8-5.6z";
const LAND_S = "M17 34.4c2.8-1.8 5.8-.4 9-1 2.6-.4 4.2-2 6.4-1 2 .9 1.6 3.4-.6 4.6-3.8 2.2-8.6 3-12.2 1.8-2.6-.8-3.6-3-2.6-4.4z";
const burst = (n, rOut, rIn, cx = 24, cy = 24) => {
  const pts = [];
  for (let i = 0; i < n * 2; i++) {
    const a = (Math.PI * i) / n, r = i % 2 ? rIn : rOut;
    pts.push(`${(cx + r * Math.cos(a)).toFixed(2)} ${(cy - r * Math.sin(a)).toFixed(2)}`);
  }
  return `M${pts.join("L")}Z`;
};

// ---- 1. cel: a comic frame. Key line, flat local colour, one hard shadow, one hard light --
// The outline is never black: it is a deep tone of the object's own colour, which is what
// keeps a set of cel drawings from looking like clip art.
const cel = (stroke, body) =>
  A(`<g stroke="${stroke}" stroke-width="2" stroke-linejoin="round" stroke-linecap="round">${body}</g>`);
const celStyles = {
  energy: cel(C.ember, `
    <path d="${burst(8, 21, 6.4)}" fill="${C.sunDeep}"/>
    <path d="${burst(8, 13.4, 4.2)}" fill="${C.sun}" transform="rotate(22.5 24 24)"/>
    <circle cx="24" cy="24" r="4.4" fill="${C.hot}"/>`),
  gravity: cel(C.fieldDeep, `
    <path d="M3 15c10 0 11.4 5.4 15.2 12.4 2.2 4 3.8 5.6 5.8 5.6s3.6-1.6 5.8-5.6C33.6 20.4 35 15 45 15v5.4c-6.6 0-7.6 4-11 10.4-2.8 5.2-5.6 8-10 8s-7.2-2.8-10-8C10.6 24.8 9.6 20.4 3 20.4z" fill="${C.field}"/>
    <circle cx="24" cy="38.2" r="6.6" fill="${C.sun}"/>
    <path d="M24 31.6a6.6 6.6 0 0 1 0 13.2 6.6 6.6 0 0 0 0-13.2z" fill="${C.sunDeep}" stroke="none"/>
    <circle cx="21.4" cy="35.6" r="1.5" fill="${C.hot}" stroke="none"/>`),
  star: cel(C.ember, `
    <path d="${STAR}" fill="${C.sun}"/>
    <path d="M24 7.2c2.2 9.8 6.8 14.4 16.6 16.6-9.8 2.2-14.4 6.8-16.6 16.6z" fill="${C.sunDeep}" stroke="none"/>
    <circle cx="24" cy="23.8" r="3.8" fill="${C.hot}" stroke="none"/>`),
  nebula: cel(C.nebDeep, `
    <path d="${BLOB}" fill="${C.neb}"/>
    <path d="M19 22.6c0-3.8 4.4-6 7.6-4.6 3.6-3.2 10-1 10 4 2.6 1.6 2 6.2-1.6 7.4-2.4 3.8-8.6 3.6-11.4 1.2-4.8.2-6.8-4.6-4.6-8z" fill="${C.nebWarm}" stroke="none"/>
    <path d="M24 24.6c0-2 2.4-3.2 4.2-2.4 2-1.6 5.4.2 5.2 2.6 1.2 1-.2 3.2-2 3.6-1.2 2-4.4 1.8-6 .6-2.6 0-3.2-3-1.4-4.4z" fill="${C.nebCool}" stroke="none" opacity=".85"/>
    <circle cx="14.4" cy="16.2" r="1.7" fill="${C.cloud}" stroke="none"/>
    <circle cx="37.4" cy="32.8" r="1.4" fill="${C.cloud}" stroke="none"/>`),
  water: cel(C.seaDeep, `
    <path d="${DROP}" fill="${C.sea}"/>
    <path d="M24 5c8 10 12.4 16.4 12.4 22a12.4 12.4 0 0 1-12.4 12.4z" fill="${C.abyss}" stroke="none" opacity=".45"/>
    <path d="M18.4 29c0-2.6 1.4-5.6 3.6-8.8-3.8 4.2-6 7.6-6 10.6 0 2.4 1.2 4.4 3.2 5.6-.5-2.4-.8-4.8-.8-7.4z" fill="${C.sky}" stroke="none"/>`),
  earth: cel(C.abyss, `
    <circle cx="24" cy="24" r="19" fill="${C.sea}"/>
    <path d="${LAND_N}" fill="${C.land}"/>
    <path d="${LAND_S}" fill="${C.land}"/>
    <path d="M24 5a19 19 0 0 1 0 38 19 19 0 0 0 0-38z" fill="${C.abyss}" stroke="none" opacity=".35"/>
    <path d="M9.6 14.6q6.4-2.6 12.8 0" stroke="${C.cloud}" stroke-width="2.6" fill="none" opacity=".9"/>
    <path d="M27 36.6q5-2 10 0" stroke="${C.cloud}" stroke-width="2.2" fill="none" opacity=".75"/>`),
};

// ---- 2. gouache: painted. Rough edges, layered tone, visible grain ----------------------
// The edges are displaced by noise, so no two are the same and none of them is a vector
// curve. This is the only style here that does not look like it came out of a computer.
const gou = (body) => A(`<g filter="url(#gou-brush)">${body}</g>`);
const gouache = {
  energy: gou(`
    <path d="${burst(9, 21, 6)}" fill="${C.sunDeep}"/>
    <path d="${burst(7, 14, 4.6)}" fill="${C.sun}" transform="rotate(16 24 24)"/>
    <circle cx="23.4" cy="23.6" r="5" fill="${C.hot}"/>`),
  gravity: gou(`
    <path d="M3 15c10 0 11.4 5.4 15.2 12.4 2.2 4 3.8 5.6 5.8 5.6s3.6-1.6 5.8-5.6C33.6 20.4 35 15 45 15v5.4c-6.6 0-7.6 4-11 10.4-2.8 5.2-5.6 8-10 8s-7.2-2.8-10-8C10.6 24.8 9.6 20.4 3 20.4z" fill="${C.field}"/>
    <circle cx="24" cy="38" r="6.8" fill="${C.sunDeep}"/>
    <circle cx="22.6" cy="36.6" r="5" fill="${C.sun}"/>
    <circle cx="21.4" cy="35.4" r="1.8" fill="${C.hot}"/>`),
  star: gou(`
    <path d="${STAR}" fill="${C.sunDeep}"/>
    <path d="M24 11c1.8 8 5.6 11.8 13.6 13.6-8 1.8-11.8 5.6-13.6 13.6-1.8-8-5.6-11.8-13.6-13.6 8-1.8 11.8-5.6 13.6-13.6z" fill="${C.sun}"/>
    <circle cx="23.6" cy="23.6" r="4.6" fill="${C.hot}"/>`),
  nebula: gou(`
    <path d="${BLOB}" fill="${C.nebDeep}"/>
    <ellipse cx="20" cy="21" rx="12" ry="9" fill="${C.neb}"/>
    <ellipse cx="29" cy="26" rx="10" ry="7.6" fill="${C.nebWarm}" opacity=".9"/>
    <ellipse cx="24" cy="24" rx="6.4" ry="5" fill="${C.nebCool}" opacity=".7"/>
    <circle cx="14" cy="15.4" r="1.6" fill="${C.cloud}"/><circle cx="37" cy="33" r="1.3" fill="${C.cloud}"/>`),
  water: gou(`
    <path d="${DROP}" fill="${C.seaDeep}"/>
    <path d="M24 9c6.2 8.2 9.6 13.2 9.6 17.8a9.6 9.6 0 0 1-19.2 0C14.4 22.2 17.8 17.2 24 9z" fill="${C.sea}"/>
    <ellipse cx="19.6" cy="29" rx="2.8" ry="4.6" fill="${C.sky}" transform="rotate(-16 19.6 29)"/>`),
  earth: gou(`
    <circle cx="24" cy="24" r="19" fill="${C.seaDeep}"/>
    <circle cx="22.8" cy="22.8" r="17.6" fill="${C.sea}"/>
    <path d="${LAND_N}" fill="${C.landDeep}"/>
    <path d="${LAND_N}" fill="${C.land}" transform="translate(-.8 -.8)"/>
    <path d="${LAND_S}" fill="${C.land}"/>
    <path d="M10.4 15.4q6.6-3 13.2-.4" stroke="${C.cloud}" stroke-width="3" fill="none" stroke-linecap="round" opacity=".85"/>
    <path d="M26.4 36q5.2-2.2 10.4-.4" stroke="${C.cloud}" stroke-width="2.4" fill="none" stroke-linecap="round" opacity=".7"/>`),
};

// ---- 3. pixel: a different medium entirely ---------------------------------------------
// 16 by 16 at three pixels a cell. Local colour is native here, shading is dithering, and
// nothing ever goes soft. A sprite is also the one drawing that cannot be done badly at
// small size, because small IS its size.
const PX = {
  ".": null, o: C.hot, y: C.sun, d: C.sunDeep, e: C.ember,
  b: C.sea, s: C.seaDeep, a: C.abyss, l: C.sky,
  g: C.land, G: C.landDeep, w: C.cloud,
  n: C.neb, m: C.nebWarm, c: C.nebCool, N: C.nebDeep,
  f: C.field, F: C.fieldDeep,
};
// Runs of the same colour merge into one rect, or a sheet of four styles is 6000 nodes.
const px = (rows, cell = 3) => {
  let out = "";
  rows.forEach((row, y) => {
    let x = 0;
    while (x < row.length) {
      const ch = row[x];
      let run = 1;
      while (x + run < row.length && row[x + run] === ch) run++;
      if (PX[ch]) out += `<rect x="${x * cell}" y="${y * cell}" width="${run * cell}" height="${cell}" fill="${PX[ch]}"/>`;
      x += run;
    }
  });
  return A(out);
};
const pixel = {
  energy: px([
    ".......dd.......",
    ".......dd.......",
    "..d....yy....d..",
    "...d...yy...d...",
    "....d..dd..d....",
    ".....d.yy.d.....",
    "ddddd..yy..ddddd",
    "..yyyyyooyyyyy..",
    "..yyyyyooyyyyy..",
    "ddddd..yy..ddddd",
    ".....d.yy.d.....",
    "....d..dd..d....",
    "...d...yy...d...",
    "..d....yy....d..",
    ".......dd.......",
    ".......dd.......",
  ]),
  gravity: px([
    "................",
    "ff............ff",
    "..ff........ff..",
    "....ff....ff....",
    "......f..f......",
    ".......ff.......",
    ".......ff.......",
    ".......ff.......",
    "......dddd......",
    ".....dyyyyd.....",
    "....dyoyyyyd....",
    "....dyyyyyyd....",
    ".....dyyyyd.....",
    "......dddd......",
    "................",
    "................",
  ]),
  star: px([
    ".......yy.......",
    ".......yy.......",
    "......dyyd......",
    "......dyyd......",
    ".....ddyydd.....",
    "....ddyyyydd....",
    "..ddyyyyyyyydd..",
    ".dyyyyyooyyyyyd.",
    ".dyyyyyooyyyyyd.",
    "..ddyyyyyyyydd..",
    "....ddyyyydd....",
    ".....ddyydd.....",
    "......dyyd......",
    "......dyyd......",
    ".......yy.......",
    ".......yy.......",
  ]),
  nebula: px([
    "................",
    "....w...........",
    "....NNNN........",
    "...NnnnnNN......",
    "..NnnnmmnnN.....",
    "..NnnmmmmnnNN...",
    ".NnnmmccmmmnnN..",
    ".NnmmccccmmmnnN.",
    ".NnnmmccmmmmnnN.",
    "..NnnmmmmmmnnN..",
    "...NnnnmmnnnN...",
    "....NNnnnnNN....",
    "......NNNN......",
    "...........w....",
    "................",
    "................",
  ]),
  water: px([
    ".......ss.......",
    ".......bb.......",
    "......sbbs......",
    "......bbbb......",
    ".....sbbbbs.....",
    ".....bbbbbb.....",
    "....sbbbbbbs....",
    "....blbbbbbb....",
    "...sblbbbbbbs...",
    "...bblbbbbbba...",
    "...bblbbbbbba...",
    "...sbbbbbbbas...",
    "....sbbbbbas....",
    ".....sbbbas.....",
    "......ssaa......",
    "................",
  ]),
  earth: px([
    "................",
    "....ssbbbbss....",
    "..ssbbggbbbbss..",
    "..sbbgggbbbbbs..",
    ".sbbggggbbggbbs.",
    ".sbwwbbbbggggbs.",
    "sbbbbbbbbgggbbbs",
    "sbbggbbbbbbggbbs",
    "sbbgggbbbbbgggbs",
    "sbbggbbbbbbbggas",
    ".sbbbbbbggbbbaa.",
    ".sbbbbggggbbaas.",
    "..sbbbggbbwwas..",
    "..ssbbbbbbaass..",
    "....ssaaaass....",
    "................",
  ]),
};

// ---- 4. glass: kept from the last round, since it led on hard edges ---------------------
// Reference column again, so this round is judged against something rather than remembered.
export const realStyles = { cel: celStyles, gouache, pixel, glass: furtherStyles.glass };
export const realNotes = {
  cel: "A comic frame. Key line, flat local colour, one hard shadow, one hard highlight. The outline is a deep tone of the object's own colour, never black.",
  gouache: "Painted. Edges roughed by noise so none of them is a vector curve, tone laid over tone. The only column that does not look like it came out of a computer.",
  pixel: "A different medium entirely. Sixteen by sixteen, three pixels a cell. Shading is dithering, nothing ever goes soft, and small is its native size rather than a compromise.",
  glass: "Carried forward from the last round, recoloured to the shared palette. It led on hard edges, so it is here to be beaten.",
};
export const realSubjects = [
  ["energy", "Energy"], ["gravity", "Gravity"], ["star", "Star"],
  ["nebula", "Nebula"], ["water", "Water"], ["earth", "Earth"],
];
export const GOU_DEFS = `<svg width="0" height="0" style="position:absolute"><defs>
  <filter id="gou-brush" x="-20%" y="-20%" width="140%" height="140%">
    <feTurbulence type="fractalNoise" baseFrequency=".055" numOctaves="3" seed="9" result="n"/>
    <feDisplacementMap in="SourceGraphic" in2="n" scale="3.2" xChannelSelector="R" yChannelSelector="G" result="d"/>
    <feTurbulence type="fractalNoise" baseFrequency="1.1" numOctaves="2" seed="4" result="g"/>
    <feColorMatrix in="g" type="saturate" values="0" result="gg"/>
    <feComponentTransfer in="gg" result="ga"><feFuncA type="linear" slope=".22"/></feComponentTransfer>
    <feComposite in="ga" in2="d" operator="in" result="grain"/>
    <feMerge><feMergeNode in="d"/><feMergeNode in="grain"/></feMerge>
  </filter>
</defs></svg>`;
