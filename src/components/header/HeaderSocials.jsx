import React from 'react'
import {BsLinkedin} from 'react-icons/bs'
import {FaGithub} from 'react-icons/fa'

const HeaderSocials = () => {
    return (
    <div className ='header__socials'>
    <a href="https://www.linkedin.com/in/alejandro-gutierrez-novo-37060a9a/" target="blank"> <BsLinkedin/> </a>
    <a href="https://github.com/alexgn0110" target='blank'> <FaGithub/></a>
        </div>
    )
}

export default HeaderSocials