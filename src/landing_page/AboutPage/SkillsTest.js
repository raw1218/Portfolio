import React, { useState } from 'react';
import { animated, useSpring, config } from 'react-spring';

function Skills() {
    const [activeIndex, setActiveIndex] = useState(0);

    const [props, set] = useSpring(() => ({
        left: '0%',
        config: config.default,
        onRest: () => {
            console.log('Animation Rested');
            setActiveIndex((prev) => (prev + 1) % 3); // Cycle through 3 slides for simplicity
        }
    }));

    const nextSkill = () => {
        set({ left: '-100%' });
    };

    return (
        <div className='skills-wrapper'>
            <div className='skills-display' style={props}>
                <animated.div className={activeIndex === 0 ? 'active' : ''}>Skill 1</animated.div>
                <div className={activeIndex === 1 ? 'active' : ''}>Skill 2</div>
                <div className={activeIndex === 2 ? 'active' : ''}>Skill 3</div>
            </div>
            <button onClick={nextSkill}>Next</button>
        </div>
    );
}

export default Skills;
