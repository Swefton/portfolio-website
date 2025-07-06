'use client';

import dynamic from 'next/dynamic';
import { useState, useRef } from 'react';
import Keyboard from 'react-simple-keyboard';
import 'react-simple-keyboard/build/css/index.css';

// Dynamically import Globe to disable SSR
const Globe = dynamic(() => import('react-globe.gl'), { ssr: false });

export default function Home() {
  const [input, setInput] = useState("");
  const [layoutName, setLayoutName] = useState("default");

  const keyboardRef = useRef();

  const handleKeyboardChange = (input) => {
    setInput(input);
  };

  const handleKeyPress = (button) => {
    console.log("Button pressed", button);
    if (button === "{shift}" || button === "{lock}") handleShift();
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
    <main>
      {/* Globe */}
      <div style={{ height: "100vh", width: "100vw", position: "fixed", top: 0, left: 0 }}>
        <Globe
          globeImageUrl="/earth-night.jpg"
          backgroundColor="black"
        />
      </div>

      {/* Keyboard & input */}
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
              "` 1 2 3 4 5 6 7 8 9 0 - = {bksp}",
              "{tab} q w e r t y u i o p [ ] \\",
              "{lock} a s d f g h j k l ; ' {enter}",
              "{shift} z x c v b n m , . / {shift}",
              ".com @ {space}"
            ],
            shift: [
              "~ ! @ # $ % ^ & * ( ) _ + {bksp}",
              "{tab} Q W E R T Y U I O P { } |",
              "{lock} A S D F G H J K L : \" {enter}",
              "{shift} Z X C V B N M < > ? {shift}",
              ".com @ {space}"
            ]
          }}
        />
      </div>
    </main>
  );
}
