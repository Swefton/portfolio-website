"use client";

import GlobeWidget from "@/components/GlobeWidget";
import KeyboardWidget from "@/components/KeyboardWidget";
import TerminalWidget from "@/components/TerminalWidget";
import { useRef } from "react";

export default function Home() {
  const terminalRef = useRef();

  const handleVirtualKeyPress = (char) => {
    // Append character to TerminalWidget buffer
    if (terminalRef.current) {
      terminalRef.current.addToInput(char);
    }
  };

  const handleVirtualEnter = () => {
    if (terminalRef.current) {
      terminalRef.current.executeInput();
    }
  };

  return (
    <main>
      {/* <GlobeWidget /> */}
      <KeyboardWidget
        onVirtualKeyPress={handleVirtualKeyPress}
        onVirtualEnter={handleVirtualEnter}
      />
      <TerminalWidget ref={terminalRef} />
    </main>
  );
}
