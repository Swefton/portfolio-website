import React from 'react';
import styles from './About.module.css';

const AboutMe = () => {
  return (
    <div className={styles.container}>
      <h1>Hi, I'm <span>Amrit</span>.</h1>
      <p>I'm a Senior Computer Science Major at Michigan State University with a minor in Data Science. I like working with AI, process automation, and computer vision. Trully just any technology that makes computers work for humans and not the other way around. I'm a VIM and Arch (btw) enthusiast and like contributing to open source software in my free time.</p>
    </div>
  );
};

export default AboutMe