import React, { useState, useContext } from 'react';
import NavbarItem from './navbarItem';
import { WindowDimensionsContext } from '../App';  // Ensure correct path
import './navbar.css'



const Navbar = ({ setCurrentPage }) => {
    const { width } = useContext(WindowDimensionsContext);
    const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [selectedKey, setSelectedKey] = useState(2);


    const mobileThreshold = 750; // or whatever pixel threshold you prefer
    




    if (width <= mobileThreshold) {
        return (
            <div className="navbar navbar-mobile">
                <button onClick={() => setMobileMenuOpen(!isMobileMenuOpen)}>Menu</button>

                {isMobileMenuOpen && (
                    <div className="navbar navbar-mobile-dropdown">
                        <NavbarItem selectedKey = {selectedKey} keyID = {1} label="Home" onClick={() => {setSelectedKey(1); setCurrentPage('home')}} />
                        <NavbarItem selectedKey = {selectedKey} keyID = {2} label="About Me"  onClick={() => {setSelectedKey(2); setCurrentPage('about')}}/>
                        <NavbarItem selectedKey = {selectedKey} keyID = {3} label="Projects"  onClick={() => {setSelectedKey(3); setCurrentPage('projects')}} />
                        <NavbarItem selectedKey = {selectedKey} keyID = {4} label="Contact"  onClick={() => {setSelectedKey(4); setCurrentPage('contact')}} />
                    </div>
                )}
            </div>
        );
    } else {
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
