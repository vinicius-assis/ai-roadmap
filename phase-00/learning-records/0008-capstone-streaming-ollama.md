# Lesson 7 delivered: capstone — streaming tokens from a local Ollama model

2026-09-03. Final lesson of Phase 0. Vinícius chose the **Ollama local** path (over
Anthropic/OpenAI key or a mocked SSE stream) when asked. Installed Ollama himself; I pulled
`qwen2.5:0.5b` (~400 MB, smallest usable).

## What was taught
- Ollama = local HTTP server on `:11434`; `POST /api/chat` with `stream: true` → **NDJSON**
  (one JSON object per line, `\n`-delimited), token text in `message.content`, `done: true` ends it.
- The byte-boundary problem: `res.body` yields byte chunks, not lines. Standard fix = a text
  buffer: `buffer += decode(...)`, `split("\n")`, process complete lines, `buffer = lines.pop()`
  keeps the incomplete tail. `TextDecoder.decode(bytes, { stream: true })` for split multibyte chars.
- Wrap as an **async generator** `streamChat()` that only yields token strings — same shape as
  the Lesson 2 `stream()`. Consumer uses `for await...of`. `temperature` goes in `options`;
  timeout is `AbortSignal.timeout(60_000)`.
- Ties together all four Phase 0 threads: async/await (L1), for await + generators (L2/L4),
  defensive timeout (L3), temperature (L6).

## Assets / references created
- `reference/streaming-http-cheatsheet.html` — the 4-step pattern, reusable `streamLines()`
  skeleton, **NDJSON vs SSE comparison table** (separator, prefix, token path for
  Ollama/OpenAI/Anthropic), Ollama body fields, gotchas. Will be the go-to in Phase 1 when
  the API becomes SSE.
- `pratice-07.ts` — skeleton committed with 4 TODOs (build request body; yield content;
  return on done; consume with for await). Buffer/decode plumbing pre-written so the effort
  is on the generator semantics, not string-slicing. Per NOTES pref: concepts listed
  separately ("generator is lazy", "yield pauses", "return ends the for await", "timeout
  aborts the fetch").
  **DONE + PASSED 2026-09-03.** All 4 TODOs correct. Two snags, both resolved:
  (1) He pasted a TODO *comment* as code → broke `messages` into `messages ([...])`. Needed a
  very concrete block-by-block walkthrough with the exact code per TODO — the earlier
  skeleton+concepts framing wasn't concrete enough for a first-time API-body build. This is
  a data point: for a brand-new *shape* (not a new concept), he needs the literal target code,
  not just the concepts.
  (2) `process.stdout.write` → editor error "Cannot find name 'process'" even after
  `npm i -D @types/node`. Root cause: no `tsconfig.json` in the project — editor treated each
  .ts as an isolated script. Created a minimal `tsconfig.json` (NodeNext, types:["node"],
  strict, noEmit). Told him it was an editor lint, not a runtime error (`tsx` ran it fine).
- No new interactive asset — a terminal capstone; reused quiz.js + course.css.

## Verified against the real local model (2026-09-03)
Ran the full pipeline against `qwen2.5:0.5b`. Streaming, buffering, temperature pass-through
all work. Two hardware realities baked into the lesson:
1. **Cold first call loads the model into RAM: ~30–60 s** on this GPU-less machine. Hence
   timeout 60 s, not 5 s. (First test run timed out at 30 s — the defensive timeout working
   as designed.)
2. **The 0.5B model runs away** into an infinite numbered list and never emits `done`.
   `options.num_predict: 60` caps it. Without the cap, only the timeout stops it — the lesson
   frames seeing that once as useful.

## Watch for
- Recurring: forgets to call `main()`; runs `npx <file>.ts` instead of `npx tsx <file>.ts`.
  Both reminders are in the skeleton.
- New risk: processing the incomplete last line → intermittent `JSON.parse` errors (~1 in N
  runs). The skeleton pre-writes `buffer = linhas.pop()` so he shouldn't hit it, but if he
  rewrites from scratch in Phase 1, this is the classic bug.
- `res.body` is `for await`-able in Node 18+ but NOT in the browser (needs `getReader()`).
  Flagged in the ask-box and the cheatsheet.

## Next
**PHASE 0 COMPLETE (2026-09-03).** `pratice-07.ts` passed — streamed tokens from a real
(local) model with temperature + timeout, tying together async/await, for await, defensive
fetch and sampling. The MISSION.md deliverable is done.
Then Phase 1 (LLM APIs / prompting) per
`../roadmap.md`. Open question for Phase 1 kickoff: does Vinícius want to keep using Ollama
(free, offline, weak model) or get an Anthropic/OpenAI key (costs money, real quality, SSE
instead of NDJSON — the cheatsheet already covers the switch)?
