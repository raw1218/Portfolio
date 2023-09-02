import React from 'react'
import ParticleSimulation from './ParticleSimulation'
import './LandingPage.css'

function LandingPage() {




  return (
   

    <div class = "landing-page-wrapper">
        <ParticleSimulation/>
        
        <div class = "landing-page-main-text-overlay">
        <div class = "landing-page-main-text-overlay-upper">
            <p id = "HelloWorld" className='computer-text'>Hello World!</p>
            <p id = "MyNameIs" className='main-text-small'>My name is</p>
            <h1 id = "Name" className='main-text-big'>Ronald Wood</h1>

        </div>

        <div className='landing-page-main-text-overlay-lower'>
            <p id="IAmA" className='main-text-small'>I am a</p>

            <h1 id = "Title" className='main-text-big computer-text'>Software Engineer</h1>
        </div>
        </div>

    </div>
    
  )
}

export default LandingPage