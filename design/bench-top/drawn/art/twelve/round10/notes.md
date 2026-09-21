# round10 — cosmic and editorial won, so four mediums on the textured side

What the winners share: atmosphere and surface, a muted palette, the subject kept as a single
object. One gets its surface from light and gradient, the other from grain and layered tone.
What the rejects share: flat vector, hard edges, bright poster colour, no texture anywhere.

Read as: texture and depth over flat graphic, muted over saturated. These four all sit on that
side and spread from hand-made to screen-made.

**Method change, and it should stay from here on.** All four columns render the same
silhouettes and the same expected colours out of `_context/shapes.js`. A style is now just a
renderer that receives parts and dresses them. Before this, every round risked a column
winning because I happened to draw it more carefully, and there was no way to tell that from
the medium actually being better.

- **oil** — paint on a dark ground, lit from one side. Each shape is laid three times: dark
  underpainting pushed into the shadow, body, broken highlight where the light lands.
- **inkwash** — the opposite bet. Blurred wash for colour, a darker pull for the wet edge, a
  thin dry line for structure, and most of the tile left as paper.
- **stipple** — colour that only exists where enough dots agree, with density doing the
  shading, so a sphere turns without a gradient anywhere.
- **mesh** — soft light with grain over it. Deliberately the closest thing to a straight cross
  of the two winners.

What the render settles:

- **oil, stipple and mesh keep a dark tile; inkwash is the only one that flips the grid pale.**
  That answers the tile question from last round for three of the four.
- **mesh is the crispest at 34px** of the textured group, because only the colour inside the
  shape is soft and the edges stay hard.
- **stipple is the most fragile at 34px.** The dot grid starts to moiré and Car and Hunting go
  indistinct. It is the most distinctive at 72px and the least reliable small.
- **oil is the most hand-made** and the only one where the light has a direction, which is what
  keeps twelve unrelated subjects looking like one set.

Two implementation traps, both mine, worth not repeating: scattering dots over the tile and
clipping them gives uniform density and therefore no form, and masking every part of an icon
through one mask merges accents into the body, which is how Bitcoin lost its glyph.
