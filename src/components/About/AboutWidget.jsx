import React from 'react';
import styles from './About.module.css';

const AboutMe = () => {
  return (
    <div className={styles.container}>
      <h1>
        Hi, I'm <span>Amrit</span>.
      </h1>
      <p>
        I'm a <span>Senior Computer Science Major</span> at <span>Michigan State University</span> with a minor in <span>Data Science</span>. I like working with <span>AI</span>, <span>Process Automation</span>, and <span>Web Technologies</span> to make software that makes computers work for humans and not the other way around. I'm a <span>Linux enthusiast</span> and on the side I like contributing to <span> open source tools</span> that I use on a day to day basis.
      </p>
    </div>
  );
};

export default AboutMe