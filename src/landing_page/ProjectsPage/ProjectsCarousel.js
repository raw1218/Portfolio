import {useState} from 'react'
import './ProjectsPage.css'


import programmingLanguage1Square from '../../images/ProjectImages/ProgrammingLanguage1Square.PNG'
import programmingLanguage2Square from '../../images/ProjectImages/ProgrammingLanguage2Square.PNG'
import programmingLanguage1Long from '../../images/ProjectImages/ProgrammingLanguage1Long.PNG'
import programmingLanguage2Long from '../../images/ProjectImages/ProgrammingLanguage2Long.PNG'
import webApp1Square from '../../images/ProjectImages/WebApp1Square.PNG'
import webApp2Square from '../../images/ProjectImages/WebApp2Square.PNG'
import webApp1Long from '../../images/ProjectImages/WebApp1Long.PNG'
import webApp2Long from '../../images/ProjectImages/WebApp2Long.PNG'


import Project from './Project'



function ProjectsCarousel() {






   // const projects = ['Project1', 'Project2', 'Project3', 'Project4', 'Project5', 'Project6'];
    
    const projects = [
        {title: "Custom Programming Language"},
        {title: "Search Algorithm Web App"},
        {title: "More to Come!"},
    ]
    const [activeIndex, setActiveIndex] = useState(0);
  
    const nextProject = () => {
      setActiveIndex((prevIndex) => (prevIndex + 1) % projects.length);
    };
  
    const prevProject = () => {
      setActiveIndex((prevIndex) => (prevIndex - 1 + projects.length) % projects.length);
    };
  

    



  return (
    <div className='projects-wrapper'>



        <div className = 'projects-display-wrapper'>


          <div className = 'projects-display'> 
          {projects.map((project, index) => {


            const str = 100 * index + '%';

            return (
            <div style={{position: 'absolute', top: str}} className='project-wrapper'>

            <Project project_obj={project}/>

            </div>
            )
            
          })}

          </div>
          <button onClick={prevProject} className="projects-prev-button">Previous</button>
          <button onClick={nextProject} className="projects-next-button">Next</button>

        </div>
        <div className = 'projects-progress'>
          {projects.map((_, index) => (
            <span
              className={`project-oval ${activeIndex === index ? 'expanded' : ''}`}
              key={index}
              onClick={()=>{setActiveIndex(index)}}
            ></span>
          ))}
        </div>
    </div>
  )
}

export default ProjectsCarousel