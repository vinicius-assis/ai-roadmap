# Lesson 5 delivered: vectors, dot product, cosine similarity

2026-08-31. First math lesson of Phase 0. Vinícius asked to move straight on from Lesson 4.

## What was taught
- Vector = `number[]` = a direction in N-dim space; embeddings are just long vectors (1536-d).
- Dot product: componentwise multiply + sum → scalar; big when aligned, ~0 when perpendicular.
- Norm: `√(Σ vᵢ²)` = `√(v·v)`.
- Cosine similarity = `(a·b)/(‖a‖‖b‖)` = cosine of the angle; range [−1,1]; text embeddings
  usually land ~0.7–0.95.
- Key shortcut: for pre-normalized embeddings (OpenAI etc.), cosine === dot product.
- Interleaved spaced-recall callout on retry classification (404 → no retry) from L3/L4.

## Assets / references created
- `assets/vector-lab.js` — interactive checker: type two vectors, see componentwise products,
  dot, both norms, cosine. Reusable for Lesson 6 and later RAG lessons.
- `reference/vectors-cheatsheet.html` — vocab table, formulas, TS reference impl, gotchas.

## Practice — DONE 2026-08-31 (`cosine-similarity.ts`, not the planned pratice-05.ts)
Vinícius wrote `cosineSimilarity` + `generateNorm` from scratch. His comment block showed
the math was understood; three code bugs on first pass:
1. norm summed raw values, not squares (`acc + num` not `acc + num*num`)
2. dot product used `a[i] + b[i]` instead of `a[i] * b[i]`
3. redundant `Math.cos(result)` on the return — didn't grasp the formula already IS the cosine

Given conceptual feedback only (the 3 underlying ideas, no rewritten code — per NOTES pref).
Fixed all three himself. Result `cosineSimilarity([2,3,5],[1,2,4]) = 0.9912` confirmed.
Did NOT do the doc-ranking / unit-vector parts of the original plan — can fold a quick
ranking exercise into Lesson 6 or a RAG lesson later if worthwhile.

## Confirmed / adjusted
- Math notation was NOT a barrier — he mapped Σ→reduce and ‖·‖→sqrt(sum of squares) fine
  once told. Confirms async was the harder block, not the math. (answers 0004's open question)
- New failure mode: conflating "the formula that produces X" with "apply X() again" —
  watch for the same in Lesson 6 (softmax/temperature).

## Watch for (per 0004's open question — is math a bigger barrier than async?)
- Whether `reduce` with an index (`(s, x, i) => s + x * b[i]`) trips him up — he's strong on JS
  so probably fine, but the math notation (Σ, ‖·‖) is new.
- The recurring "forgot to call main()" bug — reminder is in the practice prompt again.
- `.sort()` without a comparator sorting lexically — flagged in the cheatsheet, see if he hits it.

## Next
Lesson 6 — probability intuition: sampling, temperature, top_p. Then Lesson 7 capstone
(streaming tokens from a real API).
