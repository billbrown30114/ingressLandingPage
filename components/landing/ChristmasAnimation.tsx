"use client";

import { useEffect, useRef } from "react";

export function ChristmasAnimation() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Set canvas size to match container exactly
    const resizeToContainer = () => {
      if (!canvas || !container) return;
      canvas.width = container.clientWidth;
      canvas.height = container.clientHeight;
    };
    resizeToContainer();
    window.addEventListener("resize", resizeToContainer);

    // Particle tree config
    const particles: Array<{
      x: number;
      y: number;
      targetX: number;
      targetY: number;
      size: number;
      speed: number;
      opacity: number;
    }> = [];

    const snowflakes: Array<{
      x: number;
      y: number;
      radius: number;
      speed: number;
      drift: number;
    }> = [];

    const maxParticles = 400;
    const maxSnow = 150;

    function createParticles() {
      if (!canvas) return;
      particles.length = 0;

      for (let i = 0; i < maxParticles; i++) {
        const progress = i / maxParticles;
        const targetHeight = progress * canvas.height * 0.9;
        const spread = (canvas.height - targetHeight) * 0.018;

        particles.push({
          // START at bottom (off‑screen)
          x: canvas.width / 2 + (Math.random() - 0.5) * 20,
          y: canvas.height + Math.random() * 50,

          // TARGET is the real tree shape
          targetX: canvas.width / 2 + (Math.random() - 0.5) * spread * 40,
          targetY: canvas.height - targetHeight,

          size: Math.random() * 2 + 1,
          speed: Math.random() * 0.5 + 0.3,
          opacity: Math.random() * 0.7 + 0.3,
        });
      }
    }

    function createSnow() {
      if (!canvas) return;
      snowflakes.length = 0;
      for (let i = 0; i < maxSnow; i++) {
        snowflakes.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          radius: Math.random() * 2 + 1,
          speed: Math.random() * 0.7 + 0.3,
          drift: Math.random() * 0.5 - 0.25,
        });
      }
    }

    createParticles();
    createSnow();

    function drawParticles() {
      if (!ctx || !canvas) return;
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        ctx.beginPath();
        ctx.fillStyle = `rgba(255, 215, 140, ${p.opacity})`;
        ctx.shadowColor = "gold";
        ctx.shadowBlur = 8;
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();

        const dx = p.targetX - p.x;
        const dy = p.targetY - p.y;

        // Move toward target
        p.x += dx * 0.02;
        p.y += dy * 0.02;

        // Add subtle swirling
        p.x += Math.sin(p.y * 0.03) * 0.2;

        // If particle reaches target, add tiny hover motion
        if (Math.abs(dy) < 1 && Math.abs(dx) < 1) {
          p.y += Math.sin(Date.now() * 0.002 + i) * 0.1;
        }
      }
    }

    function drawSnow() {
      if (!ctx || !canvas) return;
      ctx.shadowBlur = 0;

      for (let s of snowflakes) {
        ctx.beginPath();
        ctx.fillStyle = "rgba(255, 255, 255, 0.8)";
        ctx.arc(s.x, s.y, s.radius, 0, Math.PI * 2);
        ctx.fill();

        s.y += s.speed;
        s.x += s.drift;

        if (s.y > canvas.height) {
          s.y = -5;
          s.x = Math.random() * canvas.width;
        }
      }
    }

    function drawText() {
      if (!ctx || !canvas) return;
      
      const time = Date.now() * 0.001;
      const fontSize = Math.max(32, canvas.width * 0.08);
      const centerX = canvas.width / 2;
      const centerY = canvas.height * 0.15;
      
      // Set font
      ctx.font = `bold ${fontSize}px Arial, sans-serif`;
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      
      // Animated glow effect
      const glowIntensity = 0.7 + Math.sin(time * 2) * 0.3;
      
      // Draw text shadow/glow (multiple layers for glow effect)
      ctx.shadowColor = "rgba(255, 215, 0, 0.8)";
      ctx.shadowBlur = 20 * glowIntensity;
      
      // Outer glow layers
      for (let i = 0; i < 3; i++) {
        ctx.fillStyle = `rgba(255, 215, 0, ${0.3 * glowIntensity / (i + 1)})`;
        ctx.fillText("Merry Christmas", centerX, centerY);
      }
      
      // Main text with gradient
      const gradient = ctx.createLinearGradient(centerX - 200, centerY - 30, centerX + 200, centerY + 30);
      gradient.addColorStop(0, "#FFD700"); // Gold
      gradient.addColorStop(0.5, "#FFA500"); // Orange
      gradient.addColorStop(1, "#FFD700"); // Gold
      
      ctx.shadowBlur = 15 * glowIntensity;
      ctx.fillStyle = gradient;
      ctx.fillText("Merry Christmas", centerX, centerY);
      
      // Add sparkle effect
      ctx.shadowBlur = 0;
      for (let i = 0; i < 5; i++) {
        const sparkleX = centerX + Math.sin(time * 2 + i) * 150;
        const sparkleY = centerY + Math.cos(time * 1.5 + i) * 20;
        const sparkleSize = 2 + Math.sin(time * 3 + i) * 1;
        ctx.fillStyle = `rgba(255, 255, 255, ${0.8 + Math.sin(time * 4 + i) * 0.2})`;
        ctx.beginPath();
        ctx.arc(sparkleX, sparkleY, sparkleSize, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    // Recreate particles on resize
    const handleResize = () => {
      if (!canvas || !container) return;
      resizeToContainer();
      createParticles();
      createSnow();
    };
    window.addEventListener("resize", handleResize);

    // Use ResizeObserver for better resize handling
    const resizeObserver = new ResizeObserver(() => {
      if (!canvas || !container) return;
      resizeToContainer();
      createParticles();
      createSnow();
    });
    
    resizeObserver.observe(container);

    // Animation loop
    let animationId: number;
    const animate = () => {
      if (!canvas || !ctx) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      drawParticles();
      drawSnow();
      drawText();
      animationId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("resize", handleResize);
      resizeObserver.unobserve(container);
      cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <div 
      ref={containerRef}
      className="relative w-full h-full" 
      style={{
      background: 'radial-gradient(circle, #00204A 0%, #000014 80%)',
      }}
    >
      <canvas
        ref={canvasRef}
        className="absolute top-0 left-0 w-full h-full"
        style={{ 
          pointerEvents: "none",
        }}
      />
    </div>
  );
}
