# Deep dive: generators + AbortController — demonstrated

2026-08-31. Vinícius completed Lesson 4's two practices.

- **Prática A** (`pratice-03a.ts`): infinite sync generator consumed lazily, fake paginated
  `searchPage`, async generator `allPages()` yielding item-by-item with `return` on empty page,
  consumed with `for await...of`. Output matched. Self-corrected the missing `await` on the fake
  latency and the `page` → `item` naming after feedback. Added the `total: 9` counter.
- **Prática B** (`pratice-04b.ts`): `contarDevagar(signal)` with `throwIfAborted()` at the top of
  each iteration; `main()` fires it without immediate `await`, schedules `ac.abort()` at 850ms,
  awaits inside try/catch. Then a timeout version with `AbortSignal.timeout(850)`. Output matched
  on both blocks.

## Friction points
- The Prática B prompt as originally written confused him ("chama sem await imediato, guarda a
  promise" + the two-version structure). Rewrote it as a fill-in skeleton with the 3 concepts to
  understand called out separately. That landed. LESSON FOR ME: for async-control exercises, give
  a scaffold with TODOs, not prose steps — the "why" of each line matters more than the sequence.
- He noticed on his own that in the timeout version `AbortError` never fires, only `TimeoutError`.
  Good sign — he understood that the cancellation error name depends on *how* you cancelled.

## Implications
- Generators + cancellation are solid. He can write lazy sequences, async pagination, and
  cancellable loops that distinguish "cancelled" from "failed".
- **Async/generators block of Phase 0 fully complete (Lessons 1–4).**
- Next: Lesson 5 — vectors, dot product, cosine similarity. First math lesson. Watch whether the
  math is a bigger barrier than the async was (per 0004's note).
- File naming drift: practices land as `pratice-03a`/`pratice-04b` etc., not always matching the
  lesson number. Not worth policing.
