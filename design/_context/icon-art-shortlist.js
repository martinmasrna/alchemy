// Three of the thirteen survivors only ever existed for six subjects, because they won their
// rounds before the twelve-subject set existed. Luminous and glass came from the six
// cosmology subjects of rounds 5 and 7; habitat came from the six of round 16.
//
// For the shortlist to be a fair comparison they have to cover the same twelve as everyone
// else, so they are rebuilt here as renderers over the shared parts in shapes.js. These are
// reconstructions rather than the original files: same look, same rules, more subjects.
import { hues, parts } from "./shapes.js";

const box = (b, d = "") => `<svg viewBox="0 0 48 48" fill="none" aria-hidden="true">${d}${b}</svg>`;
const tone = (id, t) => hues[id][t] ?? hues[id].base;
const draw = (p, fill, extra = "") =>
  p.w ? `<path d="${p.d}" stroke="${fill}" stroke-width="${p.w}" fill="none" stroke-linecap="round" stroke-linejoin="round" ${extra}/>`
      : `<path d="${p.d}" fill="${fill}" ${extra}/>`;
const hx = (h) => [1, 3, 5].map((i) => parseInt(h.slice(i, i + 2), 16));
const mixTo = (c, t, target) => "#" + hx(c).map((v) => Math.round(v + (target - v) * t).toString(16).padStart(2, "0")).join("");
const lighter = (c, t) => mixTo(c, t, 255);
const darker = (c, t) => mixTo(c, t, 0);
const ids = Object.keys(parts);
const build = (fn) => Object.fromEntries(ids.map((id) => [id, fn(id)]));

// ---- luminous (round 5): the thing emits. Soft, no edge discipline, glow doing the work ----
const luminous = build((id) => {
  const h = hues[id], g = `sl-${id}`;
  let defs = `<radialGradient id="${g}-halo"><stop offset=".15" stop-color="${h.base}" stop-opacity=".6"/><stop offset="1" stop-color="${h.base}" stop-opacity="0"/></radialGradient>`;
  let body = `<circle cx="24" cy="24" r="22" fill="url(#${g}-halo)"/>`;
  parts[id].forEach((p, i) => {
    const c = tone(id, p.tone), r = `${g}-${i}`;
    if (p.w) { body += draw(p, lighter(c, .5), 'filter="url(#sl-soft)"') + draw(p, lighter(c, .2)); return; }
    defs += `<radialGradient id="${r}" cx=".38" cy=".3" r=".9">
      <stop offset="0" stop-color="${lighter(c, .75)}"/><stop offset=".5" stop-color="${c}"/>
      <stop offset="1" stop-color="${darker(c, .3)}" stop-opacity=".85"/></radialGradient>`;
    body += draw(p, c, 'opacity=".55" transform="scale(1.08)" transform-origin="24 24" filter="url(#sl-glow)"')
      + draw(p, `url(#${r})`)
      + draw(p, lighter(c, .9), 'opacity=".7" transform="scale(.42)" transform-origin="24 24" filter="url(#sl-soft)"');
  });
  return box(body, `<defs>${defs}</defs>`);
});

// ---- glass, round 7: polished and cut. Hard specular, lit rim, a facet seam down the shape --
const glass = build((id) => {
  const g = `sg-${id}`;
  let defs = "", body = "";
  parts[id].forEach((p, i) => {
    const c = tone(id, p.tone), r = `${g}-${i}`, cl = `${g}-c${i}`;
    if (p.w) { body += draw(p, lighter(c, .45)); return; }
    defs += `<clipPath id="${cl}"><path d="${p.d}"/></clipPath>
      <linearGradient id="${r}" x1=".22" y1="0" x2=".78" y2="1">
        <stop offset="0" stop-color="${lighter(c, .7)}"/><stop offset=".45" stop-color="${c}"/>
        <stop offset="1" stop-color="${darker(c, .45)}"/></linearGradient>
      <linearGradient id="${r}-rim" x1="0" y1="1" x2="1" y2="0">
        <stop offset="0" stop-color="${lighter(c, .85)}" stop-opacity=".9"/><stop offset=".7" stop-color="${lighter(c, .85)}" stop-opacity="0"/></linearGradient>`;
    body += draw(p, `url(#${r})`)
      + `<g clip-path="url(#${cl})"><path d="M24 -8 56 24 24 56z" fill="${darker(c, .55)}" opacity=".42"/></g>`
      + `<path d="${p.d}" stroke="url(#${r}-rim)" stroke-width="1.1" fill="none"/>`
      + draw(p, "#fff", 'opacity=".9" transform="translate(-2.4 -2.8) scale(.24)" transform-origin="24 24"');
  });
  return box(body, `<defs>${defs}</defs>`);
});

// ---- habitat (round 16): the thing plus exactly one piece of the world it belongs to --------
// One element each, never a scene. Six of these are new, because round 16 only drew six.
const ground = (y, fill, w = 2.4) => `<path d="M5 ${y}h38" stroke="${fill}" stroke-width="${w}" stroke-linecap="round"/>`;
const world = {
  star: () => `<g fill="#F0F6FA"><circle cx="8" cy="10" r="1"/><circle cx="40" cy="9" r=".8"/>
    <circle cx="38" cy="37" r=".9" opacity=".8"/><circle cx="10" cy="38" r=".7" opacity=".7"/>
    <circle cx="43" cy="23" r=".65" opacity=".6"/></g>`,
  water: () => `<ellipse cx="24" cy="41" rx="13" ry="2.4" fill="#2E82C6" opacity=".5"/>
    <ellipse cx="24" cy="41.4" rx="17" ry="3.2" fill="none" stroke="#2E82C6" stroke-width=".9" opacity=".45"/>
    <ellipse cx="24" cy="42" rx="21" ry="4" fill="none" stroke="#2E82C6" stroke-width=".7" opacity=".28"/>`,
  earth: () => `<circle cx="41" cy="9" r="4.4" fill="url(#sh-sun)"/>`,
  life: () => `<path d="M4 36h40v10H4z" fill="#3A2A18"/>${ground(36, "#6E4229", 1.4)}`,
  human: () => `${ground(41, "#2A2118")}<path d="M27 41q9-1.4 16-5.4" stroke="#000" stroke-width="3.6" fill="none" stroke-linecap="round" opacity=".4"/>`,
  fire: () => `<ellipse cx="24" cy="41" rx="16" ry="3.6" fill="url(#sh-glow)"/>
    <path d="M12 40.6q12-4.4 24 0" stroke="#6E4229" stroke-width="3.2" fill="none" stroke-linecap="round"/>`,
  hunting: () => `${ground(42, "#2A2118", 1.8)}
    <g fill="#8A5A34" opacity=".8"><ellipse cx="17" cy="39" rx="1.8" ry="1.2"/><ellipse cx="25" cy="40.4" rx="1.8" ry="1.2"/><ellipse cx="33" cy="38.6" rx="1.8" ry="1.2"/></g>`,
  tribe: () => `<ellipse cx="24" cy="43" rx="19" ry="4" fill="url(#sh-glow)"/>${ground(44, "#2A2118", 1.6)}`,
  city: () => `<circle cx="40" cy="9" r="3.6" fill="#F5B93C" opacity=".9"/>${ground(45.4, "#2A2118", 2)}`,
  car: () => `<path d="M2 40h44v6H2z" fill="#1C232E"/>
    <path d="M8 43h7M20 43h7M32 43h7" stroke="#8A929C" stroke-width="1" opacity=".6" stroke-linecap="round"/>`,
  calculus: () => `<g stroke="#4A7FA8" stroke-width=".5" opacity=".3">
    <path d="M17 9v33M25 9v33M33 9v33M9 16h32M9 25h32M9 34h32"/></g>`,
  bitcoin: () => `<ellipse cx="24" cy="42" rx="13" ry="2.8" fill="#000" opacity=".45" filter="url(#sl-soft)"/>
    ${ground(44.4, "#1C232E", 3)}`,
};
const habitat = build((id) => {
  const g = `sb-${id}`;
  let defs = "", body = world[id]();
  parts[id].forEach((p, i) => {
    const c = tone(id, p.tone), r = `${g}-${i}`;
    if (p.w) { body += draw(p, c); return; }
    defs += `<radialGradient id="${r}" cx=".36" cy=".3" r=".92">
      <stop offset="0" stop-color="${lighter(c, .42)}"/><stop offset=".55" stop-color="${c}"/>
      <stop offset="1" stop-color="${darker(c, .32)}"/></radialGradient>`;
    body += draw(p, `url(#${r})`);
  });
  return box(body, `<defs>${defs}</defs>`);
});

export const shortlistExtra = { luminous, glass, habitat };
export const SL_DEFS = `<svg width="0" height="0" style="position:absolute"><defs>
  <filter id="sl-soft" x="-60%" y="-60%" width="220%" height="220%"><feGaussianBlur stdDeviation="1.7"/></filter>
  <filter id="sl-glow" x="-70%" y="-70%" width="240%" height="240%"><feGaussianBlur stdDeviation="3"/></filter>
  <radialGradient id="sh-sun"><stop offset=".3" stop-color="#FFF7E0"/><stop offset="1" stop-color="#F5B93C" stop-opacity="0"/></radialGradient>
  <radialGradient id="sh-glow"><stop offset="0" stop-color="#F5B93C" stop-opacity=".5"/><stop offset="1" stop-color="#F5B93C" stop-opacity="0"/></radialGradient>
</defs></svg>`;
export { subjects } from "./shapes.js";
