import React from "react";
import "./portafolio.css";
import IMG1 from "../../assets/portfolio1.png"
import IMG2 from "../../assets/portfolio2.png"
import IMG3 from "../../assets/portfolio3.jpg"

const Portafolio = () => {
  return (
  <section id="portafolio"> 
  <h5> My Recent Work</h5>
  <h2> Portafolio </h2>

  <div className="container portafolio__container">
    <article className="portafolio__item">
      <div className="portafolio__item-image"> </div>
    <img src={IMG1} alt= ""/>
      <h3> Defi - Decentralised Finance DApp - DBANK </h3>
      <div className="portafolio__item-cta">
      <a href="Https://github.com" className="btn"> Github </a>
      <a href="https://dribbble.com/Alien_pixels" className="btn btn-primary" target='_blank'> Live Demo</a>
      </div>
    </article>

    <article className="portafolio__item">
      <div className="portafolio__item-image">
    <img src={IMG2} alt= ""/>
      <h3> Keeper App Project </h3>
      <div className="portafolio__item-cta"></div>
      <a href="Https://github.com" className="btn">Github </a>
      <a href="https://dribbble.com/Alien_pixels" className="btn btn-primary" target='_blank'> Live Demo</a>
      </div>
    </article>

    <article className="portafolio__item">
      <div className="portafolio__item-image"> </div>
    <img src={IMG3} alt= ""/>
      <h3> Data  Statistics Visualizer </h3>
      <div className="portafolio__item-cta">
      <a href="Https://github.com" className="btn">Github </a>
      <a href="https://dribbble.com/Alien_pixels" className="btn btn-primary" target='_blank'> Live Demo</a>
      </div>
    </article>



  </div>
  </section>
  )
};

export default Portafolio;
