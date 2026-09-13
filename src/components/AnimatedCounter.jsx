import { useRef, useEffect, useState } from 'react';

function formatValue(value, decimals) {
  if (decimals > 0) return value.toFixed(decimals);
  return Math.round(value).toLocaleString();
}

export default function AnimatedCounter({ end, decimals = 0, duration = 1600, prefix = '', suffix = '' }) {
  const ref = useRef(null);
  const [value, setValue] = useState(0);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (!('IntersectionObserver' in window)) {
      setValue(end);
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setStarted(true);
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.5 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [end]);

  useEffect(() => {
    if (!started) return;
    let raf;
    const t0 = performance.now();
    const tick = (now) => {
      const p = Math.min(1, (now - t0) / duration);
      const eased = 1 - Math.pow(1 - p, 3);
      setValue(end * eased);
      if (p < 1) raf = requestAnimationFrame(tick);
      else setValue(end);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [started, end, duration]);

  return (
    <span ref={ref}>
      {prefix}
      {formatValue(value, decimals)}
      {suffix}
    </span>
  );
}