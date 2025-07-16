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

  const moves = ["e4", "e5", "Nf3", "Nc6", "Bb5", "a6", "Ba4", "Nf6"];

  return (
    <main className="bento-grid">

        <div className="bento-tile terminal">
          <TerminalWidget ref={terminalRef} />
          <div className= "terminal-buttons">
            <button onClick={() => simulateTyping("run github")}>GitHub</button>
            <button>Devpost</button>
            <button>LinkedIn</button>
            <button>Experience</button>
            <button>Projects</button>
            <button>Skills</button>
          </div>
        </div>

        <div className="bento-tile keyboard">
          <KeyboardWidget ref={keyboardRef} onKeyPress={handleKeyboardKeyPress} />
        </div>

        <div className="bento-tile widget widget-1">
          <GlobeWidget />
        </div>

        <div className="bento-tile widget widget-2">
            <AsciiChessBoard moves={moves} interval={1000} />
        </div>

        <div className="bento-tile widget widget-3">
          <p>Future Widget 3</p>
        </div>
    
    </main>
  );
}
