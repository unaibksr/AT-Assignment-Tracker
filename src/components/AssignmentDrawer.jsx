import React, { useState, useEffect, memo } from 'react';
import { X } from 'lucide-react';
import { SUBJECTS } from '../context/AssignmentContext';

const STUDENTS = ['Muhammad', 'Hadia', 'Mahveen', 'Essa'];

export const AssignmentDrawer = memo(function AssignmentDrawer({ isOpen, onClose, onSubmit, initialData = null }) {
  const [title, setTitle] = useState('');
  const [course, setCourse] = useState('');
  const [dueDate, setDueDate] = useState(() => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return tomorrow.toISOString().slice(0, 10);
  });
  const [student, setStudent] = useState('');

  useEffect(() => {
    if (initialData) {
      setTitle(initialData.title || '');
      setCourse(initialData.course || '');
      setDueDate(initialData.dueDate ? new Date(initialData.dueDate).toISOString().slice(0, 10) : '');
      setStudent(initialData.student || '');
    } else {
      resetForm();
    }
  }, [initialData, isOpen]);

  const resetForm = () => {
    setTitle('');
    setCourse('');
    setDueDate('');
    setStudent('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title || !course || !dueDate || !student) return;

    onSubmit({
      title,
      course,
      dueDate: new Date(dueDate).toISOString(),
      student,
    });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/60 backdrop-blur-sm">
      <div className="w-full max-w-lg bg-slate-900 border-t sm:border border-slate-800 rounded-t-2xl sm:rounded-2xl max-h-[90vh] overflow-y-auto p-5 shadow-2xl animate-in slide-in-from-bottom duration-200">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-bold text-slate-100">
            {initialData ? 'Edit Assignment' : 'New Assignment'}
          </h2>
          <button onClick={onClose} className="p-1 rounded-lg text-slate-400 hover:bg-slate-800">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 text-sm">
          <div>
            <label className="block font-medium text-slate-300 mb-1">Title</label>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Chapter 4 Quiz"
              className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div>
            <label className="block font-medium text-slate-300 mb-1">Subject</label>
            <select
              value={course}
              onChange={(e) => setCourse(e.target.value)}
              className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <option value="">Select subject</option>
              {SUBJECTS.map((s) => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block font-medium text-slate-300 mb-1">Student</label>
            <select
              value={student}
              onChange={(e) => setStudent(e.target.value)}
              className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <option value="">Select student</option>
              {STUDENTS.map((s) => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block font-medium text-slate-300 mb-1">Due Date</label>
            <input
              type="date"
              required
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
              className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-indigo-600 hover:bg-indigo-500 font-semibold rounded-xl text-white shadow-lg transition-colors"
          >
            {initialData ? 'Save Changes' : 'Create Assignment'}
          </button>
        </form>
      </div>
    </div>
  );
});
