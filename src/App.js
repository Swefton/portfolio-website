import React, { useState, useEffect} from 'react';
import './styles/App.css';

import Navbar from "./navbar/navbar";
import Titlebar from "./navbar/titlebar";
import AboutMe from "./page/AboutMe";
import Resume from "./page/resume";
import Bottombar from "./bottombar/Bottombar";

function App() {
  const [activeItem, setActiveItem] = useState(0);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 0);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div className={`App ${scrolled ? 'scrolled' : ''}`}>
      <div className="App-header">
        <Titlebar />
        <Navbar activeItem={activeItem} setActiveItem={setActiveItem}/>
      </div>
      {activeItem === 0 && <AboutMe />}
      {activeItem === 1 && <Resume />}
      
      <br></br>
      <br></br>
      <Bottombar />
    </div>
  );
}

export default App;
