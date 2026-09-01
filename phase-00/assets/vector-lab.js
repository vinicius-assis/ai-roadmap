/* vector-lab.js — interactive dot-product / cosine-similarity checker.
 *
 * Markup contract:
 *   <div class="veclab" data-a="1,2,2" data-b="2,0,1"></div>
 *
 * data-a / data-b seed the two input boxes. The widget renders two editable
 * vector fields, a "calcular" button, and a worked breakdown: componentwise
 * products, dot product, each magnitude, and the cosine similarity. Lets the
 * learner check a by-hand computation against the machine. Pure, no deps.
 */
(function () {
  const style = document.createElement("style");
  style.textContent = `
    .veclab { border: 1px solid var(--rule, #d9d4c7); border-radius: 8px;
      padding: 1.1rem 1.3rem; margin: 1.8rem 0; background: var(--paper, #fff);
      color: var(--ink, #1a1a1a); font-family: inherit; font-size: 0.92rem; }
    .veclab label { display: inline-block; width: 1.4rem; font-weight: 600;
      color: var(--accent, #7a2e1d); }
    .veclab input { font: inherit; font-size: 0.9rem; padding: 0.35rem 0.5rem;
      border: 1px solid var(--rule, #d9d4c7); border-radius: 4px; width: 12rem;
      background: var(--paper, #fff); color: var(--ink, #1a1a1a);
      font-family: "IBM Plex Mono", "SF Mono", Menlo, monospace; }
    .veclab button { font: inherit; font-size: 0.9rem; margin-left: 0.5rem; color: inherit;
      padding: 0.4rem 0.9rem; background: var(--note-bg, #f6f3ea);
      border: 1px solid var(--rule, #d9d4c7); border-radius: 4px; cursor: pointer; }
    .veclab button:hover { background: var(--surface-2, #ece7d8); }
    .veclab .row { margin: 0.45rem 0; }
    .veclab .out { margin-top: 1rem; padding-top: 0.9rem;
      border-top: 1px solid var(--rule, #d9d4c7); line-height: 1.7; }
    .veclab .out.err { color: var(--bad, #9a2b2b); }
    .veclab code { background: var(--code-bg, #f2efe6); padding: 0.08em 0.3em;
      border-radius: 3px; font-size: 0.86em; }
    .veclab .big { font-size: 1.05rem; font-weight: 600; color: var(--accent, #7a2e1d); }
  `;
  document.head.appendChild(style);

  const parse = (s) => s.split(/[\s,]+/).filter(Boolean).map(Number);
  const round = (n) => Math.round(n * 1000) / 1000;

  document.querySelectorAll(".veclab").forEach((box) => {
    box.innerHTML = `
      <div class="row"><label>a</label>
        <input class="va" value="${box.dataset.a || "1, 2, 2"}"></div>
      <div class="row"><label>b</label>
        <input class="vb" value="${box.dataset.b || "2, 0, 1"}">
        <button>calcular</button></div>
      <div class="out" hidden></div>`;

    const va = box.querySelector(".va");
    const vb = box.querySelector(".vb");
    const out = box.querySelector(".out");

    box.querySelector("button").addEventListener("click", () => {
      const a = parse(va.value);
      const b = parse(vb.value);
      out.hidden = false;
      if (a.length !== b.length || a.length === 0 || a.some(isNaN) || b.some(isNaN)) {
        out.className = "out err";
        out.textContent = "Os dois vetores precisam ter o mesmo tamanho e só conter números.";
        return;
      }
      out.className = "out";
      const prods = a.map((x, i) => x * b[i]);
      const dot = prods.reduce((s, x) => s + x, 0);
      const magA = Math.sqrt(a.reduce((s, x) => s + x * x, 0));
      const magB = Math.sqrt(b.reduce((s, x) => s + x * x, 0));
      const cos = dot / (magA * magB);
      out.innerHTML = `
        <div>produtos componente a componente:
          <code>[${prods.map(round).join(", ")}]</code></div>
        <div>produto escalar <code>a · b</code> = ${prods.map(round).join(" + ")}
          = <span class="big">${round(dot)}</span></div>
        <div>‖a‖ = √${round(a.reduce((s, x) => s + x * x, 0))} = ${round(magA)}
          &nbsp;&nbsp; ‖b‖ = √${round(b.reduce((s, x) => s + x * x, 0))} = ${round(magB)}</div>
        <div>similaridade de cosseno = ${round(dot)} / (${round(magA)} × ${round(magB)})
          = <span class="big">${round(cos)}</span></div>`;
    });
  });
})();
