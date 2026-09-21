// Four candidate styles for the drawn set, on the same eight subjects.
//
// The eight are chosen to stress the set rather than flatter it: two that are pure
// abstractions with no agreed picture (Energy, Gravity), one mechanism (Time), one
// technical (Hydrogen), one that has to stay iconic at 28px (Star), one soft and organic
// (Nebula), one everyday object (Water), and the most detailed thing in the world (Earth).
// A style that survives all eight survives the other twenty-three.
//
// Every mark is a 24x24 box in currentColor, so the style is the only variable.
const svg = (attrs, body) =>
  `<svg viewBox="0 0 24 24" ${attrs} stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${body}</svg>`;

// ---- 1. diagram: one thin uniform line, geometric, drawn like a textbook figure --------
const D = (b) => svg(`fill="none" stroke="currentColor" stroke-width="1.5"`, b);
const diagram = {
  energy: D(`<path d="M12 2.5v4M12 17.5v4M2.5 12h4M17.5 12h4M5.2 5.2l2.8 2.8M16 16l2.8 2.8M18.8 5.2L16 8M8 16l-2.8 2.8"/>`),
  time: D(`<circle cx="12" cy="12" r="8.5"/><path d="M12 7v5l3.5 2.5"/>`),
  gravity: D(`<path d="M2.5 8.5q4.6 0 6.8 4.8 1.35 2.9 2.7 2.9t2.7-2.9Q16.9 8.5 21.5 8.5"/><circle cx="12" cy="18.6" r="2.3" fill="currentColor" stroke="none"/>`),
  hydrogen: D(`<circle cx="12" cy="12" r="8"/><circle cx="12" cy="12" r="2.4" fill="currentColor" stroke="none"/>`),
  star: D(`<path d="M12 2.6c1.1 4.9 3.4 7.2 8.3 8.3-4.9 1.1-7.2 3.4-8.3 8.3-1.1-4.9-3.4-7.2-8.3-8.3 4.9-1.1 7.2-3.4 8.3-8.3z"/>`),
  nebula: D(`<path d="M6.5 9.5c0-3 3.2-4.8 5.8-3.6 2.8-2.6 7.6-.8 7.6 3 1.9 1.2 1.7 4.7-1.1 5.6-1.8 2.9-6.6 3-8.7 1-3.7.2-5.1-3.6-3.6-6z"/>`),
  water: D(`<path d="M12 3.2c4 5 6.2 8.2 6.2 11a6.2 6.2 0 0 1-12.4 0c0-2.8 2.2-6 6.2-11z"/>`),
  earth: D(`<circle cx="12" cy="12" r="8.5"/><path d="M3.8 9.5h16.4M3.8 14.5h16.4M12 3.5c-3.4 4.6-3.4 12.4 0 17M12 3.5c3.4 4.6 3.4 12.4 0 17"/>`),
};

// ---- 2. poster: solid silhouettes, detail cut out of the mass, no line at all ----------
const P = (b) => svg(`fill="currentColor" stroke="none" fill-rule="evenodd"`, b);
const poster = {
  energy: P(`<path d="M22 12l-6.86-1.3L19.07 4.93 13.3 8.86 12 2l-1.3 6.86L4.93 4.93l3.93 5.77L2 12l6.86 1.3-3.93 5.77 5.77-3.93L12 22l1.3-6.86 5.77 3.93-3.93-5.77z"/>`),
  time: P(`<path d="M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18zM10.9 6.2h2.2v5h-2.2zM10.9 11.2h6.3v2.2h-6.3z"/>`),
  gravity: P(`<path d="M2.4 7.6h19.2l-7.4 8.2a2.4 2.4 0 0 1-4.4 0z"/><circle cx="12" cy="19.4" r="2.5"/>`),
  hydrogen: P(`<path d="M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18zm0 2.6a6.4 6.4 0 1 1 0 12.8 6.4 6.4 0 0 1 0-12.8z"/><circle cx="12" cy="12" r="2.8"/>`),
  star: P(`<path d="M12 2.6c1.1 4.9 3.4 7.2 8.3 8.3-4.9 1.1-7.2 3.4-8.3 8.3-1.1-4.9-3.4-7.2-8.3-8.3 4.9-1.1 7.2-3.4 8.3-8.3z"/>`),
  nebula: P(`<path d="M6.5 9.5c0-3 3.2-4.8 5.8-3.6 2.8-2.6 7.6-.8 7.6 3 1.9 1.2 1.7 4.7-1.1 5.6-1.8 2.9-6.6 3-8.7 1-3.7.2-5.1-3.6-3.6-6z"/>`),
  water: P(`<path d="M12 3.2c4 5 6.2 8.2 6.2 11a6.2 6.2 0 0 1-12.4 0c0-2.8 2.2-6 6.2-11z"/>`),
  earth: P(`<path d="M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18zM4 10.4h16v1.7H4zM4 13.7h16v1.7H4zM11.2 3.6h1.6v6.8h-1.6zM11.2 12.1h1.6v1.6h-1.6zM11.2 15.4h1.6v5h-1.6z"/>`),
};

// ---- 3. sketch: the same shapes with a hand on them — uneven, open, varied weight ------
const K = (w, b) => svg(`fill="none" stroke="currentColor" stroke-width="${w}"`, b);
const sketch = {
  // uneven lengths and angles, and two rays struck twice, the way a hand repeats itself
  energy: K(1.7, `<path d="M12.3 2.6c-.3 1.6-.2 2.9 0 4.3M11.5 16.9c.4 1.8.3 3.3 0 4.6M2.7 11.4c1.6-.2 2.9-.1 4.4.2M17.1 12.6c1.7-.4 3-.3 4.4-.1M4.9 4.6l3.4 3.6M15.4 15.2l3.6 3.3M19.2 4.9l-3.5 3.3M8.6 15.4l-3.6 3.6"/><path d="M12.1 3.1c-.2 1.4-.1 2.5.1 3.7M3.3 11.9c1.3-.1 2.3 0 3.5.2" stroke-width="1.2"/>`),
  // the dip wobbles and the ball is drawn past its own starting point
  gravity: K(1.8, `<path d="M2.4 8c4.7.4 5.4 2.5 7.2 5.2.9 1.4 1.6 2.4 2.4 2.4.9 0 1.5-1 2.3-2.5 1.6-3 2.6-4.8 7-5"/><path d="M13.6 17.4c1.3.5 1.8 1.8 1.2 2.9-.7 1.2-2.3 1.5-3.5.8-1.2-.8-1.5-2.2-.6-3.1.6-.7 1.6-.9 2.5-.5.5.2.9.6 1.1 1.1" stroke-width="1.5"/>`),
  // the ring does not close and the hands run past the pin
  time: K(1.8, `<path d="M18.9 6.4c2.6 3.7 1.8 8.8-1.9 11.4-3.8 2.7-9 1.8-11.6-2-2.6-3.7-1.7-8.9 2.1-11.5 2.9-2 6.7-1.9 9.5.2"/><path d="M11.6 6.1c.3 2.1.2 4.3.2 6.3 1.3 1 2.6 1.8 3.9 2.7"/><path d="M11.8 12.6l-1.5 1.4" stroke-width="1.3"/>`),
  // an open shell, and a nucleus drawn as a little spiral that never quite lands
  hydrogen: K(1.8, `<path d="M16.6 5.1c3.4 2.4 4.2 7.1 1.7 10.6-2.5 3.4-7.4 4.1-10.9 1.7-3.5-2.5-4.3-7.2-1.7-10.7 1.9-2.6 5.3-3.5 8.2-2.3"/><path d="M13.3 10.6c-1.4-.9-3.1 0-3.1 1.5 0 1.4 1.5 2.3 2.8 1.8 1-.4 1.4-1.5 1-2.4" stroke-width="1.6"/>`),
  // one arm longer than the others, and the outline overshoots where it closes
  star: K(1.8, `<path d="M12.6 2.4c.7 5 3.2 7.6 8.1 8.9-4.9 1.1-7.1 3.9-8.6 8.4-.7-4.9-3-7.2-7.6-8.5 4.5-1.3 7.2-3.6 8.1-8.8z"/><path d="M12.6 2.4c-.5 1.3-.8 2.3-1 3.2" stroke-width="1.2"/>`),
  // bumps of genuinely different sizes, and a start that runs past the finish
  nebula: K(1.8, `<path d="M6.1 10.3c.4-3.4 3.6-4.9 6.2-3.6 2.4-3 8.1-1.3 7.5 2.8 2.2 1.6 1.3 5-1.6 5.7-2.2 2.8-6.8 2.5-8.6.4-3.7.6-5.3-3-3.5-5.3z"/><path d="M6.1 10.3c-.5 1-.6 1.9-.4 2.7" stroke-width="1.2"/>`),
  // the tip curls past the join
  water: K(1.8, `<path d="M11.9 3c3.9 5.2 6.3 8.4 6.1 11.3-.3 3.5-3.2 6-6.6 5.7-3.2-.3-5.6-3.1-5.4-6.3.2-2.8 2.5-5.8 5.9-10.7z"/><path d="M11.9 3c-.7 1-1.2 1.8-1.6 2.5" stroke-width="1.2"/>`),
  // bands drawn straight past the edge of the world, as a hand does
  earth: K(1.8, `<path d="M19.6 7.4c2.2 4 .7 9-3.4 11.1-4.1 2.2-9.2.7-11.4-3.3-2.2-4-.7-9 3.4-11.2 3.3-1.7 7.3-1.1 9.8 1.5"/><path d="M3.2 9.6c5.8.7 11.6.6 17.4-.1M3.4 14.9c5.8-.7 11.6-.6 17.3.1M12.3 3.5c-3.4 5-3.5 12.5-.2 17.1M11.8 3.6c3.6 4.9 3.6 12.3.3 17" stroke-width="1.3"/>`),
};

// ---- 4. glyph: the same geometry, heavy — a chunky icon-font weight --------------------
const G = (b) => svg(`fill="none" stroke="currentColor" stroke-width="2.4"`, b);
const glyph = {
  energy: G(`<path d="M12 3.4v3.4M12 17.2v3.4M3.4 12h3.4M17.2 12h3.4M6 6l2.4 2.4M15.6 15.6L18 18M18 6l-2.4 2.4M8.4 15.6L6 18"/>`),
  time: G(`<circle cx="12" cy="12" r="8"/><path d="M12 7.6v4.6l3.1 2.2"/>`),
  gravity: G(`<path d="M3.2 8.6q4.2 0 6.3 4.5 1.25 2.7 2.5 2.7t2.5-2.7q2.1-4.5 6.3-4.5"/><circle cx="12" cy="18.6" r="2.6" fill="currentColor" stroke="none"/>`),
  hydrogen: G(`<circle cx="12" cy="12" r="7.6"/><circle cx="12" cy="12" r="2.6" fill="currentColor" stroke="none"/>`),
  star: G(`<path d="M12 3.4c1 4.4 3.2 6.6 7.6 7.6-4.4 1-6.6 3.2-7.6 7.6-1-4.4-3.2-6.6-7.6-7.6 4.4-1 6.6-3.2 7.6-7.6z"/>`),
  nebula: G(`<path d="M6.8 9.8c0-2.8 3-4.4 5.4-3.3 2.6-2.4 7-.7 7 2.8 1.8 1.1 1.6 4.3-1 5.2-1.7 2.7-6.1 2.8-8.1.9-3.4.2-4.7-3.3-3.3-5.6z"/>`),
  water: G(`<path d="M12 4c3.6 4.6 5.6 7.5 5.6 10.1a5.6 5.6 0 0 1-11.2 0C6.4 11.5 8.4 8.6 12 4z"/>`),
  earth: G(`<circle cx="12" cy="12" r="8"/><path d="M4.4 9.6h15.2M4.4 14.4h15.2M12 4c-3.2 4.4-3.2 11.6 0 16M12 4c3.2 4.4 3.2 11.6 0 16"/>`),
};

export const styles = { diagram, poster, sketch, glyph };
export const styleNotes = {
  diagram: "One thin uniform line. Precise, cool, technical. The universe as a textbook figure.",
  poster: "Solid silhouettes, detail cut out of the mass, no line at all. Heavy and graphic.",
  sketch: "The same shapes with a hand on them: uneven curves, open corners, varied weight.",
  glyph: "The same geometry at a heavy weight. Confident and chunky, the way an icon font reads.",
};
export const subjects = [
  ["energy", "Energy"], ["gravity", "Gravity"], ["time", "Time"], ["hydrogen", "Hydrogen"],
  ["star", "Star"], ["nebula", "Nebula"], ["water", "Water"], ["earth", "Earth"],
];
