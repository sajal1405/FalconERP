// src/components/animations/ParticlesBackground.tsx
import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
interface ParticlesBackgroundProps { /* No props needed for this component */ }

/**
 * ParticlesBackground Component
 * Renders an animated particle background using a Canvas element.
 * Particles move and connect/disconnect based on proximity.
 */
const ParticlesBackground: React.FC<ParticlesBackgroundProps> = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationFrameId = useRef<number | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return; // Ensure canvas element exists

    const ctx = canvas.getContext('2d');
    if (!ctx) return; // Ensure 2D rendering context is available

    let particles: Particle[] = [];
    const numParticles = 80; // Number of particles
    const maxDistance = 100; // Max distance for lines to connect

    // Particle class definition
    class Particle {
      x: number;
      y: number;
      size: number;
      speedX: number;
      speedY: number;
      color: string;

      constructor() {
        // Use non-null assertion (!) after canvas as it's checked above
        this.x = Math.random() * canvas!.width;
        this.y = Math.random() * canvas!.height;
        this.size = Math.random() * 2 + 0.5; // Size between 0.5 and 2.5
        this.speedX = Math.random() * 1 - 0.5; // Speed between -0.5 and 0.5
        this.speedY = Math.random() * 1 - 0.5; // Speed between -0.5 and 0.5
        this.color = `rgba(34, 211, 238, ${Math.random() * 0.6 + 0.2})`; // Cyan with varying opacity
      }

      // Update particle position
      update() {
        // Use non-null assertion (!) after canvas
        this.x += this.speedX;
        this.y += this.speedY;

        // Bounce off edges
        if (this.x > canvas!.width || this.x < 0) this.speedX *= -1;
        if (this.y > canvas!.height || this.y < 0) this.speedY *= -1;
      }

      // Draw particle
      draw() {
        // Use non-null assertion (!) after ctx
        ctx!.fillStyle = this.color;
        ctx!.beginPath();
        ctx!.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx!.fill();
      }
    }

    // Initialize particles
    const init = () => {
      particles = [];
      for (let i = 0; i < numParticles; i++) {
        particles.push(new Particle());
      }
    };

    // Connect particles with lines
    const connect = () => {
      for (let a = 0; a < particles.length; a++) {
        for (let b = a; b < particles.length; b++) {
          const distance = Math.sqrt(
            (particles[a].x - particles[b].x) ** 2 +
            (particles[a].y - particles[b].y) ** 2
          );
          if (distance < maxDistance) {
            // Use non-null assertion (!) after ctx
            ctx!.strokeStyle = `rgba(34, 211, 238, ${1 - (distance / maxDistance) * 0.8})`; // Fade lines
            ctx!.lineWidth = 0.5;
            ctx!.beginPath();
            ctx!.moveTo(particles[a].x, particles[a].y);
            ctx!.lineTo(particles[b].x, particles[b].y);
            ctx!.stroke();
          }
        }
      }
    };

    // Animation loop
    const animate = () => {
      // Use non-null assertion (!) after ctx
      ctx!.clearRect(0, 0, canvas!.width, canvas!.height); // Clear canvas
      for (let i = 0; i < particles.length; i++) {
        particles[i].update();
        particles[i].draw();
      }
      connect(); // Draw lines between close particles
      animationFrameId.current = requestAnimationFrame(animate);
    };

    // Handle canvas resizing
    const handleResize = () => {
      // Use non-null assertion (!) after canvas
      canvas!.width = window.innerWidth;
      canvas!.height = window.innerHeight;
      init(); // Re-initialize particles on resize
    };

    // Initial setup
    handleResize(); // Set initial canvas size
    init(); // Initialize particles
    animate(); // Start animation loop

    // Event listener for window resize
    window.addEventListener('resize', handleResize);

    // Cleanup function
    return () => {
      window.removeEventListener('resize', handleResize);
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
    };
  }, []); // Empty dependency array ensures this effect runs only once on mount

  return (
    <motion.canvas
      ref={canvasRef}
      className="fixed inset-0 z-0 bg-transparent" // Ensure it's fixed and behind everything
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 2, delay: 0.5 }}
    />
  );
};

export default ParticlesBackground;
