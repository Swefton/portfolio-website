// KeyboardWidget.jsx
"use client";

import { useState, useRef, forwardRef, useImperativeHandle } from 'react';
import Keyboard from 'react-simple-keyboard';
import 'react-simple-keyboard/build/css/index.css';

const KeyboardWidget = forwardRef((props, ref) => {
  const keyboardRef = useRef();

  useImperativeHandle(ref, () => ({
    setInputValue: (newInput) => {
      keyboardRef.current.setInput(newInput);
    },
    clearInput: () => {
      keyboardRef.current.clearInput();
    },
    getButtonElement: (button) => {
      return keyboardRef.current.getButtonElement(button);
    },
    getCurrentInput: () => {
      return input;
    },
  }));

  return (
      <Keyboard
        keyboardRef={r => (keyboardRef.current = r)}
        // onChange={handleKeyboardChange}
        // onKeyPress={handleKeyPress}
        physicalKeyboardHighlight={true}
      />
  );
});

KeyboardWidget.displayName = "KeyboardWidget";
export default KeyboardWidget;
