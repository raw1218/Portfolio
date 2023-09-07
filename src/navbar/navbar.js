import React, { useState, useContext, useEffect } from 'react';
import NavbarItem from './navbarItem';
import { WindowDimensionsContext , currentPageContext} from '../App';  // Ensure correct path
import './navbar.css'



const Navbar = () => {
    const { width } = useContext(WindowDimensionsContext);
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
