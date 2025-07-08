'use client'

import React, { useState, forwardRef, useImperativeHandle } from 'react';
import Terminal, { ColorMode, TerminalOutput } from 'react-terminal-ui';

const TerminalController = forwardRef((props, ref) => {
  const [terminalLineData, setTerminalLineData] = useState([
    <TerminalOutput key={0}>Welcome to the React Terminal UI Controlled Component!</TerminalOutput>,
  ]);

  // Expose the sendCommand method to parent components
  useImperativeHandle(ref, () => ({
    sendCommand: (command) => {
      if (command === 'clear') {
        setTerminalLineData([]);
        return;
      }
      setTerminalLineData(prev => [
        ...prev,
        <TerminalOutput key={prev.length}>{`> ${command}`}</TerminalOutput>,
        <TerminalOutput key={prev.length + 1}>{`Output for ${command}`}</TerminalOutput>
      ]);
    }
  }));

  return (
    <Terminal
      name="React Terminal UI Controlled Component"
      colorMode={ColorMode.Light}
      prompt=""
      onInput={() => {}}
    >
      {terminalLineData}
    </Terminal>
  );
});

TerminalController.displayName = 'TerminalController';

export default TerminalController;
