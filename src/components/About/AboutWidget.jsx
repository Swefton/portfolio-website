import React, { useEffect, useRef, useState } from 'react';
import styles from './About.module.css';

const AboutMe = () => {
  const containerRef = useRef();
  const contentRef = useRef();
  const [sizeClass, setSizeClass] = useState('large');

  // Existing size classification (tiny/small/medium/large)
  useEffect(() => {
    const updateSizeClass = () => {
      if (!containerRef.current) return;

      const { width, height } = containerRef.current.getBoundingClientRect();
      const area = width * height;

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

    updateSizeClass();

    const resizeObserver = new ResizeObserver(() => {
      setTimeout(updateSizeClass, 50);
    });

    if (containerRef.current) {
      resizeObserver.observe(containerRef.current);
    }

    return () => resizeObserver.disconnect();
  }, []);

  // New dynamic font fit (auto scale to container height)
  useEffect(() => {
    const fitText = () => {
      if (!containerRef.current || !contentRef.current) return;

      const container = containerRef.current;
      const content = contentRef.current;

      let fontSize = 14; // start point
      content.style.fontSize = fontSize + 'px';

      // shrink if too tall
      while (content.scrollHeight > container.clientHeight && fontSize > 6) {
        fontSize -= 1;
        content.style.fontSize = fontSize + 'px';
      }

      // grow until nearly fills container
      while (content.scrollHeight <= container.clientHeight && fontSize < 200) {
        fontSize += 1;
        content.style.fontSize = fontSize + 'px';
      }

      // back down one step to prevent overflow
      content.style.fontSize = fontSize - 1 + 'px';
    };

    fitText();

    window.addEventListener('resize', fitText);
    return () => window.removeEventListener('resize', fitText);
  }, [sizeClass]);

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
            <h1 className={styles.name}>
              Hi, I'm <span className={styles.highlight}>Amrit</span>
            </h1>
            <p className={styles.description}>
              Senior CS at Michigan State University
            </p>
          </>
        );
      case 'medium':
        return (
          <>
            <h1 className={styles.name}>
              Hi, I'm <span className={styles.highlight}>Amrit</span>
            </h1>
            <p className={styles.description}>
              <span className={styles.highlight}>Senior CS</span> at MSU with
              Data Science minor. I work with AI, automation, and web tech.
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
              I'm a{' '}
              <span className={styles.highlight}>
                Senior Computer Science Major
              </span>{' '}
              at{' '}
              <span className={styles.highlight}>
                Michigan State University
              </span>{' '}
              with a minor in{' '}
              <span className={styles.highlight}>Data Science</span>. I like
              working with <span className={styles.highlight}>AI</span>,{' '}
              <span className={styles.highlight}>Process Automation</span>, and{' '}
              <span className={styles.highlight}>Web Technologies</span> to
              make software that makes computers work for humans and not the
              other way around. I'm a{' '}
              <span className={styles.highlight}>Linux enthusiast</span> and on
              the side I like contributing to{' '}
              <span className={styles.highlight}>open source tools</span> that
              I use on a day to day basis.
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
      <div ref={contentRef} style={{ width: '100%' }}>
        {getContent()}
      </div>
    </div>
  );
};

export default AboutMe;
