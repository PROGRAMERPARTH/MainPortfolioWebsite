/* ============================================
   Hero Section — Landing area with name,
   tagline, CTAs, and animated background
   ============================================ */

import { motion } from 'framer-motion';
import { IoArrowDown, IoDownloadOutline } from 'react-icons/io5';
import { useTheme } from '../context/ThemeContext';
import { useData } from '../context/DataContext';
import { generateResume } from '../utils/generateResume';

export default function HeroSection() {
  const { isDark } = useTheme();
  const { skills, projects, certificates } = useData();

  const handleDownload = (e) => {
    e.preventDefault();
    generateResume(skills, projects, certificates);
  };

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden px-4"
    >
      {/* Animated gradient orbs */}
      <div className="pointer-events-none absolute inset-0">
        <motion.div
          className="absolute -top-32 -left-32 w-[500px] h-[500px] rounded-full bg-primary-500/20 blur-[120px]"
          animate={{ x: [0, 60, 0], y: [0, 40, 0] }}
          transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute -bottom-32 -right-32 w-[500px] h-[500px] rounded-full bg-accent-500/20 blur-[120px]"
          animate={{ x: [0, -50, 0], y: [0, -30, 0] }}
          transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] rounded-full bg-primary-600/10 blur-[100px]"
          animate={{ scale: [1, 1.3, 1] }}
          transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
        />
      </div>

      {/* Subtle grid overlay in dark mode */}
      {isDark && (
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)',
            backgroundSize: '60px 60px',
          }}
        />
      )}

      {/* Content */}
      <div className="relative z-10 text-center max-w-3xl">
        {/* Greeting badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          <span
            className={`inline-block px-4 py-1.5 rounded-full text-sm font-medium mb-6 ${
              isDark
                ? 'bg-primary-500/15 text-primary-300 border border-primary-500/20'
                : 'bg-primary-50 text-primary-600 border border-primary-200'
            }`}
          >
            👋 Hello, welcome to my portfolio
          </span>
        </motion.div>

        {/* Name */}
        <motion.h1
          className={`text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold leading-tight mb-4 ${
            isDark ? 'text-white' : 'text-surface-900'
          }`}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35, duration: 0.6 }}
        >
          Hi, I'm{' '}
          <span className="gradient-text">Parth Nerkar</span>
        </motion.h1>

        {/* Tagline */}
        <motion.p
          className={`text-lg md:text-xl max-w-xl mx-auto mb-8 ${
            isDark ? 'text-surface-200/70' : 'text-surface-700'
          }`}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.6 }}
        >
          AI & Data Science Student based in Pune — passionate about building
          intelligent systems, data-driven solutions, and impactful projects.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.65, duration: 0.6 }}
        >
          <a
            href="#projects"
            className="group relative inline-flex items-center gap-2 px-7 py-3.5 rounded-xl font-semibold text-white bg-gradient-to-r from-primary-500 to-accent-500 shadow-lg shadow-primary-500/25 hover:shadow-primary-500/40 transition-shadow duration-300"
          >
            View Projects
            <IoArrowDown className="group-hover:translate-y-0.5 transition-transform" />
          </a>
          <a
            href="#resume"
            onClick={handleDownload}
            className={`inline-flex items-center gap-2 px-7 py-3.5 rounded-xl font-semibold border transition-colors duration-300 ${
              isDark
                ? 'border-white/15 text-surface-200 hover:bg-white/8'
                : 'border-surface-200 text-surface-700 hover:bg-surface-100'
            }`}
          >
            <IoDownloadOutline size={18} />
            Download Resume
          </a>
        </motion.div>

        {/* Profile image placeholder - a stylized avatar circle */}
        <motion.div
          className="mt-12 flex justify-center"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.8, duration: 0.6, type: 'spring' }}
        >
          <div className="relative">
            <div
              className={`w-28 h-28 md:w-36 md:h-36 rounded-full overflow-hidden glow ${
                isDark ? 'ring-2 ring-primary-500/30' : 'ring-2 ring-primary-200'
              }`}
            >
              {/* Gradient avatar placeholder */}
              <div className="w-full h-full bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center text-white text-4xl md:text-5xl font-bold select-none">
                PN
              </div>
            </div>
            {/* Status dot */}
            <span className="absolute bottom-1 right-1 w-5 h-5 bg-success-500 rounded-full ring-4 ring-surface-900" />
          </div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <IoArrowDown className={`text-2xl ${isDark ? 'text-surface-200/40' : 'text-surface-700/40'}`} />
      </motion.div>
    </section>
  );
}
