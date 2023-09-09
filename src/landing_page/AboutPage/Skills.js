import React, { useState, useCallback, useEffect } from 'react';
import { useSpring, animated, config, onRest, immediate} from 'react-spring';

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
import leftArrow from '../../images/SVGS/leftArrow.svg'
import rightArrow from '../../images/SVGS/rightArrow.svg'

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
    const [activeIndexProgress, setActiveIndexProgress] = useState(0);

    useEffect(()=>{
      setActiveIndexProgress(()=>{return activeIndex})
    }, [activeIndex]);


    const handleTransitionFinished = () => {}
  
    const [animationProps, setAnimationProps] = useSpring(() => ({
      left: '0%',
      config: config.default,
      onRest: handleTransitionFinished,
    }))




    const nextSkill = () => {
      console.log("prev active index = ", activeIndex, "target index = ", targetIndex);
    
      setTargetIndex(() => {
        const newTargetIndex = (activeIndex + 1) % skills.length;
        console.log("active index = ", activeIndex, "new target index = ", newTargetIndex);
    
        setActiveIndexProgress(newTargetIndex);
        setTargetDirection('right');

    
       
        setAnimationProps({left: '-100%', onRest: ()=>{
          console.log("transition finished bitch");
          setActiveIndex(newTargetIndex);
          setAnimationProps({left: '0%' , onRest : ()=>{}, immediate:true})
        }});
        return newTargetIndex; // This will set the targetIndex state.
      });
  };

  
    const prevSkill = () => {
      console.log("prev active index = ", activeIndex, "target index = ", targetIndex);
    
      setTargetIndex(() => {
        var newTargetIndex = activeIndex - 1;
        if(newTargetIndex < 0) newTargetIndex = skills.length - 1;


        console.log("active index = ", activeIndex, "new target index = ", newTargetIndex);
    
        setActiveIndexProgress(newTargetIndex);
        setTargetDirection('left');

    
       
        setAnimationProps({left: '100%', onRest: ()=>{
          console.log("transition finished bitch");
          setActiveIndex(newTargetIndex);
          setAnimationProps({left: '0%' , onRest : ()=>{}, immediate:true})
        }});
        return newTargetIndex; // This will set the targetIndex state.
      });

    };



    const gotoSkill = (i) => {
      console.log("prev active index = ", activeIndex, "target index = ", targetIndex);
    
      if(i === activeIndex)return;

      setTargetIndex(() => {
        
        const direction = i > activeIndex ? 'right' : 'left'
    
        setActiveIndexProgress(i);
        setTargetDirection(direction);

        const str = direction === 'right' ? '-100%' : '100%';
       
        setAnimationProps({left: str, onRest: ()=>{
          console.log("transition finished bitch");
          setActiveIndex(i);
          setAnimationProps({left: '0%' , onRest : ()=>{}, immediate:true})
        }});
        return i; // This will set the targetIndex state.
      });
  };
  

    const oppositeDirection = targetDirection === 'left' ? 'right' : 'left';


    const activeClassName = 'skill active'
    const targetClassName = 'skill target ' + targetDirection;
    const defaultClassName = 'skill';
   

    const _triggerTransition = (target, direction) => {

      console.log("pre trigger transition, active = ", activeIndex, "target = ", targetIndex);
      setTargetDirection(direction);
      setTargetIndex(target);
      console.log("post trigger transition, active = ", activeIndex, "target = ", targetIndex);

    }

    const triggerTransition = () => {


      if(targetDirection === 'right')setAnimationProps({left: '-100%', onRest: handleTransitionFinished});
      if(targetDirection === 'left')setAnimationProps({left: '100%', onRest : handleTransitionFinished});


      console.log("post post post trigger transition , active =", activeIndex, "target index = ", targetIndex)
    }


  return (
    <div className='skills-wrapper'>



        <div className = 'skills-display-wrapper'>


          <animated.div style = {animationProps} className = 'skills-display'> 
          {skills.map((skill, index) => (

            
            <div

              
              className={index === activeIndex ? activeClassName : index === targetIndex ? targetClassName : defaultClassName }
              key={index}
            >
              <Skill skill_obj = {skill}/>
            </div>
          ))}

          </animated.div>
          <button onClick={prevSkill} className="prev-button">
            <img src = {rightArrow}></img>
          </button>
          <button onClick={nextSkill} className="next-button">
            <img src = {rightArrow}></img>
          </button>

        </div>
        <div className = 'skills-progress'>
          {skills.map((_, index) => (
            <span
              className={`oval ${activeIndexProgress === index ? 'expanded' : ''}`}
              key={index}
              onClick={()=>{gotoSkill(index)}}
            ></span>
          ))}
        </div>
    </div>
  )
}

export default Skills