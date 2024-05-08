import React from 'react';
import '../styles/CodeBlock.css';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { atomDark } from 'react-syntax-highlighter/dist/esm/styles/prism';

function CodeBlock({ code }) {

  return (
    <div className="code-block">
      <SyntaxHighlighter language="python" style={atomDark} showLineNumbers>
        {code}
      </SyntaxHighlighter>
    </div>
  );
}

export default CodeBlock;
