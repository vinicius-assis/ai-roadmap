# Async iterators & streaming: demonstrated

2026-08-30. Vinícius completed Lesson 2's practice (`pratice-02.ts`) in 2 iterations. Final
version: an `async function*` that yields words with 200ms latency and throws on the 4th;
consumed with `for await...of`, first-token timing via an `isFirst` flag, last-token timing
after the loop, and a `try/catch` that recovers the partial accumulator.

## Evidence
- Correctly moved the `throw` into the generator (v1 had it in the loop body) and saw from the
  stack trace that the error propagates generator → `stream.next()` → `for await...of` → catch.
- Understood the "loop ends = stream exhausted" signal for the last token, and the flag pattern
  for the first token (needed a hint for the flag; got last-token immediately).

## Improvement since Lesson 1
- Error handling: this time he let the error propagate out and caught it at the consumer without
  being told twice. The Lesson 1 friction (catching too low) did not recur.

## Implications
- Phase 0 async block is effectively done: async/await, parallel vs sequential, async
  generators, `for await...of`, error propagation. Lesson 3 (defensive API calls) is the last
  async lesson and leans on all of it.
- After Lesson 3, Phase 0 shifts to math (vectors/dot product/cosine, then probability).
