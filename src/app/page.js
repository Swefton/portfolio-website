"use client";

import { useRef } from "react";
import KeyboardWidget from "@/components/KeyboardWidget";
import TerminalWidget from "@/components/TerminalWidget";

export default function Home() {
  const terminalRef = useRef();
  const keyboardRef = useRef();

  const simulateTyping = async (text) => {
    let currentInput = "";
    for (let i = 0; i < text.length; i++) {
      const char = text[i];
      currentInput += char;

      // Update virtual keyboard to highlight keys
      if (keyboardRef.current) {
        keyboardRef.current.setInputValue(currentInput);
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

  return (
    <main>
      <TerminalWidget ref={terminalRef} />
      <button onClick={() => simulateTyping("run github")}>GitHub</button>
      <KeyboardWidget ref={keyboardRef} />
    </main>
  );
}
