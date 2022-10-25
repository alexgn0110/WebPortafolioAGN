import React from "react";
import "./contact.css";
import { MdOutlineEmail } from "react-icons/md";
import { BsWhatsapp } from "react-icons/bs";
import { useRef } from 'react';
import emailjs from 'emailjs-com'

const Contact = () => {
  const form =useRef ();

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs.sendForm('service_fzk2vml', 'template_fe3g1rg', form.current, 'nswhbsH5OkTGJboEy')
   e.target.reset()
  };



  return (
    <section id="contact">
      <h5> Get in Touch</h5>
      <h2> Contact Me</h2>

      <div className="container contact__container">
        <div className="contact__options">
          <article className="contact__option">
            <MdOutlineEmail  className="contact__option-icon"/>
            <h4> Email</h4>
            <h5> alex_guno@hotmail.com </h5>
            <a href="mailto:alex_guno0110@hotmail.com"> Send a Message</a>
          </article>

          <article className="contact__option">
            <BsWhatsapp className="contact__option-icon" />
            <h4> WhatsApp </h4>
            <h5> </h5>
            <a href="https://api.whatsapp.com/send?phone=528120022542">
              {" "}
              Send a Message
            </a>
          </article>
        </div>
        {/*================End of contact options ============*/}
        <form ref={form} onSubmit={sendEmail}>
          <input
            type="text"
            name="name"
            placeholder="Your full name"
            required
          />
          <input type="email" name="email" placeholder="Your email" required />
          <textarea
            name="message"
            rows="7"
            placeholder="Your message"
            required
          />
          <button type='submit' className='btn btn-primary'>Send Message </button>
        </form>
      </div>
    </section>
  );
};

export default Contact;
