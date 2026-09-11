import React, { createContext, useContext, useState, useMemo, useCallback } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';

const AssignmentContext = createContext(null);

export const SUBJECTS = ['Maths', 'English', 'Urdu', 'Science', 'History', 'Geography', 'Islamiyat'];

const STUDENTS = ['Muhammad', 'Hadia', 'Mahveen', 'Essa'];

const DEFAULT_STUDENT_COLORS = {
  Muhammad: 'emerald',
  Hadia: 'orange',
  Mahveen: 'purple',
  Essa: 'rose'
};

const COLOR_MAP = {
  emerald: { bg: 'bg-emerald-500/10', border: 'border-emerald-500/30', text: 'text-emerald-400', dot: 'bg-emerald-500', borderL: 'border-l-emerald-500' },
  orange: { bg: 'bg-orange-500/10', border: 'border-orange-500/30', text: 'text-orange-400', dot: 'bg-orange-500', borderL: 'border-l-orange-500' },
  purple: { bg: 'bg-purple-500/10', border: 'border-purple-500/30', text: 'text-purple-400', dot: 'bg-purple-500', borderL: 'border-l-purple-500' },
  rose: { bg: 'bg-rose-500/10', border: 'border-rose-500/30', text: 'text-rose-400', dot: 'bg-rose-500', borderL: 'border-l-rose-500' },
  blue: { bg: 'bg-blue-500/10', border: 'border-blue-500/30', text: 'text-blue-400', dot: 'bg-blue-500', borderL: 'border-l-blue-500' },
  pink: { bg: 'bg-pink-500/10', border: 'border-pink-500/30', text: 'text-pink-400', dot: 'bg-pink-500', borderL: 'border-l-pink-500' },
  yellow: { bg: 'bg-yellow-500/10', border: 'border-yellow-500/30', text: 'text-yellow-400', dot: 'bg-yellow-500', borderL: 'border-l-yellow-500' },
  teal: { bg: 'bg-teal-500/10', border: 'border-teal-500/30', text: 'text-teal-400', dot: 'bg-teal-500', borderL: 'border-l-teal-500' },
  red: { bg: 'bg-red-500/10', border: 'border-red-500/30', text: 'text-red-400', dot: 'bg-red-500', borderL: 'border-l-red-500' },
  slate: { bg: 'bg-slate-500/10', border: 'border-slate-500/30', text: 'text-slate-400', dot: 'bg-slate-500', borderL: 'border-l-slate-500' }
};

const AVAILABLE_COLORS = Object.keys(COLOR_MAP);

const DEFAULT_ASSIGNMENTS = [
  {
    id: '1',
    title: 'CS101 Algorithm Analysis',
    course: 'Science',
    dueDate: new Date(Date.now() + 86400000).toISOString(),
    student: 'Muhammad'
  },
  {
    id: '2',
    title: 'Calculus II Integration Set',
    course: 'Maths',
    dueDate: new Date(Date.now() + 86400000 * 3).toISOString(),
    student: 'Hadia'
  },
  {
    id: '3',
    title: 'Physics Lab Report',
    course: 'Science',
    dueDate: new Date(Date.now() + 86400000 * 2).toISOString(),
    student: 'Mahveen'
  },
  {
    id: '4',
    title: 'History Essay',
    course: 'History',
    dueDate: new Date(Date.now() + 86400000 * 5).toISOString(),
    student: 'Essa'
  }
];

export function AssignmentProvider({ children }) {
  const [assignments, setAssignments] = useLocalStorage('trackit_assignments', DEFAULT_ASSIGNMENTS);
  const [studentColors, setStudentColors] = useLocalStorage('trackit_student_colors', DEFAULT_STUDENT_COLORS);

  const addAssignment = useCallback((assignment) => {
    const newAssignment = {
      ...assignment,
      id: crypto.randomUUID(),
    };
    setAssignments((prev) => [newAssignment, ...prev]);
  }, [setAssignments]);

  const updateAssignment = useCallback((id, updatedFields) => {
    setAssignments((prev) =>
      prev.map((item) => (item.id === id ? { ...item, ...updatedFields } : item))
    );
  }, [setAssignments]);

  const deleteAssignment = useCallback((id) => {
    setAssignments((prev) => prev.filter((item) => item.id !== id));
  }, [setAssignments]);

  const updateStudentColor = useCallback((student, colorKey) => {
    setStudentColors((prev) => ({
      ...prev,
      [student]: colorKey,
    }));
  }, [setStudentColors]);

  const getStudentColor = useCallback((student) => {
    return COLOR_MAP[studentColors[student]] || COLOR_MAP['emerald'];
  }, [studentColors]);

  const contextValue = useMemo(() => ({
    assignments,
    allAssignments: assignments,
    addAssignment,
    updateAssignment,
    deleteAssignment,
    studentColors,
    updateStudentColor,
    getStudentColor,
    COLOR_MAP,
    AVAILABLE_COLORS,
    STUDENTS
  }), [assignments, addAssignment, updateAssignment, deleteAssignment, studentColors, updateStudentColor, getStudentColor]);

  return (
    <AssignmentContext.Provider value={contextValue}>
      {children}
    </AssignmentContext.Provider>
  );
}

export const useAssignments = () => {
  const context = useContext(AssignmentContext);
  if (!context) throw new Error('useAssignments must be used within AssignmentProvider');
  return context;
};
