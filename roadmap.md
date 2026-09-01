# Roadmap Ideal — AI Engineer (2026)

> Baseado no roadmap.sh, complementado com o que o mercado exige (agentes, avaliação, produção), adaptado para stack JS/TypeScript, e cruzado com o conteúdo da pós-graduação **Engenharia de Software em IA Aplicada (UNIPDS)**.
>
> Onde o curso cobre um tópico, está indicado assim: `(curso: nº — Módulo X)`. Onde não cobre, fica sem marcação — é um gap a preencher por fora.

**Nota sobre a stack:** dá pra construir praticamente tudo isso em TypeScript hoje — SDKs oficiais (OpenAI, Anthropic, Google) e frameworks como LangChain.js, LangGraph.js e o Vercel AI SDK cobrem o essencial. O curso, aliás, usa majoritariamente essa mesma stack (LangChain.js, LangGraph, Neo4j). A única área onde Python ainda domina sem alternativa real é fine-tuning/treino — fora do escopo de "AI Engineer" que usa modelos prontos.

---

## Fase 0 — Pré-requisitos (1-2 semanas)

- **Async em TS**: Promises, `async/await`, streaming (SSE) — SDKs de LLM usam muito stream de tokens
- **APIs REST**: retry, tratamento de erro, rate limit
- **Matemática mínima**: vetores/produto escalar (embeddings), noções de probabilidade

---

## Fase 1 — Fundamentos de ML/LLM (2-3 semanas)

- O que são LLMs, como funciona inferência
- Redes neurais — conceito, criação e treinamento básico *(curso 02 — Mód. 02: Teachable Machine, rede neural de classificação)*
- Transformers, embeddings, attention *(curso 02 — Mód. 05)*
- Algoritmos genéticos *(curso 02 — Mód. 05)* — contexto histórico/intuição, não é core do dia a dia
- Sistemas de recomendação *(curso 02 — Mód. 03, série em 7 partes)*
- Algoritmos de decisão/jogos *(curso 02 — Mód. 04)*
- Tokens: contagem, limites de contexto, custo por token
- Chamando APIs de modelos: SDKs oficiais TS (OpenAI, Anthropic, Google)
- **Vercel AI SDK**: abstrai múltiplos providers com uma interface só
- Modelos abertos vs. fechados; Ollama (local); **OpenRouter** (orquestração multi-modelo) *(curso 02 — Mód. 09; curso 03 — Mód. 01)*
- **Projeto:** script que chama 2+ providers e compara respostas

---

## Fase 2 — Prompt Engineering (1-2 semanas)

- Zero-shot, few-shot, chain-of-thought
- System vs user prompts, output estruturado (JSON) *(curso 02 — Mód. 06)*
- Padrão **TOON** para prompts *(curso 02 — Mód. 06)* — não é mainstream fora do curso, mas vale conhecer
- Técnicas de redução de alucinação
- **Projeto:** biblioteca de prompts reutilizáveis para uma tarefa específica

---

## Fase 3 — Embeddings e Vector Databases (2 semanas)

- O que são embeddings, casos de uso (busca semântica, recomendação, anomalia)
- Vector DBs: Chroma, Qdrant, Pinecone
- **Graph DB como alternativa/complemento**: Neo4j *(curso 02 — Mód. 10; curso 03 — Mód. 06, query planner e geração de Cypher)*
- Indexação, similaridade, hybrid search
- **Projeto:** busca semântica sobre documentos próprios

---

## Fase 4 — RAG (3-4 semanas)

- RAG vs fine-tuning
- Chunking (fixed, semântico, recursivo)
- Pipeline: ingestão → chunking → embedding → storage → retrieval → geração
- Técnicas avançadas: query rewriting, re-ranking, Agentic RAG
- **Graph RAG com Neo4j** *(curso 02 — Mód. 10: projeto prático RAG + JS + Neo4j)*
- Frameworks: **LangChain.js** *(curso 03 — Mód. 02: introdução)*, LlamaIndex.TS
- **LangGraph**: estados, studio, exposição como Web API, fluxos condicionais, nodes de fallback *(curso 03 — Mód. 02)*
- **Projeto guiado:** marcação de consultas médicas — intenção do usuário, JSON estruturado, testes E2E, cancelamento via texto livre *(curso 03 — Mód. 03)*
- **Projeto guiado:** recomendador de músicas — extração de preferência, memória com SQLite, persistência com Postgres *(curso 03 — Mód. 04)*
- **Projeto:** chatbot sobre documentos próprios (PDF/site)

---

## Fase 5 — Agentes e MCP (6-8 semanas) — *aprofundado, ponto fraco de roadmaps genéricos*

### Fundamentos de agentes
- O que é um agente: LLM que raciocina, planeja, usa ferramentas, age em loop
- Cursor/VSCode/Windsurf como referência de agente em produto real *(curso 02 — Mód. 07)*
- Agentes de IA e tomada de decisão em etapas *(curso 02 — Mód. 07)*
- **Implementação manual do loop primeiro** — antes de framework, pra não depender de "mágica"
- Padrões: ReAct, Planner-Executor
- **Arquitetura de agente**: agent loop, contratos, runtime, observabilidade, tipos de agente *(curso 05 — Mód. 01)*
- **Arquiteturas cognitivas**: plan-execute-reflection *(curso 05 — Mód. 02)*
- Do mock pro real: integração com banco de dados e MCP *(curso 05 — Mód. 03)*

### MCP (Model Context Protocol)
- Diferença entre MCP e modelo clássico de tools/plugins *(curso 04 — Mód. 01)*
- Introdução prática a MCPs: gerar testes, navegar sites, consultar docs, telemetria *(curso 02 — Mód. 08)*
- Criando um MCP do zero: tools, testes via client, inspeção de servidor, resources e prompts *(curso 04 — Mód. 04)*
- Orquestração autônoma via LangChain.js + MCP (MongoDB, filesystem, tool customizada, API externa) *(curso 04 — Mód. 02)*
- Agents, Instructions e Skills *(curso 04 — Mód. 03)*
- **Projeto guiado:** gestão de clientes, CRUD via MCP conectando a sistema legado *(curso 04 — Mód. 05)*
- **Auth em MCP**: RBAC, JWT, service tokens, rate limiting *(curso 04 — Mód. 06)*
- Publicação de servidor MCP (NPM público, Verdaccio privado), diferentes transports *(curso 04 — Mód. 07)*
- **Projeto guiado:** agente de operações de clientes com Customers MCP Server *(curso 04 — Mód. 08)*
- SDK oficial de MCP em TypeScript

### Memória e multi-agente
- Memória de agente: curto prazo (contexto), longo prazo (vector store) *(curso 05 — Mód. 04: embeddings, reflexão evolutiva)*
- Multi-agente: quando dividir responsabilidade entre agentes *(curso 09 — Mód. 03)*
- Framework de orquestração: LangGraph.js, ou Claude Agent SDK / OpenAI Agents SDK
- Segurança contra prompt injection, safeguards, MCP adapters, prompt templates *(curso 03 — Mód. 05)*
- **Projeto:** agente que executa ação real (agenda, cria issue, manda email) — ex. de portfólio *(curso 05 — Mód. 01)*

---

## Fase 6 — Avaliação e Observabilidade (3-4 semanas) — *aprofundado, segundo ponto fraco de roadmaps genéricos*

- Dataset de teste representativo antes de shippar
- Definir "bom": correção, fidelidade à fonte, tom, latência
- LLM-as-judge e seus vieses
- Testes unitários por tool, testes de integração no fluxo completo
- **Observabilidade com Langfuse + evaluation tests** *(curso 03 — Mód. 07)*
- **Evals de seleção de tools** — o agente escolheu a ferramenta certa? *(curso 05 — Mód. 03)*
- **Evals de memória** — o agente lembrou/esqueceu corretamente? *(curso 05 — Mód. 04)*
- Frameworks de evaluation de mercado (visão geral) *(curso 05 — Mód. 02)*
- Ferramentas fora do curso: Promptfoo, LangSmith
- Human-in-the-loop evaluation
- **Projeto:** suite de avaliação automatizada para o RAG/agente já construído

---

## Fase 7 — Produção e Segurança (4-5 semanas) — *o que separa "AI Engineer" de "Applied AI Engineer"*

- Servir API: Express, Fastify, Hono, Next.js API routes
- Cache (Redis), rate limiting, retry/circuit breaker
- Guardrails: validação de input/output, moderation API
- **Segurança contra prompt injection na prática** *(curso 03 — Mód. 05)*
- **RBAC, JWT, service tokens, rate limiting em contexto de MCP** *(curso 04 — Mód. 06)*
- Containerização: **Docker como artefato de IA imutável** *(curso 07 — Mód. 13)*
- **Kubernetes local (Minikube)**, cloud simulada com LocalStack, dashboards com Streamlit, IA offline com Ollama em K8s *(curso 07 — Mód. 13)*
- **DevOps assistido por IA** — trilha inteira dedicada: automação → inteligência agêntica, self-healing, SRE assistido, redução de MTTR, observabilidade preditiva, priorização de vulnerabilidades, FinOps com IA, auto-remediação *(curso 07 — Mód. 01 a 12)*
- **Projeto:** agente da Fase 5 em produção, com cache, logging e guardrails

---

## Fase 8 — Multimodal (1-2 semanas, opcional)

- Vision, geração de imagem, áudio (TTS/STT) *(curso 03 — Mód. 07)*
- Priorize só se o nicho pedir (produto com imagem/voz)

---

## Fase 9 — Aplicações verticais de IA (opcional, escolha por interesse de carreira)

Essas trilhas vão além do "core" de AI Engineer — valem se você quer se posicionar como especialista numa vertical específica, algo que nenhum roadmap genérico cobre:

- **IA para UX/UI** *(curso 06)*: refinamento de requisitos, structured prompts, Angular + MCP, geração de componente acessível via Figma/Stitch, arquitetura enterprise com Nx + spec-driven development, QA autônomo com Cypress/Playwright MCP, Genkit para full-stack
- **IA para Gestão de Projetos** *(curso 08)*: priorização de backlog, estimativas, riscos, status reports, governança e portfólio com IA
- **Arquitetura de Sistemas com IA** *(curso 09)*: fundamentos AI-first, single-agent vs multi-agent, padrões de design AI-específicos, arquitetura enterprise

---

## Portfólio final sugerido (3-4 projetos, não tutoriais)

1. RAG chatbot sobre documentos próprios, com avaliação automatizada (considerar Graph RAG com Neo4j como diferencial)
2. Servidor MCP do zero + agente que consome ele para executar uma ação real
3. Versão em produção de um dos dois acima: cache, observability (Langfuse/LangSmith), guardrails, deploy (Docker/K8s)
4. (Opcional) Algo multimodal ou uma vertical (DevOps/UX) se o nicho pedir

---

## Notas finais

- **Não siga isso como checklist rígido.** Pule o que já domina, aprofunde onde seu objetivo pede.
- **O curso da UNIPDS cobre — e em alguns pontos ultrapassa — este roadmap**, especialmente em MCP (curso inteiro dedicado) e DevOps assistido por IA (13 módulos). Os gaps reais entre o curso e este roadmap são pequenos: fine-tuning leve (fora de escopo mesmo) e "golden dataset/regression testing" como processo formal, que no curso aparece disperso em vários evals mas não como módulo único.
- **Projetos > certificados.** Portfólio de 3-4 projetos reais pesa mais que qualquer curso.
- **A área muda rápido.** Revise ferramentas a cada poucos meses — a estrutura de conhecimento aqui é o que importa, os nomes de ferramentas específicas trocam.