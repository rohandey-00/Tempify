// WindCompass.

import { useEffect, useState } from "react";
import { motion, useAnimation } from "framer-motion";
import "../styles/IndexWind.css";

export default function WindCompass({degree}){
   if (!degree) {
    return null;
  }

  const [shake, setShake] = useState(0);
  const controls = useAnimation();

  useEffect(() => {
    controls.start({ rotate: degree + shake });
  }, [degree, shake, controls]);

  useEffect(() => {
    const interval = setInterval(() => {
      const randomShake = (Math.random() - 0.5) * 4;
      setShake(randomShake);
    }, 300);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="compass-container">
      <div className="compass-markers">
        <span className="compass-label top">N</span>
        <span className="compass-label bottom">S</span>
        <span className="compass-label left">W</span>
        <span className="compass-label right">E</span>
        {[...Array(60)].map((_, i) => (
          <div
            key={i}
            className="tick-mark"
            style={{ transform: `rotate(${i * 6}deg) translateY(-5.6rem)` }}
          />
        ))}
      </div>

      <motion.div
        className="needle-wrapper"
        animate={controls}
        transition={{ type: "spring", stiffness: 100, damping: 10 }}
        style={{ transformOrigin: 'center' }}
      >
        <svg width="18" height="120" viewBox="0 0 18 120" className="needle-svg">
          <defs>
            <linearGradient id="needleGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="red" />
              <stop offset="50%" stopColor="black" />
              <stop offset="100%" stopColor="black" />
            </linearGradient>
          </defs>
          <polygon
            points="9,0 13,60 9,120 5,60"
            fill="url(#needleGradient)"
          />
        </svg>
      </motion.div>

      <div className="compass-center">
        <div className="compass-dot" />
      </div>
    </div>
  );
};

