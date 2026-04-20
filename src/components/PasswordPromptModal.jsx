/* ============================================
   Password Prompt Modal — For authentication
   ============================================ */

import { useState } from 'react';
import Modal from './Modal';
import { useData } from '../context/DataContext';
import { useTheme } from '../context/ThemeContext';
import toast from 'react-hot-toast';

export default function PasswordPromptModal({ isOpen, onClose, onSuccess }) {
  const { isDark } = useTheme();
  const { authenticate } = useData();
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (authenticate(password)) {
      toast.success('Authenticated successfully!');
      setPassword('');
      onSuccess();
    } else {
      toast.error('Incorrect password');
      setPassword('');
    }
  };

  const handleClose = () => {
    setPassword('');
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={handleClose} title="Admin Authentication">
      <form onSubmit={handleSubmit} className="space-y-4">
        <p className={`text-sm mb-4 ${isDark ? 'text-surface-200' : 'text-surface-700'}`}>
          Please enter the admin password to continue with this action.
        </p>
        <div>
          <label className={`block text-sm font-medium mb-1.5 ${isDark ? 'text-surface-200' : 'text-surface-700'}`}>
            Password
          </label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter password..."
            className={`w-full px-4 py-2.5 rounded-xl outline-none transition-all ${
              isDark
                ? 'bg-white/5 border border-white/10 text-white focus:border-primary-500'
                : 'bg-surface-50 border border-surface-200 text-surface-800 focus:border-primary-500'
            }`}
            autoFocus
          />
        </div>
        <button
          type="submit"
          className="w-full py-3 rounded-xl font-semibold text-white bg-gradient-to-r from-primary-500 to-accent-500 shadow-lg shadow-primary-500/25 hover:shadow-primary-500/40 transition-shadow cursor-pointer"
        >
          Verify
        </button>
      </form>
    </Modal>
  );
}
