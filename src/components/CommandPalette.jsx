import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import {
  Briefcase,
  Code,
  Copy,
  Download,
  GraduationCap,
  Mail,
  Monitor,
  Moon,
  Rocket,
  Search,
  Sun,
} from "lucide-react";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { GITHUB, LINKEDIN, EMAIL, CV } from "../links";

const RECORD = "/certificates/academic-record.pdf";

function downloadFile(href, name) {
  const a = document.createElement("a");
  a.href = href;
  a.download = name;
  document.body.appendChild(a);
  a.click();
  a.remove();
}

function goTo(id) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
}

function openLink(url) {
  window.open(url, "_blank", "noopener,noreferrer");
}

function CommandPalette({ theme, toggleTheme }) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [active, setActive] = useState(0);
  const [toast, setToast] = useState("");
  const inputRef = useRef(null);
  const listRef = useRef(null);
  const toastTimer = useRef(null);

  const showToast = (message) => {
    setToast(message);
    clearTimeout(toastTimer.current);
    toastTimer.current = setTimeout(() => setToast(""), 2200);
  };

  const copyEmail = async () => {
    const email = EMAIL.replace("mailto:", "");
    try {
      await navigator.clipboard.writeText(email);
      showToast("Email copied to clipboard");
    } catch {
      showToast(email);
    }
  };

  const commands = [
    { group: "Go to", label: "Home", keywords: "top hero start", icon: Monitor, run: () => goTo("home") },
    { group: "Go to", label: "About me", keywords: "bio background", icon: Briefcase, run: () => goTo("about") },
    { group: "Go to", label: "Projects", keywords: "work gradpulse", icon: Rocket, run: () => goTo("projects") },
    { group: "Go to", label: "GitHub activity", keywords: "repos code repositories", icon: FaGithub, run: () => goTo("github") },
    { group: "Go to", label: "Skills", keywords: "tech stack tools", icon: Code, run: () => goTo("skills") },
    { group: "Go to", label: "Education & Results", keywords: "marks diploma nqf university grades", icon: GraduationCap, run: () => goTo("certificates") },
    { group: "Go to", label: "Contact", keywords: "hire email get in touch", icon: Mail, run: () => goTo("contact") },
    {
      group: "Actions",
      label: theme === "dark" ? "Switch to light theme" : "Switch to dark theme",
      keywords: "dark light mode theme colour",
      icon: theme === "dark" ? Sun : Moon,
      run: toggleTheme,
    },
    { group: "Actions", label: "Download CV", keywords: "resume", icon: Download, run: () => downloadFile(CV, "Tiaan-Botes-CV.pdf") },
    { group: "Actions", label: "Download academic record", keywords: "marks transcript", icon: Download, run: () => downloadFile(RECORD, "Tiaan-Botes-Academic-Record.pdf") },
    { group: "Actions", label: "Copy email address", keywords: "mail contact", icon: Copy, run: copyEmail },
    { group: "Links", label: "Open GitHub", keywords: "code", icon: FaGithub, run: () => openLink(GITHUB) },
    { group: "Links", label: "Open LinkedIn", keywords: "profile", icon: FaLinkedin, run: () => openLink(LINKEDIN) },
    { group: "Links", label: "Send an email", keywords: "mail contact", icon: Mail, run: () => { window.location.href = EMAIL; } },
  ];

  const q = query.trim().toLowerCase();
  const results = q
    ? commands.filter((c) =>
        `${c.label} ${c.keywords || ""} ${c.group}`.toLowerCase().includes(q)
      )
    : commands;

  const close = () => setOpen(false);

  const runCommand = (command) => {
    close();
    // Let the popup close (and page scrolling unlock) before running
    setTimeout(command.run, 100);
  };

  // Ctrl/Cmd + K opens and closes, Esc closes
  useEffect(() => {
    const onKey = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen((o) => !o);
      } else if (e.key === "Escape") {
        setOpen(false);
      }
    };

    const onOpen = () => setOpen(true);

    document.addEventListener("keydown", onKey);
    window.addEventListener("open-palette", onOpen);

    return () => {
      document.removeEventListener("keydown", onKey);
      window.removeEventListener("open-palette", onOpen);
    };
  }, []);

  // Reset, focus and lock page scrolling when it opens
  useEffect(() => {
    if (!open) return;

    setQuery("");
    setActive(0);

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const focusTimer = setTimeout(() => inputRef.current?.focus(), 0);

    return () => {
      clearTimeout(focusTimer);
      document.body.style.overflow = previousOverflow;
    };
  }, [open]);

  useEffect(() => setActive(0), [query]);

  // Keep the highlighted row visible while using the arrow keys
  useEffect(() => {
    listRef.current?.children[active]?.scrollIntoView({ block: "nearest" });
  }, [active]);

  const onInputKeyDown = (e) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActive((i) => Math.min(i + 1, results.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActive((i) => Math.max(i - 1, 0));
    } else if (e.key === "Enter" && results[active]) {
      e.preventDefault();
      runCommand(results[active]);
    }
  };

  const isMac = /Mac|iPhone|iPad/.test(navigator.platform);

  return (
    <>
      {toast && (
        <div className="toast" role="status">
          {toast}
        </div>
      )}

      {open &&
        createPortal(
          <div className="palette-overlay" onClick={close}>
            <div
              className="palette"
              role="dialog"
              aria-modal="true"
              aria-label="Command palette"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="palette-input-row">
                <Search size={18} />
                <input
                  ref={inputRef}
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  onKeyDown={onInputKeyDown}
                  placeholder="Type a command or search..."
                  aria-label="Search commands"
                />
                <kbd>Esc</kbd>
              </div>

              {results.length === 0 ? (
                <p className="palette-empty">No results for "{query}"</p>
              ) : (
                <ul className="palette-list" ref={listRef} role="listbox">
                  {results.map((command, i) => {
                    const Icon = command.icon;

                    return (
                      <li key={command.label} role="option" aria-selected={i === active}>
                        <button
                          type="button"
                          className={i === active ? "palette-item active" : "palette-item"}
                          onMouseEnter={() => setActive(i)}
                          onClick={() => runCommand(command)}
                        >
                          <span className="palette-icon">
                            <Icon size={16} />
                          </span>
                          {command.label}
                          <span className="palette-group">{command.group}</span>
                        </button>
                      </li>
                    );
                  })}
                </ul>
              )}

              <div className="palette-footer">
                <span><kbd>↑</kbd> <kbd>↓</kbd> to move</span>
                <span><kbd>Enter</kbd> to select</span>
                <span><kbd>{isMac ? "⌘" : "Ctrl"}</kbd> <kbd>K</kbd> to toggle</span>
              </div>
            </div>
          </div>,
          document.querySelector(".app") || document.body
        )}
    </>
  );
}

export default CommandPalette;