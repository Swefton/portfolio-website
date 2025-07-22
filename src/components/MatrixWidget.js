import { useEffect, useRef } from 'react';

const MatrixRainWidget = () => {
  const canvasRef = useRef();
  const animationRef = useRef();

  // ASCII character set
  const asciiChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@#$%^&*()";

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
    };
    
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    const fontSize = 10;
    const columns = Math.floor(canvas.width / fontSize);
    const drops = new Array(columns).fill(0);
    const speed = 80;
    const density = 0.015;

    // Track character trails
    const trails = new Array(columns).fill(null).map(() => []);

    const draw = () => {
      // Semi-transparent black background for trailing effect
      ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Set font
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
    };

    const animate = () => {
      draw();
      animationRef.current = setTimeout(animate, speed);
    };

    animate();

    return () => {
      clearTimeout(animationRef.current);
      window.removeEventListener('resize', resizeCanvas);
    };
  }, []);

  return (
    <div style={{
      height: '100%',
      width: '100%',
      backgroundColor: '#000000',
      overflow: 'hidden'
    }}>
      <canvas 
        ref={canvasRef}
        style={{ 
          display: 'block',
          width: '100%',
          height: '100%',
          backgroundColor: '#000000'
        }}
      />
    </div>
  );
};

export default MatrixRainWidget;