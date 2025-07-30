import React, { useEffect, useRef } from 'react';
import './CursorTrail.css';
import gsap from 'gsap'; // We'll use GSAP for smooth animations

const CursorTrail = () => {
  const circlesRef = useRef([]);
  const mousePos = useRef({ x: 0, y: 0 });

  const numCircles = 12;

  useEffect(() => {
    // Add a mousemove event listener to track the cursor's position
    const handleMouseMove = (e) => {
      mousePos.current.x = e.clientX;
      mousePos.current.y = e.clientY;
    };
    window.addEventListener('mousemove', handleMouseMove);

    // Set the initial state of the circles using GSAP
    // We use `transform` for hardware-accelerated animations
    gsap.set(circlesRef.current, { xPercent: -50, yPercent: -50 });

    // QuickSetter is a highly optimized way to update properties in a loop
    const quickSetters = circlesRef.current.map(circle => ({
      x: gsap.quickSetter(circle, "x", "px"),
      y: gsap.quickSetter(circle, "y", "px"),
    }));

    // Use GSAP's ticker for a synchronized animation loop
    const animate = () => {
      const { x, y } = mousePos.current;
      
      quickSetters.forEach((setter, index) => {
        // Each circle gets a slight delay, creating the trail effect
        const delay = index * 0.02;

        gsap.to(circlesRef.current[index], {
          x: x,
          y: y,
          duration: 0.25, // A short duration for responsiveness
          ease: "power2.out",
          delay: delay,
        });
      });
    };
    
    // An alternative, more physics-based animation loop
    let x = 0;
    let y = 0;
    const animatePhysics = () => {
        // Interpolate the main position towards the mouse position
        x += (mousePos.current.x - x) * 0.15;
        y += (mousePos.current.y - y) * 0.15;

        // Apply this position to each circle with a delay
        quickSetters.forEach((setter, index) => {
            const currentCircle = circlesRef.current[index];
            const prevCirclePos = index === 0 
                ? { x, y } 
                : { x: gsap.getProperty(circlesRef.current[index-1], "x"), y: gsap.getProperty(circlesRef.current[index-1], "y") };

            setter.x(prevCirclePos.x);
            setter.y(prevCirclePos.y);
        });
    }

    // You can choose which animation style you prefer. 
    // The `animate` function provides a smooth, easing-based trail.
    // The `animatePhysics` provides a more fluid, connected trail. Let's use `animatePhysics`.
    gsap.ticker.add(animatePhysics);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      gsap.ticker.remove(animatePhysics); // Clean up the ticker
    };
  }, []);

  // Render the circle elements
  const circleElements = Array.from({ length: numCircles }, (_, index) => (
    <div
      key={index}
      className="circle"
      ref={(el) => (circlesRef.current[index] = el)}
      // Apply scaling directly in the style for consistency
      style={{
          transform: `scale(${(numCircles - index) / numCircles})`,
          backgroundColor: 'white' // Keep as requested
      }}
    ></div>
  ));

  return <div className="cursor">{circleElements}</div>;
};

export default CursorTrail;