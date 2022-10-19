import React from 'react'
import './footer.css'
import {BsLinkedin} from 'react-icons/bs'
import {FaGithub} from 'react-icons/fa'


function Footer() {
  return (
    <footer>
      <a href="#" className='footer__logo'></a>
      <ul className='permalinks'>
        <li><a href="#">Home</a></li>
        <li><a href="about">About</a></li>
        <li><a href="experience">Experience</a></li>
        <li><a href="services">Services</a></li>
        <li><a href="portafolio">Portafolio</a></li>
        <li><a href="contact">Contact</a></li>
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