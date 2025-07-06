// src/components/KeyboardWidget.js
"use client";

import { useState, useRef } from 'react';
import Keyboard from 'react-simple-keyboard';
import 'react-simple-keyboard/build/css/index.css';

export default function KeyboardWidget({ onVirtualKeyPress, onVirtualEnter }) {
  const [input, setInput] = useState("");
  const [layoutName, setLayoutName] = useState("default");
  const keyboardRef = useRef();

  const handleKeyboardChange = (input) => {
    setInput(input);
  };

  const handleKeyPress = (button) => {
    if (button === "{shift}" || button === "{lock}") handleShift();
    else if (button === "{enter}") {
      if (onVirtualEnter) onVirtualEnter();
    } else if (button === "{space}") {
      if (onVirtualKeyPress) onVirtualKeyPress(" ");
    } else if (button === "{backspace}") {
      // Optional: handle backspace using a dedicated prop
    } else {
      if (onVirtualKeyPress) onVirtualKeyPress(button);
    }
  };

  const handleShift = () => {
    setLayoutName(prev => (prev === "default" ? "shift" : "default"));
  };

  const handleInputChange = (e) => {
    const input = e.target.value;
    setInput(input);
    keyboardRef.current.setInput(input);
  };

  return (
    <div style={{
      position: 'absolute',
      bottom: 20,
      left: '50%',
      transform: 'translateX(-50%)',
      zIndex: 10,
      maxWidth: '600px',
      width: '90%',
      color: 'black'
    }}>
      <input
        value={input}
        placeholder="Tap on the virtual keyboard to start"
        onChange={handleInputChange}
        style={{
          width: "100%",
          padding: "10px",
          fontSize: "16px",
          marginBottom: "10px",
          borderRadius: "4px",
          border: "1px solid #333"
        }}
      />
      <Keyboard
        keyboardRef={r => (keyboardRef.current = r)}
        onChange={handleKeyboardChange}
        onKeyPress={handleKeyPress}
        layoutName={layoutName}
        physicalKeyboardHighlight={true}
        layout={{
          default: [
            "` 1 2 3 4 5 6 7 8 9 0 - = {backspace}",
            "{tab} q w e r t y u i o p [ ] \\",
            "{capslock} a s d f g h j k l ; ' {enter}",
            "{shiftleft} z x c v b n m , . / {shiftright}",
            ".com @ {space}"
          ],
          shift: [
            "~ ! @ # $ % ^ & * ( ) _ + {backspace}",
            "{tab} Q W E R T Y U I O P { } |",
            "{capslock} A S D F G H J K L : \" {enter}",
            "{shiftleft} Z X C V B N M < > ? {shiftright}",
            ".com @ {space}"
          ]
        }}
      />
    </div>
  );
}
