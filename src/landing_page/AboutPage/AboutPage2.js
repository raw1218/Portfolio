import React from 'react'
import './AboutPage2.css'
function AboutPage2() {




  return (
    <div className='about-page-wrapper-fullscreen'>
        <div className='about-page-left-section'>
            <h1>About Me</h1>
            <p>Bio Paragraph</p>
            <div className='bio-buttons'>
                <button className='resume-button'>My resume</button>
                <button className='contact-button'>Contact Me</button>
            </div>
        </div>


        <div className='about-page-right-section'>
            <div className='skill-carousel-wrapper'>
                Skills
            </div>
        </div>
    </div>
  )
}

export default AboutPage2