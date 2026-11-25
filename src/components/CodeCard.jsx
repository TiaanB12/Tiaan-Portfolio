import { useEffect, useState } from "react";

// ------------------------------------------------------------
// EDIT THE TEXT SHOWN IN THE CODE WINDOW HERE
// Each line is a list of [colour, text] pieces.
// ------------------------------------------------------------
const CODE = [
  [["kw", "const "], ["var", "developer"], ["p", " = {"]],
  [["p", "  "], ["key", "name"], ["p", ": "], ["str", '"Tiaan Botes"'], ["p", ","]],
  [["p", "  "], ["key", "goal"], ["p", ": "], ["str", '"Software Developer"'], ["p", ","]],
  [["p", "  "], ["key", "education"], ["p", ": "], ["str", '"Diploma in IT, NMU"'], ["p", ","]],
  [
    ["p", "  "], ["key", "stack"], ["p", ": ["],
    ["str", '"React"'], ["p", ", "], ["str", '"C#"'], ["p", ", "],
    ["str", '"SQL Server"'], ["p", "],"],
  ],
  [["p", "  "], ["key", "lookingFor"], ["p", ": "], ["str", '"Junior developer role"'], ["p", ","]],
  [["p", "};"]],
  [["var", "developer"], ["p", "."], ["fn", "sayHello"], ["p", "();"]],
];

const TOTAL = CODE.reduce(
  (sum, line) => sum + line.reduce((s, [, text]) => s + text.length, 0),
  0
);

function CodeCard() {
  const reduceMotion =
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const [started, setStarted] = useState(reduceMotion);
  const [count, setCount] = useState(reduceMotion ? TOTAL : 0);

  // Wait for the hero entrance animation, then start typing
  useEffect(() => {
    if (reduceMotion) return;
    const timer = setTimeout(() => setStarted(true), 1200);
    return () => clearTimeout(timer);
  }, [reduceMotion]);

  // Type one character at a time
  useEffect(() => {
    if (!started || count >= TOTAL) return;
    const timer = setTimeout(() => setCount(count + 1), 28);
    return () => clearTimeout(timer);
  }, [started, count]);

  let remaining = count;

  const lines = CODE.map((line, i) => {
    const parts = [];

    for (const [type, text] of line) {
      if (remaining <= 0) break;
      const shown = text.slice(0, remaining);
      remaining -= shown.length;
      parts.push(
        <span key={parts.length} className={`tok-${type}`}>
          {shown}
        </span>
      );
    }

    const showCaret =
      (parts.length > 0 && remaining === 0) || (i === 0 && count === 0);

    return (
      <div className="code-line" key={i}>
        <span className="code-num">{i + 1}</span>
        <span className="code-text">
          {parts}
          {showCaret && <span className="code-caret" />}
        </span>
      </div>
    );
  });

  return (
    <div className="code-card" aria-hidden="true">
      <div className="code-bar">
        <span className="code-dot red" />
        <span className="code-dot yellow" />
        <span className="code-dot green" />
        <span className="code-file">developer.ts</span>
      </div>
      <div className="code-body">{lines}</div>
    </div>
  );
}

export default CodeCard;