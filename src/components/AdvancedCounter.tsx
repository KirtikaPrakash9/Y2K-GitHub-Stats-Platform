'use client';

import { motion, useSpring, useTransform, useInView, useMotionValue, useMotionTemplate } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';

interface GlitchCounterProps {
  value: number;
  duration?: number;
  className?: string;
  color?: string;
}

export function GlitchCounter({ value, duration = 2, className = '', color = '#00ffff' }: GlitchCounterProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true });
  const [displayValue, setDisplayValue] = useState(0);
  const [isGlitching, setIsGlitching] = useState(false);

  const spring = useSpring(0, { duration: duration * 1000 });
  const display = useTransform(spring, (latest) => Math.round(latest));
  const glitchChars = '!@#$%^&*()_+-=[]{}|;:,.<>?';

  useEffect(() => {
    if (isInView) {
      spring.set(value);
      
      // Glitch effect periodically
      const glitchInterval = setInterval(() => {
        setIsGlitching(true);
        const randomChars = Array.from({ length: 5 }, () => 
          glitchChars[Math.floor(Math.random() * glitchChars.length)]
        ).join('');
        setDisplayValue(parseInt(randomChars) || 0);
        
        setTimeout(() => {
          setIsGlitching(false);
        }, 100);
      }, 3000);

      return () => clearInterval(glitchInterval);
    }
  }, [isInView, value, spring]);

  useEffect(() => {
    const unsubscribe = display.on('change', (latest) => {
      if (!isGlitching) {
        setDisplayValue(latest);
      }
    });
    return unsubscribe;
  }, [display, isGlitching]);

  return (
    <motion.span
      ref={ref}
      className={`relative inline-block ${className}`}
      style={{
        color,
        textShadow: isGlitching ? `2px 0 ${color}, -2px 0 ${color}` : `0 0 20px ${color}`,
      }}
      animate={isGlitching ? { x: [-2, 2, -2, 0] } : {}}
    >
      {displayValue.toLocaleString()}
    </motion.span>
  );
}

interface PulseCounterProps {
  value: number;
  duration?: number;
  className?: string;
}

export function PulseCounter({ value, duration = 2, className = '' }: PulseCounterProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true });
  const spring = useSpring(0, { duration: duration * 1000 });
  const display = useTransform(spring, (latest) => Math.round(latest).toLocaleString());

  useEffect(() => {
    if (isInView) {
      spring.set(value);
    }
  }, [isInView, value, spring]);

  return (
    <span ref={ref} className={className}>
      <motion.span>{display}</motion.span>
    </span>
  );
}

interface TypewriterTextProps {
  text: string;
  className?: string;
  delay?: number;
}

export function TypewriterText({ text, className = '', delay = 0 }: TypewriterTextProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true });
  const [displayText, setDisplayText] = useState('');
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (!isInView) return;

    const timeout = setTimeout(() => {
      if (index < text.length) {
        setDisplayText(text.slice(0, index + 1));
        setIndex(index + 1);
      }
    }, 30);

    return () => clearTimeout(timeout);
  }, [isInView, index, text]);

  return (
    <span ref={ref} className={className}>
      {displayText}
      {isInView && index < text.length && (
        <motion.span
          animate={{ opacity: [1, 0] }}
          transition={{ duration: 0.5, repeat: Infinity }}
          className="inline-block w-0.5 h-1em bg-current ml-0.5 align-middle"
        />
      )}
    </span>
  );
}
