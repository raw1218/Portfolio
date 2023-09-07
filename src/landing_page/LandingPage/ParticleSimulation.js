import React, { useState, useEffect, useRef, useContext } from 'react';
import { WindowDimensionsContext } from '../../App';
import './ParticleSimulation.css';
import backgroundImage from '../../images/colorful-space-some-stars.jpg';

function ParticleSimulation() {
    const { offsetX, offsetY, width, height,  screenWidth, screenHeight } = useContext(WindowDimensionsContext);
    


    const [hyperdriveToggled, setHyperdriveToggled] = useState(false);
    const [hyperdrivePercentage, setHyperdrivePercentage] = useState(0);
    const toggleHyperdrive = () => {
        setHyperdriveToggled(!hyperdriveToggled);
    };


    useEffect(() => {
        const handleMouseDown = () => {
            setHyperdriveToggled(true);
            
        };
    
        const handleMouseUp = () => {
            setHyperdriveToggled(false);
            
        };
    
        window.addEventListener('mousedown', handleMouseDown);
        window.addEventListener('mouseup', handleMouseUp);
    
        return () => {
            window.removeEventListener('mousedown', handleMouseDown);
            window.removeEventListener('mouseup', handleMouseUp);
        };
    }, []);
    useEffect(() => {
        if (hyperdriveToggled && hyperdrivePercentage < 1) {
            const interval = setInterval(() => {
                setHyperdrivePercentage(prev => Math.min(prev + 0.02, 1));
            }, 25);  // Adjust interval for smoother/faster transition
            return () => clearInterval(interval);
        }
    }, [hyperdriveToggled, hyperdrivePercentage]);   
    useEffect(() => {
        if (!hyperdriveToggled && hyperdrivePercentage > 0) {
            const interval = setInterval(() => {
                setHyperdrivePercentage(prev => Math.max(prev - 0.02, 0));
            }, 25);  // Adjust interval for smoother/faster transition
            return () => clearInterval(interval);
        }
    }, [hyperdriveToggled, hyperdrivePercentage]);








    const [windowCenterX, setWindowCenterX] = useState((width / 2));
    const [windowCenterY, setWindowCenterY] = useState((height / 2));
    useEffect(() => {
        setWindowCenterX((width / 2));
        setWindowCenterY((height / 2));
    
        // Recalculate angles of all stars based on new center
        setStars(prevStars => prevStars.map(star => ({
            ...star,
            angle: calculateAngle(star.x, star.y)
        })));
    }, [offsetX, offsetY, width, height]);
    
    

    const canvasRef = useRef(null);

    const STAR_DENSITY = 15; // Stars per 10,000 square pixels

    const calculateAngle = (x, y) => {

        return Math.atan2(y - windowCenterY, x - windowCenterX);
    };

    const createStars = (maxWidth, maxHeight) => {
        const area = maxWidth * maxHeight;
        const numStars = Math.floor((STAR_DENSITY * area) / 10000);
        
        return [...Array(numStars)].map(() => {
            const x = Math.random() * maxWidth;
            const y = Math.random() * maxHeight;
            const angle = calculateAngle(x, y);
            return {
                x: x,
                y: y,
                angle: angle,
                size: Math.random() * 0.8,
                baseVelocity: Math.random() ,
                opacity: 0.7 + Math.random() * 0.3,  // Random opacity between 0.8 and 1.0
                spawn: Date.now(),
            };
        });
    };

    const [stars, setStars] = useState(createStars(screenWidth, screenHeight));

const drawStars = () => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, screenWidth, screenHeight);

    drawBackground(ctx);
    
    stars.forEach(star => {
        ctx.beginPath();
       // ctx.globalAlpha = star.opacity;
        ctx.fillStyle = "white";
        ctx.strokeStyle = "white";
        // Calculate distance from center
        const distanceFromCenter = Math.sqrt(Math.pow(star.x - windowCenterX, 2) + Math.pow(star.y - windowCenterY, 2));
        const maxDistance = Math.sqrt(Math.pow(screenWidth, 2) + Math.pow(screenHeight, 2));
        const distanceFactor = (distanceFromCenter * 2)/ maxDistance;

        if (hyperdrivePercentage > 0) {
            const baseLength = star.size;

            const elapsedTime = Date.now() - star.spawn;
            const timeFactor = Math.min(elapsedTime / 200,1)

          
            const additionalLength =  timeFactor * baseLength *  500 * hyperdrivePercentage  * distanceFactor ;  // Adjust this 20 multiplier as needed
            const lineLength =  baseLength + ( additionalLength );
            const endX = star.x + Math.cos(star.angle) * lineLength;
            const endY = star.y + Math.sin(star.angle) * lineLength;

            ctx.lineWidth = star.size;
            ctx.beginPath();
            ctx.moveTo(star.x, star.y);
            ctx.lineTo(endX, endY);
            ctx.stroke();

            //ctx.fillRect(star.x - star.size / 2, star.y - lineLength / 2, star.size, lineLength);
        } else {
            ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
            ctx.fill();
        }
    });
};

    
    
    
    

useEffect(() => {
    const intervalId = setInterval(() => {
        setStars(prevStars => prevStars.map(star => {

            // Calculate distance from center for velocity adjustment
            const distanceFromCenter = Math.sqrt(Math.pow(star.x - windowCenterX, 2) + Math.pow(star.y - windowCenterY, 2));
            const maxDistance = Math.sqrt(Math.pow(screenWidth, 2) + Math.pow(screenHeight, 2));
            const distanceFactor = (distanceFromCenter * 2) / maxDistance;
            var velocity;
            // Update velocity in hyperdrive
            if (hyperdrivePercentage > 0) {
                velocity  = star.baseVelocity + (1 + (100 ** hyperdrivePercentage) * distanceFactor);  // 3 is a multiplier, adjust as needed
            } else {
                velocity = star.baseVelocity;
            }

            const dx = velocity * Math.cos(star.angle);
            const dy = velocity * Math.sin(star.angle);
            let newX = star.x + dx;
            let newY = star.y + dy;

            
            star.opacity = 1;
            if (newX < 0 || newX > screenWidth || newY < 0 || newY > screenHeight) {
                newX = Math.random() * screenWidth;
                newY = Math.random() * screenHeight;
                const newAngle = calculateAngle(newX, newY);
                return {
                    ...star,
                    x: newX,
                    y: newY,
                    angle: newAngle,
                    spawn: Date.now(),
                };
            }

            return { ...star, velocity: velocity, x: newX, y: newY, angle: calculateAngle(newX, newY), };
        }));

        drawStars();
    }, 50);

    return () => clearInterval(intervalId);
}, [height, width, stars]);


 

//track mouse position
const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });


useEffect(() => {
    const handleMouseMove = (e) => {
        setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    
    return () => {
        window.removeEventListener('mousemove', handleMouseMove);
    };
}, []);




function drawBackground(ctx) {
    // First, fill the canvas with a semi-transparent (or opaque) overlay
    ctx.fillStyle = 'rgba(0, 0, 0, 1)'; // adjust opacity as required
    ctx.fillRect(0, 0, screenWidth, screenHeight);
    ctx.filter = 'blur(150px)'
    // Set up the shadow properties for the blur effect
 /*   ctx.shadowColor = 'black'; 
    ctx.shadowBlur = 3000;  // adjust the blur amount
    ctx.shadowOffsetX = 0;
    ctx.shadowOffsetY = 0;
*/
    // Use the "destination-out" global composite operation to "cut out" a blurry circle around the cursor
    ctx.globalCompositeOperation = 'destination-out';
    ctx.beginPath();
    ctx.arc(mousePosition.x, mousePosition.y, 100, 0, Math.PI * 2, true); // Radius of 80, you can adjust as needed
    ctx.fill();

    // Reset properties to default
    ctx.globalCompositeOperation = 'source-over';
    ctx.shadowBlur = 0;
    ctx.filter = 'none'
}












    return (
        <div className="particleSimulationWrapper">
            <canvas ref={canvasRef} className="particleSimulation" width={screenWidth} height={screenHeight}></canvas>
        </div>
    );
}

export default ParticleSimulation;