import { useState } from "react";
import {
  Award,
  CalendarDays,
  Check,
  ChevronDown,
  Code,
  Download,
  GraduationCap,
  TrendingUp,
} from "lucide-react";

// ------------------------------------------------------------
// EDIT YOUR ACADEMIC DETAILS HERE
// ------------------------------------------------------------
const ACADEMIC = {
  qualification: "Diploma in Information Technology",
  institution: "Nelson Mandela University",
  goal: "Software Developer",
  status: "Third year completed",
  badge: "Year 3 complete",
  nqf: "NQF Level 6",
  nqfNote: "360-credit Diploma",
  expectedCompletion: "April 2027", // check this still matches your plan
  record: "/certificates/academic-record.pdf", // set to null to hide the button
};

// nqf: leave null to hide, or e.g. "NQF Level 5" once you have confirmed it.
// dev: true marks a software development / programming module.
const years = [
  {
    id: "year-1",
    label: "First Year",
    period: "2024",
    completed: true,
    average: 52,
    nqf: null,
    modules: [
      { name: "Systems Software I: IT Essentials", mark: 51 },
      { name: "Information Technology Skills I", mark: 53 },
      { name: "Development Software I", mark: 51, dev: true },
      { name: "Systems Software I: Networks", mark: 50 },
      { name: "Information Systems 1A", mark: 68 },
      { name: "Information Systems 1B", mark: 40 },
    ],
  },
  {
    id: "year-2",
    label: "Second Year",
    period: "2025",
    completed: true,
    average: 61,
    nqf: null,
    modules: [
      { name: "Internet Programming II", mark: 53, dev: true },
      { name: "Development Software II", mark: 75, dev: true, distinction: true },
      { name: "Technical Programming I", mark: 61, dev: true },
      { name: "Information Systems 1B", mark: 57 },
      { name: "Information Systems II", mark: 59 },
    ],
  },
  {
    id: "year-3",
    label: "Third Year",
    period: "2026",
    completed: true,
    average: 65,
    nqf: null,
    modules: [
      { name: "Development Software III: C#", mark: 76, dev: true, distinction: true },
      { name: "Information Systems III: Project Best Practice", mark: 71 },
      { name: "Information Systems III: Systems Analysis & Design", mark: 55 },
      { name: "Information Systems III: Advanced Design", mark: 64 },
      { name: "Development Software III: Project", mark: 65, dev: true },
      { name: "Technical Programming II", mark: 61, dev: true },
      { name: "Support Services II", mark: 66 },
    ],
  },
];

function Certificates() {
  const [openYear, setOpenYear] = useState(null);

  // Everything below is calculated from the data above
  const hasMarks = years.every((y) => typeof y.average === "number");
  const firstAvg = years[0].average;
  const lastAvg = years[years.length - 1].average;
  const improvement = hasMarks ? Math.round(lastAvg - firstAvg) : 0;

  const allModules = years.flatMap((y) => y.modules);
  const distinctionNames = allModules.filter((m) => m.distinction).map((m) => m.name);
  // A repeated module (Information Systems 1B) is counted once
  const modulesPassed = new Set(allModules.map((m) => m.name)).size;
  const hasDevModules = allModules.some((m) => m.dev);

  return (
    <section className="certificates" id="certificates">

      <div className="certificates-container">

        <p className="section-label">MY BACKGROUND</p>

        <h2>Education & <span>Results</span></h2>

        <p className="certificates-intro">
          My academic journey and results on the way to becoming
          a software developer.
        </p>

        {/* Status */}
        <div className="status-banner">
          <div className="status-icon">
            <GraduationCap size={32} />
          </div>

          <div className="status-text">
            <p className="status-label">Academic status</p>
            <h3>{ACADEMIC.status}</h3>
            <p>
              {ACADEMIC.qualification} at {ACADEMIC.institution}
            </p>

            <div className="status-lines">
              <span className="status-goal">
                <Code size={16} /> Goal: {ACADEMIC.goal}
              </span>
              <span className="status-meta">
                <CalendarDays size={16} /> Expected completion:{" "}
                {ACADEMIC.expectedCompletion}
              </span>
            </div>

            {ACADEMIC.record && (
              <div className="status-actions">
                <a
                  href={ACADEMIC.record}
                  download="Tiaan-Botes-Academic-Record.pdf"
                  className="btn btn-primary btn-small"
                >
                  <Download size={16} /> Download academic record
                </a>
              </div>
            )}
          </div>

          <div className="status-pill">
            <Check size={16} /> {ACADEMIC.badge}
          </div>
        </div>

        {/* Highlights */}
        <div className="highlights">
          {improvement > 0 && (
            <div className="highlight">
              <TrendingUp size={24} />
              <strong>+{improvement} points</strong>
              <span>
                Average up from {firstAvg}% to {lastAvg}% since first year
              </span>
            </div>
          )}

          {distinctionNames.length > 0 && (
            <div className="highlight">
              <Award size={24} />
              <strong>
                {distinctionNames.length}{" "}
                {distinctionNames.length === 1 ? "Distinction" : "Distinctions"}
              </strong>
              <span>{distinctionNames.join(" and ")}</span>
            </div>
          )}

          {modulesPassed > 0 && (
            <div className="highlight">
              <Check size={24} />
              <strong>{modulesPassed} modules passed</strong>
              <span>Across three years of study</span>
            </div>
          )}

          {ACADEMIC.nqf && (
            <div className="highlight">
              <GraduationCap size={24} />
              <strong>{ACADEMIC.nqf}</strong>
              <span>{ACADEMIC.nqfNote}</span>
            </div>
          )}
        </div>

        {/* Progress track */}
        <div className="year-track">
          {years.map((y) => (
            <div
              className={y.completed ? "track-step" : "track-step pending"}
              key={y.id}
            >
              <div className="track-dot">
                {y.completed ? <Check size={20} /> : <span>•</span>}
              </div>
              <p>{y.label}</p>
            </div>
          ))}
        </div>

        {/* Marks chart */}
        {hasMarks && (
          <div className="marks-chart">
            <h4>Average mark per year</h4>

            <div className="bars">
              {years.map((y) => (
                <div className="bar-col" key={y.id}>
                  <div className="bar-track">
                    <div
                      className="bar"
                      style={{ "--h": `${Math.min(100, Math.max(0, y.average))}%` }}
                    >
                      <span>{y.average}%</span>
                    </div>
                  </div>
                  <p>{y.label}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Year cards */}
        <div className="year-grid">
          {years.map((y) => (
            <div className="year-card" key={y.id}>

              <div className="year-head">
                <div>
                  <h3>{y.label}</h3>
                  {y.period && <p className="year-period">{y.period}</p>}
                </div>

                {typeof y.average === "number" && (
                  <div className="year-average">
                    <strong>{y.average}%</strong>
                    <span>Average</span>
                  </div>
                )}
              </div>

              <div className="year-tags">
                <p className="year-status">
                  <Check size={14} /> {y.completed ? "Completed" : "In progress"}
                </p>
                {y.nqf && <span className="nqf-chip">{y.nqf}</span>}
              </div>

              {y.modules.length > 0 && (
                <>
                  <button
                    type="button"
                    className="module-toggle"
                    aria-expanded={openYear === y.id}
                    onClick={() => setOpenYear(openYear === y.id ? null : y.id)}
                  >
                    {openYear === y.id ? "Hide modules" : "View modules"}
                    <ChevronDown
                      size={16}
                      className={openYear === y.id ? "chevron open" : "chevron"}
                    />
                  </button>

                  {openYear === y.id && (
                    <ul className="module-list">
                      {y.modules.map((m) => (
                        <li key={m.name}>
                          <span>
                            {m.dev && <Code size={14} className="dev-icon" />}
                            {m.name}
                            {m.distinction && (
                              <em className="distinction">Distinction</em>
                            )}
                          </span>
                          <strong>
                            {typeof m.mark === "number" ? `${m.mark}%` : "–"}
                          </strong>
                        </li>
                      ))}
                    </ul>
                  )}
                </>
              )}

            </div>
          ))}
        </div>

        {hasDevModules && (
          <p className="module-legend">
            <Code size={14} /> Software development and programming modules
          </p>
        )}

        <div className="certificate-note">
          <p>
            <Award size={16} /> Full academic records are available on request.
          </p>
        </div>

      </div>

    </section>
  );
}

export default Certificates;