"use client";

import React, { useState, useImperativeHandle, forwardRef } from 'react';
import Terminal, { ColorMode, TerminalOutput } from 'react-terminal-ui';

import "./Terminal.css";

const TerminalWidget = forwardRef((props, ref) => {
  const [terminalLineData, setTerminalLineData] = useState([
    <TerminalOutput key={0}>Welcome to the React Terminal UI Controlled Component!</TerminalOutput>,
  ]);
  const [currentInput, setCurrentInput] = useState("");

  useImperativeHandle(ref, () => ({
    simulateTyping: async (text) => {
      setCurrentInput("");
      for (let i = 0; i < text.length; i++) {
        setCurrentInput(prev => prev + text[i]);
        await new Promise(res => setTimeout(res, 100));
      }
      handleSubmit(text);
    },
    typeCharacter: (char) => {
      setCurrentInput(prev => prev + char);
    },
    handleEnter: (input) => {
      handleSubmit(input);
    },
    setInputValue: (input) => {
      setCurrentInput(input);
    },
    clearInput: () => {
      setCurrentInput("");
    },
  }));

  const handleSubmit = (input) => {
    const trimmed = input.trim();
    let output;
    if (trimmed === "run github") {
      output = "Opening GitHub...";
      window.open("https://github.com", "_blank");
    } else if (trimmed === "clear") {
      setTerminalLineData([]);
      setCurrentInput("");
      return;
    } else {
      output = `Unrecognized command: ${trimmed}`;
    }

    setTerminalLineData(prev => [
      ...prev,
      <TerminalOutput key={prev.length}>{`$ ${trimmed}`}</TerminalOutput>,
      <TerminalOutput key={prev.length + 1}>{output}</TerminalOutput>,
    ]);
    setCurrentInput("");
  };

  return (
    <Terminal
      name="React Terminal UI"
      colorMode={ColorMode.Dark}
      prompt="$ "
      onInput={handleSubmit}
      startingInputValue={currentInput}
      height="95%"
    >
      {terminalLineData}
    </Terminal>
  );
});

TerminalWidget.displayName = "TerminalWidget";
export default TerminalWidget;
