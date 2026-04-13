import { useEffect, useState } from 'react';

export function AnimatedCursor() {
  const [position, setPosition] = useState({ x: -100, y: -100 });
  const [hovering, setHovering] = useState(false);

  useEffect(() => {
    const move = (event: MouseEvent) => {
      setPosition({ x: event.clientX, y: event.clientY });
    };

    const enter = () => setHovering(true);
    const leave = () => setHovering(false);

    document.addEventListener('mousemove', move);
    document.querySelectorAll('button, a, input, textarea').forEach((el) => {
      el.addEventListener('mouseenter', enter);
      el.addEventListener('mouseleave', leave);
    });

    return () => {
      document.removeEventListener('mousemove', move);
      document.querySelectorAll('button, a, input, textarea').forEach((el) => {
        el.removeEventListener('mouseenter', enter);
        el.removeEventListener('mouseleave', leave);
      });
    };
  }, []);

  return (
    <div
      className={`pointer-events-none fixed left-0 top-0 z-[1000] transition-transform duration-150 ease-out ${
        hovering ? 'scale-125 opacity-100' : 'scale-90 opacity-80'
      }`}
      style={{ transform: `translate3d(${position.x - 12}px, ${position.y - 12}px, 0)` }}
    >
      <div className="h-6 w-6 rounded-full border border-cyan-300/70 bg-cyan-300/20 shadow-[0_0_30px_rgba(34,211,238,0.48)] backdrop-blur-xl" />
    </div>
  );
}
