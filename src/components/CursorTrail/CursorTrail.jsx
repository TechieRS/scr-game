import React, { useEffect, useRef } from 'react';
import './CursorTrail.css';

const CursorTrail = () => {
  // We no longer need a ref for the main container
  const circlesRef = useRef([]);
  // We'll store the positions of each circle in an array
  const positions = useRef(Array(12).fill({ x: 0, y: 0 }));
  const mousePos = useRef({ x: 0, y: 0 });
  const animationFrameRef = useRef(null);

  const numCircles = 12;

  useEffect(() => {
    const circles = circlesRef.current;

    // Track the mouse position
    const handleMouseMove = (e) => {
      mousePos.current.x = e.clientX;
      mousePos.current.y = e.clientY;
    };

    const animate = () => {
      // The leader circle (index 0) will chase the mouse
      let leaderX = positions.current[0].x;
      let leaderY = positions.current[0].y;

      // Use a smoothing factor (linear interpolation or "lerp")
      leaderX += (mousePos.current.x - leaderX) * 0.25;
      leaderY += (mousePos.current.y - leaderY) * 0.25;

      positions.current[0] = { x: leaderX, y: leaderY };

      // Each subsequent circle chases the one in front of it
      for (let i = 1; i < numCircles; i++) {
        let currentX = positions.current[i].x;
        let currentY = positions.current[i].y;
        
        const followX = positions.current[i - 1].x;
        const followY = positions.current[i - 1].y;

        currentX += (followX - currentX) * 0.25;
        currentY += (followY - currentY) * 0.25;
        
        positions.current[i] = { x: currentX, y: currentY };
      }

      // Apply the new positions using hardware-accelerated transforms
      circles.forEach((circle, index) => {
        if (circle) {
          const { x, y } = positions.current[index];
          const scale = (numCircles - index) / numCircles;
          // Use transform for both position and scale for maximum performance
          circle.style.transform = `translate(${x}px, ${y}px) scale(${scale})`;
        }
      });

      animationFrameRef.current = requestAnimationFrame(animate);
    };

    window.addEventListener('mousemove', handleMouseMove);
    animate();

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, []);

  // Render circles. We add a default background color here.
  const circleElements = Array.from({ length: numCircles }, (_, index) => (
    <div
      key={index}
      className="circle"
      ref={(el) => (circlesRef.current[index] = el)}
      style={{ backgroundColor: 'white' }} // Keep the requested style
    ></div>
  ));

  // The main container no longer needs a ref
  return <div className="cursor">{circleElements}</div>;
};

export default CursorTrail;