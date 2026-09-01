/* quiz.js — reusable retrieval-practice widget for Phase 0 lessons.
 *
 * Markup contract:
 *   <div class="quiz" data-answer="B">
 *     <p class="q">Question text?</p>
 *     <button data-opt="A">First option</button>
 *     <button data-opt="B">Second option</button>
 *     <button data-opt="C">Third option</button>
 *     <p class="explain" hidden>Why B is right...</p>
 *   </div>
 *
 * Behaviour: click marks correct/incorrect, reveals .explain, locks the widget.
 * Keep every option the same word/character length (teaching-skill rule) — the
 * widget deliberately adds no length or format cues.
 */
(function () {
  const style = document.createElement("style");
  style.textContent = `
    .quiz { border: 1px solid var(--rule, #d9d4c7); border-radius: 8px;
      padding: 1.1rem 1.3rem; margin: 1.8rem 0; background: var(--paper, #fff);
      color: var(--ink, #1a1a1a); font-family: inherit; }
    .quiz .q { font-weight: 600; margin: 0 0 0.9rem; font-family: inherit; }
    .quiz button { display: block; width: 100%; text-align: left; margin: 0.4rem 0;
      padding: 0.55rem 0.8rem; font: inherit; font-size: 0.92rem; color: inherit;
      background: var(--note-bg, #f6f3ea); border: 1px solid var(--rule, #d9d4c7);
      border-radius: 4px; cursor: pointer;
      transition: background 0.12s, border-color 0.12s, transform 0.12s; }
    .quiz button:hover:not(:disabled) { background: var(--surface-2, #ece7d8);
      border-color: var(--accent, #7a2e1d); transform: translateX(2px); }
    .quiz button:focus-visible:not(:disabled) { outline: 2px solid var(--accent, #7a2e1d);
      outline-offset: 2px; }
    .quiz button:disabled { cursor: default; opacity: 0.9; }
    .quiz button:disabled:hover { transform: none; }
    .quiz button.correct { background: color-mix(in srgb, var(--ok, #2e6b3f) 18%, var(--paper, #fff));
      border-color: var(--ok, #2e6b3f); color: var(--ok, #2e6b3f); font-weight: 600; }
    .quiz button.wrong { background: color-mix(in srgb, var(--bad, #9a2b2b) 16%, var(--paper, #fff));
      border-color: var(--bad, #9a2b2b); color: var(--bad, #9a2b2b); }
    .quiz .explain { margin: 0.9rem 0 0; padding: 0.7rem 0.9rem;
      background: var(--note-bg, #f6f3ea); border-left: 3px solid var(--rule, #d9d4c7);
      font-size: 0.9rem; line-height: 1.55; }
  `;
  document.head.appendChild(style);

  document.querySelectorAll(".quiz").forEach((quiz) => {
    const answer = quiz.dataset.answer;
    const explain = quiz.querySelector(".explain");
    quiz.querySelectorAll("button[data-opt]").forEach((btn) => {
      btn.addEventListener("click", () => {
        const picked = btn.dataset.opt;
        quiz.querySelectorAll("button[data-opt]").forEach((b) => {
          b.disabled = true;
          if (b.dataset.opt === answer) b.classList.add("correct");
        });
        if (picked !== answer) btn.classList.add("wrong");
        if (explain) explain.hidden = false;
      });
    });
  });
})();
