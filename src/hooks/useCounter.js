import { useState, useEffect, useRef } from 'react';

const useCounter = (target, options = {}) => {
  const {
    duration = 2000,
    startOnView = true,
    startValue = 0,
  } = options;

  const [count, setCount] = useState(startValue);
  const [isAnimating, setIsAnimating] = useState(false);
  const ref = useRef(null);
  const hasStarted = useRef(false);

  const startCounting = () => {
    if (hasStarted.current) return;
    hasStarted.current = true;
    setIsAnimating(true);

    const steps = 60;
    const increment = (target - startValue) / steps;
    let current = startValue;
    const stepDuration = duration / steps;

    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        setCount(target);
        clearInterval(timer);
        setIsAnimating(false);
      } else {
        setCount(Math.floor(current));
      }
    }, stepDuration);

    return () => clearInterval(timer);
  };

  useEffect(() => {
    if (!startOnView) {
      startCounting();
      return;
    }

    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          startCounting();
          observer.unobserve(element);
        }
      },
      { threshold: 0.1 }
    );

    observer.observe(element);

    return () => {
      observer.unobserve(element);
    };
  }, [target, duration, startOnView, startValue]);

  const reset = () => {
    setCount(startValue);
    hasStarted.current = false;
    setIsAnimating(false);
  };

  return {
    count,
    isAnimating,
    ref,
    reset,
  };
};

export default useCounter;
