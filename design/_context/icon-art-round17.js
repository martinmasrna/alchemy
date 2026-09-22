// Round 17. Habitat advanced. Compound, action and cutout are out.
//
// Habitat's idea is that a thing gets exactly one piece of the world it belongs to. Its
// weakness is the one I flagged: left alone it becomes a ground line under everything, and
// four of six were a ground line. So this round keeps the idea and varies what KIND of world
// the object gets, which is a difference in kind rather than in amount:
//
//   medium     what the thing is immersed in, drawn as the field around it
//   light      no scenery at all; place is given entirely by where the light comes from
//   neighbour  one companion object, so the context is a relationship rather than a place
//   horizon    a distant edge behind it, so the world is depth rather than ground
//
// Six subjects again. Round 16 proved that twelve hasty drawings beat nothing and lose to six
// careful ones, and the objects below are shared across all four columns so the context is
// genuinely the only variable.
export const subjects6 = [
  ["star", "Star"], ["water", "Water"], ["earth", "Earth"],
  ["human", "Human"], ["fire", "Fire"], ["bitcoin", "Bitcoin"],
];
const box = (body, defs = "") => `<svg viewBox="0 0 48 48" fill="none" aria-hidden="true">${defs}${body}</svg>`;
const C = {
  sun: "#F5B93C", sunLt: "#FFE9A8", sunDk: "#C46A12", hot: "#FFF7E0", ember: "#D8451C",
  sea: "#2E82C6", seaLt: "#A8E6FF", seaDk: "#123E68", abyss: "#08203A",
  land: "#4FA368", landDk: "#2B6B45", cloud: "#F0F6FA",
  skin: "#C98A5E", skinDk: "#6E4229", skinLt: "#F2D6B8",
  coin: "#F7931A", coinDk: "#8A4E06", coinLt: "#FFE0A8", ink: "#2A1A08",
  ground: "#2A2118", night: "#080A12", dusk: "#3A2A4E",
};

// ---- the six objects, drawn once and shared by every column ------------------------------
// Each takes a prefix so its gradient ids stay unique across columns.
const obj = {
  star: (k, x = 24, y = 24, s = 1) => ({
    defs: `<radialGradient id="${k}-sc"><stop offset="0" stop-color="${C.hot}"/><stop offset=".55" stop-color="${C.sun}"/><stop offset="1" stop-color="${C.sunDk}"/></radialGradient>
           <radialGradient id="${k}-sh"><stop offset=".2" stop-color="${C.sun}" stop-opacity=".6"/><stop offset="1" stop-color="${C.sun}" stop-opacity="0"/></radialGradient>`,
    body: `<g transform="translate(${x} ${y}) scale(${s}) translate(-24 -24)">
      <circle cx="24" cy="24" r="19" fill="url(#${k}-sh)"/>
      <circle cx="24" cy="24" r="9.6" fill="url(#${k}-sc)"/>
      <circle cx="24" cy="24" r="4.4" fill="${C.hot}"/></g>`,
  }),
  water: (k, x = 24, y = 23, s = 1) => ({
    defs: `<radialGradient id="${k}-wb" cx=".36" cy=".3" r=".9"><stop offset="0" stop-color="${C.seaLt}"/><stop offset=".55" stop-color="${C.sea}"/><stop offset="1" stop-color="${C.seaDk}"/></radialGradient>`,
    body: `<g transform="translate(${x} ${y}) scale(${s}) translate(-24 -24)">
      <path d="M24 7c7.6 9.8 11.6 16 11.6 21.2a11.6 11.6 0 0 1-23.2 0C12.4 23 16.4 16.8 24 7z" fill="url(#${k}-wb)"/>
      <ellipse cx="19.8" cy="26.6" rx="2.2" ry="3.8" fill="${C.cloud}" opacity=".6" transform="rotate(-16 19.8 26.6)"/></g>`,
  }),
  earth: (k, x = 24, y = 24, s = 1) => ({
    defs: `<clipPath id="${k}-ec"><circle cx="24" cy="24" r="16"/></clipPath>
           <radialGradient id="${k}-es" cx=".34" cy=".3" r=".92"><stop offset="0" stop-color="#5FB6EE"/><stop offset=".7" stop-color="${C.sea}"/><stop offset="1" stop-color="${C.abyss}"/></radialGradient>`,
    body: `<g transform="translate(${x} ${y}) scale(${s}) translate(-24 -24)">
      <circle cx="24" cy="24" r="16" fill="url(#${k}-es)"/>
      <g clip-path="url(#${k}-ec)">
        <path d="M10 20.4c4.2-1.6 7.2.6 10.2 0 3-.6 4.2-2.8 7.8-2 2.6.6 3.2 3 1.4 4.6-2.4 2.2-6.4 1.4-9.2 3-3 1.6-2.4 4.6-5.8 4.8-3.4.2-5.6-2-5.6-5.2z" fill="${C.land}"/>
        <path d="M18 33c2.4-1.6 5.2-.4 8-.9 2.2-.4 3.8-1.8 5.6-.9 1.7.8 1.3 3-.6 4.1-3.4 2-7.6 2.8-10.8 1.7-2.2-.8-3.2-2.6-2.2-4z" fill="${C.land}"/></g>
      <path d="M24 8a16 16 0 0 1 11 4.6" stroke="${C.seaLt}" stroke-width="1.3" fill="none" stroke-linecap="round"/></g>`,
  }),
  human: (k, x = 24, y = 24, s = 1) => ({
    defs: "",
    body: `<g transform="translate(${x} ${y}) scale(${s}) translate(-24 -24)">
      <path d="M14 41c0-8.6 4.4-14 10-14s10 5.4 10 14z" fill="${C.skin}"/>
      <circle cx="24" cy="18.4" r="7.8" fill="${C.skinLt}"/>
      <path d="M24 10.6a7.8 7.8 0 0 1 0 15.6z" fill="${C.skinDk}" opacity=".25"/></g>`,
  }),
  fire: (k, x = 24, y = 24, s = 1) => ({
    defs: `<linearGradient id="${k}-fa" x1="0" y1="1" x2="0" y2="0"><stop offset="0" stop-color="${C.sun}"/><stop offset="1" stop-color="${C.ember}" stop-opacity=".72"/></linearGradient>
           <linearGradient id="${k}-fb" x1="0" y1="1" x2="0" y2="0"><stop offset="0" stop-color="${C.hot}"/><stop offset="1" stop-color="${C.sun}"/></linearGradient>`,
    body: `<g transform="translate(${x} ${y}) scale(${s}) translate(-24 -24)">
      <path d="M24 9c8.8 8.8 13.4 14.6 13.4 20.2a13.4 13.4 0 0 1-26.8 0C10.6 23.6 15.2 17.8 24 9z" fill="url(#${k}-fa)"/>
      <path d="M24 19.4c5.2 5.2 7.8 8.6 7.8 11.6a7.8 7.8 0 0 1-15.6 0c0-3 2.6-6.4 7.8-11.6z" fill="url(#${k}-fb)"/>
      <path d="M24 28.4c2.1 2.1 3.2 3.6 3.2 4.8a3.2 3.2 0 0 1-6.4 0c0-1.2 1.1-2.7 3.2-4.8z" fill="#fff" opacity=".92"/></g>`,
  }),
  bitcoin: (k, x = 24, y = 24, s = 1) => ({
    defs: `<radialGradient id="${k}-bc" cx=".34" cy=".28"><stop offset="0" stop-color="${C.coinLt}"/><stop offset=".6" stop-color="${C.coin}"/><stop offset="1" stop-color="${C.coinDk}"/></radialGradient>`,
    body: `<g transform="translate(${x} ${y}) scale(${s}) translate(-24 -24)">
      <circle cx="24" cy="24" r="14" fill="url(#${k}-bc)"/>
      <g fill="${C.ink}" transform="translate(24 24) scale(.92) translate(-24 -24)">
        <path d="M19.6 13.8h2.7v20.4h-2.7zM23.9 13.8h2.7v20.4h-2.7z"/>
        <path d="M20 16.9h7c2.9 0 4.8 1.7 4.8 4.2S29.9 25.3 27 25.3h-7zM20 25.1h7.7c3 0 4.9 1.7 4.9 4.2s-1.9 4.2-4.9 4.2H20z"/></g></g>`,
  }),
};
const ids = ["star", "water", "earth", "human", "fire", "bitcoin"];
const build = (prefix, wrap) => Object.fromEntries(ids.map((id) => {
  const o = obj[id](`${prefix}-${id}`);
  return [id, wrap(id, o)];
}));

// ---- 1. medium: what the thing is immersed in --------------------------------------------
// Context as the field around the object rather than the floor under it. A drop underwater, a
// star in its own dust, a person in a shaft of hazy air, a flame inside its smoke.
const mediumBG = {
  star: `<rect width="48" height="48" fill="${C.night}"/>
    <ellipse cx="24" cy="24" rx="24" ry="16" fill="url(#me-star-d)" transform="rotate(-18 24 24)"/>`,
  water: `<rect width="48" height="48" fill="url(#me-water-d)"/>
    <g stroke="${C.seaLt}" stroke-width="3" opacity=".16" stroke-linecap="round">
      <path d="M8 0l6 48M22 0l4 48M38 0l-4 48"/></g>
    <g fill="${C.seaLt}" opacity=".5"><circle cx="11" cy="14" r="1.4"/><circle cx="38" cy="10" r="1"/>
      <circle cx="41" cy="30" r="1.2"/><circle cx="8" cy="34" r=".9"/></g>`,
  earth: `<rect width="48" height="48" fill="${C.night}"/>
    <g fill="#fff"><circle cx="7" cy="9" r="1" opacity=".8"/><circle cx="41" cy="7" r=".8" opacity=".65"/>
      <circle cx="43" cy="38" r=".9" opacity=".7"/><circle cx="6" cy="40" r=".7" opacity=".5"/></g>
    <circle cx="24" cy="24" r="19" fill="url(#me-earth-d)"/>`,
  human: `<rect width="48" height="48" fill="#161520"/>
    <path d="M6 0h16L34 48H14z" fill="url(#me-human-d)"/>
    <g fill="#FFF6DC" opacity=".55"><circle cx="16" cy="12" r=".8"/><circle cx="25" cy="20" r=".6"/>
      <circle cx="13" cy="28" r=".7"/><circle cx="27" cy="34" r=".55"/><circle cx="20" cy="40" r=".65"/></g>`,
  fire: `<rect width="48" height="48" fill="#120E10"/>
    <path d="M24 2q10 6 6 16t-9 12" stroke="#4A4048" stroke-width="7" fill="none" stroke-linecap="round" opacity=".55" filter="url(#r17-soft)"/>
    <path d="M24 4q-8 5-5 14t8 10" stroke="#3A323C" stroke-width="6" fill="none" stroke-linecap="round" opacity=".5" filter="url(#r17-soft)"/>`,
  bitcoin: `<rect width="48" height="48" fill="#0D1016"/>
    <g stroke="${C.coin}" stroke-width=".8" opacity=".35" fill="none">
      <path d="M4 10h12l8 8M44 12H32l-8 8M4 38h12l8-8M44 36H32l-8-8M24 2v8M24 46v-8"/></g>
    <g fill="${C.coin}" opacity=".55"><circle cx="4" cy="10" r="1.5"/><circle cx="44" cy="12" r="1.5"/>
      <circle cx="4" cy="38" r="1.5"/><circle cx="44" cy="36" r="1.5"/></g>`,
};
const medium = build("me", (id, o) => box(
  `<g clip-path="url(#r17-tile)">${mediumBG[id]}${o.body}</g>`,
  `<defs>${o.defs}
    <radialGradient id="me-star-d"><stop offset="0" stop-color="${C.sunDk}" stop-opacity=".5"/><stop offset="1" stop-color="${C.sunDk}" stop-opacity="0"/></radialGradient>
    <linearGradient id="me-water-d" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#1E6FA8"/><stop offset="1" stop-color="#061C33"/></linearGradient>
    <radialGradient id="me-earth-d"><stop offset=".78" stop-color="#7FD2F5" stop-opacity="0"/><stop offset=".9" stop-color="#7FD2F5" stop-opacity=".3"/><stop offset="1" stop-color="#7FD2F5" stop-opacity="0"/></radialGradient>
    <linearGradient id="me-human-d" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#FFE9A8" stop-opacity=".3"/><stop offset="1" stop-color="#FFE9A8" stop-opacity="0"/></linearGradient>
  </defs>`));

// ---- 2. light: no scenery at all, only the light situation -------------------------------
// The most disciplined answer. Nothing is drawn except the object and the light that is
// falling on it, and that alone says noon, dusk, underwater or lit-by-a-screen.
const lightFX = {
  star: { bg: `<rect width="48" height="48" fill="${C.night}"/><circle cx="24" cy="24" r="26" fill="url(#li-g-warm)"/>`, over: "" },
  water: { bg: `<rect width="48" height="48" fill="#241A24"/><circle cx="46" cy="40" r="30" fill="url(#li-g-low)"/>`,
    over: `<path d="M24 7c7.6 9.8 11.6 16 11.6 21.2a11.6 11.6 0 0 1-23.2 0" fill="none" stroke="${C.sunLt}" stroke-width="1.4" stroke-linecap="round" opacity=".9"/>` },
  earth: { bg: `<rect width="48" height="48" fill="${C.night}"/>`,
    over: `<circle cx="24" cy="24" r="16" fill="url(#li-g-term)"/>
           <g fill="${C.sun}" opacity=".85"><circle cx="15" cy="30" r=".7"/><circle cx="12.6" cy="26" r=".55"/>
             <circle cx="17" cy="34" r=".5"/><circle cx="11.4" cy="21" r=".5"/></g>` },
  human: { bg: `<rect width="48" height="48" fill="url(#li-g-dusk)"/><circle cx="24" cy="14" r="17" fill="url(#li-g-back)"/>`,
    over: `<path d="M14 41c0-8.6 4.4-14 10-14s10 5.4 10 14z" fill="#140F16" opacity=".82"/>
           <circle cx="24" cy="18.4" r="7.8" fill="#140F16" opacity=".82"/>
           <path d="M18.4 12.8a7.8 7.8 0 0 1 11.2 0" stroke="${C.sunLt}" stroke-width="1.4" fill="none" stroke-linecap="round"/>
           <path d="M15.4 33q-1-5 2.6-5.6" stroke="${C.sunLt}" stroke-width="1.2" fill="none" stroke-linecap="round" opacity=".8"/>` },
  fire: { bg: `<rect width="48" height="48" fill="#0C0A0C"/><circle cx="24" cy="26" r="26" fill="url(#li-g-fire)"/>`, over: "" },
  bitcoin: { bg: `<rect width="48" height="48" fill="#0A0E16"/><ellipse cx="24" cy="44" rx="22" ry="14" fill="url(#li-g-screen)"/>`,
    over: `<circle cx="24" cy="24" r="14" fill="url(#li-g-cool)"/>` },
};
const light = build("li", (id, o) => box(
  `<g clip-path="url(#r17-tile)">${lightFX[id].bg}${o.body}${lightFX[id].over}</g>`,
  `<defs>${o.defs}
    <radialGradient id="li-g-warm"><stop offset=".1" stop-color="${C.sun}" stop-opacity=".45"/><stop offset="1" stop-color="${C.sun}" stop-opacity="0"/></radialGradient>
    <radialGradient id="li-g-low"><stop offset="0" stop-color="${C.sunLt}" stop-opacity=".5"/><stop offset="1" stop-color="${C.sunLt}" stop-opacity="0"/></radialGradient>
    <radialGradient id="li-g-term" cx=".72" cy=".3" r=".95"><stop offset=".35" stop-color="#000" stop-opacity="0"/><stop offset="1" stop-color="#00040B" stop-opacity=".92"/></radialGradient>
    <linearGradient id="li-g-dusk" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#4A3A62"/><stop offset=".6" stop-color="#8A4E52"/><stop offset="1" stop-color="#2A1C24"/></linearGradient>
    <radialGradient id="li-g-back"><stop offset=".1" stop-color="${C.sunLt}" stop-opacity=".75"/><stop offset="1" stop-color="${C.sunLt}" stop-opacity="0"/></radialGradient>
    <radialGradient id="li-g-fire"><stop offset=".1" stop-color="${C.ember}" stop-opacity=".5"/><stop offset="1" stop-color="${C.ember}" stop-opacity="0"/></radialGradient>
    <radialGradient id="li-g-screen"><stop offset="0" stop-color="#4FA8E8" stop-opacity=".55"/><stop offset="1" stop-color="#4FA8E8" stop-opacity="0"/></radialGradient>
    <radialGradient id="li-g-cool" cx=".5" cy="1" r=".9"><stop offset="0" stop-color="#4FA8E8" stop-opacity=".45"/><stop offset=".7" stop-color="#4FA8E8" stop-opacity="0"/></radialGradient>
  </defs>`));

// ---- 3. neighbour: one companion, so context is a relationship ---------------------------
// Not where the thing is but what it is next to. A planet round the star, a leaf under the
// drop, the moon by the Earth, a child beside the adult, the wood the fire is eating.
const neighbour = {
  star: (o) => `${o.body}<circle cx="39" cy="36" r="3.4" fill="#5C7FD8"/>
    <path d="M39 36a17 17 0 0 0-11-16" stroke="${C.sunLt}" stroke-width=".9" fill="none" opacity=".45" stroke-dasharray="2 2.4"/>`,
  water: (o) => `<path d="M4 34q12-10 26-4 6 2.6 14 1-10 8-22 6Q10 35 4 34z" fill="${C.landDk}"/>
    <path d="M8 34q10-6 22-2" stroke="${C.land}" stroke-width="1.2" fill="none" opacity=".8"/>${o.body}`,
  earth: (o) => `${o.body}<circle cx="41" cy="12" r="4.2" fill="#9A9AA4"/>
    <circle cx="42.4" cy="10.6" r="1.1" fill="#7A7A86"/><circle cx="39.6" cy="13.4" r=".8" fill="#7A7A86"/>`,
  human: (o) => `${o.body}<g transform="translate(37 30) scale(.5) translate(-24 -24)">
      <path d="M14 41c0-8.6 4.4-14 10-14s10 5.4 10 14z" fill="${C.skin}"/>
      <circle cx="24" cy="18.4" r="7.8" fill="${C.skinLt}"/></g>`,
  fire: (o) => `<g transform="translate(0 4)">
      <path d="M9 38h30l-3 6H12z" fill="${C.skinDk}"/>
      <path d="M12 38.6q12-4 24 0" stroke="${C.ground}" stroke-width="2.4" fill="none" stroke-linecap="round"/></g>${o.body}`,
  bitcoin: (o) => `${o.body}<g transform="translate(37 35) scale(.46) translate(-24 -24)">
      <circle cx="24" cy="24" r="14" fill="${C.coinDk}"/><circle cx="24" cy="24" r="11" fill="${C.coin}"/></g>`,
};
const neighbourStyles = build("nb", (id, o) => box(
  `<g clip-path="url(#r17-tile)">${neighbour[id](o)}</g>`, `<defs>${o.defs}</defs>`));

// ---- 4. horizon: a distant edge behind, so the world is depth -----------------------------
// Context that sits behind the object rather than under it. Every card gets a sky and an edge,
// and the sky is the one thing that changes: it is how a place announces itself from far away.
const horizonSky = {
  star: ["#1A1030", "#4A2A4E", "#0E0A16"],
  water: ["#8AD0F0", "#3A86C0", "#123E68"],
  earth: ["#050710", "#101A34", "#05060C"],
  human: ["#F2B06A", "#C4562F", "#2A1620"],
  fire: ["#2A1620", "#5A2418", "#140A0C"],
  bitcoin: ["#1A2438", "#2E4468", "#0A0E16"],
};
const horizon = build("hz", (id, o) => {
  const [a, b, c] = horizonSky[id];
  return box(
    `<g clip-path="url(#r17-tile)">
      <rect width="48" height="48" fill="url(#hz-${id}-sky)"/>
      <path d="M0 33q12-3 24 0t24-1v16H0z" fill="${c}"/>
      <path d="M0 33q12-3 24 0t24-1" stroke="${b}" stroke-width=".9" fill="none" opacity=".7"/>
      ${o.body}
    </g>`,
    `<defs>${o.defs}
      <linearGradient id="hz-${id}-sky" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stop-color="${a}"/><stop offset=".72" stop-color="${b}"/></linearGradient>
    </defs>`);
});

export const round17Styles = { medium, light, neighbour: neighbourStyles, horizon };
export const round17Notes = {
  medium: "What the thing is immersed in, drawn as the field around it rather than the floor under it. The drop is underwater, the star sits in its own dust, the person stands in a shaft of hazy air, the flame is inside its own smoke.",
  light: "No scenery at all. Place is given entirely by where the light comes from, and that alone says noon, dusk, underwater or lit by a screen. The most disciplined of the four, and the only one that adds nothing to the frame.",
  neighbour: "One companion object, so the context is a relationship rather than a place. A planet going round the star, a leaf under the drop, the moon beside the Earth, a child beside the adult, the wood the fire is eating.",
  horizon: "A distant edge behind it, so the world is depth rather than ground. Every card gets a sky and an edge, and the sky is the thing that changes, because that is how a place announces itself from far away.",
};
export const R17_DEFS = `<svg width="0" height="0" style="position:absolute"><defs>
  <clipPath id="r17-tile"><rect x="2" y="2" width="44" height="44" rx="8"/></clipPath>
  <filter id="r17-soft" x="-50%" y="-50%" width="200%" height="200%"><feGaussianBlur stdDeviation="2"/></filter>
</defs></svg>`;
