import React, { useState } from 'react';
import { useSpring, animated, config, onRest } from 'react-spring';

import './AboutPage2.css';


import brainIcon from '../../images/SVGS/brain.svg'
import cSharpIcon from '../../images/SVGS/cSharp.svg'
import cIcon from '../../images/SVGS/c.svg'
import cPlusPlusIcon from '../../images/SVGS/c++.svg'
import circuitIcon from '../../images/SVGS/circuit.svg'
import cpuIcon from '../../images/SVGS/cpu.svg'
import cssIcon from '../../images/SVGS/css.svg'
import d3Icon from '../../images/SVGS/d3.svg'
import dockerIcon from '../../images/SVGS/docker.svg'
import gitIcon from '../../images/SVGS/git.svg'
import githubIcon from '../../images/SVGS/github.svg'
import googleCloudIcon from '../../images/SVGS/google_cloud.svg'
import htmlIcon from '../../images/SVGS/html.svg'
import jsIcon from '../../images/SVGS/js.svg'
import javaIcon from '../../images/SVGS/java.svg'
import lightbulbIcon from '../../images/SVGS/lightbulb.svg'
import pythonIcon from '../../images/SVGS/python.svg'
import reactIcon from '../../images/SVGS/react.svg'
import websiteIcon from '../../images/SVGS/website.svg'
import Skill from './Skill';



function Skills() {


 
 const [isTransitioning, setIsTransitioning] = useState(false);
 const [targetIndex, setTargetIndex] = useState(1);
 const [targetDirection, setTargetDirection]= useState('right');
  

    const skills = [{title: "HTML / CSS / Javascript",  icons: [htmlIcon, cssIcon, jsIcon]},
                    {title: "C / C++", icons: [cIcon, cPlusPlusIcon]},
                  {title: "Java / C#", icons: [javaIcon, cSharpIcon]},
                  {title: "Python", icons: [pythonIcon]},
                  {title: "Git / Github", icons: [gitIcon, githubIcon]}, 
                  {title: "React.js / D3.js", icons: [reactIcon, d3Icon]},
                  {title: "Google Cloud / Docker", icons: [googleCloudIcon, dockerIcon]},
                  {title: "Circuit Design / Computer Architecture", icons: [circuitIcon, cpuIcon]},
                  {title: "Problem Solving / Creative Thinking", icons: [brainIcon, lightbulbIcon]}];
    
    
    
    const [activeIndex, setActiveIndex] = useState(0);


    const handleTransitionFinished = () => {
      //setActiveIndex(targetIndex);
      //setTargetIndex((prevIndex) => (prevIndex + 1) % skills.length);


      //console.log("TRANSITION FINISHED\n\n");
    }
  
    const [animationProps, setAnimationProps] = useSpring(() => ({
      left: '0%',
      config: config.default,
      onRest: () => {handleTransitionFinished(); console.log("animation rested")}
    }))

    /*const [leftAnimationProps, setLeftAnimationProps] = useSpring(() => ({
      left: '-100%',
      config:  config.stiff,
     
    }))

    const [rightAnimationProps, setRightAnimationProps] = useSpring(() => ({
      left: '100%',
      config: config.stiff,
      
    }))
*/


const nextSkill = () => {
  console.log("prev active index = ", activeIndex, "target index = ", targetIndex);

  setTargetIndex((prevTargetIndex) => {
    const newTargetIndex = (activeIndex + 1) % skills.length;
    console.log("active index = ", activeIndex, "new target index = ", newTargetIndex);

    const str  = '-' + 100 * newTargetIndex + '%';
    setAnimationProps({left: str});

    setActiveIndex(newTargetIndex);

    return newTargetIndex; // This will set the targetIndex state.
  });
};

  
    const prevSkill = () => {

      setTargetIndex((prevTargetIndex) => {
        var newTargetIndex = (activeIndex - 1);
        if(newTargetIndex < 0)newTargetIndex = skills.length - 1;
        console.log("active index = ", activeIndex, "new target index = ", newTargetIndex);
    
        const str  = '-' + 100 * newTargetIndex + '%';
        setAnimationProps({left: str});
    
        setActiveIndex(newTargetIndex);
    
        return newTargetIndex; // This will set the targetIndex state.
      });
    };
  

    const oppositeDirection = targetDirection === 'left' ? 'right' : 'left';

    const defaultClassName = 'skill';
    const activeClassName = isTransitioning ? 'skill target ' + oppositeDirection : 'skill active';
    const targetClassName = isTransitioning ? 'skill active' : 'skill target ' + targetDirection;
   
    const targetProps = null // targetDirection === 'left' ? leftAnimationProps : rightAnimationProps;




  return (
    <div className='skills-wrapper'>



        <div className = 'skills-display-wrapper'>


          <animated.div style = {animationProps} className = 'skills-display'> 
          {skills.map((skill, index) => (

            
            <div

              style={{ display: 'block', position: 'absolute', left: `${index * 100}%`}}
              className={activeClassName}
              key={index}
            >
              <Skill skill_obj = {skill}/>
            </div>
          ))}

          </animated.div>
          <button onClick={prevSkill} className="prev-button">Previous</button>
          <button onClick={nextSkill} className="next-button">Next</button>

        </div>
        <div className = 'skills-progress'>
          {skills.map((_, index) => (
            <span
              className={`oval ${activeIndex === index ? 'expanded' : ''}`}
              key={index}
              onClick={()=>{setActiveIndex(index)}}
            ></span>
          ))}
        </div>
    </div>
  )
}

export default Skills