"use client";

import { useEffect, useRef } from "react";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  decay: number;
  size: number;
  hue: number;
}

export default function CursorTrail() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const animRef = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const onMove = (e: MouseEvent) => {
      for (let i = 0; i < 4; i++) {
        particlesRef.current.push({
          x: e.clientX + (Math.random() - 0.5) * 12,
          y: e.clientY + (Math.random() - 0.5) * 12,
          vx: (Math.random() - 0.5) * 1.8,
          vy: -Math.random() * 2.5 - 0.5,
          life: 1,
          decay: 0.02 + Math.random() * 0.03,
          size: 2 + Math.random() * 4,
          hue: Math.random() > 0.55 ? 42 : 0,
        });
        if (particlesRef.current.length > 100) {
          particlesRef.current.shift();
        }
      }
    };
    window.addEventListener("mousemove", onMove);

    const draw = () => {
      const ctx = canvas.getContext("2d");
      if (!ctx) {
        animRef.current = requestAnimationFrame(draw);
        return;
      }
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particlesRef.current = particlesRef.current.filter((p) => p.life > 0);

      for (const p of particlesRef.current) {
        p.x += p.vx;
        p.y += p.vy;
        p.vy += 0.09;
        p.vx *= 0.98;
        p.life -= p.decay;

        const a = Math.max(0, p.life);
        ctx.beginPath();
        ctx.arc(p.x, p.y, Math.max(0.1, p.size * a), 0, Math.PI * 2);
        ctx.fillStyle = `hsla(${p.hue}, 90%, 58%, ${a * 0.75})`;
        ctx.fill();
      }

      animRef.current = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(animRef.current);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none"
      style={{ zIndex: 40 }}
    />
  );
}
