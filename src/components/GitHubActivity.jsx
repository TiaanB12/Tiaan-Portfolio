import { useEffect, useState } from "react";
import { ArrowUpRight, CalendarDays, Code, Star } from "lucide-react";
import { FaGithub } from "react-icons/fa";

// ------------------------------------------------------------
// SETTINGS
// ------------------------------------------------------------
const USER = "TiaanB12";
const MAX_REPOS = 6;
// Show only these repos, in this order. Leave empty to show your latest ones.
const PINNED_REPOS = []; // e.g. ["GradPulse", "Tiaan-Portfolio"]
// Never show these (old coursework, experiments, etc.)
const HIDDEN_REPOS = []; // e.g. ["prt2030_prac7"]

const CACHE_KEY = "gh-repos-v1";
const CACHE_MINUTES = 10;

const LANG_COLORS = {
  JavaScript: "#f1e05a",
  TypeScript: "#3178c6",
  "C#": "#178600",
  HTML: "#e34c26",
  CSS: "#563d7c",
  Python: "#3572a5",
  Java: "#b07219",
  "C++": "#f34b7d",
  C: "#8a8a8a",
  PLpgSQL: "#336790",
  TSQL: "#e38c00",
  PowerShell: "#012456",
  Shell: "#89e051",
};

// Saves your repos for a few minutes so GitHub's free limit is never hit
async function loadRepos() {
  try {
    const cached = JSON.parse(sessionStorage.getItem(CACHE_KEY));
    if (cached && Date.now() - cached.time < CACHE_MINUTES * 60 * 1000) {
      return cached.data;
    }
  } catch {
    // ignore a broken cache
  }

  const res = await fetch(
    `https://api.github.com/users/${USER}/repos?sort=pushed&per_page=100`,
    { headers: { Accept: "application/vnd.github+json" } }
  );
  if (!res.ok) throw new Error(`GitHub responded with ${res.status}`);

  const all = await res.json();
  const data = all.filter((repo) => !repo.fork);

  try {
    sessionStorage.setItem(CACHE_KEY, JSON.stringify({ time: Date.now(), data }));
  } catch {
    // storage unavailable, that's fine
  }

  return data;
}

function timeAgo(date) {
  const seconds = (Date.now() - new Date(date).getTime()) / 1000;
  const units = [
    ["year", 31536000],
    ["month", 2592000],
    ["day", 86400],
    ["hour", 3600],
    ["minute", 60],
  ];

  for (const [name, size] of units) {
    if (seconds >= size) {
      const n = Math.floor(seconds / size);
      return `${n} ${name}${n > 1 ? "s" : ""} ago`;
    }
  }
  return "just now";
}

function GitHubActivity() {
  const [state, setState] = useState({ status: "loading", repos: [] });

  useEffect(() => {
    let cancelled = false;

    loadRepos()
      .then((repos) => {
        if (!cancelled) setState({ status: "ready", repos });
      })
      .catch(() => {
        if (!cancelled) setState({ status: "error", repos: [] });
      });

    return () => {
      cancelled = true;
    };
  }, []);

  const { status, repos } = state;

  const visible = repos.filter((r) => !HIDDEN_REPOS.includes(r.name));
  const shown = PINNED_REPOS.length
    ? PINNED_REPOS.map((name) => visible.find((r) => r.name === name)).filter(Boolean)
    : visible.slice(0, MAX_REPOS);

  const langCounts = {};
  visible.forEach((r) => {
    if (r.language) langCounts[r.language] = (langCounts[r.language] || 0) + 1;
  });
  const langs = Object.entries(langCounts).sort((a, b) => b[1] - a[1]);
  const langTotal = langs.reduce((sum, [, n]) => sum + n, 0);

  const lastPush = visible.reduce(
    (latest, r) =>
      !latest || new Date(r.pushed_at) > new Date(latest) ? r.pushed_at : latest,
    null
  );

  return (
    <section className="projects github" id="github">

      <div className="projects-container">

        <p className="section-label">LIVE FROM GITHUB</p>

        <h2>GitHub <span>Activity</span></h2>

        <p className="projects-intro">
          A live view of my latest public repositories, pulled
          straight from GitHub.
        </p>

        {status === "loading" && (
          <div className="repo-grid">
            <div className="skeleton" />
            <div className="skeleton" />
            <div className="skeleton" />
          </div>
        )}

        {status === "error" && (
          <div className="gh-message">
            <p>GitHub couldn't be reached right now. You can still see my work there:</p>
            <a
              href={`https://github.com/${USER}`}
              target="_blank"
              rel="noreferrer"
              className="btn btn-outline btn-small"
            >
              <FaGithub /> github.com/{USER}
            </a>
          </div>
        )}

        {status === "ready" && visible.length === 0 && (
          <div className="gh-message">
            <p>My public repositories will appear here as I publish them.</p>
            <a
              href={`https://github.com/${USER}`}
              target="_blank"
              rel="noreferrer"
              className="btn btn-outline btn-small"
            >
              <FaGithub /> Visit my GitHub
            </a>
          </div>
        )}

        {status === "ready" && visible.length > 0 && (
          <>
            <div className="highlights gh-stats">
              <div className="highlight">
                <div className="highlight-icon"><FaGithub size={22} /></div>
                <div>
                  <strong>{visible.length} public {visible.length === 1 ? "repository" : "repositories"}</strong>
                  <span>Shared on GitHub</span>
                </div>
              </div>

              <div className="highlight">
                <div className="highlight-icon"><Code size={22} /></div>
                <div>
                  <strong>{langs.length} {langs.length === 1 ? "language" : "languages"}</strong>
                  <span>{langs.slice(0, 3).map(([name]) => name).join(", ") || "Mixed"}</span>
                </div>
              </div>

              <div className="highlight">
                <div className="highlight-icon"><CalendarDays size={22} /></div>
                <div>
                  <strong>{lastPush ? timeAgo(lastPush) : "Recently"}</strong>
                  <span>Last code pushed</span>
                </div>
              </div>
            </div>

            {langTotal > 0 && (
              <div className="lang-block">
                <h4>Languages across my repositories</h4>

                <div className="lang-bar">
                  {langs.map(([name, n]) => (
                    <span
                      key={name}
                      title={name}
                      style={{
                        width: `${(n / langTotal) * 100}%`,
                        background: LANG_COLORS[name] || "var(--accent)",
                      }}
                    />
                  ))}
                </div>

                <ul className="lang-legend">
                  {langs.map(([name, n]) => (
                    <li key={name}>
                      <span
                        className="lang-dot"
                        style={{ background: LANG_COLORS[name] || "var(--accent)" }}
                      />
                      {name} · {Math.round((n / langTotal) * 100)}%
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <div className="repo-grid">
              {shown.map((repo) => (
                <a
                  className="repo-card"
                  key={repo.id}
                  href={repo.html_url}
                  target="_blank"
                  rel="noreferrer"
                >
                  <div className="repo-top">
                    <span className="repo-name"><FaGithub /> {repo.name}</span>
                    <ArrowUpRight size={18} />
                  </div>

                  <p className="repo-desc">
                    {repo.description || "No description added yet."}
                  </p>

                  <div className="repo-meta">
                    {repo.language && (
                      <span>
                        <i
                          className="lang-dot"
                          style={{ background: LANG_COLORS[repo.language] || "var(--accent)" }}
                        />
                        {repo.language}
                      </span>
                    )}
                    {repo.stargazers_count > 0 && (
                      <span><Star size={13} /> {repo.stargazers_count}</span>
                    )}
                    <span>Updated {timeAgo(repo.pushed_at)}</span>
                  </div>
                </a>
              ))}
            </div>

            <div className="gh-footer">
              <a
                href={`https://github.com/${USER}`}
                target="_blank"
                rel="noreferrer"
                className="btn btn-outline"
              >
                <FaGithub /> View all on GitHub <ArrowUpRight size={16} />
              </a>
            </div>
          </>
        )}

      </div>

    </section>
  );
}

export default GitHubActivity;