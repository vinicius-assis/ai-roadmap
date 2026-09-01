# Lesson 6 delivered: probability intuition — sampling, temperature, top_p

2026-08-31. Second (and last) math/theory lesson of Phase 0. Vinícius asked to start it
directly after closing Lesson 5.

## What was taught
- Model output per step = a probability distribution over the whole vocab, not one answer.
- Logits → softmax: `exp(lᵢ)/Σexp(lⱼ)`; exponentiating amplifies differences.
- `temperature` = divisor on logits before softmax (`softmax(l/T)`):
  T<1 sharpens, T→0 = greedy, T=1 = raw, T>1 flattens.
- `top_p` (nucleus) = keep smallest top prefix with cumulative prob ≥ p, drop the tail,
  renormalise. Adaptive: nucleus shrinks when the model is confident.
- `top_k` mentioned as the fixed-count cousin.
- Provider specifics: Anthropic temp 0–1 (default 1), can't set temp+top_p together since
  Opus 4.1; OpenAI temp 0–2. Adjust temperature first.
- Task→temperature starting points table.
- Interleaved spaced recall on cosine similarity (perpendicular vectors → cos 0).

## Assets / references created
- `assets/sampling-lab.js` — temp + top_p sliders over a 6-token toy vocab, live bar chart,
  cut tokens greyed/struck, shows "effective choices" (perplexity). Reusable for any future
  decoding/sampling lesson.
- `reference/sampling-cheatsheet.html` — vocab, formulas, per-provider rules, task table,
  TS reference impl (softmax with max-subtraction, roulette sample, topP), gotchas.

## Practice assigned (`pratice-06.ts`) — not yet done
`softmax(logits, T)` (with max-subtraction for stability), `sample(probs)` (roulette),
then loop T ∈ [0.2, 0.7, 1.0, 1.8]: print probs + 1000-draw histogram. Optional `topP`.
Expected: distribution concentrates as T falls, spreads as T rises; counts track probs.

## Watch for
- The "formula that produces X vs. apply X() again" confusion from LR 0006 — here the risk
  is re-applying something after softmax, or inverting the temperature direction (T<1
  *increases* contrast — easy to flip mentally). Called this out explicitly in the lesson.
- Numerical stability: if he skips the `- max` step, large logits → Infinity → NaN. The
  concept is flagged separately in the practice per NOTES teaching pref (skeleton + concepts,
  not numbered prose).
- Recurring: forgot to call `main()`; runs `npx <file>.ts` instead of `npx tsx <file>.ts`.
  Both reminders are in the practice prompt.

## Next
Lesson 7 — CAPSTONE. Tiny TS script that streams tokens from a real model API. Pulls
together the whole of Phase 0: async/await, `for await...of`, defensive fetch (timeout +
retry), and passing `temperature`. This is the "seed of Phase 1" deliverable from MISSION.md.
Open question: which API + does Vinícius have a key? (Anthropic vs OpenAI vs a local/Ollama
model vs a mocked SSE stream if no key.)
