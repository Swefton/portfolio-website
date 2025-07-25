import { useEffect, useRef, useMemo } from 'react';
import { useAnimationTick } from '../../app/page';
import styles from './Matrix.module.css';

const MatrixRainWidget = () => {
  const canvasRef = useRef();
  const dropsRef = useRef([]);
  const trailsRef = useRef([]);
  const lastUpdateRef = useRef(0);
  const columnsRef = useRef(0);
  
  const { tick } = useAnimationTick();

  // ASCII character set - memoized for performance
  const asciiChars = useMemo(() => 
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@#$%^&*()", 
    []
  );

  const getRandomChar = () => {
    return asciiChars[Math.floor(Math.random() * asciiChars.length)];
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    
    // Set canvas size to fill parent
    const resizeCanvas = () => {
      const rect = canvas.parentElement.getBoundingClientRect();
      canvas.width = rect.width;
      canvas.height = rect.height;
      
      // Recalculate columns when canvas resizes
      const fontSize = 10;
      const newColumns = Math.floor(canvas.width / fontSize);
      
      if (newColumns !== columnsRef.current) {
        columnsRef.current = newColumns;
        dropsRef.current = new Array(newColumns).fill(0);
        trailsRef.current = new Array(newColumns).fill(null).map(() => []);
      }
    };
    
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    return () => {
      window.removeEventListener('resize', resizeCanvas);
    };
  }, []);

  // Animation logic triggered by global tick
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || columnsRef.current === 0) return;

    const ctx = canvas.getContext('2d');
    const fontSize = 10;
    const updateInterval = 80; // milliseconds
    const density = 0.015;
    
    // Only update every 80ms (approximately)
    const now = performance.now();
    if (now - lastUpdateRef.current < updateInterval) {
      return;
    }
    lastUpdateRef.current = now;

    const drops = dropsRef.current;
    const trails = trailsRef.current;

    // Semi-transparent black background for trailing effect
    ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Set font once
    ctx.font = `${fontSize}px monospace`;

    // Draw characters
    for (let i = 0; i < drops.length; i++) {
      // Update trail
      if (trails[i].length > 0) {
        trails[i].forEach((trail, index) => {
          const alpha = Math.max(0, 1 - (index * 0.1));
          const greenValue = Math.floor(255 * alpha);
          ctx.fillStyle = `rgb(0, ${greenValue}, 0)`;
          ctx.fillText(trail.char, i * fontSize, trail.y);
        });
      }

      // Randomly start new drops
      if (drops[i] * fontSize > canvas.height && Math.random() > 1 - density) {
        drops[i] = 0;
        trails[i] = [];
      }

      // Add new character to trail
      if (drops[i] * fontSize < canvas.height) {
        const char = getRandomChar();
        const y = drops[i] * fontSize;
        
        // Add to trail
        trails[i].unshift({ char, y });
        
        // Limit trail length
        if (trails[i].length > 20) {
          trails[i].pop();
        }

        // Draw the leading character brighter
        ctx.fillStyle = '#ffffff';
        ctx.fillText(char, i * fontSize, y);
      }

      drops[i]++;
    }
  }, [tick, asciiChars]);

  return (
    <div className={styles.container}>
      <canvas 
        ref={canvasRef}
        className={styles.canvas}
      />
    </div>
  );
};

export default MatrixRainWidget;