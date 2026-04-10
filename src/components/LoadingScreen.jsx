/* ============================================
   Loading Screen — Shown on initial app load
   ============================================ */

import { motion } from 'framer-motion';

export default function LoadingScreen() {
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-surface-900">
      {/* Pulsing rings */}
      <div className="relative flex items-center justify-center">
        {[0, 1, 2].map((i) => (
          <motion.div
            key={i}
            className="absolute rounded-full border-2 border-primary-500/40"
            style={{ width: 60 + i * 40, height: 60 + i * 40 }}
            animate={{
              scale: [1, 1.3, 1],
              opacity: [0.6, 0.1, 0.6],
            }}
            transition={{
              duration: 1.8,
              repeat: Infinity,
              delay: i * 0.3,
              ease: 'easeInOut',
            }}
          />
        ))}
        {/* Center dot */}
        <motion.div
          className="w-5 h-5 rounded-full bg-gradient-to-br from-primary-400 to-accent-400"
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 0.9, repeat: Infinity, ease: 'easeInOut' }}
        />
      </div>

      {/* Loading text */}
      <motion.p
        className="absolute bottom-1/3 text-sm font-medium tracking-widest text-surface-200/60 uppercase"
        animate={{ opacity: [0.4, 1, 0.4] }}
        transition={{ duration: 1.8, repeat: Infinity }}
      >
        Loading…
      </motion.p>
    </div>
  );
}
