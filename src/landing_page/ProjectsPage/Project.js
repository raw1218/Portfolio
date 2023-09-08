import React, {useState, useRef, useEffect, useLayoutEffect} from 'react'
import { useSpring, animated } from 'react-spring';
import {Transition} from 'react-transition-group'


function Project({project_obj}) {

    const title = project_obj.title;
    const squareImages = project_obj.squareImages;
    const longImages = project_obj.longImages;
    const description = project_obj.description;
    const [hovered, setHovered] = useState(null);

    const imageWrapperRef = useRef(null);
    const imageWrapperCircleRef = useRef(null);

    
    const [imageDimensions, setImageDimensions] = useState(() => {
        if (imageWrapperRef.current && imageWrapperCircleRef.current) {
            const rect = imageWrapperRef.current.getBoundingClientRect();
            const circleRect = imageWrapperCircleRef.current.getBoundingClientRect();
            const left = circleRect.left - rect.left;
            const top = circleRect.top - rect.top;
            return { left: left, top: top, width: rect.width, height: rect.height };
        }
        return { left: 0, top: 0, width: 0, height: 0 };
    });   
   


    useLayoutEffect(() => {
        if (imageWrapperRef.current && imageWrapperCircleRef.current) {

            


            const rect = imageWrapperRef.current.getBoundingClientRect();
            const circleRect = imageWrapperCircleRef.current.getBoundingClientRect();
            const left = circleRect.left - rect.left;
            const top  = circleRect.top - rect.top;
            if( imageDimensions.left === left && imageDimensions.width === rect.width && imageDimensions.height === rect.height)return;
            if (rect.width !== 0 && rect.height !== 0) {

                const left = circleRect.left - rect.left;
                const top  = circleRect.top - rect.top;
                setImageDimensions({ top:top, left:left, width: rect.width, height: rect.height });
            }
        }
    });
    

    useEffect(() => {
        const handleResize = () => {
            if (imageWrapperRef.current) {
                const rect = imageWrapperRef.current.getBoundingClientRect();
                const circleRect = imageWrapperCircleRef.current.getBoundingClientRect();

                const left = circleRect.left - rect.left;
                const top = circleRect.top - rect.top;
                setImageDimensions({ left: left, top: top, width: rect.width, height: rect.height });
            }
        };
    
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);



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


    const circleWrapperDimension = Math.min(imageDimensions.width, imageDimensions.height);
    var circleWrapperStyle = {width:circleWrapperDimension, height: circleWrapperDimension};
    const wrapperStyle = { left: -imageDimensions.left + 'px', width:imageDimensions.width, height:imageDimensions.height};

    console.log("wrapper style = ", wrapperStyle)
    return (
        <div className='displayed-project'>
            
            <h2 className='project-title'>{title}</h2>
            
            <div 
                className='project-image-wrapper' 

                ref={imageWrapperRef}
            >
            <div                 onMouseMove={handleMouseEnter} 
                onMouseLeave={handleMouseLeave} className={'project-image-wrapper-circle ' + (hovered != null ? 'hovered' : '') } style = {circleWrapperStyle} ref = {imageWrapperCircleRef}>
            <Transition in={hovered === 'left'} timeout={300}>
                {(state) => (
                    <div 
                        className={`${leftClassName} left-transition-${state}`}
                      style = {wrapperStyle}
                    >

                    {(hovered === 'left' ) && <button className='view-code-button'>Code</button>}
                    <div className={leftWrapperClassName}   >
                        <img  style = {{width: imageDimensions.width, height: imageDimensions.height}} src={longImages[0]} alt="Upper image"></img>
                        </div>
                    </div>
                )}
            </Transition>
            <Transition in={hovered === 'right'} timeout={300}>
                {(state) => (
                    <div 
                        style={wrapperStyle}
                        className={`${rightClassName} right-transition-${state}`}
                    >
                    {(hovered === 'right' ) && <button className='view-demo-button'>Demo</button>}

                    <div className = {rightWrapperClassName}    >
                        <img style = {{width: imageDimensions.width, height: imageDimensions.height}} src={longImages[1]} alt="Lower image"></img>
                    </div>
                    </div>
                )}
            </Transition>
            </div>
            </div>
            <p className='project-description'>{description}</p>
        </div>
    );
}

export default Project