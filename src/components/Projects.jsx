import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import {
  ArrowUpRight,
  Braces,
  Check,
  ChevronLeft,
  ChevronRight,
  Eye,
  Globe,
  Hash,
  Layers,
  Monitor,
  ShieldCheck,
  X,
} from "lucide-react";
import { FaGithub, FaReact, FaServer } from "react-icons/fa";

// ------------------------------------------------------------
// EDIT YOUR PROJECTS HERE. Add another object to add a project.
// ------------------------------------------------------------
const projects = [
  {
    id: "gradpulse",
    number: "PROJECT 01",
    title: "GradPulse",
    summary:
      "A postgraduate administration system for the Faculty of Engineering, the Built Environment and Technology at Nelson Mandela University, tracking students from application to graduation with role-based access.",
    overview:
      "GradPulse replaces the spreadsheets, email threads and paper forms used to manage postgraduates, following each student from application through supervision, proposal, ethics and examination to graduation. Every role gets a view scoped to what it may legitimately see. The project is in active development: the database and core API are in place and the web client is being built out phase by phase.",
    features: [
      "Tracks the full postgraduate lifecycle, from application to graduation",
      "Role-based views, so each user sees only what they are allowed to",
      "Two-tier security: API permission checks plus SQL Server Row-Level Security",
      "Examination details hidden from students by design",
      "Secure login with role picker, step-up verification and role switching",
      "19 forward-only SQL migration scripts for the database",
      "ASP.NET Core 8 REST API with a React + TypeScript client",
    ],
    tags: [
      { name: "React", icon: FaReact },
      { name: "TypeScript", icon: Braces },
      { name: "Ant Design", icon: Layers },
      { name: "C# / ASP.NET Core 8", icon: Hash },
      { name: "SQL Server", icon: FaServer },
      { name: "REST API", icon: Globe },
      { name: "Row-Level Security", icon: ShieldCheck },
    ],
    github: "https://github.com/TiaanB12/GradPulse",
    demo: null, // put a live link here later, e.g. "https://gradpulse.vercel.app"
    screenshots: [
      "/projects/gradpulse-1.png",
      "/projects/gradpulse-2.png",
      "/projects/gradpulse-3.png",
    ],
  },
];

// Shows an image, or a placeholder if the file is missing
function Shot({ src, alt }) {
  const [failed, setFailed] = useState(false);

  if (failed) {
    return (
      <div className="shot-placeholder">
        <Monitor size={38} />
        <p>Screenshot coming soon</p>
      </div>
    );
  }

  return <img src={src} alt={alt} onError={() => setFailed(true)} />;
}

function ProjectModal({ project, onClose }) {
  const [current, setCurrent] = useState(0);
  const total = project.screenshots.length;

  const next = () => setCurrent((c) => (c + 1) % total);
  const prev = () => setCurrent((c) => (c - 1 + total) % total);

  // Esc closes, arrow keys change screenshot, page behind stops scrolling
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") setCurrent((c) => (c + 1) % total);
      if (e.key === "ArrowLeft") setCurrent((c) => (c - 1 + total) % total);
    };

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", onKey);

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", onKey);
    };
  }, [onClose, total]);

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div
        className="modal"
        role="dialog"
        aria-modal="true"
        aria-label={`${project.title} details`}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          className="modal-close"
          onClick={onClose}
          aria-label="Close project details"
        >
          <X size={20} />
        </button>

        {/* Screenshot gallery */}
        <div className="gallery">
          <div className="gallery-main">
            <Shot
              key={project.screenshots[current]}
              src={project.screenshots[current]}
              alt={`${project.title} screenshot ${current + 1}`}
            />
          </div>

          {total > 1 && (
            <>
              <button
                type="button"
                className="gallery-btn gallery-prev"
                onClick={prev}
                aria-label="Previous screenshot"
              >
                <ChevronLeft size={22} />
              </button>

              <button
                type="button"
                className="gallery-btn gallery-next"
                onClick={next}
                aria-label="Next screenshot"
              >
                <ChevronRight size={22} />
              </button>

              <div className="gallery-dots">
                {project.screenshots.map((src, i) => (
                  <button
                    type="button"
                    key={src}
                    className={i === current ? "dot active" : "dot"}
                    onClick={() => setCurrent(i)}
                    aria-label={`Show screenshot ${i + 1}`}
                  />
                ))}
              </div>
            </>
          )}
        </div>

        {/* Details */}
        <div className="modal-body">
          <p className="project-number">{project.number}</p>
          <h3>{project.title}</h3>
          <p className="modal-overview">{project.overview}</p>

          <h4>Key features</h4>
          <ul className="feature-list">
            {project.features.map((feature) => (
              <li key={feature}>
                <Check size={16} /> {feature}
              </li>
            ))}
          </ul>

          <h4>Built with</h4>
          <div className="project-tags">
            {project.tags.map(({ name, icon: Icon }) => (
              <span key={name}>
                <Icon size={14} /> {name}
              </span>
            ))}
          </div>

          <div className="modal-actions">
            <a
              href={project.github}
              target="_blank"
              rel="noreferrer"
              className="btn btn-primary"
            >
              <FaGithub /> View on GitHub
            </a>

            {project.demo && (
              <a
                href={project.demo}
                target="_blank"
                rel="noreferrer"
                className="btn btn-outline"
              >
                Live Demo <ArrowUpRight size={16} />
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function Projects() {
  const [active, setActive] = useState(null);

  return (
    <section className="projects" id="projects">

      <div className="projects-container">

        <p className="section-label">WHAT I'VE BUILT</p>

        <h2>My <span>Projects</span></h2>

        <p className="projects-intro">
          Here are some of the projects I've worked on
          while developing my software development skills.
          Click a project to see more.
        </p>

        <div className="project-grid">

          {projects.map((project) => (
            <div
              className="project-card clickable"
              key={project.id}
              role="button"
              tabIndex={0}
              onClick={() => setActive(project)}
              onKeyDown={(e) => {
                if ((e.key === "Enter" || e.key === " ") && e.target === e.currentTarget) {
                  e.preventDefault();
                  setActive(project);
                }
              }}
            >

              <div className="project-number">{project.number}</div>

              <h3>{project.title}</h3>

              <p className="project-description">{project.summary}</p>

              <div className="project-tags">
                {project.tags.map(({ name, icon: Icon }) => (
                  <span key={name}>
                    <Icon size={14} /> {name}
                  </span>
                ))}
              </div>

              <div className="card-footer">
                <span className="card-hint">
                  <Eye size={16} /> View details
                </span>

                <a
                  href={project.github}
                  target="_blank"
                  rel="noreferrer"
                  className="project-link"
                  onClick={(e) => e.stopPropagation()}
                >
                  <FaGithub /> GitHub <ArrowUpRight size={16} />
                </a>
              </div>

            </div>
          ))}

        </div>

      </div>

      {active &&
        createPortal(
          <ProjectModal project={active} onClose={() => setActive(null)} />,
          document.querySelector(".app") || document.body
        )}

    </section>
  );
}

export default Projects;