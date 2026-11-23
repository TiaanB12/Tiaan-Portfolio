import { useEffect, useRef, useState } from "react";
import { ArrowUp } from "lucide-react";

const TILT_SELECTOR =
  ".project-card, .about-card, .skill-card, .education-card, .contact-card";

function Effects() {
  const [progress, setProgress] = useState(0);
  const [showTop, setShowTop] = useState(false);
  const glowRef = useRef(null);

  // Scroll progress + back-to-top visibility
  useEffect(() => {
    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(max > 0 ? window.scrollY / max : 0);
      setShowTop(window.scrollY > 600);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  // Cursor spotlight + card tilt (mouse devices only)
  useEffect(() => {
    const canHover = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!canHover || reduceMotion) return;

    let frame;

    const onMove = (e) => {
      cancelAnimationFrame(frame);

      frame = requestAnimationFrame(() => {
        const glow = glowRef.current;
        if (glow) {
          glow.style.setProperty("--mx", `${e.clientX}px`);
          glow.style.setProperty("--my", `${e.clientY}px`);
          glow.classList.add("on");
        }

        const card = e.target.closest?.(TILT_SELECTOR);
        if (card) {
          const rect = card.getBoundingClientRect();
          const x = (e.clientX - rect.left) / rect.width;
          const y = (e.clientY - rect.top) / rect.height;

          card.style.setProperty("--rx", `${(0.5 - y) * 8}deg`);
          card.style.setProperty("--ry", `${(x - 0.5) * 8}deg`);
          card.style.setProperty("--px", `${x * 100}%`);
          card.style.setProperty("--py", `${y * 100}%`);
        }
      });
    };

    const onOut = (e) => {
      const card = e.target.closest?.(TILT_SELECTOR);
      if (card && !card.contains(e.relatedTarget)) {
        card.style.setProperty("--rx", "0deg");
        card.style.setProperty("--ry", "0deg");
      }
    };

    document.addEventListener("mousemove", onMove);
    document.addEventListener("mouseout", onOut);

    return () => {
      cancelAnimationFrame(frame);
      document.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseout", onOut);
    };
  }, []);

  return (
    <>
      <div
        className="scroll-progress"
        style={{ transform: `scaleX(${progress})` }}
      />

      <div className="bg-orbs" aria-hidden="true">
        <span className="orb orb-1" />
        <span className="orb orb-2" />
      </div>

      <div className="cursor-glow" ref={glowRef} aria-hidden="true" />

      <button
        type="button"
        className={`back-to-top ${showTop ? "show" : ""}`}
        aria-label="Back to top"
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      >
        <ArrowUp size={20} />
      </button>
    </>
  );
}

export default Effects;