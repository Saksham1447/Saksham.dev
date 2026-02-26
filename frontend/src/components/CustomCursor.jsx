'use client';

import { useEffect, useRef } from 'react';

const CustomCursor = () => {
  const cursorRef = useRef(null);
  const posRef = useRef({ x: 0, y: 0 });
  const targetPosRef = useRef({ x: 0, y: 0 });
  const prevPosRef = useRef({ x: 0, y: 0 });
  const velocityRef = useRef({ x: 0, y: 0 });
  const rotationRef = useRef(0);
  const targetRotationRef = useRef(0);
  const scaleRef = useRef(1);
  const isOverButtonRef = useRef(false);
  const lastTimeRef = useRef(Date.now());

  // Lerp function for smooth interpolation
  const lerp = (a, b, t) => a + (b - a) * t;

  // Calculate angle from velocity
  const getRotationAngle = (vx, vy) => {
    if (Math.abs(vx) < 0.1 && Math.abs(vy) < 0.1) {
      return rotationRef.current; // Keep current rotation when barely moving
    }
    const angle = Math.atan2(vy, vx);
    return (angle * 180) / Math.PI;
  };

  // Calculate speed magnitude
  const getSpeed = (vx, vy) => Math.sqrt(vx * vx + vy * vy);

  useEffect(() => {
    // Hide default cursor
    document.body.style.cursor = 'none';

    // Initialize position to center
    if (cursorRef.current) {
      posRef.current = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
      targetPosRef.current = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    }

    const handleMouseMove = (e) => {
      const { clientX, clientY } = e;
      
      // Update target position
      targetPosRef.current = { x: clientX, y: clientY };

      // Calculate velocity
      velocityRef.current = {
        x: clientX - prevPosRef.current.x,
        y: clientY - prevPosRef.current.y,
      };

      prevPosRef.current = { x: clientX, y: clientY };

      // Calculate target rotation angle based on movement direction
      targetRotationRef.current = getRotationAngle(
        velocityRef.current.x,
        velocityRef.current.y
      );

      // Calculate speed-based scale
      const speed = getSpeed(velocityRef.current.x, velocityRef.current.y);
      const targetScale = Math.min(1 + speed * 0.04, 1.25);
      scaleRef.current = lerp(scaleRef.current, targetScale, 0.15);
    };

    // Handle button hover for magnetic effect
    const handleButtonHover = (e) => {
      const isButton = 
        e.target.tagName === 'BUTTON' ||
        e.target.closest('button') ||
        e.target.classList.contains('interactive') ||
        e.target.closest('.interactive') ||
        e.target.tagName === 'A';

      isOverButtonRef.current = !!isButton;

      if (cursorRef.current) {
        if (isButton) {
          cursorRef.current.classList.add('cursor-hover');
        } else {
          cursorRef.current.classList.remove('cursor-hover');
        }
      }
    };

    // High-performance animation loop - as fast as possible
    let animationFrameId;
    const animate = () => {
      if (cursorRef.current) {
        const now = Date.now();
        const deltaTime = Math.min((now - lastTimeRef.current) / 16.67, 2); // Normalize to 60fps
        lastTimeRef.current = now;

        // Ultra-smooth position interpolation with adaptive lerp
        const smoothFactor = 0.18; // Increased smoothness (lower = smoother)
        posRef.current.x = lerp(
          posRef.current.x,
          targetPosRef.current.x,
          smoothFactor
        );
        posRef.current.y = lerp(
          posRef.current.y,
          targetPosRef.current.y,
          smoothFactor
        );

        // Smooth rotation interpolation
        let rotationDiff = targetRotationRef.current - rotationRef.current;
        // Handle angle wrapping (shortest path)
        if (rotationDiff > 180) rotationDiff -= 360;
        if (rotationDiff < -180) rotationDiff += 360;
        rotationRef.current += rotationDiff * 0.22; // Even smoother rotation

        // Smooth scale decay
        scaleRef.current = lerp(scaleRef.current, 1, 0.1);

        // Single transform for maximum performance
        cursorRef.current.style.transform = `translate(calc(-50%), calc(-50%)) translate(${posRef.current.x}px, ${posRef.current.y}px) rotate(${rotationRef.current}deg) scale(${scaleRef.current})`;
      }

      animationFrameId = requestAnimationFrame(animate);
    };

    // Add event listeners
    document.addEventListener('mousemove', handleMouseMove, { passive: true });
    document.addEventListener('mouseover', handleButtonHover, { passive: true });
    document.addEventListener('mouseout', handleButtonHover, { passive: true });

    // Start animation loop
    animationFrameId = requestAnimationFrame(animate);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseover', handleButtonHover);
      document.removeEventListener('mouseout', handleButtonHover);
      cancelAnimationFrame(animationFrameId);
      document.body.style.cursor = 'auto';
    };
  }, []);

  return (
    <>
      {/* Cursor Styles */}
      <style>{`
        /* Hide default cursor */
        * {
          cursor: none !important;
        }

        /* Custom Cursor Container */
        .custom-cursor {
          position: fixed;
          top: 0;
          left: 0;
          pointer-events: none;
          z-index: 99999;
          will-change: transform;
          backface-visibility: hidden;
          -webkit-font-smoothing: antialiased;
        }

        /* Arrow SVG styling */
        .custom-cursor svg {
          display: block;
          width: 32px;
          height: 32px;
          filter: drop-shadow(0 0 8px rgba(168, 85, 247, 0.6))
                  drop-shadow(0 0 16px rgba(236, 72, 153, 0.3));
          transition: filter 0.15s cubic-bezier(0.34, 1.56, 0.64, 1);
        }

        /* Hover state - enhanced glow */
        .custom-cursor.cursor-hover svg {
          filter: drop-shadow(0 0 12px rgba(168, 85, 247, 0.8))
                  drop-shadow(0 0 20px rgba(236, 72, 153, 0.5))
                  drop-shadow(0 0 30px rgba(168, 85, 247, 0.3));
        }

        /* Ensure inputs and textareas show default cursor */
        input,
        textarea,
        select {
          cursor: text !important;
        }

        /* Links and buttons */
        a,
        button,
        .interactive {
          cursor: none !important;
        }

        /* Body optimization */
        body {
          overflow-x: hidden;
        }
      `}</style>

      {/* Custom Cursor Element */}
      <div ref={cursorRef} className="custom-cursor">
        <svg
          width="32"
          height="32"
          viewBox="0 0 32 32"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          style={{ overflow: 'visible' }}
        >
          {/* Arrow shape - pointing right by default, rotates based on movement */}
          <defs>
            <filter id="glowEffect">
              <feGaussianBlur stdDeviation="1.5" result="coloredBlur" />
              <feMerge>
                <feMergeNode in="coloredBlur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* Arrow head (main body) */}
          <path
            d="M 2 16 L 24 2 L 18 16 L 24 30 Z"
            fill="white"
            opacity="0.98"
            filter="url(#glowEffect)"
          />

          {/* Arrow accent border for definition */}
          <path
            d="M 2 16 L 24 2 L 18 16 L 24 30 Z"
            fill="none"
            stroke="rgba(168, 85, 247, 0.5)"
            strokeWidth="1"
            opacity="0.6"
          />

          {/* Center dot for visual balance */}
          <circle cx="16" cy="16" r="1.5" fill="rgba(236, 72, 153, 0.9)" />
        </svg>
      </div>
    </>
  );
};

export default CustomCursor;
