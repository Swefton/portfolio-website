import React, { useState, useEffect } from 'react';

const OrientationLock = ({ children }) => {
  const [isPortrait, setIsPortrait] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkOrientation = () => {
      // Check if device is mobile/tablet
      const isMobileDevice = window.innerWidth <= 1024 || 
                           /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
      
      // Check if currently in portrait mode
      const isCurrentlyPortrait = window.innerHeight > window.innerWidth;
      
      setIsMobile(isMobileDevice);
      setIsPortrait(isMobileDevice && isCurrentlyPortrait);
    };

    // Initial check
    checkOrientation();

    // Listen for orientation changes
    window.addEventListener('resize', checkOrientation);
    window.addEventListener('orientationchange', () => {
      // Small delay to ensure dimensions are updated after orientation change
      setTimeout(checkOrientation, 100);
    });

    return () => {
      window.removeEventListener('resize', checkOrientation);
      window.removeEventListener('orientationchange', checkOrientation);
    };
  }, []);

  if (isPortrait) {
    return (
      <div className="orientation-overlay">
        <div className="orientation-prompt">
          <div className="phone-icon">
            <div className="phone-body">
              <div className="phone-screen"></div>
            </div>
            <div className="rotation-arrow">
              <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M21 2l-2 2m-7.61 7.61a3 3 0 11-4.24 4.24 3 3 0 014.24-4.24z"/>
                <path d="M13 2l6 6-6 6"/>
                <path d="M21 8.5l-7.5 7.5"/>
              </svg>
            </div>
          </div>
          <h2 className="orientation-title">Please Rotate Your Device</h2>
          <p className="orientation-message">
            This experience is optimized for landscape orientation.<br/>
            Please rotate your device to continue.
          </p>
          <div className="orientation-pulse"></div>
        </div>

        <style jsx>{`
          .orientation-overlay {
            position: fixed;
            top: 0;
            left: 0;
            width: 100vw;
            height: 100vh;
            background: var(--hud-bg, #0E0F10);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 9999;
            overflow: hidden;
          }

          .orientation-prompt {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            text-align: center;
            padding: 2rem;
            max-width: 300px;
            position: relative;
          }

          .phone-icon {
            position: relative;
            margin-bottom: 2rem;
            animation: float 3s ease-in-out infinite;
          }

          .phone-body {
            width: 60px;
            height: 100px;
            border: 2px solid var(--hud-pink, #F36CA6);
            border-radius: 12px;
            background: var(--hud-surface, #1A1C1F);
            position: relative;
            box-shadow: 0 0 20px rgba(243, 108, 166, 0.3);
          }

          .phone-screen {
            width: 48px;
            height: 76px;
            background: var(--hud-bg, #0E0F10);
            border-radius: 6px;
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            border: 1px solid var(--hud-soft-pink, #FFB8D2);
          }

          .rotation-arrow {
            position: absolute;
            top: -10px;
            right: -25px;
            color: var(--hud-soft-pink, #FFB8D2);
            animation: pulse 2s ease-in-out infinite;
          }

          .orientation-title {
            color: var(--hud-white, #FFFFFF);
            font-size: 1.5rem;
            font-weight: 600;
            margin-bottom: 1rem;
            font-family: 'SF Mono', 'Monaco', 'Inconsolata', 'Roboto Mono', monospace;
            text-shadow: 0 0 10px rgba(255, 255, 255, 0.3);
          }

          .orientation-message {
            color: var(--hud-gray, #AAAAAA);
            font-size: 0.9rem;
            line-height: 1.5;
            margin-bottom: 2rem;
            font-family: 'SF Mono', 'Monaco', 'Inconsolata', 'Roboto Mono', monospace;
          }

          .orientation-pulse {
            position: absolute;
            bottom: -20px;
            left: 50%;
            transform: translateX(-50%);
            width: 8px;
            height: 8px;
            background: var(--hud-pink, #F36CA6);
            border-radius: 50%;
            animation: ripple 2s ease-out infinite;
          }

          @keyframes float {
            0%, 100% { transform: translateY(0px); }
            50% { transform: translateY(-10px); }
          }

          @keyframes pulse {
            0%, 100% { 
              opacity: 1; 
              transform: scale(1);
            }
            50% { 
              opacity: 0.7; 
              transform: scale(1.1);
            }
          }

          @keyframes ripple {
            0% {
              transform: translateX(-50%) scale(1);
              opacity: 1;
            }
            100% {
              transform: translateX(-50%) scale(4);
              opacity: 0;
            }
          }

          /* HUD-style grid background */
          .orientation-overlay::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-image: 
              linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px);
            background-size: 20px 20px;
            pointer-events: none;
            opacity: 0.5;
          }

          /* Glowing border effect */
          .phone-body::after {
            content: '';
            position: absolute;
            top: -2px;
            left: -2px;
            right: -2px;
            bottom: -2px;
            background: linear-gradient(45deg, var(--hud-pink, #F36CA6), var(--hud-soft-pink, #FFB8D2));
            border-radius: 14px;
            z-index: -1;
            opacity: 0.6;
            animation: glow 3s ease-in-out infinite alternate;
          }

          @keyframes glow {
            0% { opacity: 0.6; filter: blur(2px); }
            100% { opacity: 0.8; filter: blur(4px); }
          }

          /* Responsive adjustments for very small screens */
          @media (max-width: 320px) {
            .orientation-prompt {
              padding: 1rem;
              max-width: 250px;
            }
            
            .orientation-title {
              font-size: 1.2rem;
            }
            
            .orientation-message {
              font-size: 0.8rem;
            }
          }
        `}</style>
      </div>
    );
  }

  return <>{children}</>;
};

export default OrientationLock;