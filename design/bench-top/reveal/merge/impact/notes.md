# bench-top / reveal / merge / impact — round 4

Defect fixed, no variants: the result glyph sat off-centre because a 96px emoji is wider than a 96px box and overflows to the right. Every actor in the arena is now a zero-size anchor at the centre with a flex-centred box inside, so glyph width no longer matters.

Why this round: all three approaches beat plain burst, none felt great, squeeze weakest. Diagnosis: no anticipation, no impact, no continuity. Squeeze dropped.

Added to both remaining approaches:
- continuity was tried (ingredients flying in from the slot and the tapped card) and dropped: it misfired on iOS and Martin judged the idea itself as not making sense. Ingredients start 120px left and right of the centre.
- anticipation: the approach curve pulls back before it goes (a negative-overshoot easing), so the ingredients wind up before they fly.
- impact: a white flash and a ring shockwave at the moment of contact, a hit-stop before the result lands, and a kick that jolts the whole stage.

Axis: intensity, as a knob. soft / medium / hard scale the hit-stop (60 to 160ms), kick (3 to 14px), flash, ring, spark count and flight. Approach stays selectable (collide, orbit) so the two knobs can be judged independently.

Round 4b: the ingredients started from the top-left on iOS. Cause: CSS custom properties inside @keyframes, which iOS Safari resolves unreliably. All arena motion now runs through the Web Animations API with pixel values computed in JS. Rule for the port: no var() inside keyframes, ever.
