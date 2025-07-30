// KeyboardWidget.jsx
"use client";

import { useState, useRef, forwardRef, useImperativeHandle } from 'react';
import Keyboard from 'react-simple-keyboard';
// import 'react-simple-keyboard/build/css/index.css';
import './keyboard.css';

const KeyboardWidget = forwardRef((props, ref) => {
  const keyboardRef = useRef();
  const [layoutName, setLayoutName] = useState("default");

  const keyboardOptions = {
    layoutName,
    physicalKeyboardHighlight: true,
    theme: "simple-keyboard hg-theme-default hg-layout-default",
    syncInstanceInputs: true,
    mergeDisplay: true,
    debug: false,
    layout: {
      default: [
        "` 1 2 3 4 5 6 7 8 9 0 - = {backspace}",
        "{tab} q w e r t y u i o p [ ] \\",
        "{capslock} a s d f g h j k l ; ' {enter}",
        "{shiftleft} z x c v b n m , . / {shiftright}",
        "{space}"
      ]
    },
  };

  useImperativeHandle(ref, () => ({
    setInputValue: (newInput) => {
      keyboardRef.current.setInput(newInput);
    },
    clearInput: () => {
      keyboardRef.current.clearInput();
    },
    getButtonElement: (button) => {
      return keyboardRef.current.getButtonElement(button);
    }
  }));

  return (
    <Keyboard
      keyboardRef={r => (keyboardRef.current = r)}
      {...keyboardOptions}
    />
  );
});

KeyboardWidget.displayName = "KeyboardWidget";
export default KeyboardWidget;