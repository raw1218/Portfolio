import React, { useState } from 'react';
import './AboutPage2.css';

function Skills() {


 
 
  

    const skills = ['Skill1', 'Skill2', 'Skill3', 'Skill4', 'Skill5', 'skill6'];
    const [activeIndex, setActiveIndex] = useState(0);
  
    const nextSkill = () => {
      setActiveIndex((prevIndex) => (prevIndex + 1) % skills.length);
    };
  
    const prevSkill = () => {
      setActiveIndex((prevIndex) => (prevIndex - 1 + skills.length) % skills.length);
    };
  

  



  return (
    <div className='skills-wrapper'>



        <div className = 'skills-display-wrapper'>


          <div className = 'skills-display'> 
          {skills.map((skill, index) => (
            <div
              className={`skill ${activeIndex === index ? 'active' : ''}`}
              key={index}
            >
              {skill}
            </div>
          ))}

          </div>
          <button onClick={prevSkill} className="prev-button">Previous</button>
          <button onClick={nextSkill} className="next-button">Next</button>

        </div>
        <div className = 'skills-progress'>
          {skills.map((_, index) => (
            <span
              className={`oval ${activeIndex === index ? 'expanded' : ''}`}
              key={index}
            ></span>
          ))}
        </div>
    </div>
  )
}

export default Skills