import React, { useState } from 'react';
import '../styles/navbar.css';

// NavigationItem component
function NavigationItem({ index, activeItem, handleItemClick, children }) {
    return (
        <li className="nav-item">
            <a
                href='/#'
                className={activeItem === index ? 'active' : ''}
                onClick={() => handleItemClick(index)}
            >
                {children}
            </a>
        </li>
    );
}

// Navbar component
function Navbar() {
    // State to track the active item, initialized to 0 for the first li
    const [activeItem, setActiveItem] = useState(0);

    // Function to handle click on navigation items
    const handleItemClick = (index) => {
        setActiveItem(index); // Update the active item state
    };

    return (
        <nav>
            <ul>
                <NavigationItem index={0} activeItem={activeItem} handleItemClick={handleItemClick}>1</NavigationItem>
                <NavigationItem index={1} activeItem={activeItem} handleItemClick={handleItemClick}>2</NavigationItem>
                <NavigationItem index={2} activeItem={activeItem} handleItemClick={handleItemClick}>3</NavigationItem>
            </ul>
        </nav>
    );
}

export default Navbar;
