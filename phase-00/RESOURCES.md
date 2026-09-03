# Resources

Trusted sources backing the Phase 0 lessons. Prefer primary/official docs.

## Async TypeScript / JavaScript

- **[MDN — Using promises](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Using_promises)**
  — Primary source. Promise chaining, error propagation, `async/await` equivalence. Trust: very high.
- **[MDN — Asynchronous JavaScript (learning path)](https://developer.mozilla.org/en-US/docs/Learn_web_development/Extensions/Async_JS)**
  — Gentle full walkthrough with exercises. Good for filling gaps. Trust: very high.
- **[MDN — `await` operator reference](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/await)**
  — Exact semantics of what `await` pauses and resumes. Trust: very high.
- **[MDN — `for await...of`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/for-await...of)**
  — Consuming async iterables, i.e. token streams. Trust: very high.

## Streaming from LLM APIs (the "why" for async)

- **[Anthropic — Streaming Messages](https://docs.anthropic.com/en/docs/build-with-claude/streaming)**
  — How the Messages API streams via SSE; `messages.stream()` vs `stream: true`. Trust: high (official).
- **[Vercel AI SDK docs](https://ai-sdk.dev/docs/introduction)**
  — `streamText` and friends; SSE as the standard transport. Trust: high (official).
- **[MDN — Using server-sent events](https://developer.mozilla.org/en-US/docs/Web/API/Server-sent_events/Using_server-sent_events)**
  — The SSE wire format LLM APIs use. Trust: very high.

## REST API resilience

- **[MDN — Fetch API](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch)** — baseline. Trust: very high.
- **[MDN — AbortController](https://developer.mozilla.org/en-US/docs/Web/API/AbortController)** — timeouts / cancellation. Trust: very high.
- **[Google SRE Book — Handling Overload / retries & backoff](https://sre.google/sre-book/handling-overload/)** — why jittered backoff. Trust: high.

## Math for embeddings

- **[3Blue1Brown — Dot products](https://www.3blue1brown.com/lessons/dot-products)** — geometric
  intuition for why "componentwise multiply and sum" measures alignment. Used as L5 primary source. Trust: high.
- **[Wikipedia — Cosine similarity](https://en.wikipedia.org/wiki/Cosine_similarity)** — the formula
  used in vector search: `cos(a,b) = (a·b)/(‖a‖‖b‖)`, range [−1,1], relation to normalized vectors
  and Euclidean distance. Fetched & verified 2026-08-31. Trust: medium-high.

## Probability / sampling (temperature, top_p)

- **[Hugging Face — How to generate text with Transformers](https://huggingface.co/blog/how-to-generate)**
  — Patrick von Platen. Greedy, beam, top-k, top-p with plots and the `softmax(logits/T)`
  definition. L6 primary source. Trust: high.
- **[Anthropic — Messages API reference](https://docs.anthropic.com/en/api/messages)**
  — `temperature` (0–1, default 1) and `top_p` fields; since Opus 4.1 the two can't both be set. Trust: high (official).
- **[Signal & Syntax — Temperature and Top-P: The Creativity Knobs](https://tomarcher.io/posts/temperature-top-p-creativity-knobs/)**
  — practitioner explainer, "adjust one not both". Trust: medium.

## Modelo local / streaming HTTP (capstone, Lição 7)

- **[Ollama — API Reference](https://github.com/ollama/ollama/blob/main/docs/api.md)**
  — `POST /api/chat` e `/api/generate`: corpo da requisição, formato NDJSON da resposta
  streamada (uma linha JSON por chunk, `message.content` + `done`), `options` (temperature,
  top_p, num_predict). Porta 11434. L7 primary source. Trust: high (oficial). Verificado 2026-09-03.
- **[MDN — Using readable streams](https://developer.mozilla.org/en-US/docs/Web/API/Streams_API/Using_readable_streams)**
  — o que é `res.body`, `getReader()` vs `for await` (Node). Trust: very high.
- Nota de hardware (máquina do Vinícius, 2026-09-03): sem GPU. Primeira chamada carrega o
  modelo (~30–60 s); depois de quente, `qwen2.5:0.5b` responde rápido. `num_predict` é
  essencial — o 0.5B entra em loop de lista numerada infinita sem teto de tokens.

## Communities (wisdom)

- r/LocalLLaMA and r/LLMDevs on Reddit — practitioner discussion.
- LangChain / Vercel AI SDK Discord servers — framework-level help.
- Latent Space podcast + Discord — AI engineering as a discipline.

_TODO: find a Brazilian/Portuguese-language AI engineering community; ask Vinícius if the UNIPDS cohort has a shared channel._
