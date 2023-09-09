import React, {useContext} from 'react'
import './ProjectsPage.css'

import Projects from './Projects'
import { WindowDimensionsContext } from '../../App'

function ProjectsPage() {


  const {width, height} = useContext(WindowDimensionsContext)

  const mobileThreshold = 750;

  function openGitHub(){
    window.open('https://github.com/raw1218', '_blanks')
  }


  if(width <= mobileThreshold){
    return (
      <div className='projects-page-wrapper-mobile'>
                <h1 className='projects-page-title'>Projects</h1>
        
                 <p className='projects-page-description'>A showcase of my programming journey and expertise</p>
       
      
               <div className='projects-carousel-wrapper'>
                <Projects/>
              </div>

              <button className='github-button' onClick={openGitHub}>View My Github</button>

      </div>
    )
  }

  else return (
    <div className='projects-page-wrapper-fullscreen'>
      <div className='projects-page-left-section'>
        <div className='projects-carousel-wrapper'>
          <Projects/>
        </div>
      </div>



      <div className='projects-page-right-section'>
      
      
          <div className='spacer small'></div>
          
          <h1 className='projects-page-title'>Projects</h1>
        
          <p className='projects-page-description'>A showcase of my programming journey and expertise</p>
         
        

        <div className='spacer-large'></div>

        <button className='github-button' onClick={openGitHub}>View My Github</button>
        <div className='spacer-small'></div>

      </div>
    </div>
  )
}

export default ProjectsPage