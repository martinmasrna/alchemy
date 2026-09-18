# Spacing and type system

Nothing in the current page was designed; these are the constraints the mockups must obey from now on. Every length and size in a mockup comes from here, or carries a written reason next to it.

## Spacing
Base step 4px. Allowed: 4, 8, 12, 16, 24, 32, 48.
Screen gutter 16. Gap inside a group 8. Gap between groups 24. Card padding 12.
A margin is not a gap: line boxes add leading, so set spacing for the gap it produces on screen and check it in a render.

## Type
One family for now: the system UI stack (`system-ui, -apple-system, Segoe UI, Roboto, sans-serif`). A display face is a possible round, not a default.
Ramp: 12 (labels, meta), 14 (secondary), 16 (body, card names), 20 (section titles), 28 (the name of a discovery), 40 (its icon).
Weights: 400 and 600 only.
Line height 1.4 for body, 1.15 for titles.

## Radii
Cards 12. Chips and small controls 8. Full pill 999 for status chips only.

## Touch
Minimum tap target 44×44. Cards in the grid are square-ish, at least 88 wide on a 390 screen (3 per row with 16 gutters and 8 gaps).
