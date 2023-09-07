import React, {useState, useRef} from 'react'
import { useSpring, animated } from 'react-spring';
import {Transition} from 'react-transition-group'


function Project({project_obj}) {

    const title = project_obj.title;
    const squareImages = project_obj.squareImages;
    const longImages = project_obj.longImages;
    const description = project_obj.description;
    const [hovered, setHovered] = useState(null);

    const imageWrapperRef = useRef(null);

    



    const clipPathLeftUpperNeutral = 'polygon(0 0, 100% 0, 100% 0,  0 100%)'
    const clipPathRightLowerNeutral = 'polygon(0 100%, 0 100%, 100% 0, 100% 100%)'
    const clipPathLeftUpperExpanded = 'polygon(0 0, 100% 0%, 100% 68%, 0 68%)'
    const clipPathRightLowerContracted = 'polygon(0 100%, 0 68%, 100% 68%, 100% 100%)'
    const clipPathLeftUpperContracted = 'polygon(0 0%, 100% 0%, 100% 32%, 0 32%)'
    const clipPathRightLowerExpanded = 'polygon(0 100%, 0 32%, 100% 32%, 100% 100%)'





    const handleMouseEnter = (e) => {
        const rect = imageWrapperRef.current.getBoundingClientRect();
        const relX = e.clientX - rect.left;
        const relY =  (1 - ((e.clientY - rect.top) / rect.height)) * rect.height

        console.log("hovered = ", hovered);

        var m = rect.height / rect.width;
        var b = 0;
        
        if(hovered === 'left'){
            m = 0; b = rect.height * 0.32;
        }
        if(hovered === 'right'){
            m = 0; b = rect.height * 0.68;
            

        }
        console.log("x = ", relX, "y = ", relY, "m = ", m, "expected y = ", (m * relX) + b)

        if (relY > (m * relX) + b) {
            setHovered('left');

        } else {

            setHovered('right');
        }

    };

    const handleMouseLeave = () => {
        setHovered(null);

    };




    const leftClassName = 'project-image left upper ' + (hovered === 'left' ? 'expanded' : hovered === 'right' ? 'contracted' : '');
    const leftWrapperClassName = 'project-image-wrapper-left-upper ' + (hovered === 'left' ? 'expanded' : hovered === 'right' ? 'contracted' : '');
    const rightClassName = 'project-image right lower ' + (hovered === 'right' ? 'expanded' : hovered === 'left' ? 'contracted' : '');
    const rightWrapperClassName = 'project-image-wrapper-right-lower ' +  (hovered === 'right' ? 'expanded' : hovered === 'left' ? 'contracted' : '');

    return (
        <div className='displayed-project'>
            <div className='project-title'>{title}</div>
            <div 
                className='project-image-wrapper' 
                onMouseMove={handleMouseEnter} 
                onMouseLeave={handleMouseLeave} 
                ref={imageWrapperRef}
            >
            <Transition in={hovered === 'left'} timeout={300}>
                {(state) => (
                    <div 
                        className={`${leftClassName} left-transition-${state}`}
                    >

                    {(hovered === 'left' ) && <button className='view-code-button'>Code</button>}
                    <div className={leftWrapperClassName}>
                        <img src={longImages[0]} alt="Upper image"></img>
                        </div>
                    </div>
                )}
            </Transition>
            <Transition in={hovered === 'right'} timeout={300}>
                {(state) => (
                    <div 
                        className={`${rightClassName} right-transition-${state}`}
                    >
                    {(hovered === 'right' ) && <button className='view-demo-button'>Demo</button>}

                    <div className = {rightWrapperClassName}>
                        <img src={longImages[1]} alt="Lower image"></img>
                    </div>
                    </div>
                )}
            </Transition>
            </div>
            <p className='project-description'>{description}</p>
        </div>
    );
}

export default Project