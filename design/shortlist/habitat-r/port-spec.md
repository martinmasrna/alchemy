# Icon set — the decision, and what it takes to build

The winner is a pair, not a style: **habitat's framing, rendered as shadow box.**
Reference implementation: `design/_context/icon-art-habitat-r.js`, the `shadowbox` export.
Live comparison: `design/shortlist/habitat-r/`.

## What the design is

**Framing (habitat).** An icon is the thing plus one piece of the world it belongs to, when the
thing is only itself in relation to something else. One element, never a scene. A star gets a
few other stars; a drop gets the surface it lands on; Earth gets its sun; gravity gets the sheet
it dents; a person gets a ground line; a car gets a road. A thing whose silhouette already
carries its name stands alone.

**Rendering (shadow box, and light).** Things that reflect light are two physical planes with
air between them. The piece of world is a sheet at the back, the thing is a sheet at the front,
and the shadow one throws on the other is the only depth cue, in flat matte colour, because cut
paper has no gradient. Things that give off light — a star, a nebula, lava, a supernova — are
drawn as light instead: real gradients and bloom, allowed to spill past the frame. Drawn as
paper, every one of them lost the thing it is.

Per shape, in order: a black drop shadow at 50% offset `translate(1.8 2.4)` and blurred by
`stdDeviation 1.7`; the flat fill; then a 90%-scale copy 18% lighter at 50% opacity, which is
the light catching the raised edge. Line parts get the same treatment at `translate(1.6 2.2)`.
The context sits behind everything at 85% opacity.

## Rules that survived nineteen rounds and are not up for renegotiation

- **Expected colour.** A thing is the colour a person already thinks it is. Sea blue, land
  green, star yellow-white, lava orange. Not what it actually is; what is recognised without
  being told. The test is Earth: if Earth is not obviously Earth, the drawing failed.
- **No support unless earned.** No tile behind an icon. A near-black tile on an already dark
  card is just a darker square. Shadow box needs no tile; the shadow does the work.
- **Context has to be drawn in whatever ink the surface takes.** A glow under a paper object
  says nothing. A piece of world is not a sprite that can be moved between backgrounds.
- **Details cannot share the body's light model**, or they sink into it. Every part gets a
  ramp built from its own colour, never from the body's. This bug was made twice.
- **34px is the real size.** The grid is where the session is spent; 72px is where a discovery
  lands. Anything that only works large has not worked.

## Tokens

Colour lives in `design/_context/shapes.js` as `hues`, keyed by subject, four roles each:
`base`, `dark`, `light`, `accent`. Geometry lives in the same file as `parts`, an ordered list
per subject of `{ d, tone, w? }`, outermost first; `w` present means the part is a stroke.
A renderer receives parts and dresses them. Nothing else is needed to add a style.

Sizes: 48×48 box. 34px in a grid card (the current app uses a 44px well and a 28px icon, so the
well stays and the icon grows from 28 to 34). 72–84px at discovery size.

## What is new versus what exists

**Exists:** the framing, the rendering, the colour rules, and twelve subjects fully drawn —
Star, Water, Earth, Life, Human, Fire, Hunting, Tribe, City, Car, Calculus, Bitcoin. Those were
chosen to span the whole diamond, so they prove the style rather than serve world 1.

**New, and this is the actual cost:** only three of those twelve are in world 1. Building the
set means **31 silhouettes and 31 context elements for world 1 alone**, then roughly thirty more
per world after it. The existing monoline marks in `design/_context/icons.js` cover 22 of the 31
subjects but are stroke-based line art, so they are a reference for what each thing should look
like, not geometry that can be reused.

World 1 subjects still to draw: Energy, Matter, Space, Time, Particle, Light, Gravity, Hydrogen,
Lightyear, Nebula, Star*, Helium, Carbon, Oxygen, Water*, Comet, Rainbow, Supernova, Stardust,
Black Hole, Rock, Planet, Solar System, Galaxy, Moon, Lava, Volcano, Air, Ocean, Cloud, Earth*.
(* already drawn.)

Each needs a context decided, not just a shape. Several are hard: Space, Time, Lightyear and
Gravity have no world to stand in, and inventing one for them is the first real design problem
of the build rather than a mechanical task.

## What the mockups do not cover

- The discovery moment. Icons were only ever judged as stills; the existing collide animation
  moves two ingredients into a result, and a two-plane icon with a cast shadow has to survive
  being flown across the screen.
- The picked state. The current app tints a selected card; with flat matte icons that needs
  re-deciding, since there is no longer a glow to brighten.
- The named-but-undiscovered chips and the `?` squares, which currently use inline emoji.
- Light mode. Every candidate was judged on the dark card only.
- File size and paint cost. Thirty-one icons with blur filters is not free on a phone; the
  shadows may be better baked than filtered.
