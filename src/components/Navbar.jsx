import { useEffect, useState } from "react";
import { Menu, Moon, Search, Sun, X } from "lucide-react";

const links = [
  ["Home", "home"],
  ["About", "about"],
  ["Projects", "projects"],
  ["Skills", "skills"],
  ["Education", "certificates"],
  ["Contact", "contact"],
];

function Navbar({ theme, toggleTheme }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("home");

  const isMac = /Mac|iPhone|iPad/.test(navigator.platform);

  // Shrink the navbar slightly once the page is scrolled
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Highlight the link of the section currently on screen
  useEffect(() => {
    const sections = links
      .map(([, id]) => document.getElementById(id))
      .filter(Boolean);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { rootMargin: "-45% 0px -50% 0px" }
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  return (
    <nav className={`navbar ${scrolled ? "scrolled" : ""}`}>
      <a href="#home" className="logo" onClick={() => setMenuOpen(false)}>
        Tiaan<span>.</span>
      </a>

      <div className={`nav-links ${menuOpen ? "open" : ""}`}>
        {links.map(([name, id]) => (
          <a
            key={id}
            href={`#${id}`}
            className={active === id ? "active" : ""}
            onClick={() => setMenuOpen(false)}
          >
            {name}
          </a>
        ))}
      </div>

      <div className="navbar-actions">
        <button
          type="button"
          className="palette-btn"
          onClick={() => window.dispatchEvent(new Event("open-palette"))}
          aria-label="Open command palette"
        >
          <Search size={16} />
          <span>Search</span>
          <kbd>{isMac ? "⌘ K" : "Ctrl K"}</kbd>
        </button>

        <button
          className="theme-toggle"
          onClick={toggleTheme}
          aria-label="Switch colour theme"
          type="button"
        >
          {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
        </button>

        <button
          className="menu-toggle"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label={menuOpen ? "Close navigation" : "Open navigation"}
          aria-expanded={menuOpen}
          type="button"
        >
          {menuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>
    </nav>
  );
}

export default Navbar;