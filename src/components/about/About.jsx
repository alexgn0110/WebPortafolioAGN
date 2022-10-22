import React from "react";
import "./about.css";
import ME from "../../assets/reactlogo.png";
import { FaAward } from "react-icons/fa";
import { FiUsers } from "react-icons/fi";
import { VscFolderLibrary } from "react-icons/vsc";

const About = () => {
  return (
    <section id="about">
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
              <h5> Residing Currently  </h5>
              <small> In Monterrey, Nuevo Leon, Mexico </small>
            </article>

            <article className="about__card">
              <VscFolderLibrary className="about__icon" />
              <h5> Proyects </h5>
              <small> 15+ Completed </small>
            </article>
          </div>
          <p>
            I create websites that are fast, easy to use, and built with best
            practices.{" "}
          </p>{" "}
          <p>
            My main experience is in frontend development but I also have a
            passion for design.
          </p>
          <p>
          My main goal is to combine technology 
          and design to create inviting, easy-to-use websites for consumers.
          </p>
          <a href="#contact" className="btn btn-primary">
            {" "}
            Let's talk{" "}
          </a>
        </div>
      </div>
    </section>
  );
};

export default About;
