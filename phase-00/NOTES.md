# Working notes

## Learner profile
- Name: Vinícius. Background: frontend / full-stack web (React/Node era JS).
- Solid: JS fundamentals, Git/GitHub.
- Weak / target: TS type system, async (Promises/await/streaming), math (vectors, probability).
- Goal: career switch to AI Engineer. Enrolled UNIPDS pós-grad.
- Capacity: 5–8 h/week, ~1h/day. Wants self-contained, resumable lessons.

## Teaching preferences
- Exercícios de controle assíncrono (abort, promises soltas): dar ESQUELETO com TODOs +
  os 2–3 conceitos a entender listados à parte. Prosa com passos numerados confundiu
  (Lição 4 Prática B, 2026-08-31). O "porquê" de cada linha importa mais que a sequência.

## Language
- RESOLVED 2026-08-30: teach in **Portuguese (pt-BR)**. Vinícius asked to switch.
  Lesson 1 + cheat sheet rewritten in PT. Keep code identifiers/keywords in EN, prose in PT.
  Workspace meta files (MISSION.md, NOTES.md, learning records) can stay in EN.

## Phase 0 lesson plan (draft)
1. async/await mental model  ← DONE (0001), practice passed
2. Async iterators & `for await...of`  ← DONE (0002), practice passed
3. Defensive API calls — AbortController, retry + jittered backoff, 429  ← DONE (0003), practice passed. ASYNC BLOCK COMPLETE.
4. DEEP-DIVE (his request): generator functions (sync + async, yield both ways, yield*, pagination) + AbortController a fundo (multi-op, throwIfAborted, AbortSignal.timeout/any)  ← DONE (0004). Práticas A (pratice-03a.ts) + B (pratice-04b.ts) PASSARAM. Ver LR 0005. ASYNC/GENERATORS BLOCK COMPLETO.
5. Vectors & dot product & cosine similarity — the embeddings math, by hand + in TS  ← CONCLUÍDA 2026-08-31. Prática: cosine-similarity.ts. Escreveu cosineSimilarity do zero; 3 bugs iniciais (norma sem quadrado, dot com + em vez de *, Math.cos extra), corrigiu os 3 sozinho após feedback conceitual. Resultado 0.9912 confere. Asset: assets/vector-lab.js. Ref: reference/vectors-cheatsheet.html.
6. Probability intuition — sampling, temperature, top_p  ← CONCLUÍDA 2026-09-03. pratice-06.ts
   passou, saída bate com a tabela esperada. Ver LR 0007. Bugs corrigidos sozinho após dica
   conceitual: ordem acc/compare no sample, for-of nos logits em vez das temperaturas,
   probs sem *100, while sem incremento. Skeleton+TODOs funcionou de novo.
   asset: assets/sampling-lab.js. ref: reference/sampling-cheatsheet.html.
7. Capstone: streaming de tokens do Ollama local  ← ENTREGUE 2026-09-03 (0007). Vinícius
   instalou o Ollama; modelo qwen2.5:0.5b baixado. Skeleton: pratice-07.ts (4 TODOs).
   Nova ref: reference/streaming-http-cheatsheet.html (NDJSON vs SSE). pratice-07.ts PASSOU
   2026-09-03 — os 4 TODOs certos. Ver LR 0008. **FASE 0 COMPLETA.**
   Nota: colou comentário-TODO como código (quebrou messages:); precisou de walkthrough
   bloco-a-bloco com o código LITERAL de cada TODO — só conceitos não bastou pra montar um
   corpo de API pela 1ª vez. Também: criado tsconfig.json (faltava; editor não achava 'process').
   HARDWARE: máquina sem GPU. 1ª chamada carrega modelo (~30-60s) → timeout 60s. 0.5B
   entra em loop de lista infinita → num_predict:60 é obrigatório.

## Pause point
- 2026-09-03: **FASE 0 COMPLETA.** Lição 7 / pratice-07.ts passou. Todas as 7 lições feitas,
  todas as práticas passaram. Entregável da MISSION.md (script que faz streaming de tokens) ✅.
  Quando voltar: abrir a **Fase 1 (APIs de LLM / prompting)** do roadmap.md. Primeira decisão:
  continuar no Ollama (grátis, offline, modelo fraco, NDJSON) ou pegar chave Anthropic/OpenAI
  (paga, qualidade real, SSE — a streaming-http-cheatsheet já cobre a diferença).
  Sugerir atualizar MISSION.md pro escopo da Fase 1 antes de começar.
  DECIDIDO 2026-09-03: capstone usa **Ollama local** (sem chave/custo). Endpoint POST /api/generate
  ou /api/chat → resposta NDJSON streamada (uma linha JSON por chunk; parecido com SSE da Lição 2).
  Pré-req p/ Vinícius antes da Lição 7: instalar Ollama + `ollama pull` de um modelo pequeno
  (llama3.2:1b ou qwen2.5:0.5b).

## Session log
- 2026-08-30: Enunciado da prática da Lição 1 confundiu o Vinícius. Ponto de confusão:
  ele fundiu "a linha que pausa 500ms" com "o return", e retornou o resultado do
  `await new Promise(setTimeout)` (que é `undefined`) em vez de `n * 2`. Também não usou `n`.
  Reescrevi a seção Prática com passos numerados (1a/1b explícitos) e o objetivo do exercício
  no topo. LIÇÃO PARA MIM: separar visualmente "pausa" de "valor de retorno" nos enunciados;
  sempre abrir com o "porquê" do exercício.

## Ideas / open threads
- TS types weak spot isn't yet covered by a dedicated lesson — fold into lessons 2–3
  (typing async functions, generics on Promise<T>) or give it its own.
- Recurring bug: Vinícius defines an entry fn (`main`) and forgets to call it → "nothing runs".
  Add a one-line reminder in practice prompts: "não esqueça de chamar main() no fim".
- He often runs `npx <file>.ts` — remind: `npx tsx <file>.ts`.
