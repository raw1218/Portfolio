import React from 'react'
import './ProjectsPage.css'

import Projects from './Projects'

function ProjectsPage() {
  return (
    <div className='projects-page-wrapper-fullscreen'>
      <div className='projects-page-left-section'>
        <div className='projects-carousel-wrapper'>
          <Projects/>
        </div>
      </div>



      <div className='projects-page-right-section'>
      <div className='spacer-small'></div>
        <div className='projects-page-title-and-description'>

          
          <h1 className='projects-page-title'>Projects</h1>
        
          <h2 className='projects-page-description'>A showcase of my programming journey and expertise</h2>
         
        </div>

        <div className='spacer-large'></div>

        <button className='github-button'>view my github</button>
        <div className='spacer-small'></div>

      </div>
    </div>
  )
}

export default ProjectsPage