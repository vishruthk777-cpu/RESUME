import { useEffect, useRef } from 'react';

type Particle = {
  x: number;
  y: number;
  z: number;
  radius: number;
  angle: number;
  speed: number;
  size: number;
  opacity: number;
};

export function HeroCanvas() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const particlesRef = useRef<Particle[]>([]);
  const animationRef = useRef<number>();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const context = canvas.getContext('2d');
    if (!context) return;

    const dpr = window.devicePixelRatio || 1;

    const resize = () => {
      const { width, height } = canvas.getBoundingClientRect();
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      context.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const initParticles = () => {
      const count = 88;
      const { width, height } = canvas.getBoundingClientRect();
      const baseRadius = Math.min(width, height) / 3;
      particlesRef.current = Array.from({ length: count }, () => ({
        x: 0,
        y: 0,
        z: 0,
        radius: baseRadius * (0.55 + Math.random() * 0.45),
        angle: Math.random() * Math.PI * 2,
        speed: 0.0009 + Math.random() * 0.0018,
        size: 1 + Math.random() * 2.8,
        opacity: 0.08 + Math.random() * 0.2
      }));
    };

    const draw = (time: number) => {
      const { width, height } = canvas.getBoundingClientRect();
      context.clearRect(0, 0, width, height);
      const centerX = width / 2;
      const centerY = height / 2;
      const perspectiveStrength = 300;

      particlesRef.current.forEach((particle) => {
        particle.angle += particle.speed;
        particle.z = Math.sin(particle.angle * 1.3) * 48;
        particle.x = Math.cos(particle.angle * 0.9) * particle.radius;
        particle.y = Math.sin(particle.angle * 0.7) * particle.radius * 0.55;

        const depth = perspectiveStrength / (perspectiveStrength + particle.z);
        const px = centerX + particle.x * depth;
        const py = centerY + particle.y * depth;
        const size = particle.size * depth * 1.8;

        context.beginPath();
        context.fillStyle = `rgba(56, 189, 248, ${particle.opacity * depth})`;
        context.arc(px, py, size, 0, Math.PI * 2);
        context.fill();
      });
    };

    const loop = (timestamp: number) => {
      draw(timestamp);
      animationRef.current = requestAnimationFrame(loop);
    };

    resize();
    initParticles();
    animationRef.current = requestAnimationFrame(loop);
    window.addEventListener('resize', resize);

    return () => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return <canvas ref={canvasRef} className="pointer-events-none absolute inset-0 h-full w-full opacity-80" />;
}
