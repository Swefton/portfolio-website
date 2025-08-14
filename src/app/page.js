"use client";

import { useRef, createContext, useContext, useEffect, useState } from "react";
import KeyboardWidget from "@/components/Keyboard/KeyboardWidget";
import TerminalWidget from "@/components/Terminal/TerminalWidget";
import GlobeWidget from "@/components/Globe/GlobeWidget";
import AsciiChessBoard from "@/components/Chess/ChessWidget";
import AboutMe from "@/components/About/AboutWidget";
import MatrixRainWidget from "@/components/Matrix/MatrixWidget";
import ConwayWidget from "@/components/Conway/ConwayWidget";
import ProjectsViewer from "@/components/Modal/Projects";
import ExperiencesViewer from "@/components/Modal/Experiences";
import SkillsViewer from "@/components/Modal/Skill";

import "./bento.css";
import OrientationLock from "@/components/Orientation/orientation";

// Global Animation Context
const AnimationContext = createContext();

export const useAnimationTick = () => {
  const context = useContext(AnimationContext);
  if (!context) {
    throw new Error('useAnimationTick must be used within AnimationProvider');
  }
  return context;
};

// Animation Provider Component
const AnimationProvider = ({ children }) => {
  const [tick, setTick] = useState(0);
  const [deltaTime, setDeltaTime] = useState(0);
  const lastTimeRef = useRef(performance.now());
  const animationIdRef = useRef();

  useEffect(() => {
    let running = true;
    
    const animate = (currentTime) => {
      if (!running) return;
      
      const delta = currentTime - lastTimeRef.current;
      lastTimeRef.current = currentTime;
      
      setDeltaTime(delta);
      setTick(prev => prev + 1);
      
      animationIdRef.current = requestAnimationFrame(animate);
    };
    
    animationIdRef.current = requestAnimationFrame(animate);
    
    return () => {
      running = false;
      if (animationIdRef.current) {
        cancelAnimationFrame(animationIdRef.current);
      }
    };
  }, []);

  return (
    <AnimationContext.Provider value={{ tick, deltaTime }}>
      {children}
    </AnimationContext.Provider>
  );
};

export default function Home() {
  const terminalRef = useRef();
  const keyboardRef = useRef();

  const [activePopup, setActivePopup] = useState(null);

  const handleCommand = (command) => {
      if (command === "run projects") {
          setActivePopup("projects");
      }
      if (command === "run experience") {
          setActivePopup("experiences");
      }
      if (command === "run skills") {
          setActivePopup("skills");
      }
  };

  const simulateTyping = async (text) => {
    let currentInput = "";
    for (let i = 0; i < text.length; i++) {
      const char = text[i];
      currentInput += char;

      // Update virtual keyboard input
      if (keyboardRef.current) {
        keyboardRef.current.setInputValue(currentInput);

        // Highlight the key
        const btn = keyboardRef.current.getButtonElement(char.toLowerCase());
        if (btn) {
          btn.classList.add('hg-activeButton');
          setTimeout(() => {
            btn.classList.remove('hg-activeButton');
          }, 100);
        }
      }

      // Update terminal display
      if (terminalRef.current && terminalRef.current.typeCharacter) {
        terminalRef.current.typeCharacter(char);
      }

      await new Promise(res => setTimeout(res, 100)); // typing speed
    }

    // Simulate Enter
    if (terminalRef.current && terminalRef.current.handleEnter) {
      terminalRef.current.handleEnter(currentInput);
    }
    if (keyboardRef.current) {
      keyboardRef.current.clearInput();
    }
  };

  const handleKeyboardKeyPress = (button) => {
    if (!terminalRef.current) return;

    let char = button;

    if (button === "{space}") {
      char = " ";
      terminalRef.current.typeCharacter(char);
    } else if (button === "{enter}") {
      const input = keyboardRef.current?.getCurrentInput() || "";
      terminalRef.current.handleEnter(input);
      keyboardRef.current.clearInput();
    } else if (button === "{backspace}") {
      terminalRef.current.setInputValue(prev => prev.slice(0, -1));
    } else if (
      button === "{shift}" || button === "{lock}" ||
      button === "{tab}" || button === "{capslock}" ||
      button === "{shiftleft}" || button === "{shiftright}"
    ) {
      // Ignore modifier keys
      return;
    } else {
      terminalRef.current.typeCharacter(char);
    }
  };

  const moves = ["e4", "e5", "Nf3", "Nc6", "Bb5", "a6", "Ba4", "Nf6", "h3", "b5", "Bb3", "d6"];

  return (
    <OrientationLock>
    <AnimationProvider>
      <main className="bento-grid">
        {/* Left side - Terminal focus area */}
        <div className="bento-tile widget terminal">
          <TerminalWidget ref={terminalRef} onCommand={handleCommand} />
          <div className="terminal-buttons">
            <div className="terminal-button" onClick={() => simulateTyping("run github")}>
              <img src="/folder.svg" alt="GitHub" />
              <p>GitHub</p>
            </div>
            <div className="terminal-button" onClick={() => simulateTyping("run devpost")}>
              <img src="/folder.svg" alt="Devpost" />
              <p>Devpost</p>
            </div>
            <div className="terminal-button" onClick={() => simulateTyping("run linkedin")}>
              <img src="/folder.svg" alt="LinkedIn" />
              <p>LinkedIn</p>
            </div>
            <div className="terminal-button" onClick={() => simulateTyping("run experience")}>
              <img src="/folder.svg" alt="Experience" />
              <p>Experience</p>
            </div>
            <div className="terminal-button" onClick={() => simulateTyping("run projects")}>
              <img src="/folder.svg" alt="Projects" />
              <p>Projects</p>
            </div>
            <div className="terminal-button" onClick={() => simulateTyping("run skills")}>
              <img src="/folder.svg" alt="Skills" />
              <p>Skills</p>
            </div>
            <div className="terminal-button" onClick={() => simulateTyping("run resume")}>
              <img src="/folder.svg" alt="Resume" />
              <p>Resume</p>
            </div>
          </div>
        </div>

        <div className="bento-tile widget keyboard">
          <KeyboardWidget ref={keyboardRef} onKeyPress={handleKeyboardKeyPress} />
        </div>

        {/* Right side - Dynamic mixed layout */}
        <div className="bento-tile widget widget-1">
            <AboutMe />
        </div>

        <div className="bento-tile widget widget-2">
          <GlobeWidget />
        </div>

        <div className="bento-tile widget widget-3">
          <AsciiChessBoard moves={moves} interval={1500} />
        </div>

        <div className="bento-tile widget widget-4">
            <ConwayWidget />
        </div>

        <div className="bento-tile widget widget-5">
          <MatrixRainWidget />
        </div>

        <ProjectsViewer
          open={activePopup === "projects"}
          onClose={() => setActivePopup(null)}
        />
        <ExperiencesViewer
          open={activePopup === "experiences"}
          onClose={() => setActivePopup(null)}
        />
        <SkillsViewer
          open={activePopup === "skills"}
          onClose={() => setActivePopup(null)}
        />
      </main>
    </AnimationProvider>
    </OrientationLock>
  );
}