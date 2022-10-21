import React from "react";
import "./portafolio.css";
import IMG1 from "../../assets/portfolio1.png"
import IMG2 from "../../assets/portfolio5.png"
import IMG3 from "../../assets/portfolio3.jpg"
import IMG4 from "../../assets/portfolio4.jpg"
import IMG5 from "../../assets/portfolio6.png"

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
      <a href="https://github.com" className="btn"> Github </a>
      <a href="Https://github.com" className="btn btn-primary" target='_blank'> Live Demo</a>
      </div>
    </article>

    <article className="portafolio__item">
      <div className="portafolio__item-image">
    <img src={IMG2} alt= ""/>
      <h3> Keeper App Project </h3>
      <div className="portafolio__item-cta"></div>
      <a href="https://github.com/alexgn0110/Keeper-App--TodoList-" className="btn"> Github </a>
      <a href="https://alexgn0110.github.io/Keeper-App--TodoList-/" className="btn btn-primary" target='_blank'> Live Demo</a>
      </div>
    </article>

    <article className="portafolio__item">
      <div className="portafolio__item-image"> </div>
    <img src={IMG3} alt= ""/>
      <h3> Data  Statistics Visualizer </h3>
      <div className="portafolio__item-cta">
      
      </div>
    </article>

    <article className="portafolio__item">
      <div className="portafolio__item-image"> </div>
    <img src={IMG4} alt= ""/>
      <h3> React Calc App </h3>
      <div className="portafolio__item-cta">
      <a href="https://github.com/alexgn0110/Cal-App" className="btn">Github </a>
      <a href="https://alexgn0110.github.io/Cal-App/" className="btn btn-primary" target='_blank'> Live Demo</a>
      </div>
    </article>

    <article className="portafolio__item">
      <div className="portafolio__item-image"> </div>
    <img src={IMG5} alt= ""/>
      <h3> This Proyect - WebPortafolio</h3>
      <div className="portafolio__item-cta">
      <a href="https://github.com/alexgn0110/WebPortafolioAGN" className="btn">Github </a>
      <a href="https://alexgn0110.github.io/WebPortafolioAGN/" className="btn btn-primary" target='_blank'> Live Demo</a>
      </div>
    </article>



  </div>
  </section>
  )
};

export default Portafolio;
