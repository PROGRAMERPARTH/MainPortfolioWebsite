/* ============================================
   Data Context — Manages skills, projects, 
   certificates with LocalStorage persistence
   ============================================ */

import { createContext, useContext, useState, useEffect, useCallback } from 'react';

const DataContext = createContext(null);

// ---- Default seed data ----
const DEFAULT_SKILLS = [
  { id: '1', name: 'Python', category: 'Programming', proficiency: 90 },
  { id: '2', name: 'JavaScript', category: 'Programming', proficiency: 85 },
  { id: '3', name: 'C++', category: 'Programming', proficiency: 75 },
  { id: '4', name: 'Java', category: 'Programming', proficiency: 70 },
  { id: '5', name: 'React.js', category: 'Web Development', proficiency: 88 },
  { id: '6', name: 'Node.js', category: 'Web Development', proficiency: 80 },
  { id: '7', name: 'Tailwind CSS', category: 'Web Development', proficiency: 92 },
  { id: '8', name: 'HTML/CSS', category: 'Web Development', proficiency: 95 },
  { id: '9', name: 'Git & GitHub', category: 'Tools & Technologies', proficiency: 88 },
  { id: '10', name: 'Docker', category: 'Tools & Technologies', proficiency: 65 },
  { id: '11', name: 'TensorFlow', category: 'Tools & Technologies', proficiency: 72 },
  { id: '12', name: 'VS Code', category: 'Tools & Technologies', proficiency: 95 },
];

const DEFAULT_PROJECTS = [
  {
    id: '1',
    title: 'AI Chatbot Platform',
    description: 'A conversational AI chatbot built with NLP pipelines, supporting multiple intents and real-time responses.',
    techStack: 'Python, Flask, TensorFlow, React',
    githubUrl: 'https://github.com',
    liveUrl: 'https://example.com',
  },
  {
    id: '2',
    title: 'E-Commerce Dashboard',
    description: 'Full-stack dashboard with analytics, sales tracking, and inventory management for online stores.',
    techStack: 'React, Node.js, MongoDB, Chart.js',
    githubUrl: 'https://github.com',
    liveUrl: 'https://example.com',
  },
  {
    id: '3',
    title: 'Portfolio Builder',
    description: 'A dynamic portfolio generator that lets users create professional portfolios with customizable sections.',
    techStack: 'React, Tailwind CSS, Framer Motion',
    githubUrl: 'https://github.com',
    liveUrl: 'https://example.com',
  },
];

const DEFAULT_CERTIFICATES = [
  {
    id: '1',
    title: 'Deep Learning Specialization',
    issuer: 'Coursera — Andrew Ng',
    description: 'Five-course specialization covering neural networks, CNNs, RNNs, and sequence models.',
    fileUrl: '#',
  },
  {
    id: '2',
    title: 'AWS Cloud Practitioner',
    issuer: 'Amazon Web Services',
    description: 'Foundational understanding of AWS Cloud concepts, services, and terminology.',
    fileUrl: '#',
  },
  {
    id: '3',
    title: 'React Developer Certificate',
    issuer: 'Meta (Coursera)',
    description: 'Professional certificate covering advanced React patterns, testing, and performance optimization.',
    fileUrl: '#',
  },
];

// ---- Helper: generate unique IDs ----
const generateId = () => Date.now().toString(36) + Math.random().toString(36).slice(2, 7);

// ---- Helper: LocalStorage read/write ----
function loadFromStorage(key, fallback) {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch {
    return fallback;
  }
}

function saveToStorage(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (e) {
    console.error('Failed to save to localStorage', e);
  }
}

// ---- Provider Component ----
export function DataProvider({ children }) {
  const [skills, setSkills] = useState(() => loadFromStorage('portfolio_skills', DEFAULT_SKILLS));
  const [projects, setProjects] = useState(() => loadFromStorage('portfolio_projects', DEFAULT_PROJECTS));
  const [certificates, setCertificates] = useState(() => loadFromStorage('portfolio_certificates', DEFAULT_CERTIFICATES));

  // Persist whenever state changes
  useEffect(() => saveToStorage('portfolio_skills', skills), [skills]);
  useEffect(() => saveToStorage('portfolio_projects', projects), [projects]);
  useEffect(() => saveToStorage('portfolio_certificates', certificates), [certificates]);

  // ---- Skills CRUD ----
  const addSkill = useCallback((skill) => {
    setSkills((prev) => [...prev, { ...skill, id: generateId() }]);
  }, []);

  const updateSkill = useCallback((id, updated) => {
    setSkills((prev) => prev.map((s) => (s.id === id ? { ...s, ...updated } : s)));
  }, []);

  const deleteSkill = useCallback((id) => {
    setSkills((prev) => prev.filter((s) => s.id !== id));
  }, []);

  // ---- Projects CRUD ----
  const addProject = useCallback((project) => {
    setProjects((prev) => [...prev, { ...project, id: generateId() }]);
  }, []);

  const updateProject = useCallback((id, updated) => {
    setProjects((prev) => prev.map((p) => (p.id === id ? { ...p, ...updated } : p)));
  }, []);

  const deleteProject = useCallback((id) => {
    setProjects((prev) => prev.filter((p) => p.id !== id));
  }, []);

  // ---- Certificates CRUD ----
  const addCertificate = useCallback((cert) => {
    setCertificates((prev) => [...prev, { ...cert, id: generateId() }]);
  }, []);

  const updateCertificate = useCallback((id, updated) => {
    setCertificates((prev) => prev.map((c) => (c.id === id ? { ...c, ...updated } : c)));
  }, []);

  const deleteCertificate = useCallback((id) => {
    setCertificates((prev) => prev.filter((c) => c.id !== id));
  }, []);

  const value = {
    skills, addSkill, updateSkill, deleteSkill,
    projects, addProject, updateProject, deleteProject,
    certificates, addCertificate, updateCertificate, deleteCertificate,
  };

  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
}

// ---- Custom Hook ----
export function useData() {
  const ctx = useContext(DataContext);
  if (!ctx) throw new Error('useData must be used within a DataProvider');
  return ctx;
}
