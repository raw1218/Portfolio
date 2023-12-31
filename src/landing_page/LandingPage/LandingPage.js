import {useContext, useState}from 'react'
import ParticleSimulation from './ParticleSimulation'
import './LandingPage.css'
import { currentPageContext } from '../../App'
import AboutPage2 from '../AboutPage/AboutPage2'
import ProjectsPage from '../ProjectsPage/ProjectsPage'
import ContactPage from '../ContactPage/ContactPage'
import LandingPageMain from './LandingPageMain'


function LandingPage() {

    const {currentPage} = useContext(currentPageContext)
    const [cursorVisible, setCursorVisible] = useState(true);


    const [hyperdriveToggled, setHyperdriveToggled] = useState(false);




  return (
   

    <div class = "landing-page-wrapper">
        <ParticleSimulation hyperdriveToggled={hyperdriveToggled} setHyperdriveToggled={setHyperdriveToggled}/>


        
      {currentPage === 'home' && (
        <LandingPageMain hyperdriveToggled={hyperdriveToggled} setHyperdriveToggled={setHyperdriveToggled}/>
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