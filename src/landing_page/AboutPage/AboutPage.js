import React from 'react'
import './AboutPage.css'
import Skills from './Skills'

function AboutPage() {
  return (
    <div className='about-page-wrapper-fullscreen'>
      <div className = 'bio'>

      
        
        <p>{"I'm Ronald Wood, a software engineer with a solid foundation from the University of Connecticut. To me, every line of code is a step towards understanding something new. I'm in this field because I genuinely enjoy the process, the challenges, and the continuous learning it offers."}</p>

        <div className='bio-buttons'>
          <button className='bio-button'>Resume</button>
          <button className='bio-button'>Contact Me</button>
        </div>
     
     
     
      </div>

      


      <Skills/>
    </div>



  )
}

export default AboutPage