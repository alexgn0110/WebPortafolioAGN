import React from "react";
import "./about.css";
import ME from "../../assets/me3.png";
import { FaAward } from "react-icons/fa";
import { FiUsers } from "react-icons/fi";
import { VscFolderLibrary } from "react-icons/vsc";

const About = () => {
  return (
    <section id="about">
      About
      <h5> Get to know</h5>
      <h2> About Me</h2>
      <div className="container about__container">
        <div className="about__me">
          <div className="about__me-image">
            <img src={ME} alt="me"></img>
            <div></div>
          </div>
        </div>

        <div className="about__content">
          <div className="about__cards">
            <article className="about__card">
              <FaAward className="about__icon" />
              <h5> Experience </h5>
              <small> 3+ years working </small>
            </article>

            <article className="about__card">
              <FiUsers className="about__icon" />
              <h5> Clients </h5>
              <small> 8+ Worldwide </small>
            </article>

            <article className="about__card">
              <VscFolderLibrary className="about__icon" />
              <h5> Proyects </h5>
              <small> 15+ Completed </small>
            </article>
          </div>

    <p> 
    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore
     magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo 
     consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. 
     Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
    </p>

      <a href="#contact" className="btn btn-primary"> Let's talk </a>
        </div>
      </div>
    </section>
  );
};

export default About;
