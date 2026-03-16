'use client';

import { motion } from 'framer-motion';

interface RevealWrapperProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}

export default function RevealWrapper({ children, className, delay }: RevealWrapperProps) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ duration: 0.7, delay: delay ?? 0, ease: 'easeOut' }}
    >
      {children}
    </motion.div>
  );
}
