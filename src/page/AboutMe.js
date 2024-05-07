import React from 'react';
import '../styles/AboutMe.css';
import CodeBlock from './CodeBlock';

const code = `
function helloWorld() {
  console.log('Hello, world!');
}
helloWorld();
`;

function AboutMe() {
    return (
    <div>
        <CodeBlock code={code}/>
    </div>
    );
}

export default AboutMe;
