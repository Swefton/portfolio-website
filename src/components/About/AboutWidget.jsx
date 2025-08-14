import React, { useEffect, useRef, useState } from 'react';
import styles from './About.module.css';

const AboutMe = () => {
  const containerRef = useRef();
  const [sizeClass, setSizeClass] = useState('large');

  useEffect(() => {
    const updateSize = () => {
      if (!containerRef.current) return;
      
      const { width, height } = containerRef.current.getBoundingClientRect();
      const area = width * height;
      
      // More conservative size detection to prevent overflow
      // Factor in both dimensions and total area
      if (width < 160 || height < 70 || area < 12000) {
        setSizeClass('tiny');
      } else if (width < 220 || height < 100 || area < 22000) {
        setSizeClass('small');
      } else if (width < 300 || height < 140 || area < 40000) {
        setSizeClass('medium');
      } else {
        setSizeClass('large');
      }
    };

    // Initial size check
    updateSize();
    
    // Use ResizeObserver for dynamic updates
    const resizeObserver = new ResizeObserver(() => {
      // Debounce to prevent too frequent updates
      setTimeout(updateSize, 50);
    });
    
    if (containerRef.current) {
      resizeObserver.observe(containerRef.current);
    }
    
    return () => resizeObserver.disconnect();
  }, []);

  const getContent = () => {
    switch (sizeClass) {
      case 'tiny':
        return (
          <>
            <h1 className={styles.name}>Amrit</h1>
            <p className={styles.description}>CS @ MSU</p>
          </>
        );
      case 'small':
        return (
          <>
            <h1 className={styles.name}>Hi, I'm Amrit</h1>
            <p className={styles.description}>
              Senior CS at Michigan State University
            </p>
          </>
        );
      case 'medium':
        return (
          <>
            <h1 className={styles.name}>Hi, I'm Amrit</h1>
            <p className={styles.description}>
              Senior CS at MSU with Data Science minor. 
              I work with AI, automation, and web tech.
            </p>
          </>
        );
      default:
        return (
          <>
            <h1 className={styles.name}>
              Hi, I'm <span className={styles.highlight}>Amrit</span>.
            </h1>
            <p className={styles.description}>
              I'm a <span className={styles.highlight}>Senior Computer Science Major</span> at{' '}
              <span className={styles.highlight}>Michigan State University</span> with a minor in{' '}
              <span className={styles.highlight}>Data Science</span>. I like working with{' '}
              <span className={styles.highlight}>AI</span>,{' '}
              <span className={styles.highlight}>Process Automation</span>, and{' '}
              <span className={styles.highlight}>Web Technologies</span> to make software that makes computers work for humans and not the other way around. I'm a{' '}
              <span className={styles.highlight}>Linux enthusiast</span> and on the side I like contributing to{' '}
              <span className={styles.highlight}>open source tools</span> that I use on a day to day basis.
            </p>
          </>
        );
    }
  };

  return (
    <div 
      ref={containerRef}
      className={`${styles.container} ${styles[sizeClass]}`}
    >
      {getContent()}
    </div>
  );
};

export default AboutMe;