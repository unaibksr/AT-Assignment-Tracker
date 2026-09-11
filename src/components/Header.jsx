import React from 'react';
import { BookOpen } from 'lucide-react';
import { useAssignments } from '../context/AssignmentContext';

export const Header = React.memo(function Header() {
  const { allAssignments } = useAssignments();

  return (
    <header className="sticky top-0 z-20 bg-slate-900/80 backdrop-blur-md border-b border-slate-800 pt-safe px-4 py-3">
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <div className="p-2 bg-indigo-600 rounded-xl">
            <BookOpen className="w-5 h-5 text-white" />
          </div>
          <h1 className="font-bold text-lg text-white tracking-tight">Assignment Tracker</h1>
        </div>

        <div className="flex items-center gap-2 bg-slate-800/80 px-3 py-1.5 rounded-full border border-slate-700">
          <span className="text-xs font-semibold text-slate-200">
            {allAssignments.length} {allAssignments.length === 1 ? 'assignment' : 'assignments'}
          </span>
        </div>
      </div>
    </header>
  );
});
