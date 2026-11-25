import { useEffect, useState } from "react";
import { Mail } from "lucide-react";
import { FaGithub, FaLinkedin } from "react-icons/fa";

import Effects from "./components/Effects";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Projects from "./components/Projects";
import Skills from "./components/Skills";
import Certificates from "./components/Certificates";
import Contact from "./components/Contact";
import { GITHUB, LINKEDIN, EMAIL } from "./links";

// Everything that should fade up when scrolled into view
const REVEAL_SELECTOR = [
  ".section-label",
  ".about h2", ".about-description", ".about-card",
  ".projects h2", ".projects-intro", ".project-card",
  ".skills h2", ".skills-intro", ".skill-card",
  ".certificates h2", ".certificates-intro",
  ".status-banner", ".year-track", ".marks-chart", ".year-card",
  ".certificate-note",
  ".contact h2", ".contact-description", ".contact-card",
].join(", ");

function App() {
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem("portfolio-theme") || "dark";
  });

  function toggleTheme() {
    const newTheme = theme === "dark" ? "light" : "dark";

    setTheme(newTheme);
    localStorage.setItem("portfolio-theme", newTheme);
  }

  // Scroll-reveal animation
  useEffect(() => {
    const targets = document.querySelectorAll(REVEAL_SELECTOR);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );

    targets.forEach((el) => {
      // Stagger siblings (e.g. cards in a grid)
      const siblings = Array.from(el.parentElement.children).filter((child) =>
        child.matches(REVEAL_SELECTOR)
      );
      const index = siblings.indexOf(el) % 6;

      el.style.setProperty("--delay", `${index * 90}ms`);
      el.classList.add("reveal");
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div className={`app ${theme}`}>
      <Effects />
      <Navbar theme={theme} toggleTheme={toggleTheme} />

      <main>
        <Hero />
        <About />
        <Projects />
        <Skills />
        <Certificates />
        <Contact />
      </main>

      <footer>
        <div className="social-links">
          <a href={GITHUB} target="_blank" rel="noreferrer" aria-label="GitHub">
            <FaGithub />
          </a>
          <a href={LINKEDIN} target="_blank" rel="noreferrer" aria-label="LinkedIn">
            <FaLinkedin />
          </a>
          <a href={EMAIL} aria-label="Email">
            <Mail size={19} />
          </a>
        </div>
        <p>© 2026 Tiaan Botes. Built with React.</p>
      </footer>
    </div>
  );
}

export default App;