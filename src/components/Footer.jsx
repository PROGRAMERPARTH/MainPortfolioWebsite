/* ============================================
   Footer — Simple footer with branding
   ============================================ */

import { IoHeartSharp } from 'react-icons/io5';
import { useTheme } from '../context/ThemeContext';

export default function Footer() {
  const { isDark } = useTheme();
  const year = new Date().getFullYear();

  return (
    <footer
      className={`py-8 px-4 text-center border-t ${
        isDark ? 'border-white/5 bg-surface-900/50' : 'border-surface-200 bg-surface-50'
      }`}
    >
      <p className={`text-sm ${isDark ? 'text-surface-200/50' : 'text-surface-700/50'}`}>
        © {year} Parth Nerkar. Built with{' '}
        <IoHeartSharp className="inline text-danger-500 mx-0.5" size={14} />
        {' '}using React & Tailwind CSS.
      </p>
    </footer>
  );
}
