"use client";

import { useRef } from "react";
import KeyboardWidget from "@/components/KeyboardWidget";
import TerminalWidget from "@/components/TerminalWidget";
import GlobeWidget from "@/components/GlobeWidget";
import "./bento.css";

export default function Home() {
  const terminalRef = useRef();
  const keyboardRef = useRef();

  const simulateTyping = async (text) => {
    if (!terminalRef.current) return;
    await terminalRef.current.simulateTyping(text);
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

  return (
    <main className="bento-grid">

        <div className="bento-tile terminal">
          <TerminalWidget ref={terminalRef} />
        </div>

        <div className="bento-tile keyboard">
          <KeyboardWidget ref={keyboardRef} onKeyPress={handleKeyboardKeyPress} />
        </div>

        <div className="bento-tile widget widget-1">
          <GlobeWidget />
        </div>

        <div className="bento-tile widget widget-2">
          <p>Future Widget 2</p>
        </div>

        <div className="bento-tile widget widget-3">
          <p>Future Widget 3</p>
        </div>
    
    </main>
  );
}
