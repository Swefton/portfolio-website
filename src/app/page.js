"use client";

import GlobeWidget from "@/components/GlobeWidget";
import KeyboardWidget from "@/components/KeyboardWidget";
import TerminalWidget from "@/components/TerminalWidget";
import { useRef } from "react";

export default function Home() {
  const terminalRef = useRef();

  const handleRunGithub = () => {
    if (terminalRef.current && terminalRef.current.sendCommand) {
      terminalRef.current.sendCommand("github");
    }
  };

  return (
    <main>
      {/* <GlobeWidget /> */}
      <KeyboardWidget/>
      <TerminalWidget ref={terminalRef} />

      <button onClick={handleRunGithub}>
        Run github
      </button>
    </main>
  );
}
