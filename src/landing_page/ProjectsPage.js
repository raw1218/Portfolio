import React from 'react'
import './ProjectsPage.css'

function ProjectsPage() {
  return (
    <div className='projects-page-wrapper-fullscreen'>
      <div className='projects-page-left-section'>
        <div className='projects'>projects</div>
      </div>



      <div className='projects-page-right-section'>

        <h1>Projects</h1>
        <p>description paragraph</p>
        <button className='github button'>view my github</button>
      </div>
    </div>
  )
}

export default ProjectsPage