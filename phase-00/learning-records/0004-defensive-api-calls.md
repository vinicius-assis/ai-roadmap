# Defensive API calls: demonstrated

2026-08-30. Vinícius completed Lesson 3's practice (`pratice-03.ts`). Final version: fake API
(503 ×2 then 400), `backoff(i)` with exponential base + jitter, a retry loop that classifies
errors, and a `main()` with `try/catch`. Output matches expected: retries the 503s with growing
waits, throws permanent on the 400.

## Friction points (each fixed after one hint)
- Forgot to invoke `main()` — code defined but nothing ran (also happened conceptually in L1/L2;
  he now has the `main(); main()` pattern but still omits the call sometimes).
- `backoff(maxTries)` instead of `backoff(i)` — constant wait, no progression.
- Error classification missing the upper bound: `status >= 400 && status !== 429` caught 503 as
  permanent. Needed `< 500`. Good sign he understood once the 4xx-vs-5xx boundary was named.
- CLI: ran `npx pratice-03.ts` instead of `npx tsx pratice-03.ts`.

## Implications
- **Async block of Phase 0 is complete** (Lessons 1–3). He can write async/await, streaming,
  and resilient API-call code in TS.
- Next: Lesson 4 — vectors, dot product, cosine similarity (the embeddings math). Different
  muscle; watch whether the math is a bigger barrier than the async was.
- Recurring tiny bug: defines an entry function and forgets to call it. Worth a one-line
  reminder in future practice prompts.
