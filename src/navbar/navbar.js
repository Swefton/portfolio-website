import React, { useState } from 'react';
import '../styles/navbar.css';

// NavigationItem component
function NavigationItem({ index, activeItem, handleItemClick,children, name, image }) {

    const handleClick = () => {
        window.location.href = '/#';
        handleItemClick(index)
    };

    return (
        <div onClick={handleClick} style={{ cursor: 'pointer' }} className={activeItem === index ? 'active' : ''}>
            <li className="nav-item">
                <a href='/#'>
                    {image && <img src={'/'+image} alt={name} />}
                    {children}
                </a>
            </li>
        </div>
    );
}

// Navbar component
function Navbar({ activeItem, setActiveItem }) {

    const handleItemClick = (index) => {
        setActiveItem(index);
    };

    return (
        <nav >
            <ul>
                <NavigationItem
                    index = {0}
                    activeItem = {activeItem}
                    handleItemClick = {handleItemClick}
                    name="AboutMe.py"
                    image="pycon.svg"
                >
                    AboutMe.py
                </NavigationItem>

                <NavigationItem
                    index = {1}
                    activeItem = {activeItem}
                    handleItemClick = {handleItemClick}
                    name="AboutMe.py"
                    image="pycon.svg"
                >
                    Extra.py
                </NavigationItem>

            </ul>
        </nav>
    );
}

export default Navbar;