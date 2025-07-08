'use client'

import React, { useState, forwardRef, useImperativeHandle } from 'react';
import Terminal, { ColorMode, TerminalOutput } from 'react-terminal-ui';

const TerminalController = forwardRef((props, ref) => {
  const [terminalLineData, setTerminalLineData] = useState([
    <TerminalOutput key={0}>Welcome to the React Terminal UI Controlled Component!</TerminalOutput>,
  ]);

  const [currentInput, setCurrentInput] = useState("");

  // Expose control methods to parent
  useImperativeHandle(ref, () => ({
    typeCharacter: (char) => {
      setCurrentInput(prev => prev + char);
    },
    handleEnter: () => {
      const trimmedCommand = currentInput.trim();
      if (trimmedCommand === "clear") {
        setTerminalLineData([]);
        setCurrentInput("");
        return;
      }

      setTerminalLineData(prev => [
        ...prev,
        <TerminalOutput key={prev.length}>{`> ${trimmedCommand}`}</TerminalOutput>,
        <TerminalOutput key={prev.length + 1}>{`Output for ${trimmedCommand}`}</TerminalOutput>
      ]);

      // Handle redirects or folder logic if needed
      if (trimmedCommand === "run github") {
        window.open("https://github.com/your-username", "_blank");
      }

      setCurrentInput("");
    },
    clear: () => {
      setTerminalLineData([]);
      setCurrentInput("");
    }
  }));

  return (
    <Terminal
      name="React Terminal UI Controlled Component"
      colorMode={ColorMode.Light}
      prompt="> "
      onInput={() => {}}
    >
      {[
        ...terminalLineData,
        <TerminalOutput key={terminalLineData.length}>{`> ${currentInput}`}</TerminalOutput>
      ]}
    </Terminal>
  );
});

TerminalController.displayName = 'TerminalController';

export default TerminalController;
