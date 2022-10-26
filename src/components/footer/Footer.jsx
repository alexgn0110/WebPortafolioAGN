import React from 'react'
import './footer.css'
import {BsLinkedin} from 'react-icons/bs'
import {FaGithub} from 'react-icons/fa'


function Footer() {
  return (
    <footer>
      <a href="#" className='footer__logo'></a>
      <ul className='permalinks'>
        <li ><a href="#" data-text="&nbsp;Home">Home</a></li>
        <li ><a href="about"data-text="&nbsp;About">About</a></li>
        <li ><a href="experience"data-text="&nbsp;Experience">Experience</a></li>
        <li ><a href="services"data-text="&nbsp;Services">Services</a></li>
        <li ><a href="portafolio"data-text="&nbsp;Portfolio">Portfolio</a></li>
        <li ><a href="contact" data-text="&nbsp;Contacts">Contact</a></li>
      </ul>


      <div className="footer__socials">
      <a href="https://www.linkedin.com/in/alejandro-gutierrez-novo-37060a9a/" target="blank"> <BsLinkedin/> </a>
    <a href="https://github.com/alexgn0110" target='blank'> <FaGithub/></a>
      </div>



    <div className='footer__copyright'>
      <small> &copy;  AlexGNovo </small>
    </div>
    </footer>
  )
}

export default Footer