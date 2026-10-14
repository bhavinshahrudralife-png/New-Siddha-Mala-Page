import { useCallback, useEffect, useRef, useState } from 'react';
import { useLenis } from 'lenis/react';

export function useJourneyPlayback() {
  const [playing, setPlaying] = useState(false);
  const frame = useRef(0);
  const lenis = useLenis();
  const stop = useCallback(() => { cancelAnimationFrame(frame.current); setPlaying(false); }, []);
  useEffect(() => {
    if (!playing) return;
    let last;
    const step = (time) => {
      const target = document.getElementById('collection');
      const end = target ? target.getBoundingClientRect().top + window.scrollY - 95 : window.scrollY;
      if (window.scrollY >= end - 2) return stop();
      const delta = last ? Math.min(time - last, 50) : 0;
      last = time;
      const next = Math.min(window.scrollY + delta * 0.12, end);
      if (lenis) lenis.scrollTo(next, { immediate: true }); else window.scrollTo(0, next);
      frame.current = requestAnimationFrame(step);
    };
    frame.current = requestAnimationFrame(step);
    const cancelKeys = e => { if (['Escape','ArrowDown','ArrowUp','PageDown','PageUp','Home','End',' '].includes(e.key)) stop(); };
    const hidden = () => { if (document.hidden) stop(); };
    window.addEventListener('wheel', stop, { passive: true });
    window.addEventListener('touchstart', stop, { passive: true });
    window.addEventListener('keydown', cancelKeys);
    document.addEventListener('visibilitychange', hidden);
    return () => { cancelAnimationFrame(frame.current); window.removeEventListener('wheel', stop); window.removeEventListener('touchstart', stop); window.removeEventListener('keydown', cancelKeys); document.removeEventListener('visibilitychange', hidden); };
  }, [playing, lenis, stop]);
  return { playing, toggle: () => setPlaying(p => !p), stop };
}