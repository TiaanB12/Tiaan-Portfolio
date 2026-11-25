import { useEffect, useState } from "react";
import { ArrowRight, Download, Mail } from "lucide-react";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { GITHUB, LINKEDIN, EMAIL, CV } from "../links";
import ParticleBackground from "./ParticleBackground";
import CodeCard from "./CodeCard";

const ROLES = [
  "Junior Web Developer",
  "Software Development Student",
  "React Developer",
];

function useTypewriter(words, typeSpeed = 80, deleteSpeed = 45, pause = 1600) {
  const [text, setText] = useState("");
  const [index, setIndex] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const word = words[index];
    let delay = deleting ? deleteSpeed : typeSpeed;
    if (!deleting && text === word) delay = pause;

    const timer = setTimeout(() => {
      if (!deleting && text === word) {
        setDeleting(true);
      } else if (deleting && text === "") {
        setDeleting(false);
        setIndex((index + 1) % words.length);
      } else {
        setText(word.slice(0, text.length + (deleting ? -1 : 1)));
      }
    }, delay);

    return () => clearTimeout(timer);
  }, [text, deleting, index, words, typeSpeed, deleteSpeed, pause]);

  return text;
}

function Hero() {
  const role = useTypewriter(ROLES);

  return (
    <section className="hero" id="home">
      <ParticleBackground />

      <div className="hero-layout">

        <div className="hero-content">
          <p className="hero-eyebrow" style={{ "--i": 0 }}>
            WELCOME TO MY PORTFOLIO
          </p>

          <h1 style={{ "--i": 1 }}>
            Hi, I'm <span>Tiaan Botes</span>
          </h1>

          <h2 className="hero-role" style={{ "--i": 2 }}>
            {role}
            <span className="caret" />
          </h2>

          <p className="hero-description" style={{ "--i": 3 }}>
            I'm a Software Development student passionate about
            building modern websites and useful applications.
          </p>

          <div className="hero-buttons" style={{ "--i": 4 }}>
            <a href="#projects" className="btn btn-primary">
              View Projects <ArrowRight size={16} />
            </a>

            <a href={CV} download="Tiaan-Botes-CV.pdf" className="btn btn-outline">
              <Download size={16} /> Download CV
            </a>
          </div>

          <div className="social-links" style={{ "--i": 5 }}>
            <a href={GITHUB} target="_blank" rel="noreferrer" aria-label="GitHub">
              <FaGithub />
            </a>
            <a href={LINKEDIN} target="_blank" rel="noreferrer" aria-label="LinkedIn">
              <FaLinkedin />
            </a>
            <a href={EMAIL} aria-label="Email">
              <Mail size={19} />
            </a>
          </div>
        </div>

        <div className="hero-visual">
          <div className="hero-photo">
            <div className="photo-frame">
              <img src="/profile.jpg" alt="Tiaan Botes" />
            </div>
          </div>

          <CodeCard />
        </div>

      </div>
    </section>
  );
}

export default Hero;