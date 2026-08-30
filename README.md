# Trilha AI Engineer 2026

Tracker interativo de progresso pelo `roadmap.md`. Página estática única
(`index.html`), sem build. Progresso salvo no `localStorage` do navegador;
backup manual via export/import de JSON.

## Rodar local

Abra `index.html` no navegador (ou sirva a pasta: `python3 -m http.server`).

## Deploy (GitHub Pages)

Settings → Pages → Build and deployment → Source: **Deploy from a branch**,
branch `main` / `/ (root)`. A página fica em
`https://vinicius-assis.github.io/ai-roadmap/`.

## Atualizar o roadmap

Os dados ficam embutidos no array `DATA` dentro do `<script>` em `index.html`.
Se `roadmap.md` mudar, ajuste o `DATA` (os ids tipo `f5-12` são posicionais).
