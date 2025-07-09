// KeyboardWidget.jsx
"use client";

import { useState, useRef, forwardRef, useImperativeHandle } from 'react';
import Keyboard from 'react-simple-keyboard';
import 'react-simple-keyboard/build/css/index.css';

const KeyboardWidget = forwardRef((props, ref) => {
  const [layoutName, setLayoutName] = useState("default");
  const keyboardRef = useRef();

  useImperativeHandle(ref, () => ({
    setInputValue: (newInput) => {
      setInput(newInput);
      keyboardRef.current.setInput(newInput);
    },
    clearInput: () => {
      setInput("");
      keyboardRef.current.clearInput();
    },
    getButtonElement: (button) => {
      return keyboardRef.current.getButtonElement(button);
    },
    getCurrentInput: () => {
      return input;
    },
  }));

  const handleKeyboardChange = (input) => {
    if (props.onInputChange) props.onInputChange(input);
  };

  const handleKeyPress = (button) => {
    if (button === "{shift}" || button === "{lock}") {
      setLayoutName(prev => (prev === "default" ? "shift" : "default"));
    }
    if (props.onKeyPress) {
      props.onKeyPress(button);
    }
  };

  return (
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
  );
});

KeyboardWidget.displayName = "KeyboardWidget";
export default KeyboardWidget;
