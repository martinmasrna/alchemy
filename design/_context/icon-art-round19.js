// Round 19. The last one.
//
// Eighteen rounds of taxonomy have run out of road, so this is four ideas rather than four
// points on an axis. Each one is a different answer to a question nobody asked yet.
//
//   constellation  what if the icon were the oldest thing humans ever did with the sky:
//                  join dots and insist they are a bull, a hunter, a drop of water
//   mural          what if there were one continuous painting and every icon were a window
//                  cut into it, so the grid is a shattered fresco rather than a shelf
//   relief         what if the thing were not drawn but pressed into something, and the light
//                  raking across it did all the work
//   reflection     what if every thing came with its own still water, so the grid is calm and
//                  every colour is stated twice
//
// Constellation is the one that is actually about this game: a person looking at unrelated
// points and deciding they mean something is exactly what the player does all session.
export const subjects6 = [
  ["star", "Star"], ["water", "Water"], ["earth", "Earth"],
  ["human", "Human"], ["fire", "Fire"], ["bitcoin", "Bitcoin"],
];
const box = (b, d = "") => `<svg viewBox="0 0 48 48" fill="none" aria-hidden="true">${d}${b}</svg>`;
const C = {
  sun: "#F5B93C", sunLt: "#FFE9A8", sunDk: "#C46A12", hot: "#FFF7E0", ember: "#D8451C",
  sea: "#2E82C6", seaLt: "#A8E6FF", seaDk: "#123E68", abyss: "#08203A",
  land: "#4FA368", landDk: "#2B6B45", cloud: "#F0F6FA",
  skin: "#C98A5E", skinDk: "#6E4229", skinLt: "#F2D6B8",
  coin: "#F7931A", coinDk: "#8A4E06", coinLt: "#FFE0A8", ink: "#2A1A08",
};

// =========================================================================================
// 1. CONSTELLATION — points of light, and a line drawn between them by someone who decided
// they meant something. The player spends the whole session doing exactly this.
// =========================================================================================
const stars = (pts, joins, hue) => {
  const dots = pts.map(([x, y, m]) =>
    `<circle cx="${x}" cy="${y}" r="${m}" fill="#fff"/><circle cx="${x}" cy="${y}" r="${m * 2.6}" fill="${hue}" opacity=".3" filter="url(#r19-glow)"/>`).join("");
  const lines = joins.map(([a, b]) =>
    `<path d="M${pts[a][0]} ${pts[a][1]}L${pts[b][0]} ${pts[b][1]}" stroke="${hue}" stroke-width=".7" opacity=".5"/>`).join("");
  return lines + dots;
};
const sky = (hue, body) => box(
  `<g clip-path="url(#r19-tile)">
     <rect width="48" height="48" fill="#070912"/>
     <ellipse cx="24" cy="24" rx="22" ry="18" fill="${hue}" opacity=".14" filter="url(#r19-wash)"/>
     <g fill="#fff" opacity=".35"><circle cx="6" cy="8" r=".5"/><circle cx="42" cy="6" r=".45"/>
       <circle cx="44" cy="41" r=".5"/><circle cx="5" cy="39" r=".4"/><circle cx="30" cy="4" r=".35"/>
       <circle cx="12" cy="44" r=".4"/></g>
     ${body}
   </g>`);
const constellation = {
  star: sky(C.sun, stars(
    [[24, 20, 2.4], [14, 12, .9], [35, 14, 1], [38, 29, .85], [12, 30, .8], [24, 36, 1.1]],
    [[0, 1], [0, 2], [0, 3], [0, 4], [0, 5]], C.sunLt)),
  water: sky(C.sea, stars(
    [[24, 8, 1.1], [16, 22, .9], [13, 31, 1], [18, 38, .85], [30, 38, .85], [35, 31, 1], [32, 22, .9]],
    [[0, 1], [1, 2], [2, 3], [3, 4], [4, 5], [5, 6], [6, 0]], C.seaLt)),
  earth: sky(C.land, stars(
    [[24, 9, 1], [35, 15, .85], [39, 26, .9], [32, 36, .85], [20, 39, 1], [10, 31, .9], [9, 19, .85],
     [20, 22, 1.2], [29, 27, 1]],
    [[0, 1], [1, 2], [2, 3], [3, 4], [4, 5], [5, 6], [6, 0], [7, 8]], C.cloud)),
  human: sky(C.skin, stars(
    [[24, 9, 1.2], [24, 18, .9], [14, 22, .95], [34, 22, .95], [24, 28, .9], [17, 40, 1], [31, 40, 1]],
    [[0, 1], [1, 2], [1, 3], [1, 4], [4, 5], [4, 6]], C.skinLt)),
  fire: sky(C.ember, stars(
    [[24, 7, 1.2], [16, 20, .9], [12, 32, .95], [20, 40, .85], [30, 40, .85], [36, 31, .95], [31, 19, .9], [24, 30, 1.1]],
    [[0, 1], [1, 2], [2, 3], [3, 4], [4, 5], [5, 6], [6, 0], [2, 7], [7, 5]], C.sun)),
  bitcoin: sky(C.coin, stars(
    [[18, 10, 1], [18, 38, 1], [26, 10, .8], [26, 38, .8], [32, 17, .95], [26, 24, 1.1], [33, 31, .95]],
    [[0, 1], [0, 2], [2, 4], [4, 5], [5, 6], [6, 3], [3, 1], [5, 0]], C.coinLt)),
};

// =========================================================================================
// 2. MURAL — one continuous painting, and every icon is a window cut into it. Colour runs off
// every edge because it belongs to something larger, so the grid reads as a broken fresco
// rather than a shelf of objects.
// =========================================================================================
const mural = (id, field, subject, defs = "") => box(
  `<g clip-path="url(#r19-tile)" filter="url(#r19-paint)">${field}${subject}</g>`, `<defs>${defs}</defs>`);
const murals = {
  star: mural("star",
    `<rect width="48" height="48" fill="#3A2416"/>
     <path d="M-4 30q14-16 28-6t28-10v40h-56z" fill="#6E3A18"/>
     <path d="M-4 40q16-8 30 0t30-4v16h-60z" fill="#8A4A1E"/>`,
    `<circle cx="22" cy="18" r="12" fill="url(#mu-s)"/><circle cx="22" cy="18" r="5.4" fill="${C.hot}"/>`,
    `<radialGradient id="mu-s"><stop offset="0" stop-color="${C.sunLt}"/><stop offset="1" stop-color="${C.sunDk}"/></radialGradient>`),
  water: mural("water",
    `<rect width="48" height="48" fill="#16456E"/>
     <path d="M-4 22q12-10 26-2t30-8v40h-56z" fill="#1E6FA8"/>
     <path d="M-4 36q14-6 26 2t30-6v20h-56z" fill="#0C2C4C"/>`,
    `<path d="M26 10c7 9 10.6 14.8 10.6 19.6a10.6 10.6 0 0 1-21.2 0C15.4 24.8 19 19 26 10z" fill="url(#mu-w)"/>
     <ellipse cx="22" cy="28" rx="2" ry="3.4" fill="${C.cloud}" opacity=".6" transform="rotate(-16 22 28)"/>`,
    `<radialGradient id="mu-w" cx=".36" cy=".3"><stop offset="0" stop-color="${C.seaLt}"/><stop offset=".55" stop-color="${C.sea}"/><stop offset="1" stop-color="${C.seaDk}"/></radialGradient>`),
  earth: mural("earth",
    `<rect width="48" height="48" fill="#0A1A2E"/>
     <path d="M-4 34q14-10 28-2t28-8v28h-56z" fill="#1A3E2A"/>
     <path d="M-4 42q16-6 28 0t28-4v14h-56z" fill="#2B6B45"/>`,
    `<circle cx="26" cy="20" r="13" fill="url(#mu-e)"/>
     <path d="M15 17c4-1.4 6.6.6 9.4 0 2.6-.6 3.8-2.6 7-2 2.2.6 2.8 2.6 1.2 4-2.2 2-5.8 1.2-8.4 2.6-2.6 1.4-2.2 4.2-5.2 4.4-3 .2-5-1.8-5-4.6z" fill="${C.land}"/>`,
    `<radialGradient id="mu-e" cx=".36" cy=".3"><stop offset="0" stop-color="#5FB6EE"/><stop offset=".7" stop-color="${C.sea}"/><stop offset="1" stop-color="${C.abyss}"/></radialGradient>`),
  human: mural("human",
    `<rect width="48" height="48" fill="#6E4A2E"/>
     <path d="M-4 18q12-8 26-2t30-6v40h-56z" fill="#A8703E"/>
     <path d="M-4 38q14-6 28 2t28-4v16h-56z" fill="#4A2E1C"/>`,
    `<path d="M14 42c0-8.6 4.4-14 10-14s10 5.4 10 14z" fill="${C.skin}"/>
     <circle cx="24" cy="19.4" r="7.6" fill="${C.skinLt}"/>
     <path d="M24 11.8a7.6 7.6 0 0 1 0 15.2z" fill="${C.skinDk}" opacity=".3"/>`),
  fire: mural("fire",
    `<rect width="48" height="48" fill="#2A120E"/>
     <path d="M-4 28q14-14 28-4t28-8v36h-56z" fill="#5A1E12"/>
     <path d="M-4 40q16-6 28 2t28-4v14h-56z" fill="#14090A"/>`,
    `<path d="M24 9c8.6 8.6 13 14.4 13 19.8a13 13 0 0 1-26 0C11 23.4 15.4 17.6 24 9z" fill="url(#mu-fa)"/>
     <path d="M24 19c5 5 7.6 8.4 7.6 11.2a7.6 7.6 0 0 1-15.2 0c0-2.8 2.6-6.2 7.6-11.2z" fill="url(#mu-fb)"/>
     <path d="M24 28c2 2 3 3.4 3 4.6a3 3 0 0 1-6 0c0-1.2 1-2.6 3-4.6z" fill="#fff" opacity=".9"/>`,
    `<linearGradient id="mu-fa" x1="0" y1="1" x2="0" y2="0"><stop offset="0" stop-color="${C.sun}"/><stop offset="1" stop-color="${C.ember}" stop-opacity=".7"/></linearGradient>
     <linearGradient id="mu-fb" x1="0" y1="1" x2="0" y2="0"><stop offset="0" stop-color="${C.hot}"/><stop offset="1" stop-color="${C.sun}"/></linearGradient>`),
  bitcoin: mural("bitcoin",
    `<rect width="48" height="48" fill="#3E2A10"/>
     <path d="M-4 24q12-10 26-2t30-8v38h-56z" fill="#6E4A16"/>
     <path d="M-4 40q16-6 28 2t28-4v14h-56z" fill="#1E1408"/>`,
    `<circle cx="24" cy="22" r="13" fill="url(#mu-b)"/>
     <g fill="${C.ink}" transform="translate(24 22) scale(.86) translate(-24 -24)">
       <path d="M19.6 13.8h2.7v20.4h-2.7zM23.9 13.8h2.7v20.4h-2.7z"/>
       <path d="M20 16.9h7c2.9 0 4.8 1.7 4.8 4.2S29.9 25.3 27 25.3h-7zM20 25.1h7.7c3 0 4.9 1.7 4.9 4.2s-1.9 4.2-4.9 4.2H20z"/></g>`,
    `<radialGradient id="mu-b" cx=".34" cy=".28"><stop offset="0" stop-color="${C.coinLt}"/><stop offset=".6" stop-color="${C.coin}"/><stop offset="1" stop-color="${C.coinDk}"/></radialGradient>`),
};

// =========================================================================================
// 3. RELIEF — nothing is drawn. Everything is pressed into a surface, and a low light raking
// across from the upper left is what makes it visible at all. The colour is a pigment rub
// that has settled in the recesses, the way it does on anything old.
// =========================================================================================
const relief = (id, outer, inner, hue) => box(
  `<g clip-path="url(#r19-tile)">
     <rect width="48" height="48" fill="#8A8072"/>
     <rect width="48" height="48" fill="url(#re-grain)"/>
     <g fill="#5E564B" filter="url(#r19-emb)">${outer}</g>
     <g fill="#B8AE9E" filter="url(#r19-emb)" transform="translate(1.1 1.3)">${outer}</g>
     <g fill="#7E7568">${outer}</g>
     <g fill="${hue}" opacity=".42">${outer}</g>
     <g fill="#4E473D" filter="url(#r19-emb)" opacity=".85">${inner}</g>
     <g fill="#C6BCAA" filter="url(#r19-emb)" opacity=".7" transform="translate(.9 1)">${inner}</g>
     <g fill="${hue}" opacity=".55">${inner}</g>
   </g>`);
const R = {
  star: { o: `<path d="M24 8c2.2 9 6.4 13.2 15.4 15.4C30.4 25.6 26.2 29.8 24 38.8 21.8 29.8 17.6 25.6 8.6 23.4 17.6 21.2 21.8 17 24 8z"/>`, i: "" },
  water: { o: `<path d="M24 8c7.4 9.6 11.4 15.6 11.4 20.6a11.4 11.4 0 0 1-22.8 0C12.6 23.6 16.6 17.6 24 8z"/>`,
    i: `<path d="M19.4 27.6c0-2.2 1.1-4.8 3-7.8-3.2 3.5-5 6.3-5 8.7 0 2 .9 3.7 2.6 4.6-.4-1.8-.6-3.7-.6-5.5z"/>` },
  earth: { o: `<circle cx="24" cy="24" r="15.4"/>`,
    i: `<path d="M11.6 20c4.2-1.6 7-.4 9.8-1 3-.6 4.2-2.8 7.6-2 2.4.6 3 2.8 1.2 4.4-2.4 2.2-6.2 1.2-9 2.8-2.8 1.6-2.2 4.6-5.6 4.8-3 .2-5.2-2-5.2-5z"/>
       <path d="M18 32.6c2.4-1.6 5.2-.4 8-.8 2.2-.4 3.6-1.8 5.4-1 1.6.8 1.2 2.8-.6 3.8-3.2 1.8-7.2 2.6-10.2 1.6-2-.7-3-2.4-2.6-3.6z"/>` },
  human: { o: `<path d="M14 40c0-8.6 4.4-14 10-14s10 5.4 10 14z"/><circle cx="24" cy="17.4" r="7.6"/>`, i: "" },
  fire: { o: `<path d="M24 8c8.6 8.6 13 14.4 13 19.8a13 13 0 0 1-26 0C11 22.4 15.4 16.6 24 8z"/>`,
    i: `<path d="M24 18c5 5 7.6 8.4 7.6 11.2a7.6 7.6 0 0 1-15.2 0c0-2.8 2.6-6.2 7.6-11.2z"/>` },
  bitcoin: { o: `<circle cx="24" cy="24" r="14"/>`,
    i: `<path d="M19.6 13.8h2.7v20.4h-2.7zM23.9 13.8h2.7v20.4h-2.7z"/>
       <path d="M20 16.9h7c2.9 0 4.8 1.7 4.8 4.2S29.9 25.3 27 25.3h-7zM20 25.1h7.7c3 0 4.9 1.7 4.9 4.2s-1.9 4.2-4.9 4.2H20z"/>` },
};
const reliefs = Object.fromEntries(Object.entries({
  star: C.sun, water: C.sea, earth: C.land, human: C.skin, fire: C.ember, bitcoin: C.coin,
}).map(([id, hue]) => [id, relief(id, R[id].o, R[id].i, hue)]));

// =========================================================================================
// 4. REFLECTION — every thing comes with its own still water. The grid goes quiet, every
// colour is stated twice, and the horizontal line across each card is the same line on all
// thirty, which is a kind of order nothing else here has.
// =========================================================================================
const mirror = (body, defs = "") => box(
  `<g clip-path="url(#r19-tile)">
     <rect width="48" height="48" fill="#0B0E16"/>
     <g transform="translate(0 -3)">${body}</g>
     <g transform="translate(0 61) scale(1 -1)" opacity=".4" filter="url(#r19-ripple)">${body}</g>
     <rect y="29" width="48" height="19" fill="url(#re-fade)"/>
     <g stroke="#fff" stroke-width=".5" opacity=".18">
       <path d="M4 33h40M9 38h30M13 42h22"/></g>
     <path d="M0 29h48" stroke="#fff" stroke-width=".6" opacity=".22"/>
   </g>`, `<defs>${defs}</defs>`);
const reflection = {
  star: mirror(`<circle cx="24" cy="18" r="16" fill="url(#rf-sh)"/><circle cx="24" cy="18" r="8.6" fill="url(#rf-sc)"/><circle cx="24" cy="18" r="4" fill="${C.hot}"/>`,
    `<radialGradient id="rf-sh"><stop offset=".2" stop-color="${C.sun}" stop-opacity=".5"/><stop offset="1" stop-color="${C.sun}" stop-opacity="0"/></radialGradient>
     <radialGradient id="rf-sc"><stop offset="0" stop-color="${C.hot}"/><stop offset=".6" stop-color="${C.sun}"/><stop offset="1" stop-color="${C.sunDk}"/></radialGradient>`),
  water: mirror(`<path d="M24 6c6.8 8.8 10.4 14.4 10.4 19a10.4 10.4 0 0 1-20.8 0C13.6 20.4 17.2 14.8 24 6z" fill="url(#rf-w)"/>
    <ellipse cx="20.4" cy="23.4" rx="2" ry="3.4" fill="${C.cloud}" opacity=".6" transform="rotate(-16 20.4 23.4)"/>`,
    `<radialGradient id="rf-w" cx=".36" cy=".3"><stop offset="0" stop-color="${C.seaLt}"/><stop offset=".55" stop-color="${C.sea}"/><stop offset="1" stop-color="${C.seaDk}"/></radialGradient>`),
  earth: mirror(`<circle cx="24" cy="18" r="13.4" fill="url(#rf-e)"/>
    <path d="M12.6 15c3.6-1.4 6.2.6 8.8 0 2.6-.6 3.6-2.6 6.6-2 2.2.6 2.6 2.6 1 4-2 1.8-5.6 1.2-8 2.6-2.4 1.4-2 4-4.8 4.2-2.8.2-4.8-1.8-4.8-4.4z" fill="${C.land}"/>`,
    `<radialGradient id="rf-e" cx=".36" cy=".3"><stop offset="0" stop-color="#5FB6EE"/><stop offset=".7" stop-color="${C.sea}"/><stop offset="1" stop-color="${C.abyss}"/></radialGradient>`),
  human: mirror(`<path d="M16 32c0-7.4 3.6-12 8-12s8 4.6 8 12z" fill="${C.skin}"/>
    <circle cx="24" cy="13.6" r="6.6" fill="${C.skinLt}"/>
    <path d="M24 7a6.6 6.6 0 0 1 0 13.2z" fill="${C.skinDk}" opacity=".28"/>`),
  fire: mirror(`<path d="M24 5c7.8 7.8 11.8 13 11.8 18a11.8 11.8 0 0 1-23.6 0C12.2 18 16.2 12.8 24 5z" fill="url(#rf-fa)"/>
    <path d="M24 14.4c4.6 4.6 7 7.6 7 10.2a7 7 0 0 1-14 0c0-2.6 2.4-5.6 7-10.2z" fill="url(#rf-fb)"/>
    <path d="M24 22.6c1.9 1.9 2.8 3.1 2.8 4.1a2.8 2.8 0 0 1-5.6 0c0-1 .9-2.2 2.8-4.1z" fill="#fff" opacity=".9"/>`,
    `<linearGradient id="rf-fa" x1="0" y1="1" x2="0" y2="0"><stop offset="0" stop-color="${C.sun}"/><stop offset="1" stop-color="${C.ember}" stop-opacity=".7"/></linearGradient>
     <linearGradient id="rf-fb" x1="0" y1="1" x2="0" y2="0"><stop offset="0" stop-color="${C.hot}"/><stop offset="1" stop-color="${C.sun}"/></linearGradient>`),
  bitcoin: mirror(`<circle cx="24" cy="18" r="12.4" fill="url(#rf-b)"/>
    <g fill="${C.ink}" transform="translate(24 18) scale(.8) translate(-24 -24)">
      <path d="M19.6 13.8h2.7v20.4h-2.7zM23.9 13.8h2.7v20.4h-2.7z"/>
      <path d="M20 16.9h7c2.9 0 4.8 1.7 4.8 4.2S29.9 25.3 27 25.3h-7zM20 25.1h7.7c3 0 4.9 1.7 4.9 4.2s-1.9 4.2-4.9 4.2H20z"/></g>`,
    `<radialGradient id="rf-b" cx=".34" cy=".28"><stop offset="0" stop-color="${C.coinLt}"/><stop offset=".6" stop-color="${C.coin}"/><stop offset="1" stop-color="${C.coinDk}"/></radialGradient>`),
};

export const round19Styles = { constellation, mural: murals, relief: reliefs, reflection };
export const round19Notes = {
  constellation: "The oldest thing humans ever did with a sky: join unrelated points of light and insist they are a bull, a hunter, a drop of water. It is also exactly what the player does all session, looking at things that have nothing to do with each other and deciding they go together.",
  mural: "One continuous painting, and every icon is a window cut into it. Colour runs off all four edges because it belongs to something larger than the tile, so the grid reads as a shattered fresco rather than a shelf of objects.",
  relief: "Nothing is drawn. Everything is pressed into a surface, and a low light raking in from the upper left is the only reason it is visible. The colour is a pigment rub that has settled into the recesses, the way it does on anything old enough.",
  reflection: "Every thing comes with its own still water. The grid goes quiet, every colour is stated twice, and the horizontal line sits at the same height on all thirty cards, which is a kind of order nothing else in this search has.",
};
export const R19_DEFS = `<svg width="0" height="0" style="position:absolute"><defs>
  <clipPath id="r19-tile"><rect x="2" y="2" width="44" height="44" rx="8"/></clipPath>
  <filter id="r19-glow" x="-200%" y="-200%" width="500%" height="500%"><feGaussianBlur stdDeviation="1.4"/></filter>
  <filter id="r19-wash" x="-40%" y="-40%" width="180%" height="180%"><feGaussianBlur stdDeviation="5"/></filter>
  <filter id="r19-emb" x="-30%" y="-30%" width="160%" height="160%"><feGaussianBlur stdDeviation="1.1"/></filter>
  <filter id="r19-ripple" x="-20%" y="-20%" width="140%" height="140%">
    <feTurbulence type="fractalNoise" baseFrequency=".02 .18" numOctaves="2" seed="7" result="n"/>
    <feDisplacementMap in="SourceGraphic" in2="n" scale="3.4" xChannelSelector="R" yChannelSelector="G"/>
  </filter>
  <filter id="r19-paint" x="-15%" y="-15%" width="130%" height="130%">
    <feTurbulence type="fractalNoise" baseFrequency=".08" numOctaves="3" seed="19" result="n"/>
    <feDisplacementMap in="SourceGraphic" in2="n" scale="2.8" xChannelSelector="R" yChannelSelector="G" result="d"/>
    <feTurbulence type="fractalNoise" baseFrequency="1.2" numOctaves="2" seed="3" result="g"/>
    <feColorMatrix in="g" type="saturate" values="0" result="gg"/>
    <feComponentTransfer in="gg" result="ga"><feFuncA type="linear" slope=".2"/></feComponentTransfer>
    <feComposite in="ga" in2="d" operator="in" result="grain"/>
    <feMerge><feMergeNode in="d"/><feMergeNode in="grain"/></feMerge>
  </filter>
  <pattern id="re-grain" width="3" height="3" patternUnits="userSpaceOnUse">
    <circle cx="1" cy="1" r=".45" fill="#000" opacity=".07"/><circle cx="2.4" cy="2.2" r=".35" fill="#fff" opacity=".07"/>
  </pattern>
  <linearGradient id="re-fade" x1="0" y1="0" x2="0" y2="1">
    <stop offset="0" stop-color="#0B0E16" stop-opacity="0"/><stop offset="1" stop-color="#0B0E16" stop-opacity=".9"/></linearGradient>
</defs></svg>`;
