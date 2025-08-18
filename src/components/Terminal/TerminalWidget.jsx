"use client";

import React, { useState, useImperativeHandle, forwardRef } from 'react';
import Terminal, { ColorMode, TerminalOutput } from 'react-terminal-ui';

import "./Terminal.css";

const TerminalWidget = forwardRef((props, ref) => {
  const [terminalLineData, setTerminalLineData] = useState([
    <TerminalOutput key={0}>Welcome to <span>Amrit OS</span>, type <span>'help'</span> for help. Or <span>use buttons below</span> for navigation.</TerminalOutput>,
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

    if (trimmed === "help") {
      output = `
  Available Commands:
    help             - Show this help menu
    joke             - Tell a random programming joke
    run github       - Open my GitHub profile
    run devpost      - Open my Devpost portfolio
    run linkedin     - View my LinkedIn profile
    run resume       - Open my resume
    run projects     - Show my projects
    run experience   - Show my professional experience
    run skills       - Show my skills
    clear            - Clear the terminal
      `;
    } else if (trimmed === "joke") {
       const jokes = [
        "Why do programmers prefer dark mode? Because light attracts bugs.",
        "I told my computer I needed a break, and it froze.",
        "There are only 10 types of people in the world: those who understand binary and those who don’t.",
        "A SQL query walks into a bar, walks up to two tables and asks: 'Can I join you?'",
        "Why do Java developers wear glasses? Because they can’t C#.",
        "What is a programmer's favorite hangout place? Foo Bar.",
        "How many programmers does it take to change a light bulb? None, that's a hardware problem.",
        "Why did the developer go broke? Because they used up all their cache.",
        "What's a programmer's favorite type of music? Algo-rhythm.",
        "Why did the computer get cold? It forgot to close its Windows.",
        "Why did the programmer quit their job? They didn’t get arrays.",
        "Why was the JavaScript developer sad? Because they didn’t Node how to Express themselves.",
        "Debugging: Being the detective in a crime movie where you are also the murderer.",
        "Why did the Git repository go to therapy? It had too many conflicts.",
        "Why did the function break up with the loop? It felt trapped.",
        "What do you call a busy waiter? A server.",
        "Why do C programmers have trouble dating? They don’t have class.",
        "Why was the computer late to work? It had a hard drive.",
        "Why did the computer show up at the party? Because it heard there would be a byte.",
        "Why did the robot go on vacation? To recharge its batteries."
        ]; 
      output = jokes[Math.floor(Math.random() * jokes.length)];
    } else if (trimmed === "run github") {
      output = "Opening GitHub...";
      window.open("https://github.com/Swefton", "_blank");
    } else if (trimmed === "run devpost") {
      output = "Opening Devpost...";
      window.open("https://devpost.com/Swefton", "_blank");
    } else if (trimmed === "run linkedin") {
      output = "Opening LinkedIn...";
      window.open("https://www.linkedin.com/in/amrit-m-srivastava/", "_blank");
    } else if (trimmed === "run resume") {
      output = "Opening resume...";
      window.open("/Amrit%20Resume.pdf", "_blank");
    } else if (
      trimmed === "run projects" ||
      trimmed === "run experience" ||
      trimmed === "run skills"
    ) {
      output = `Executing: ${trimmed}`;
      if (props.onCommand) {
        props.onCommand(trimmed);
      }
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
      name="Amrit OS"
      colorMode={ColorMode.Dark}
      prompt="$"
      onInput={handleSubmit}
      startingInputValue={currentInput}
      height="95%"
      TopButtonsPanel={()=> null}
    >
      {terminalLineData}
    </Terminal>
  );
});

export default TerminalWidget;
