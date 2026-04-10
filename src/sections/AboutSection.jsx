/* ============================================
   About Section — Professional summary
   and skill highlights
   ============================================ */

import { motion } from 'framer-motion';
import { IoCodeSlash, IoBulb, IoRocket, IoSchool } from 'react-icons/io5';
import SectionWrapper from '../components/SectionWrapper';
import { useTheme } from '../context/ThemeContext';

const HIGHLIGHTS = [
  {
    icon: <IoCodeSlash size={24} />,
    title: 'Full-Stack Dev',
    text: 'Building scalable web applications with modern frameworks.',
  },
  {
    icon: <IoBulb size={24} />,
    title: 'AI & ML',
    text: 'Designing intelligent systems with deep learning and NLP.',
  },
  {
    icon: <IoRocket size={24} />,
    title: 'Problem Solver',
    text: '500+ DSA problems solved across competitive platforms.',
  },
  {
    icon: <IoSchool size={24} />,
    title: 'Lifelong Learner',
    text: 'Constantly upskilling through courses, hackathons, and open source.',
  },
];

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.5 },
  }),
};

export default function AboutSection() {
  const { isDark } = useTheme();

  return (
    <SectionWrapper id="about" title="About Me" subtitle="A little bit about who I am and what drives me.">
      <div className="grid md:grid-cols-2 gap-10 items-start">
        {/* Left – bio text */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <p className={`text-base md:text-lg leading-relaxed mb-6 ${
            isDark ? 'text-surface-200/80' : 'text-surface-700'
          }`}>
            I'm <strong className="gradient-text">Parth Nerkar</strong>, a student
            specializing in <strong className="gradient-text">Artificial Intelligence</strong> &{' '}
            <strong className="gradient-text">Data Science</strong>, based in Pune, India. I love transforming ideas
            into real-world applications — whether it's training neural networks, crafting
            pixel-perfect UIs, or building data-driven solutions.
          </p>
          <p className={`text-base md:text-lg leading-relaxed ${
            isDark ? 'text-surface-200/80' : 'text-surface-700'
          }`}>
            When I'm not coding, you'll find me exploring research papers, contributing to
            open-source projects, or mentoring fellow students. I believe in building technology
            that solves meaningful problems and creates positive impact.
          </p>
        </motion.div>

        {/* Right – highlight cards */}
        <div className="grid grid-cols-2 gap-4">
          {HIGHLIGHTS.map((item, i) => (
            <motion.div
              key={item.title}
              custom={i}
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className={`group p-5 rounded-2xl transition-all duration-300 ${
                isDark
                  ? 'bg-white/5 hover:bg-white/10 border border-white/5 hover:border-primary-500/30'
                  : 'bg-white hover:bg-primary-50/50 border border-surface-200 hover:border-primary-300 shadow-sm'
              }`}
            >
              <div
                className={`w-10 h-10 rounded-xl flex items-center justify-center mb-3 transition-colors duration-300 ${
                  isDark
                    ? 'bg-primary-500/15 text-primary-400 group-hover:bg-primary-500/25'
                    : 'bg-primary-100 text-primary-600 group-hover:bg-primary-200'
                }`}
              >
                {item.icon}
              </div>
              <h3 className={`text-sm font-bold mb-1 ${isDark ? 'text-white' : 'text-surface-800'}`}>
                {item.title}
              </h3>
              <p className={`text-xs leading-relaxed ${isDark ? 'text-surface-200/60' : 'text-surface-700/70'}`}>
                {item.text}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </SectionWrapper>
  );
}
