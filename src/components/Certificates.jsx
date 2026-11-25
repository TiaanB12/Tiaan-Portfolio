import { useState } from "react";
import {
  Award,
  CalendarDays,
  Check,
  ChevronDown,
  Download,
  GraduationCap,
} from "lucide-react";

// ------------------------------------------------------------
// EDIT YOUR ACADEMIC DETAILS HERE
// ------------------------------------------------------------
const ACADEMIC = {
  qualification: "Software Development",
  institution: "Nelson Mandela University",
  status: "Third year completed",
  badge: "Year 3 complete",
  expectedCompletion: "April 2027", // check this still matches your plan
  record: "/certificates/academic-record.pdf", // set to null to hide the button
};

// Leave a value as null (or modules as []) to hide it on the site.
const years = [
  {
    id: "year-1",
    label: "First Year",
    period: null, // e.g. "2023"
    completed: true,
    average: null, // e.g. 72
    modules: [], // e.g. [{ name: "Programming 101", mark: 78 }]
  },
  {
    id: "year-2",
    label: "Second Year",
    period: null,
    completed: true,
    average: null,
    modules: [],
  },
  {
    id: "year-3",
    label: "Third Year",
    period: null,
    completed: true,
    average: null,
    modules: [],
  },
];

function Certificates() {
  const [openYear, setOpenYear] = useState(null);

  // The chart only appears once every year has an average
  const hasMarks = years.every((y) => typeof y.average === "number");

  return (
    <section className="certificates" id="certificates">

      <div className="certificates-container">

        <p className="section-label">MY BACKGROUND</p>

        <h2>Education & <span>Results</span></h2>

        <p className="certificates-intro">
          My academic journey and results as an aspiring
          software developer.
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
            <span className="status-meta">
              <CalendarDays size={16} /> Expected completion:{" "}
              {ACADEMIC.expectedCompletion}
            </span>

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

              <p className="year-status">
                <Check size={14} /> {y.completed ? "Completed" : "In progress"}
              </p>

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
                          <span>{m.name}</span>
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