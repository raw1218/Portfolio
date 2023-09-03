import {useContext}from 'react'
import ParticleSimulation from './ParticleSimulation'
import './LandingPage.css'
import { currentPageContext } from '../App'
import AboutPage2 from './AboutPage/AboutPage2'
import ProjectsPage from './ProjectsPage/ProjectsPage'
import ContactPage from './ContactPage/ContactPage'


function LandingPage() {

    const {currentPage} = useContext(currentPageContext)


  return (
   

    <div class = "landing-page-wrapper">
        <ParticleSimulation/>


        
      {currentPage === 'home' && (
        <div className="landing-page-main-text-overlay">
          <div className="landing-page-main-text-overlay-upper">
            <p id="HelloWorld" className="computer-text">Hello World!</p>
            <p id="MyNameIs" className="main-text-small">My name is</p>
            <h1 id="Name" className="main-text-big">Ronald Wood</h1>
          </div>

          <div className="landing-page-main-text-overlay-lower">
            <p id="IAmA" className="main-text-small">I am a</p>
            <h1 id="Title" className="main-text-big computer-text">Software Engineer</h1>
          </div>
        </div>
      )}



      {currentPage === 'about' && (
        <AboutPage2/>
      )}


      {currentPage === 'projects' && (
        <ProjectsPage/>
      )}


      {currentPage === 'contact' && (
        <ContactPage/>
      )}
    
  


    </div>
    
  )
}

export default LandingPage