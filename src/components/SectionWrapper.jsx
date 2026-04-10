/* ============================================
   Section Wrapper — Consistent section layout
   with scroll-reveal animation
   ============================================ */

import { motion } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';

export default function SectionWrapper({ id, title, subtitle, children, className = '' }) {
  const { isDark } = useTheme();

  return (
    <section id={id} className={`relative py-20 md:py-28 px-4 ${className}`}>
      <div className="mx-auto max-w-6xl">
        {/* Section header */}
        {title && (
          <motion.div
            className="text-center mb-14"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold gradient-text inline-block mb-3">
              {title}
            </h2>
            {subtitle && (
              <p className={`text-base md:text-lg max-w-2xl mx-auto ${
                isDark ? 'text-surface-200/70' : 'text-surface-700/70'
              }`}>
                {subtitle}
              </p>
            )}
            {/* Decorative line */}
            <div className="mt-4 mx-auto w-20 h-1 rounded-full bg-gradient-to-r from-primary-500 to-accent-500" />
          </motion.div>
        )}

        {children}
      </div>
    </section>
  );
}
