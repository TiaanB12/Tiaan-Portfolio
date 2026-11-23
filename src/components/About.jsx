import { Briefcase, GraduationCap, Rocket } from "lucide-react";

function About() {
  return (
    <section className="about" id="about">

      <div className="about-container">

        <p className="section-label">GET TO KNOW ME</p>

        <h2>About <span>Me</span></h2>

        <p className="about-description">
          I'm Tiaan Botes, a Software Development student at
          Nelson Mandela University, passionate about creating
          modern websites and practical software solutions.

          I enjoy learning new technologies, solving problems
          and turning ideas into functional applications.

          One of my biggest projects is GradPulse, a postgraduate
          administration system that has helped me develop my
          skills in frontend development, backend development
          and database management.
        </p>

        <div className="about-cards">

          <div className="about-card">
            <div className="card-icon"><GraduationCap size={24} /></div>
            <h3>Education</h3>
            <p>Software Development</p>
            <span>Nelson Mandela University</span>
          </div>

          <div className="about-card">
            <div className="card-icon"><Briefcase size={24} /></div>
            <h3>Experience</h3>
            <p>4 Years</p>
            <span>Customer-facing and hospitality experience</span>
          </div>

          <div className="about-card">
            <div className="card-icon"><Rocket size={24} /></div>
            <h3>Main Project</h3>
            <p>GradPulse</p>
            <span>Full-stack postgraduate administration system</span>
          </div>

        </div>

      </div>

    </section>
  );
}

export default About;