import React from "react";
import "./services.css";
import { BiCheck } from "react-icons/bi";

const Services = () => {
  return (
    <section id="services">
      <h5> What I offer </h5>
      <h2> Services </h2>

      <div className="container services__container">
        <article className="service">
          <div className="service__head">
            <h3>UI/UX Design</h3>
          </div>

          <ul className="service__list">
            <li>
              <BiCheck className="service__list-icon" />
              <p>Optimizing the user experience.</p>
            </li>

            <li>
              <BiCheck className="service__list-icon" />
              <p>Implementing design on mobile websites.</p>
            </li>

            <li>
              <BiCheck className="service__list-icon" />
              <p>
                Actively participation in designing and reviewing core functionality
              </p>
            </li>

           
          </ul>
        </article>
        {/*================= End of UI/UX===============*/}

        <article className="service">
          <div className="service__head">
            <h3>Web Development</h3>
          </div>

          <ul className="service__list">
            <li>
              <BiCheck className="service__list-icon" />
              <p>Using HTML, JavaScript and CSS to bring concepts to life.</p>
            </li>

            <li>
              <BiCheck className="service__list-icon" />
              <p>
                Creating tools that improve site interaction regardless of the
                browser.
              </p>
            </li>

            <li>
              <BiCheck className="service__list-icon" />
              <p>Managing software workflow.</p>
            </li>

            <li>
              <BiCheck className="service__list-icon" />
              <p>Optimize application for maximum speed and scalability</p>
            </li>
          </ul>
        </article>
        {/*================= Content Creation ===============*/}

        <article className="service">
          <div className="service__head">
            <h3>Content Creation</h3>
          </div>
          <ul className="service__list">
            <li>
              <BiCheck className="service__list-icon" />
              <p>Following SEO best practices.</p>
            </li>

            <li>
              <BiCheck className="service__list-icon" />
              <p>Fixing bugs and testing for usability.</p>
            </li>

            <li>
              <BiCheck className="service__list-icon" />
              <p>Collaborate with other team members </p>
            </li>

          
          </ul>
        </article>

        {/* End of Content Creation */}
      </div>
    </section>
  );
};

export default Services;
