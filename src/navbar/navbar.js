import React, { useState, useEffect } from 'react';
import '../styles/navbar.css';

// NavigationItem component
function NavigationItem({ index, activeItem, handleItemClick, children, name, image }) {
    return (
        <div className={activeItem === index ? 'active' : 'not active'}>
            <li className="nav-item">
                <a
                    href='/#'
                    onClick={() => handleItemClick(index)}
                >
                    {image && <img src={'/'+image} alt={name} />}
                    {children}
                </a>
            </li>
        </div>
    );
}

// Navbar component
function Navbar() {
    const [activeItem, setActiveItem] = useState(0);
    const [scrolled, setScrolled] = useState(false);

    const handleItemClick = (index) => {
        setActiveItem(index);
    };

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 0) {
                setScrolled(true);
            } else {
                setScrolled(false);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        <nav className={scrolled ? 'scrolled' : ''}>
            <ul>
                <NavigationItem
                    index={0}
                    activeItem={activeItem}
                    handleItemClick={handleItemClick}
                    name="AboutMe.py"
                    image="pycon.svg"
                >
                    AboutMe.py
                </NavigationItem>

                <NavigationItem
                    index={0}
                    activeItem={activeItem}
                    handleItemClick={handleItemClick}
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