import React, { useState } from 'react';
import { useAssignments } from '../context/AssignmentContext';

const COLOR_OPTIONS = [
  { key: 'emerald', label: 'Emerald', preview: 'bg-emerald-500' },
  { key: 'orange', label: 'Orange', preview: 'bg-orange-500' },
  { key: 'purple', label: 'Purple', preview: 'bg-purple-500' },
  { key: 'rose', label: 'Rose', preview: 'bg-rose-500' },
  { key: 'blue', label: 'Blue', preview: 'bg-blue-500' },
  { key: 'pink', label: 'Pink', preview: 'bg-pink-500' },
  { key: 'yellow', label: 'Yellow', preview: 'bg-yellow-500' },
  { key: 'teal', label: 'Teal', preview: 'bg-teal-500' },
  { key: 'red', label: 'Red', preview: 'bg-red-500' },
  { key: 'slate', label: 'Slate', preview: 'bg-slate-500' },
];

export const StudentsView = React.memo(function StudentsView() {
  const { STUDENTS, studentColors, updateStudentColor, getStudentColor } = useAssignments();
  const [editingStudent, setEditingStudent] = useState(null);

  return (
    <div className="space-y-4 pb-24">
      <h2 className="text-sm font-bold text-slate-300 uppercase tracking-wider">Students</h2>
      <div className="space-y-3">
        {STUDENTS.map((student) => {
          const currentColor = studentColors[student] || 'emerald';
          const colorData = getStudentColor(student);

          return (
            <div
              key={student}
              className={`${colorData.bg} border ${colorData.border} border-l-4 rounded-xl p-4`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className={`w-4 h-4 rounded-full ${colorData.dot}`} />
                  <span className={`font-semibold text-sm ${colorData.text}`}>{student}</span>
                </div>
                <button
                  onClick={() => setEditingStudent(editingStudent === student ? null : student)}
                  className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-lg text-xs font-medium text-slate-200 transition-colors"
                >
                  {editingStudent === student ? 'Cancel' : 'Change Color'}
                </button>
              </div>

              {editingStudent === student && (
                <div className="mt-4 pt-4 border-t border-slate-700/50">
                  <p className="text-xs text-slate-400 mb-2">Select color for {student}</p>
                  <div className="flex flex-wrap gap-2">
                    {COLOR_OPTIONS.map((color) => (
                      <button
                        key={color.key}
                        onClick={() => updateStudentColor(student, color.key)}
                        className={`w-8 h-8 rounded-full ${color.preview} border-2 ${
                          currentColor === color.key ? 'border-white scale-110' : 'border-transparent'
                        } transition-all hover:scale-110`}
                        title={color.label}
                      />
                    ))}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
});
