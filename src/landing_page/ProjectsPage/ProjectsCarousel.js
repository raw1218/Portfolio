import {useState} from 'react'
import './ProjectsPage.css'


function ProjectsCarousel() {






    const projects = ['Project1', 'Project2', 'Project3', 'Project4', 'Project5', 'Project6'];
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
          {projects.map((project, index) => (
            <div
              className={`project ${activeIndex === index ? 'active' : ''}`}
              key={index}
            >
              {project}
            </div>
          ))}

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