/* sampling-lab.js — interactive temperature / top-p sampling visualiser.
 *
 * Markup contract:
 *   <div class="samplelab"
 *        data-tokens="cachorro:2.0, gato:1.4, filhote:0.9, ração:0.3, planilha:-1.2, xícara:-2.0">
 *   </div>
 *
 * data-tokens is a comma list of `token:logit` pairs (the raw scores the model
 * produced before softmax). The widget renders:
 *   - a temperature slider (0.01–2.0)
 *   - a top_p slider (0.10–1.00)
 * and a live bar chart of the final sampling probabilities: logits/T -> softmax
 * -> keep the smallest set whose cumulative prob >= top_p (nucleus) -> renormalise.
 * Cut tokens are greyed. Shows the "effective choices" (perplexity) so the learner
 * can feel the distribution widen and narrow. Pure, no deps. Reusable for any
 * lesson about sampling / decoding.
 */
(function () {
  const style = document.createElement("style");
  style.textContent = `
    .samplelab { border: 1px solid var(--rule, #d9d4c7); border-radius: 8px;
      padding: 1.1rem 1.3rem; margin: 1.8rem 0; background: var(--paper, #fff);
      color: var(--ink, #1a1a1a); font-family: inherit; font-size: 0.9rem; }
    .samplelab .ctrl { display: flex; align-items: center; gap: 0.7rem; margin: 0.5rem 0; }
    .samplelab .ctrl label { width: 6.5rem; font-weight: 600; color: var(--accent, #7a2e1d); }
    .samplelab .ctrl input[type=range] { flex: 1; }
    .samplelab .ctrl .val { width: 3rem; text-align: right;
      font-family: "SF Mono", Menlo, monospace; font-size: 0.85rem; }
    .samplelab .bars { margin-top: 1rem; padding-top: 0.9rem;
      border-top: 1px solid var(--rule, #d9d4c7); }
    .samplelab .bar { display: flex; align-items: center; gap: 0.6rem; margin: 0.3rem 0; }
    .samplelab .bar .tok { width: 6rem; font-family: "SF Mono", Menlo, monospace;
      font-size: 0.82rem; text-align: right; }
    .samplelab .bar .track { flex: 1; background: var(--code-bg, #f2efe6);
      border-radius: 3px; overflow: hidden; height: 1.1rem; }
    .samplelab .bar .fill { height: 100%; background: var(--accent, #7a2e1d);
      border-radius: 3px; transition: width 0.15s; }
    .samplelab .bar .pct { width: 3.2rem; font-family: "SF Mono", Menlo, monospace;
      font-size: 0.8rem; }
    .samplelab .bar.cut .tok { color: var(--muted, #6b6b6b); text-decoration: line-through; }
    .samplelab .bar.cut .fill { background: var(--rule, #d9d4c7); }
    .samplelab .bar.cut .pct { color: var(--muted, #6b6b6b); }
    .samplelab .summary { margin-top: 0.9rem; font-size: 0.85rem; color: var(--muted, #6b6b6b); }
    .samplelab .summary b { color: var(--ink, #1a1a1a); }
  `;
  document.head.appendChild(style);

  const parseTokens = (s) =>
    s.split(",").map((p) => {
      const [tok, logit] = p.split(":");
      return { tok: tok.trim(), logit: Number(logit) };
    });

  function softmax(logits, T) {
    const scaled = logits.map((l) => l / T);
    const max = Math.max(...scaled);
    const exps = scaled.map((s) => Math.exp(s - max));
    const sum = exps.reduce((a, b) => a + b, 0);
    return exps.map((e) => e / sum);
  }

  document.querySelectorAll(".samplelab").forEach((box) => {
    const toks = parseTokens(
      box.dataset.tokens ||
        "cachorro:2.0, gato:1.4, filhote:0.9, ração:0.3, planilha:-1.2, xícara:-2.0"
    );

    box.innerHTML = `
      <div class="ctrl">
        <label>temperature</label>
        <input class="t" type="range" min="0.01" max="2" step="0.01" value="1">
        <span class="val tv">1.00</span>
      </div>
      <div class="ctrl">
        <label>top_p</label>
        <input class="p" type="range" min="0.1" max="1" step="0.01" value="1">
        <span class="val pv">1.00</span>
      </div>
      <div class="bars"></div>
      <div class="summary"></div>`;

    const tEl = box.querySelector(".t");
    const pEl = box.querySelector(".p");
    const tv = box.querySelector(".tv");
    const pv = box.querySelector(".pv");
    const bars = box.querySelector(".bars");
    const summary = box.querySelector(".summary");

    function render() {
      const T = Number(tEl.value);
      const topP = Number(pEl.value);
      tv.textContent = T.toFixed(2);
      pv.textContent = topP.toFixed(2);

      const probs = softmax(toks.map((d) => d.logit), T);
      const order = probs
        .map((p, i) => ({ i, p }))
        .sort((a, b) => b.p - a.p);

      // nucleus: keep smallest prefix whose cumulative prob >= topP
      const keep = new Set();
      let cum = 0;
      for (const { i, p } of order) {
        keep.add(i);
        cum += p;
        if (cum >= topP) break;
      }

      // renormalise over kept tokens
      const keptSum = order
        .filter((o) => keep.has(o.i))
        .reduce((s, o) => s + o.p, 0);

      const finalP = probs.map((p, i) => (keep.has(i) ? p / keptSum : 0));
      const maxP = Math.max(...finalP, 0.001);

      bars.innerHTML = order
        .map(({ i }) => {
          const fp = finalP[i];
          const cut = !keep.has(i);
          return `<div class="bar ${cut ? "cut" : ""}">
            <span class="tok">${toks[i].tok}</span>
            <span class="track"><span class="fill" style="width:${(fp / maxP) * 100}%"></span></span>
            <span class="pct">${(fp * 100).toFixed(1)}%</span>
          </div>`;
        })
        .join("");

      // effective choices = perplexity of the final distribution
      const ent = finalP
        .filter((p) => p > 0)
        .reduce((s, p) => s - p * Math.log(p), 0);
      const eff = Math.exp(ent);

      summary.innerHTML =
        `tokens no núcleo: <b>${keep.size}</b> de ${toks.length} &nbsp;·&nbsp; ` +
        `escolhas efetivas: <b>${eff.toFixed(2)}</b> ` +
        `(1 = determinístico, ${toks.length} = uniforme)`;
    }

    tEl.addEventListener("input", render);
    pEl.addEventListener("input", render);
    render();
  });
})();
