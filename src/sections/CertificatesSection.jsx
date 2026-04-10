/* ============================================
   Certificates Section — Grid layout
   with Add / Edit / Delete functionality
   ============================================ */

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  IoAdd,
  IoCreateOutline,
  IoTrashOutline,
  IoRibbonOutline,
  IoOpenOutline,
} from 'react-icons/io5';
import toast from 'react-hot-toast';
import SectionWrapper from '../components/SectionWrapper';
import Modal from '../components/Modal';
import { useData } from '../context/DataContext';
import { useTheme } from '../context/ThemeContext';

const EMPTY_FORM = { title: '', issuer: '', description: '', fileUrl: '' };

export default function CertificatesSection() {
  const { isDark } = useTheme();
  const { certificates, addCertificate, updateCertificate, deleteCertificate } = useData();
  const [modalOpen, setModalOpen] = useState(false);
  const [editingCert, setEditingCert] = useState(null);
  const [form, setForm] = useState(EMPTY_FORM);

  // ---- Handlers ----
  const openAdd = () => {
    setEditingCert(null);
    setForm(EMPTY_FORM);
    setModalOpen(true);
  };

  const openEdit = (cert) => {
    setEditingCert(cert);
    setForm({ title: cert.title, issuer: cert.issuer, description: cert.description, fileUrl: cert.fileUrl });
    setModalOpen(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.title.trim()) {
      toast.error('Certificate title is required');
      return;
    }
    if (editingCert) {
      updateCertificate(editingCert.id, form);
      toast.success('Certificate updated!');
    } else {
      addCertificate(form);
      toast.success('Certificate added!');
    }
    setModalOpen(false);
  };

  const handleDelete = (id, title) => {
    deleteCertificate(id);
    toast.success(`"${title}" deleted`);
  };

  return (
    <SectionWrapper
      id="certificates"
      title="Certificates"
      subtitle="Verified credentials and professional certifications."
    >
      {/* Add button */}
      <div className="flex justify-center mb-10">
        <motion.button
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.97 }}
          onClick={openAdd}
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-white bg-gradient-to-r from-primary-500 to-accent-500 shadow-lg shadow-primary-500/25 hover:shadow-primary-500/40 transition-shadow cursor-pointer"
        >
          <IoAdd size={20} /> Add Certificate
        </motion.button>
      </div>

      {/* Certificates grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <AnimatePresence mode="popLayout">
          {certificates.map((cert, i) => (
            <motion.div
              key={cert.id}
              layout
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0, transition: { delay: i * 0.08 } }}
              exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.2 } }}
              className={`group relative flex flex-col p-6 rounded-2xl transition-all duration-300 ${
                isDark
                  ? 'bg-white/5 hover:bg-white/8 border border-white/5 hover:border-accent-500/30'
                  : 'bg-white hover:shadow-lg border border-surface-200 hover:border-accent-200'
              }`}
            >
              {/* Icon + actions */}
              <div className="flex items-start justify-between mb-4">
                <div
                  className={`w-11 h-11 rounded-xl flex items-center justify-center ${
                    isDark
                      ? 'bg-accent-500/15 text-accent-400'
                      : 'bg-accent-500/10 text-accent-600'
                  }`}
                >
                  <IoRibbonOutline size={22} />
                </div>
                <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button
                    onClick={() => openEdit(cert)}
                    className={`p-1.5 rounded-lg cursor-pointer ${
                      isDark ? 'hover:bg-white/10 text-surface-200' : 'hover:bg-surface-100 text-surface-600'
                    }`}
                    title="Edit"
                  >
                    <IoCreateOutline size={16} />
                  </button>
                  <button
                    onClick={() => handleDelete(cert.id, cert.title)}
                    className="p-1.5 rounded-lg hover:bg-danger-500/15 text-danger-500 cursor-pointer"
                    title="Delete"
                  >
                    <IoTrashOutline size={16} />
                  </button>
                </div>
              </div>

              {/* Content */}
              <h3 className={`text-base font-bold mb-1 ${isDark ? 'text-white' : 'text-surface-800'}`}>
                {cert.title}
              </h3>
              <p className={`text-sm font-medium mb-2 ${isDark ? 'text-accent-400/80' : 'text-accent-600'}`}>
                {cert.issuer}
              </p>
              <p className={`text-sm leading-relaxed flex-1 ${
                isDark ? 'text-surface-200/60' : 'text-surface-700/70'
              }`}>
                {cert.description}
              </p>

              {/* View button */}
              {cert.fileUrl && (
                <a
                  href={cert.fileUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`mt-4 inline-flex items-center gap-1.5 text-sm font-medium transition-colors ${
                    isDark ? 'text-accent-400 hover:text-accent-300' : 'text-accent-600 hover:text-accent-500'
                  }`}
                >
                  <IoOpenOutline size={15} /> View Certificate
                </a>
              )}
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {certificates.length === 0 && (
        <p className={`text-center mt-8 ${isDark ? 'text-surface-200/50' : 'text-surface-700/50'}`}>
          No certificates yet. Add one above!
        </p>
      )}

      {/* Add / Edit Modal */}
      <Modal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        title={editingCert ? 'Edit Certificate' : 'Add New Certificate'}
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Title */}
          <div>
            <label className={`block text-sm font-medium mb-1.5 ${isDark ? 'text-surface-200' : 'text-surface-700'}`}>
              Certificate Title
            </label>
            <input
              type="text"
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              placeholder="e.g. Deep Learning Specialization"
              className={`w-full px-4 py-2.5 rounded-xl outline-none transition-all ${
                isDark
                  ? 'bg-white/5 border border-white/10 text-white focus:border-primary-500 placeholder:text-surface-200/30'
                  : 'bg-surface-50 border border-surface-200 text-surface-800 focus:border-primary-500 placeholder:text-surface-700/40'
              }`}
              autoFocus
            />
          </div>

          {/* Issuer */}
          <div>
            <label className={`block text-sm font-medium mb-1.5 ${isDark ? 'text-surface-200' : 'text-surface-700'}`}>
              Issuer Name
            </label>
            <input
              type="text"
              value={form.issuer}
              onChange={(e) => setForm({ ...form, issuer: e.target.value })}
              placeholder="e.g. Coursera"
              className={`w-full px-4 py-2.5 rounded-xl outline-none transition-all ${
                isDark
                  ? 'bg-white/5 border border-white/10 text-white focus:border-primary-500 placeholder:text-surface-200/30'
                  : 'bg-surface-50 border border-surface-200 text-surface-800 focus:border-primary-500 placeholder:text-surface-700/40'
              }`}
            />
          </div>

          {/* Description */}
          <div>
            <label className={`block text-sm font-medium mb-1.5 ${isDark ? 'text-surface-200' : 'text-surface-700'}`}>
              Description
            </label>
            <textarea
              rows={3}
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
              placeholder="Short description…"
              className={`w-full px-4 py-2.5 rounded-xl outline-none transition-all resize-none ${
                isDark
                  ? 'bg-white/5 border border-white/10 text-white focus:border-primary-500 placeholder:text-surface-200/30'
                  : 'bg-surface-50 border border-surface-200 text-surface-800 focus:border-primary-500 placeholder:text-surface-700/40'
              }`}
            />
          </div>

          {/* File URL */}
          <div>
            <label className={`block text-sm font-medium mb-1.5 ${isDark ? 'text-surface-200' : 'text-surface-700'}`}>
              File URL <span className={`font-normal ${isDark ? 'text-surface-200/40' : 'text-surface-700/40'}`}>(PDF / Image)</span>
            </label>
            <input
              type="url"
              value={form.fileUrl}
              onChange={(e) => setForm({ ...form, fileUrl: e.target.value })}
              placeholder="https://…"
              className={`w-full px-4 py-2.5 rounded-xl outline-none transition-all ${
                isDark
                  ? 'bg-white/5 border border-white/10 text-white focus:border-primary-500 placeholder:text-surface-200/30'
                  : 'bg-surface-50 border border-surface-200 text-surface-800 focus:border-primary-500 placeholder:text-surface-700/40'
              }`}
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 rounded-xl font-semibold text-white bg-gradient-to-r from-primary-500 to-accent-500 shadow-lg shadow-primary-500/25 hover:shadow-primary-500/40 transition-shadow cursor-pointer"
          >
            {editingCert ? 'Save Changes' : 'Add Certificate'}
          </button>
        </form>
      </Modal>
    </SectionWrapper>
  );
}
