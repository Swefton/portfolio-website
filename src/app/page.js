"use client";

import { useRef } from "react";
import KeyboardWidget from "@/components/KeyboardWidget";
import TerminalWidget from "@/components/TerminalWidget";
import GlobeWidget from "@/components/GlobeWidget";
import AsciiChessBoard from "@/components/ChessWidget";

import "./bento.css";

export default function Home() {
  const terminalRef = useRef();
  const keyboardRef = useRef();

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
    <main className="bento-grid">
      {/* Left side - Terminal focus area */}
      <div className="bento-tile terminal">
        <TerminalWidget ref={terminalRef} />
        <div className="terminal-buttons">
          <div className="terminal-button" onClick={() => simulateTyping("run github")}>
            <img src="/folder.svg" alt="GitHub" />
            <span>GitHub</span>
          </div>
          <div className="terminal-button" onClick={() => simulateTyping("run devpost")}>
            <img src="/folder.svg" alt="Devpost" />
            <span>Devpost</span>
          </div>
          <div className="terminal-button" onClick={() => simulateTyping("run linkedin")}>
            <img src="/folder.svg" alt="LinkedIn" />
            <span>LinkedIn</span>
          </div>
          <div className="terminal-button" onClick={() => simulateTyping("run experience")}>
            <img src="/folder.svg" alt="Experience" />
            <span>Experience</span>
          </div>
          <div className="terminal-button" onClick={() => simulateTyping("run projects")}>
            <img src="/folder.svg" alt="Projects" />
            <span>Projects</span>
          </div>
          <div className="terminal-button" onClick={() => simulateTyping("run skills")}>
            <img src="/folder.svg" alt="Skills" />
            <span>Skills</span>
          </div>
        </div>
      </div>

      <div className="bento-tile keyboard">
        <KeyboardWidget ref={keyboardRef} onKeyPress={handleKeyboardKeyPress} />
      </div>

      {/* Right side - Dynamic mixed layout */}
      <div className="bento-tile widget widget-1">
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          height: '100%',
          color: 'white'
        }}>
          <p>Temp Widget 1</p>
        </div>
      </div>

      <div className="bento-tile widget widget-2">
        <GlobeWidget />
      </div>

      <div className="bento-tile widget widget-3">
        <AsciiChessBoard moves={moves} interval={1500} />
      </div>

      <div className="bento-tile widget widget-4">
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          height: '100%',
          color: 'white'
        }}>
          <p>Temp Widget 4</p>
        </div>
      </div>

      <div className="bento-tile widget widget-5">
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          height: '100%',
          color: 'white'
        }}>
          <p>Temp Widget 5</p>
        </div>
      </div>
    </main>
  );
}