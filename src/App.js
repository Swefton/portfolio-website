import React, { useState, useEffect } from 'react';
import './styles/App.css'; // Import the CSS file

import Navbar from "./navbar/navbar";
import Titlebar from "./navbar/titlebar";
import AboutMe from "./page/AboutMe";

function App() {
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
        <Navbar />
      </div>
      <br />
      <AboutMe />
    </div>
  );
}

export default App;
