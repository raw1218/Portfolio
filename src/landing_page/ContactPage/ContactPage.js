import React, { useContext } from 'react'
import './ContactPage.css'
import ContactForm from './ContactForm'


import emailIcon from '../../images/SVGS/email.svg'
import phoneIcon from '../../images/SVGS/phone.svg'
import locationIcon from '../../images/SVGS/location.svg'
import githubIcon from '../../images/SVGS/github.svg'
import linkedInIcon from '../../images/SVGS/linkedin.svg'



import { WindowDimensionsContext } from '../../App'

function ContactPage() {


  const {width, height} = useContext(WindowDimensionsContext);
  const mobileThreshold = 900;


  if(width <= mobileThreshold){
    return (
      <div className='contact-page-wrapper-mobile'>
          <h1 className='title'>Contact Me</h1>

          <p className='description'>Whether you have a question about my projects, need assistance, or just want to say hello, I'd love to hear from you. Fill out the form below, and I'll get back to you as soon as possible.</p>



    <div className='contact-form-wrapper'>
          <ContactForm/>
        </div>




        <div className='contact-info'>
        <ul className='row1'>
            <li className='contact-info-item'>
                <img src={emailIcon} alt="Email Icon"/>
                <p>raw1218@gmail.com</p>
            </li>
            <li className='contact-info-item'>
                <img src={phoneIcon} alt="Phone Icon"/>
                <p>(203) 530 5946</p>
            </li>

            <li className='contact-info-item'>
                <img src={locationIcon} alt="Location Icon"/>
                <p>North Haven, CT</p>
            </li>

            </ul>

            <ul className='row3'>

            <li className='contact-info-item'>
                <img src={githubIcon} alt="Github Icon"/>
                <p>github.com/raw1218</p>
            </li>
            <li className='contact-info-item'>
                <img src={linkedInIcon} alt="LinkedIn Icon"/>
                <p>linkedin.com/in/ron-wood-79b8001b5</p>
            </li>
        </ul>
    </div>
      </div>
    )
  }




  else return (



    <div className='contact-page-wrapper-fullscreen'>

      <div className='contact-page-left-section'>
      <div className='spacer-small'></div>
        <h1 className='title'>Contact Me</h1>
        <div className='spacer-small'></div>
        <p className='description'>Whether you have a question about my projects, need assistance, or just want to say hello, I'd love to hear from you. Fill out the form below, and I'll get back to you as soon as possible.</p>
        <div className='spacer-small'></div>
        <div className='contact-form-wrapper'>
          <ContactForm/>
        </div>
        <div className='spacer-small'></div>
      </div>


    <div className='contact-page-right-section'>
      <div className='spacer-small'></div>
      
      <div className='spacer-large'></div>
      <div className='contact-info'>
        <ul>
            <li className='contact-info-item'>
                <img src={emailIcon} alt="Email Icon"/>
                <p>raw1218@gmail.com</p>
            </li>
            <li className='contact-info-item'>
                <img src={phoneIcon} alt="Phone Icon"/>
                <p>(203) 530 5946</p>
            </li>
            <li className='contact-info-item'>
                <img src={locationIcon} alt="Location Icon"/>
                <p>North Haven, CT</p>
            </li>
            <li className='contact-info-item'>
                <img src={githubIcon} alt="Github Icon"/>
                <p>github.com/raw1218</p>
            </li>
            <li className='contact-info-item'>
                <img src={linkedInIcon} alt="LinkedIn Icon"/>
                <p>linkedin.com/in/ron-wood-79b8001b5</p>
            </li>
        </ul>
    </div>

      <div className='spacer-small'></div>

      <div className='spacer-small'></div>
    </div>

    </div>
  )
}

export default ContactPage