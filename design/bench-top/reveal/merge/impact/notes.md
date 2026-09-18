# bench-top / reveal / merge / impact — round 4

Defect fixed, no variants: the result glyph sat off-centre because a 96px emoji is wider than a 96px box and overflows to the right. Every actor in the arena is now a zero-size anchor at the centre with a flex-centred box inside, so glyph width no longer matters.

Why this round: all three approaches beat plain burst, none felt great, squeeze weakest. Diagnosis: no anticipation, no impact, no continuity. Squeeze dropped.

Added to both remaining approaches:
- continuity: ingredient A starts at the first bench slot, ingredient B starts at the card that was just tapped, and both travel to the centre from there. The result is visibly made of the two things the player touched.
- anticipation: the approach curve pulls back before it goes (a negative-overshoot easing), so the ingredients wind up before they fly.
- impact: a white flash and a ring shockwave at the moment of contact, a hit-stop before the result lands, and a kick that jolts the whole stage.

Axis: intensity, as a knob. soft / medium / hard scale the hit-stop (60 to 160ms), kick (3 to 14px), flash, ring, spark count and flight. Approach stays selectable (collide, orbit) so the two knobs can be judged independently.
