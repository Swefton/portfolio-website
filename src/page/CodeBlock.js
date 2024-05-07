import React from 'react';
import '../styles/CodeBlock.css';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { atomDark } from 'react-syntax-highlighter/dist/esm/styles/prism'; // Choose a theme


function CodeBlock({ code }) {
  // Split the code into lines
  const lines = code.split('\n');

  return (
    <div className="code-block">
        <div className="code-content">
          {lines.map((line, index) => (
            <div key={index} className="code-line">
              <span className="line-number">{index + 1}</span>
              <SyntaxHighlighter language="javascript" style={atomDark}>
                {line}
              </SyntaxHighlighter>
              
            </div>
          ))}
        </div>
    </div>
  );
}

export default CodeBlock;
