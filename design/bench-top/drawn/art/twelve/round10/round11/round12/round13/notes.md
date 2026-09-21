# round13 — clay won alone, so four ways light behaves in a solid

Mosaic, embroidery and ceramic lost together, and they lost for the same reason: each put a
repeating surface treatment in front of the form. Tesserae, stitches, crazing. Clay is the one
where the form is the subject and the surface stays quiet.

This round narrows on purpose, which is the opposite of last round's widening. One winner
rather than two means descending is the right move. Clay's logic is held — a modelled solid,
softly lit, no support, sitting on the dark card — and the varied property is the only one
that really separates one solid from another: what light does when it arrives.

- **glass** — through it, bending on the way out. Thinnest in the middle so brightest there,
  thickest at the turned-away edge so most saturated, and a caustic lands underneath.
- **wax** — into it, scattering, and back out somewhere else. The glow is inside the form
  rather than on it, and there is no hard highlight anywhere.
- **felt** — dead on impact. No specular ever, form entirely from a soft gradient, and a fuzzy
  silhouette because a fibre surface has no edge, only a place where there is less of it.
- **crystal** — off flat planes that disagree. Shading is banded rather than graded.

Materials that impose their own colour are excluded by the expected-colour rule, which is why
there is no bronze, marble or wood: a bronze Water is just a bronze thing.

Two passes were needed, and the second bug is the more interesting one. Round 12's clay failed
because every part of an icon shared the body's light model, so details sank into it. My first
fix here painted details with the **body's** light tone, which is the same bug wearing a hat:
Earth's green land came out pale blue in three columns. A part's tone ramp has to be built from
that part's own colour, and now it is.

What the render settles:

- **glass and wax converge at 34px.** Both end up as a soft glowing mass, and the difference
  that is obvious at 72px is nearly gone in the grid.
- **felt is the most distinct small**, because a fuzzy matte silhouette looks like nothing else
  on the screen.
- **crystal keeps its facets at every size**, since banding survives scaling in a way that a
  gradient does not.
