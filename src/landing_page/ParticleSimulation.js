import React, { useState, useEffect, useRef, useContext } from 'react';
import { WindowDimensionsContext } from '../App';
import './ParticleSimulation.css';

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
            console.log("hyperdrive on!");
        };
    
        const handleMouseUp = () => {
            setHyperdriveToggled(false);
            console.log("hyperdrive off");
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
                setHyperdrivePercentage(prev => Math.min(prev + 0.01, 1));
                console.log("hyperdrive = ", hyperdrivePercentage);
            }, 50);  // Adjust interval for smoother/faster transition
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
                velocity: Math.random() ,
                opacity: 0.7 + Math.random() * 0.3  // Random opacity between 0.8 and 1.0
            };
        });
    };

    const [stars, setStars] = useState(createStars(screenWidth, screenHeight));

    const drawStars = () => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        ctx.clearRect(0, 0, screenWidth, screenHeight);
        
        stars.forEach(star => {
            const distanceFromCenter = Math.sqrt(Math.pow(star.x - windowCenterX, 2) + Math.pow(star.y - windowCenterY, 2));
            const stretchFactor = 1 + hyperdrivePercentage * (distanceFromCenter / Math.max(screenWidth, screenHeight));
    
            ctx.beginPath();
            ctx.globalAlpha = star.opacity;
    
            if (hyperdrivePercentage > 0) {
                // Rotate context to align with star's angle
                ctx.save();
                ctx.translate(star.x, star.y);
                ctx.rotate(star.angle);
                ctx.scale(stretchFactor, 1);
                ctx.arc(0, 0, star.size, 0, Math.PI * 2);
                ctx.restore();
            } else {
                ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
            }
            
            ctx.fillStyle = 'white';
            ctx.fill();
        });
    
        // Rest of your draw code...
    };
    
    

    useEffect(() => {
        const intervalId = setInterval(() => {
            setStars(prevStars => prevStars.map(star => {
                const dx = star.velocity * (1 + 2 * hyperdrivePercentage) * Math.cos(star.angle);
                const dy = star.velocity * (1 + 2 * hyperdrivePercentage) * Math.sin(star.angle);

                let newX = star.x + dx;
                let newY = star.y + dy;

                if (newX < 0 || newX > screenWidth || newY < 0 || newY > screenHeight) {
                    newX = Math.random() * screenWidth;
                    newY = Math.random() * screenHeight;
                    const newAngle = calculateAngle(newX, newY);
                    return {
                        ...star,
                        x: newX,
                        y: newY,
                        angle: newAngle
                    };
                }

                return { ...star, x: newX, y: newY , angle: calculateAngle(newX, newY)};
            }));

            drawStars();
        }, 50);

        return () => clearInterval(intervalId);
    }, [height, width, stars]);

    useEffect(() => {
        drawStars();
    }, [stars]);

    return (
        <div className="particleSimulationWrapper">
            <canvas ref={canvasRef} className="particleSimulation" width={screenWidth} height={screenHeight}></canvas>
        </div>
    );
}

export default ParticleSimulation;
