import { useEffect, useRef } from 'react';

export default function CursorEffect() {
  const cursorRef = useRef(null);

  useEffect(() => {
    const cursor = cursorRef.current;
    if (!cursor) return;

    let rafId = null;
    let x = -100;
    let y = -100;
    let pending = false;

    const moveCursor = (e) => {
      x = e.clientX;
      y = e.clientY;
      if (!pending) {
        pending = true;
        rafId = requestAnimationFrame(() => {
          cursor.style.transform = `translate(calc(${x}px - 50%), calc(${y}px - 50%))`;
          pending = false;
        });
      }
    };

    document.addEventListener('mousemove', moveCursor, { passive: true });

    return () => {
      document.removeEventListener('mousemove', moveCursor);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, []);

  return <div ref={cursorRef} className="cursor-effect"></div>;
}

