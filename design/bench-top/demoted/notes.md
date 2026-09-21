# demoted — round 3 (what the genre actually did)

The other real answer, from the one game in the genre that cannot draw its own icons.

**Infinite Craft** invents its elements at runtime with a language model, so commissioning art
is impossible and it gets an emoji per element instead — exactly our situation, at a far worse
scale. Its answer is to refuse to treat the emoji as a picture. From a faithful clone's
stylesheet:

    .element { border: 1px solid #d6d6d6; border-radius: 6px; padding: .5em; background: white; }
    .element span:first-of-type img { width: 1em; height: 1em; }

One em. The icon is exactly the size of the text, inline, ahead of the name, on a plain pill.
The word is the object and the glyph is punctuation. Thirty unrelated palettes stop mattering
once none of them has any area.

Applied here, the card stops being a tile and becomes a pill, so the grid becomes a flow. That
is not a side effect to be tidied away, it is the same decision: a name wants to be as wide as
it is. The whole owned set now fits in about a third of the height it used to, which means
less scrolling in the place where the actual thinking happens.

Cost: the screen loses its atmosphere and reads like a tag list. The discovery moment is the
one place the emoji is still allowed to be a picture, which gives the session some rhythm.

Free, though. No art to draw, this world or any other.
