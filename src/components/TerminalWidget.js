"use client";

import { useState, useRef, forwardRef, useImperativeHandle } from "react";

const TerminalWidget = forwardRef((props, ref) => {
  const [input, setInput] = useState("");
  const [history, setHistory] = useState([]);

  const handleCommand = (command) => {
    let output;
    if (command === "help") {
      output = "Available commands: help, github, clear";
    } else if (command === "github") {
      output = "Opening GitHub...";
      window.open("https://github.com/yourusername", "_blank");
    } else if (command === "clear") {
      setHistory([]);
      return;
    } else {
      output = `Command not found: ${command}`;
    }
    setHistory((prev) => [...prev, `> ${command}`, output]);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleCommand(input.trim());
      setInput("");
    } else if (e.key === "Backspace") {
      setInput((prev) => prev.slice(0, -1));
    } else if (e.key.length === 1) {
      setInput((prev) => prev + e.key);
    }
  };

  // Allow parent to add to input buffer
  useImperativeHandle(ref, () => ({
    addToInput: (text) => {
      setInput((prev) => prev + text);
    },
    executeInput: () => {
      handleCommand(input.trim());
      setInput("");
    },
    setInputValue: (text) => {
      setInput(text);
    }
  }));

  return (
    <div
      tabIndex={0}
      onKeyDown={handleKeyDown}
      style={{
        background: "black",
        color: "lime",
        padding: "1rem",
        fontFamily: "monospace",
        width: "90%",
        maxWidth: "600px",
        margin: "20px auto",
        height: "300px",
        overflowY: "auto",
        borderRadius: "6px"
      }}
    >
      {history.map((line, index) => (
        <div key={index}>{line}</div>
      ))}
      <div>
        <span>&gt; </span>
        <span>{input}</span>
        <span className="cursor">_</span>
      </div>
    </div>
  );
});

TerminalWidget.displayName = "TerminalWidget";
export default TerminalWidget;
