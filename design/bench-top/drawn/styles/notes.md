# styles — round 4 (which hand draws the set)

Locked: the drawn direction itself, the layout, the dark palette, the type ramp, the 24px
box and the 28px size in a card.
Free: the drawing style only.

Eight subjects, chosen to stress a set rather than flatter it: two pure abstractions with no
agreed picture (Energy, Gravity), one mechanism (Time), one technical (Hydrogen), one that
has to stay iconic at 28px (Star), one soft and organic (Nebula), one everyday object
(Water), and the most detailed thing in the world (Earth). A style that survives all eight
survives the other twenty-three.

Shown three times over: at 52px where the drawing is visible, at 28px in a real card where
the game is actually played, and at 84px in the accent where a discovery lands.

What the render already settles, before taste gets a say:

- **poster** loses its detail first. Time and Earth only work because the detail is cut out
  of the mass, and at 28px those cuts close up. Nebula collapses into a blob.
- **sketch** and **diagram** converge as they shrink. At 52px the hand is obvious; at 28px a
  wobbly line and a precise one are nearly the same line. Sketch buys character at the
  discovery size and pays for it nowhere, but it also buys less than it looks like it does.
- **glyph** holds its shape at every size, which is what weight buys.

Gotcha worth keeping: `fill-rule="evenodd"` only cuts within a single path's `d`. Detail
split across sibling `<path>` elements does not become a hole, it becomes nothing.
