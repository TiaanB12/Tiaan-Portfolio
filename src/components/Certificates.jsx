import { Award, CalendarDays, GraduationCap } from "lucide-react";

function Certificates() {
  return (
    <section className="certificates" id="certificates">

      <div className="certificates-container">

        <p className="section-label">MY BACKGROUND</p>

        <h2>Education & <span>Certificates</span></h2>

        <p className="certificates-intro">
          My academic journey and professional development
          as an aspiring software developer.
        </p>

        <div className="education-card">

          <div className="education-date">
            <div className="edu-icon"><GraduationCap size={28} /></div>
            Exp. 2027
          </div>

          <div className="education-details">

            <h3>Software Development</h3>

            <h4>Nelson Mandela University</h4>

            <p>
              Currently studying Software Development,
              developing knowledge and practical skills in
              programming, databases, web development and
              software engineering.
            </p>

            <span>
              <CalendarDays size={16} /> Expected completion: April 2027
            </span>

          </div>

        </div>

        <div className="certificate-note">
          <p>
            <Award size={16} /> Additional certificates and completed
            courses will be added as I continue developing my skills.
          </p>
        </div>

      </div>

    </section>
  );
}

export default Certificates;