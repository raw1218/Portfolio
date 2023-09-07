import React from 'react'
import './ProjectsPage.css'

import Projects from './Projects'

function ProjectsPage() {



  function openGitHub(){
    window.open('https://github.com/raw1218', '_blanks')
  }

  return (
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