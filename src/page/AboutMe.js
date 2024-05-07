import React from 'react';
import '../styles/AboutMe.css';
import CodeBlock from './CodeBlock';
import code from './AboutMeCode';


function AboutMe() {
    return (
    <div>
        <CodeBlock code={code}/>
    </div>
    );
}

export default AboutMe;
