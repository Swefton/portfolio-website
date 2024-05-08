import React, { useState, useEffect } from 'react';
import '../styles/navbar.css';

// NavigationItem component
function NavigationItem({children, name, image }) {
    return (
        <div>
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
function Navbar() {


    return (
        <nav >
            <ul>
                <NavigationItem
                    name="AboutMe.py"
                    image="pycon.svg"
                >
                    AboutMe.py
                </NavigationItem>

                <NavigationItem
                    name="AboutMe.py"
                    image="pycon.svg"
                >
                    AboutMe.py
                </NavigationItem>

            </ul>
        </nav>
    );
}

export default Navbar;