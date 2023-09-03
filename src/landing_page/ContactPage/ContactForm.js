import React from 'react'

function ContactForm() {



  return (
<div className="contact-form">
    <div className="name-wrapper">
        <input type="text" className="first-name-form" placeholder="First Name" />
        <input type="text" className="last-name-form" placeholder="Last Name" />
    </div>

    <div className="personal-info-wrapper">
        <input type="email" className="email-form" placeholder="Email Address" />
        <input type="tel" className="phone-number-form" placeholder="Phone Number" pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}" />
    </div>

    <textarea className="message-form" placeholder="Your Message..."></textarea>
</div>
  )
}

export default ContactForm