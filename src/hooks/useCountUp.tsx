import {useState } from 'react';

interface CountUpOptions {
  start?: number;
  end: number;
  duration?: number;
  decimals?: number;
  suffix?: string;
  prefix?: string;
}

export function useCountUp(options: CountUpOptions) {
  const {
    start = 0,
    end,
    duration = 2000,
    decimals = 0,
    suffix = '',
    prefix = ''
  } = options;

  const [count, setCount] = useState(start);
  const [isAnimating, setIsAnimating] = useState(false);

  const startAnimation = () => {
    if (isAnimating) return;
    setIsAnimating(true);

    const startTime = Date.now();
    const range = end - start;

    const animate = () => {
      const now = Date.now();
      const progress = Math.min((now - startTime) / duration, 1);
      
      // Easing function (ease-out)
      const easeOut = 1 - Math.pow(1 - progress, 3);
      const current = start + range * easeOut;

      setCount(current);

      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        setIsAnimating(false);
      }
    };

    requestAnimationFrame(animate);
  };

  const formattedValue = `${prefix}${count.toFixed(decimals)}${suffix}`;

  return { count, formattedValue, startAnimation, isAnimating };
}
