import React, { useContext } from 'react'
import './AboutPage2.css'
import Skills from './Skills'

import { currentPageContext, WindowDimensionsContext } from '../../App';


function AboutPage2() {


    const {width, height} = useContext(WindowDimensionsContext);
    const {currentPage, setCurrentPage} = useContext(currentPageContext);

    function openResume() {
        window.open('/Ronald_Wood_Resume.pdf', '_blank');
    }

    function gotoContactPage(){
        setCurrentPage('contact');
    }

    const mobileThreshold = 750;

    if(width < mobileThreshold){
        return(
            <div className='about-page-wrapper-mobile'>
   
            <h1>About Me</h1>
            
            <p>{"I'm Ronald Wood, a software engineer with a solid foundation from the University of Connecticut. To me, every line of code is a step towards understanding something new. I'm in this field because I genuinely enjoy the process, the challenges, and the continuous learning it offers."}</p>
         
 
           
        


     
            <div className='skill-carousel-wrapper'>
                <Skills/>
            </div>
            <div className='bio-buttons'>
                <button className='resume-button' onClick={openResume}>My Resume</button>
                <button className='contact-button' onClick={gotoContactPage}>Contact Me</button>
            </div>
        </div>
            
        )
    }

  else return (
    <div className='about-page-wrapper-fullscreen'>
        <div className='about-page-left-section'>
            <div className="spacer"></div>
            <h1>About Me</h1>
            <div className="spacer large"></div>
            <p>{"I'm Ronald Wood, a software engineer with a solid foundation from the University of Connecticut. To me, every line of code is a step towards understanding something new. I'm in this field because I genuinely enjoy the process, the challenges, and the continuous learning it offers."}</p>
            <div className="spacer large"></div>
            <div className='bio-buttons'>
                <button className='resume-button' onClick={openResume}>My Resume</button>
                <button className='contact-button' onClick={gotoContactPage}>Contact Me</button>
            </div>
            <div className="spacer"></div>
        </div>



        <div className='about-page-right-section'>
            <div className='skill-carousel-wrapper'>
                <Skills/>
            </div>
        </div>
    </div>
  )
}

export default AboutPage2