import { ArrowRight, Download, Mail } from "lucide-react";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { GITHUB, LINKEDIN, EMAIL, CV } from "../links";

function Contact() {
  return (
    <section className="contact" id="contact">

      <div className="contact-container">

        <p className="section-label">LET'S CONNECT</p>

        <h2>Get In <span>Touch</span></h2>

        <p className="contact-description">
          I'm always interested in learning, collaborating
          and exploring new opportunities.

          If you're looking for a motivated junior developer
          or would like to discuss a project, feel free to
          get in touch!
        </p>

        <div className="contact-options">

          <a href={EMAIL} className="contact-card">
            <div className="contact-icon"><Mail size={26} /></div>
            <h3>Email Me</h3>
            <p>Send me an email about opportunities or projects.</p>
            <span>Send Email <ArrowRight size={16} /></span>
          </a>

          <a
            href={LINKEDIN}
            target="_blank"
            rel="noreferrer"
            className="contact-card"
          >
            <div className="contact-icon" style={{ "--c": "#3b8eea" }}>
              <FaLinkedin size={26} />
            </div>
            <h3>LinkedIn</h3>
            <p>Connect with me and view my professional profile.</p>
            <span>View Profile <ArrowRight size={16} /></span>
          </a>

          <a
            href={GITHUB}
            target="_blank"
            rel="noreferrer"
            className="contact-card"
          >
            <div className="contact-icon" style={{ "--c": "#8b949e" }}>
              <FaGithub size={26} />
            </div>
            <h3>GitHub</h3>
            <p>Explore my projects and programming work.</p>
            <span>Visit GitHub <ArrowRight size={16} /></span>
          </a>

          <a href={CV} download="Tiaan-Botes-CV.pdf" className="contact-card">
            <div className="contact-icon" style={{ "--c": "#22c55e" }}>
              <Download size={26} />
            </div>
            <h3>Download CV</h3>
            <p>Get a copy of my full CV as a PDF.</p>
            <span>Download <ArrowRight size={16} /></span>
          </a>

        </div>

      </div>

    </section>
  );
}

export default Contact;