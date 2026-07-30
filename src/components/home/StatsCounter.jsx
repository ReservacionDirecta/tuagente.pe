import React, { useState, useEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const StatsCounter = ({ icon, target, label }) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  
  useEffect(() => {
    if (isInView) {
      const duration = 2000;
      const steps = 60;
      const increment = target / steps;
      let current = 0;
      
      const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
          setCount(target);
          clearInterval(timer);
        } else {
          setCount(Math.floor(current));
        }
      }, duration / steps);
      
      return () => clearInterval(timer);
    }
  }, [isInView, target]);
  
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5 }}
      className="text-center p-6"
    >
      <div className="w-16 h-16 bg-primary bg-opacity-10 rounded-full flex items-center justify-center mx-auto mb-4">
        <span className="text-3xl">{icon}</span>
      </div>
      
      <motion.span
        className="text-4xl font-bold text-primary block"
        animate={isInView ? { opacity: 1 } : {}}
      >
        {count}
      </motion.span>
      
      <span className="text-gray-600 mt-2 block">{label}</span>
    </motion.div>
  );
};

export default StatsCounter;
