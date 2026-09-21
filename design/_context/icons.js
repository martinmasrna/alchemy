// A drawn icon set for world 1, in the Little Alchemy tradition: one hand, one stroke
// weight, one vocabulary of shapes. Everything is currentColor, so the icon inherits the
// palette instead of fighting it — which is the whole reason a drawn set beats emoji here.
//
// The marks are physics-literate on purpose: hydrogen is one and helium is two, carbon is
// a hexagon, oxygen is a bonded pair, light is a wave. Emoji cannot say any of
// that, and for an abstract subject (Energy, Matter, Space, Time) they barely try.
//
// 24x24 box, 1.5 stroke, round caps. Fill is used only where a thing is solid.
const S = (body) =>
  `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${body}</svg>`;

export const marks = {
  // rays with no centre mass: energy is what happens, not what is
  energy: S(`<path d="M12 2.5v4M12 17.5v4M2.5 12h4M17.5 12h4M5.2 5.2l2.8 2.8M16 16l2.8 2.8M18.8 5.2L16 8M8 16l-2.8 2.8"/>`),
  // a clump of stuff
  matter: S(`<circle cx="9.2" cy="14" r="3.4" fill="currentColor" stroke="none"/><circle cx="14.8" cy="14" r="3.4" fill="currentColor" stroke="none"/><circle cx="12" cy="9.2" r="3.4" fill="currentColor" stroke="none"/>`),
  // a frame with almost nothing in it
  space: S(`<rect x="3.5" y="3.5" width="17" height="17" rx="4"/><circle cx="8.4" cy="8.2" r="1.15" fill="currentColor" stroke="none"/><circle cx="15.8" cy="10.4" r=".85" fill="currentColor" stroke="none"/><circle cx="11.2" cy="13.4" r=".7" fill="currentColor" stroke="none"/><circle cx="16.2" cy="16.1" r="1.15" fill="currentColor" stroke="none"/><circle cx="7.6" cy="15.4" r=".7" fill="currentColor" stroke="none"/>`),
  time: S(`<circle cx="12" cy="12" r="8.5"/><path d="M12 7v5l3.5 2.5"/>`),
  // the smallest possible thing
  particle: S(`<circle cx="12" cy="12" r="3" fill="currentColor" stroke="none"/>`),
  // light is a wave
  light: S(`<path d="M2.5 12q2.4-5 4.75 0t4.75 0 4.75 0 4.75 0"/>`),
  gravity: S(`<path d="M20.5 12a8.5 8.5 0 1 1-8.5-8.5 6.2 6.2 0 0 1 6.2 6.2 4.2 4.2 0 0 1-4.2 4.2"/><circle cx="12" cy="12" r="1.6" fill="currentColor" stroke="none"/>`),
  // one electron
  hydrogen: S(`<circle cx="12" cy="12" r="8"/><circle cx="12" cy="12" r="2.4" fill="currentColor" stroke="none"/>`),
  // two
  helium: S(`<circle cx="12" cy="12" r="8"/><circle cx="9.1" cy="12" r="2.4" fill="currentColor" stroke="none"/><circle cx="14.9" cy="12" r="2.4" fill="currentColor" stroke="none"/>`),
  carbon: S(`<path d="M12 3.2l7.6 4.4v8.8L12 20.8l-7.6-4.4V7.6z"/>`),
  // a bonded pair
  oxygen: S(`<circle cx="7.6" cy="12" r="4.3"/><circle cx="16.4" cy="12" r="4.3"/>`),
  nebula: S(`<path d="M6.5 9.5c0-3 3.2-4.8 5.8-3.6 2.8-2.6 7.6-.8 7.6 3 1.9 1.2 1.7 4.7-1.1 5.6-1.8 2.9-6.6 3-8.7 1-3.7.2-5.1-3.6-3.6-6z"/>`),
  // four points, not the five-point emoji
  star: S(`<path d="M12 2.6c1.1 4.9 3.4 7.2 8.3 8.3-4.9 1.1-7.2 3.4-8.3 8.3-1.1-4.9-3.4-7.2-8.3-8.3 4.9-1.1 7.2-3.4 8.3-8.3z"/>`),
  blackhole: S(`<circle cx="12" cy="12" r="6" fill="currentColor" stroke="none"/><circle cx="12" cy="12" r="9.2" stroke-width="1.2"/>`),
  solarsystem: S(`<circle cx="12" cy="12" r="2.6" fill="currentColor" stroke="none"/><ellipse cx="12" cy="12" rx="9.4" ry="3.4" transform="rotate(-32 12 12)"/><circle cx="19.5" cy="7.6" r="1.7" fill="currentColor" stroke="none"/>`),
  water: S(`<path d="M12 3.2c4 5 6.2 8.2 6.2 11a6.2 6.2 0 0 1-12.4 0c0-2.8 2.2-6 6.2-11z"/>`),
  earth: S(`<circle cx="12" cy="12" r="8.5"/><path d="M3.8 9.5h16.4M3.8 14.5h16.4M12 3.5c-3.4 4.6-3.4 12.4 0 17M12 3.5c3.4 4.6 3.4 12.4 0 17"/>`),
  ocean: S(`<path d="M3 8.5q2.2-2.4 4.5 0t4.5 0 4.5 0 4.5 0M3 13q2.2-2.4 4.5 0t4.5 0 4.5 0 4.5 0M3 17.5q2.2-2.4 4.5 0t4.5 0 4.5 0 4.5 0"/>`),
  air: S(`<path d="M3 9h10.5a2.75 2.75 0 1 0-2.75-2.75M3 14.5h13a3 3 0 1 1-3 3"/>`),
  volcano: S(`<path d="M3.5 20l5.6-10.5h5.8L20.5 20z"/><path d="M12 6.5q1.2-2 2.4 0"/>`),
  rainbow: S(`<path d="M3 19a9 9 0 0 1 18 0M6.6 19a5.4 5.4 0 0 1 10.8 0M10.2 19a1.8 1.8 0 0 1 3.6 0"/>`),
  comet: S(`<circle cx="16.5" cy="7.5" r="3.4" fill="currentColor" stroke="none"/><path d="M13 11L4 20M11.5 7.5L7 12M16.5 13.5L12 18"/>`),
};

export const mark = (id) => marks[id] ?? S(`<circle cx="12" cy="12" r="7"/>`);
