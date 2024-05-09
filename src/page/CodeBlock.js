import React, { useState, useEffect } from 'react';
import '../styles/CodeBlock.css';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { atomDark } from 'react-syntax-highlighter/dist/esm/styles/prism';

function CodeBlock({ code }) {
  const [displayedCode, setDisplayedCode] = useState('');
  const [animationState, setAnimationState] = useState(
    localStorage.getItem(`code-block-${code}`) || 0
  );

  useEffect(() => {
    const codeLength = code.length;
    let currentIndex = animationState;

    const typingInterval = setInterval(() => {
      setDisplayedCode(code.substring(0, currentIndex));
      currentIndex++;
      if (currentIndex > codeLength) {
        clearInterval(typingInterval);
      } else {
        setAnimationState(currentIndex);
        localStorage.setItem(`code-block-${code}`, currentIndex);
      }
    }, 10); // Adjust the typing speed here (milliseconds)

    return () => clearInterval(typingInterval);
  }, [code, animationState]);

  // Clear localStorage on page refresh and tab close
  useEffect(() => {
    const handleRefresh = () => {
      localStorage.removeItem(`code-block-${code}`);
    };

    window.onbeforeunload = handleRefresh;
    window.onunload = handleRefresh;

    return () => {
      window.onbeforeunload = null;
      window.onunload = null;
    };
  }, [code]);

  return (
    <div className="code-block">
      <SyntaxHighlighter language="python" style={atomDark} showLineNumbers wrapLines>
        {displayedCode}
      </SyntaxHighlighter>
    </div>
  );
}

export default CodeBlock;