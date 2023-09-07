import React, { useState, useCallback, useEffect } from 'react';
import { useSpring, animated, config, onRest, immediate} from 'react-spring';

import Project from './Project';

import './ProjectsPage.css'

import programmingLanguage1Square from '../../images/ProjectImages/ProgrammingLanguage1Square.PNG'
import programmingLanguage2Square from '../../images/ProjectImages/ProgrammingLanguage2Square.PNG'
import programmingLanguage1Long from '../../images/ProjectImages/ProgrammingLanguage1Long.PNG'
import programmingLanguage2Long from '../../images/ProjectImages/ProgrammingLanguage2Long.PNG'
import webApp1Square from '../../images/ProjectImages/WebApp1Square.PNG'
import webApp2Square from '../../images/ProjectImages/WebApp2Square.PNG'
import webApp1Long from '../../images/ProjectImages/WebApp1Long.PNG'
import webApp2Long from '../../images/ProjectImages/WebApp2Long.PNG'
import moreProjects1 from '../../images/ProjectImages/blueprint.jpg'
import moreProjects2 from '../../images/ProjectImages/coding.jpg'

import upArrow from '../../images/SVGS/upArrow.svg'
import downArrow from '../../images/SVGS/downArrow.svg'

function Projects() {
 
    const [isTransitioning, setIsTransitioning] = useState(false);
    const [targetIndex, setTargetIndex] = useState(1);
    const [targetDirection, setTargetDirection]= useState('up');
     
   
    const projects = [
        {
            title: "Custom Programming Language", 
            longImages : [programmingLanguage2Long, programmingLanguage1Square], 
            squareImages: [programmingLanguage1Square, programmingLanguage2Square],
            description: 'I designed the unique syntax and semantics of a custom programming language and implemented its compiler in C.'},

        {
            title: "Search Algorithm Web App", 
            longImages: [webApp1Long, webApp2Long],
            squareImages: [webApp1Square, webApp2Square],
            description: "I created a React web app that visualizes various search algorithms."},

        {
            title: "More to Come!", 
            longImages : [moreProjects1, moreProjects2], 
            squareImages: [moreProjects1, moreProjects2], 
            description: "I am going to create more projects in the future."},
    ]
       
       
       
       const [activeIndex, setActiveIndex] = useState(0);
       const [activeIndexProgress, setActiveIndexProgress] = useState(0);
   
       useEffect(()=>{
         setActiveIndexProgress(()=>{return activeIndex})
       }, [activeIndex]);
   
   
       const handleTransitionFinished = () => {}
     
       const [animationProps, setAnimationProps] = useSpring(() => ({
         top: '0%',
        

         config: config.default,
         onRest: handleTransitionFinished,
       }))
   
   
   
   
       const nextProject = () => {
         console.log("prev active index = ", activeIndex, "target index = ", targetIndex);
       
         setTargetIndex(() => {
           const newTargetIndex = (activeIndex + 1) % projects.length;
           console.log("active index = ", activeIndex, "new target index = ", newTargetIndex);
       
           setActiveIndexProgress(newTargetIndex);
           setTargetDirection('down');
   
       
          
           setAnimationProps({top: '100%', onRest: ()=>{
             console.log("transition finished bitch");
             setActiveIndex(newTargetIndex);
             setAnimationProps({top: '0%' , onRest : ()=>{}, immediate:true})
           }});
           return newTargetIndex; // This will set the targetIndex state.
         });
     };
   
     
       const prevProject = () => {
         console.log("prev active index = ", activeIndex, "target index = ", targetIndex);
       
         setTargetIndex(() => {
           var newTargetIndex = activeIndex - 1;
           if(newTargetIndex < 0) newTargetIndex = projects.length - 1;
   
   
           console.log("active index = ", activeIndex, "new target index = ", newTargetIndex);
       
           setActiveIndexProgress(newTargetIndex);
           setTargetDirection('up');
   
       
          
           setAnimationProps({top: '-100%', onRest: ()=>{
             console.log("transition finished bitch");
             setActiveIndex(newTargetIndex);
             setAnimationProps({top: '0%' , onRest : ()=>{}, immediate:true})
           }});
           return newTargetIndex; // This will set the targetIndex state.
         });
   
       };
   
   
   
       const gotoProject = (i) => {
         console.log("prev active index = ", activeIndex, "target index = ", targetIndex);
       
         if(i === activeIndex)return;
   
         setTargetIndex(() => {
           
           const direction = i < activeIndex ? 'up' : 'down'
       
           setActiveIndexProgress(i);
           setTargetDirection(direction);
   
           const str = direction === 'up' ? '-100%' : '100%';
          
           setAnimationProps({top: str, onRest: ()=>{
             console.log("transition finished bitch");
             setActiveIndex(i);
             setAnimationProps({top: '0%' , onRest : ()=>{}, immediate:true})
           }});
           return i; // This will set the targetIndex state.
         });
     };
     
   
       const oppositeDirection = targetDirection === 'down' ? 'up' : 'down';
   
   
       const activeClassName = 'project active'
       const targetClassName = 'project target ' + targetDirection;
       const defaultClassName = 'project';
      
   
       const _triggerTransition = (target, direction) => {
   
         console.log("pre trigger transition, active = ", activeIndex, "target = ", targetIndex);
         setTargetDirection(direction);
         setTargetIndex(target);
         console.log("post trigger transition, active = ", activeIndex, "target = ", targetIndex);
   
       }
   
       const triggerTransition = () => {
   
   
         if(targetDirection === 'up')setAnimationProps({down: '-100%', onRest: handleTransitionFinished});
         if(targetDirection === 'down')setAnimationProps({down: '100%', onRest : handleTransitionFinished});
   
   
         console.log("post post post trigger transition , active =", activeIndex, "target index = ", targetIndex)
       }
   
   
     return (
       <div className='projects-wrapper'>
   
   <div className = 'projects-progress'>
             {projects.map((_, index) => (
               <span
                 className={`project-oval ${activeIndexProgress === index ? 'expanded' : ''}`}
                 key={index}
                 onClick={()=>{gotoProject(index)}}
               ></span>
             ))}
           </div>
   
           <div className = 'projects-display-wrapper'>
   
   
             <animated.div style = {animationProps} className = 'projects-display'> 
             {projects.map((project, index) => (
   
               
               <div
   
                 
                 className={index === activeIndex ? activeClassName : index === targetIndex ? targetClassName : defaultClassName }
                 key={index}
               >
                 <Project project_obj = {project}/>
               </div>
             ))}
   
             </animated.div>
             <button onClick={prevProject} className="projects-prev-button">
                <img src = {downArrow}></img>
             </button>
             <button onClick={nextProject} className="projects-next-button">
                <img src = {upArrow}></img>
             </button>
   
           </div>

       </div>
     )
}

export default Projects