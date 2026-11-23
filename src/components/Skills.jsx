import { Braces, Code, Globe, Hash, Monitor, Server } from "lucide-react";
import {
  FaHtml5,
  FaCss3Alt,
  FaJs,
  FaReact,
  FaGitAlt,
  FaGithub,
  FaDatabase,
  FaServer,
} from "react-icons/fa";

const skills = [
  { name: "HTML5", category: "Frontend", icon: FaHtml5, color: "#e34f26" },
  { name: "CSS3", category: "Frontend", icon: FaCss3Alt, color: "#1d8fe1" },
  { name: "JavaScript", category: "Frontend", icon: FaJs, color: "#f7df1e" },
  { name: "TypeScript", category: "Frontend", icon: Braces, color: "#3b82f6" },
  { name: "React", category: "Frontend", icon: FaReact, color: "#61dafb" },
  { name: "C#", category: "Backend", icon: Hash, color: "#a179dc" },
  { name: "ASP.NET Core", category: "Backend", icon: Server, color: "#7c5cff" },
  { name: "REST APIs", category: "Backend", icon: Globe, color: "#38bdf8" },
  { name: "SQL Server", category: "Database", icon: FaServer, color: "#e04a4a" },
  { name: "SQL", category: "Database", icon: FaDatabase, color: "#f29111" },
  { name: "Git", category: "Tools", icon: FaGitAlt, color: "#f05032" },
  { name: "GitHub", category: "Tools", icon: FaGithub, color: "#8b949e" },
  { name: "Visual Studio", category: "Tools", icon: Monitor, color: "#9b6cf0" },
  { name: "VS Code", category: "Tools", icon: Code, color: "#3b9cff" },
];

function Skills() {
  return (
    <section className="skills" id="skills">

      <div className="skills-container">

        <p className="section-label">MY TECHNICAL ABILITIES</p>

        <h2>My <span>Skills</span></h2>

        <p className="skills-intro">
          Technologies and tools I have worked with during
          my software development journey.
        </p>

        <div className="skills-grid">

          {skills.map((skill) => {
            const Icon = skill.icon;

            return (
              <div className="skill-card" key={skill.name}>

                <div className="skill-icon" style={{ "--c": skill.color }}>
                  <Icon />
                </div>

                <h3>{skill.name}</h3>

                <span>{skill.category}</span>

              </div>
            );
          })}

        </div>

      </div>

    </section>
  );
}

export default Skills;