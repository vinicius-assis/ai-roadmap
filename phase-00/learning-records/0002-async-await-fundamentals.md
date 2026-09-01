# Async/await fundamentals: demonstrated

2026-08-30. Vinícius completed Lesson 1's practice (`pratice.ts`) — after ~5 iterations
correcting one point each round. Final version runs correctly: 2 sequential awaits ≈ 1000ms,
`Promise.all` of 3 ≈ 500ms, and a `throw` in `slowDouble` caught by a `try/catch` around the
call site.

## Evidence
- Separated "the line that pauses" from "the return value" once it was drawn out explicitly.
- Moved `try/catch` from inside the function to around the call, and understood why the
  `Promise<number | void>` return type was a smell.
- Understood `Promise.all` rejects wholesale on first rejection.

## What was hard (predicts future friction)
- Distinguishing a bare `await` statement (side effect / pause) from `return await` (value).
- Instinct to catch errors at the lowest level instead of letting them propagate. Watch for
  this again in Lesson 3 (retry/backoff) and Phase 5 (agent error handling).
- Needed a fill-in-the-blanks skeleton to unblock — structure, not concept, was the barrier.

## Implications
- Competence floor for Phase 0 async is now set: can write, type, and reason about basic
  async functions, parallel vs sequential, and error propagation.
- Lesson 2 (async iterators / `for await...of`) can assume all of the above.
- Per his request, all exercises from Lesson 2 onward must include an "expected output" block.
