import React, { useState, useContext, useEffect } from 'react';
import NavbarItem from './navbarItem';
import { WindowDimensionsContext , currentPageContext} from '../App';  // Ensure correct path
import './navbar.css'
import { Transition } from 'react-transition-group';

import menuIcon from '../images/SVGS/menu.svg'
import backgroundImage from '../images/colorful-space-some-stars.jpg'
import xIcon from '../images/SVGS/x.svg'

const Navbar = () => {
    const { offsetX, offsetY, width, height,  screenWidth, screenHeight } = useContext(WindowDimensionsContext);
    const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [selectedKey, setSelectedKey] = useState(1);


    const mobileThreshold = 750; // or whatever pixel threshold you prefer
    

    const {currentPage, setCurrentPage} = useContext(currentPageContext);


    useEffect(()=> {
        if(currentPage === 'home')setSelectedKey(1);
        if(currentPage === 'about')setSelectedKey(2);
        if(currentPage === 'projects')setSelectedKey(3);
        if(currentPage === 'contact')setSelectedKey(4);
    }, [currentPage])


    if (width <= mobileThreshold) {
        return (
          <div className="navbar navbar-mobile">
            <div className='navbar-menu-expandable' onClick={() => setMobileMenuOpen(!isMobileMenuOpen)}>
              <img src={isMobileMenuOpen ? xIcon : menuIcon} alt='expandable menu icon'></img>
            </div>
            <Transition in={isMobileMenuOpen} timeout={{ enter: 50, exit: 500 }} >
              {state => (
                <div className={`navbar-expanded ${state}`}>
                   
                <div className='navbar-expanded-options'></div>
                  <canvas className='navbar-expanded-background' style = {{width: screenWidth, height: screenHeight}}></canvas>
                  


                

                </div>
              )}
            </Transition>
          </div>
        );
      }
      
    
    
    
    else{



        return (
            <div className="navbar">
                    <NavbarItem selectedKey = {selectedKey} keyID = {1} label="Home" onClick={() => {setSelectedKey(1); setCurrentPage('home')}} />
                        <NavbarItem selectedKey = {selectedKey} keyID = {2} label="About Me"  onClick={() => {setSelectedKey(2); setCurrentPage('about')}}/>
                        <NavbarItem selectedKey = {selectedKey} keyID = {3} label="Projects"  onClick={() => {setSelectedKey(3); setCurrentPage('projects')}} />
                        <NavbarItem selectedKey = {selectedKey} keyID = {4} label="Contact"  onClick={() => {setSelectedKey(4); setCurrentPage('contact')}} />
                     </div>
        );
    }
};

export default Navbar;
