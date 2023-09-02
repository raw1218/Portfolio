import React from 'react';
import './navbar.css'

const NavbarItem = ({ keyID, selectedKey,  label, onClick }) => {


    const isSelected = selectedKey == keyID;
    console.log("is selected = ", isSelected, "key = ", keyID, "selected key = ", selectedKey);
    const className = isSelected ? "navbar-item selected" : "navbar-item";
    


    return (
        <button className={className} onClick={onClick}>
            {label}
        </button>
    );
};

export default NavbarItem;
