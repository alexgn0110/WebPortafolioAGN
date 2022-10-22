import React from "react";
import "./experience.css";
import { BsPatchCheckFill } from "react-icons/bs";

const Experience = () => {
  return (
    <section id="experience">
      <h5> What Skills I have</h5>
      <h2>My Experience </h2>
      <div className="container experience__container">
        <div className="experience__frontend">
          <h3> Frontend Development</h3>
          <div className="experience__content">
            <article className="experience__details">
              <BsPatchCheckFill className="experience__details-icon"/>
              <div>
              <h4> Javascript </h4>
            
              </div>
            </article>

            <article className="experience__details">
              <BsPatchCheckFill className="experience__details-icon"/>
              <div>
              <h4> React JS </h4>
              
              </div>
            </article>

            <article className="experience__details">
              <BsPatchCheckFill className="experience__details-icon"/>
              <div>
              <h4> Redux </h4>
             
              </div>
            </article>

            <article className="experience__details">
              <BsPatchCheckFill className="experience__details-icon"/>
              <div>
              <h4> HTML5 </h4>
              
              </div>
            </article>

            <article className="experience__details">
              <BsPatchCheckFill className="experience__details-icon" />
              <div>
              <h4> SCSS </h4>

              </div>
            </article>

            <article className="experience__details">
              <BsPatchCheckFill className="experience__details-icon"/>
              <div>
              <h4> Bootstrap </h4>
             
              </div>
            </article>

            <article className="experience__details">
              <BsPatchCheckFill className="experience__details-icon"/>
              <div>
              <h4> Git </h4>
              
              </div>
            </article>
          </div>
        </div>

        {/* ====== End of Frontend ======== */}

        <div className="experience_backend">
          <h3> Backend Development</h3>

          <div className="experience__content">
            <article className="experience__details">
              <BsPatchCheckFill className="experience__details-icon"/>
              <div>
              <h4> Node </h4>
             
              </div>
            </article>

            <article className="experience__details">
              <BsPatchCheckFill className="experience__details-icon"/>
              <div>
              <h4> MySQL </h4>
       
              </div>
            </article>

            <article className="experience__details">
              <BsPatchCheckFill  className="experience__details-icon"/>
              <div>
              <h4> MongoDB </h4>
          
              </div>
            </article>

            <article className="experience__details">
              <BsPatchCheckFill className="experience__details-icon"/>
              <div>
              <h4> Postman </h4>
      
              </div>
            </article>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;
