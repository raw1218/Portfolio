import React from 'react'
import './ContactPage.css'
import ContactForm from './ContactForm'
function ContactPage() {
  return (



    <div className='contact-page-wrapper-fullscreen'>

      <div className='contact-page-left-section'>
      <div className='spacer-small'></div>
        <h1 className='title'>Contact Me</h1>
        <div className='spacer-small'></div>
        <p className='description'>Whether you have a question about my projects, need assistance, or just want to say hello, I'd love to hear from you. Fill out the form below, and I'll get back to you as soon as possible."</p>
        <div className='spacer-small'></div>
        <div className='contact-form-wrapper'>
          <ContactForm/>
        </div>
        <div className='spacer-small'></div>
      </div>


    <div className='contact-page-right-section'>
      <div className='spacer-small'></div>
      <h2>Contact Info</h2>
      <div className='spacer-large'></div>
      <div className='contact-info'>
        <ul>
          <li><strong>Email:</strong> your.email@example.com</li>
          <li><strong>Phone:</strong> (123) 456-7890</li>
          <li><strong>Location:</strong> Hartford, CT</li>
        </ul>
      
 
      </div>

      <div className='spacer-small'></div>
      <div className="social-buttons">
            <button onClick={() => window.open('https://github.com/yourusername')}>GitHub</button>
            <button onClick={() => window.open('https://linkedin.com/in/yourusername')}>LinkedIn</button>
      </div>
      <div className='spacer-small'></div>
    </div>

    </div>
  )
}

export default ContactPage