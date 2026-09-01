# Roadmap Progress Tracker — Design

**Data:** 2026-08-29
**Fonte:** `roadmap.md` (Roadmap Ideal — AI Engineer 2026)

## Objetivo

Página web interativa e offline para acompanhar o progresso de estudo pelo
`roadmap.md`. Ao reabrir, retoma automaticamente do último ponto. Nada online,
nenhum servidor.

## Formato

Um Artifact HTML único, autocontido, sem dependências externas (sem CDN, sem
fonts externas). Tema claro/escuro seguindo o navegador.

## Conteúdo (derivado do roadmap.md)

- As 9 fases (Fase 0 a Fase 9) viram seções colapsáveis.
- Cada bullet de nível superior do roadmap vira um item rastreável (~90 itens).
  Sub-bullets aninhados contam como parte do bullet pai (não são itens
  separados).
- Itens marcados `**Projeto:**` / `**Projeto guiado:**` recebem destaque visual
  dentro da fase (borda/ícone), mas são itens rastreáveis normais.
- Quando o bullet cita cobertura do curso (ex.: `(curso 03 — Mód. 02)`), esse
  trecho vira um badge cinza ao lado do item. Apenas informativo — sem filtro.
- Texto introdutório, "Nota sobre a stack", "Portfólio final sugerido" e "Notas
  finais" aparecem como texto estático, não rastreável.
- O conteúdo do roadmap é embutido no HTML como estrutura de dados fixa. A página
  não lê o `roadmap.md` em runtime nem permite editá-lo.

## Estados de item

Cada item cicla por clique: `não começado` → `em andamento` → `feito` →
`não começado`.

Representação visual: ⬜ / 🔵 / ✅ (mais mudança de cor/opacidade do texto no
estado "feito").

## Progresso

- **Barra geral** no cabeçalho fixo do topo: "X de N itens • P%".
- **Barra por fase** no cabeçalho de cada seção.
- Cálculo do percentual: `feito` = 1 ponto, `em andamento` = 0,5 ponto,
  `não começado` = 0. `P = soma_pontos / N_itens * 100`, arredondado ao inteiro.
- Fase com 100% dos itens em `feito` ganha um ✓ no título.

## Persistência

`localStorage` (chave única do app). Fonte de verdade.

Estrutura salva:

```json
{
  "version": 1,
  "items": { "<itemId>": "not_started | in_progress | done" },
  "lastChangeAt": "<ISO timestamp>",
  "lastExportAt": "<ISO timestamp | null>"
}
```

- `itemId`: slug estável derivado de fase + índice do bullet (ex.: `f5-12`).
  Estável entre republishes desde que a ordem dos bullets não mude.
- Toda alteração de estado regrava e atualiza `lastChangeAt`.
- Na abertura, restaura os estados. Itens ausentes no save = `not_started`.
- Leitura/escrita sempre em try/catch; se `localStorage` falhar, a página
  funciona normalmente na sessão (só não persiste) e mostra um aviso discreto.

### Backup manual (export / import)

Download dentro de Artifact é bloqueado para o viewer, então:

- **Exportar:** botão abre um painel com o JSON completo em um `<textarea>`
  somente leitura + botão "copiar". Ao exportar, grava `lastExportAt`.
- **Importar:** botão abre um `<textarea>` onde o usuário cola um JSON; ao
  confirmar, valida o formato (`version`, `items` com valores válidos) e
  substitui o estado atual. JSON inválido → mensagem de erro, nada muda.

## Indicador de tempo e aviso de backup

Rodapé discreto: "salvo localmente • última alteração <relativo>".

Formatação relativa (pt-BR), recalculada na abertura e a cada 60 s:

| Tempo desde o evento | Texto |
|---|---|
| < 1 min | "agora mesmo" |
| < 60 min | "há N min" |
| < 24 h | "há N h" |
| 1 dia (24–48 h) | "ontem" |
| < 7 dias | "há N dias" |
| < 5 semanas | "há N semanas" |
| < 12 meses | "há N meses" |
| ≥ 12 meses | "há mais de um ano" |

O `title` (tooltip no hover) mostra a data/hora absoluta exata.

**Aviso de backup:** banner suave (dispensável na sessão) aparece quando
`agora - lastExportAt > 7 dias` **E** `lastChangeAt > lastExportAt`. Se
`lastExportAt` é null mas nunca houve alteração, não aparece. Some após um
export bem-sucedido até completar 7 dias de novo.

## Layout

- Coluna única, largura máx. ~800px, centralizada.
- Cabeçalho fixo (sticky) no topo: título curto + barra de progresso geral.
- Seções de fase colapsáveis; estado colapsado/expandido também em
  `localStorage` (conveniência, não crítico).
- Botões "Exportar" / "Importar" no cabeçalho ou num rodapé fixo.
- Responsivo; sem scroll horizontal. Badges quebram linha se necessário.

## Fora do escopo

- Notas / campos de texto livre por item.
- Filtro "curso vs. gap".
- Edição do roadmap pela página.
- Qualquer sincronização online ou entre dispositivos (além do JSON manual).
- Histórico / datas de conclusão por item.

## Teste / verificação

- Marcar itens, recarregar a página → estados restaurados.
- Percentuais conferem com a regra (feito=1, andamento=0,5).
- Export gera JSON válido; import do mesmo JSON reproduz o estado.
- Import de JSON inválido não altera o estado e mostra erro.
- `localStorage` indisponível (modo restrito) → página ainda utilizável.
- Faixas do contador relativo conferem em valores de fronteira.
