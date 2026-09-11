import React from 'react';
import { Edit, Trash2 } from 'lucide-react';
import { differenceInDays, isPast, startOfDay } from 'date-fns';
import { useAssignments } from '../context/AssignmentContext';

export const QuickActionCard = React.memo(function QuickActionCard({ assignment, onEdit, onDelete }) {
  const { getStudentColor } = useAssignments();
  const colors = getStudentColor(assignment.student);

  const due = startOfDay(new Date(assignment.dueDate));
  const today = startOfDay(new Date());
  const daysRemaining = differenceInDays(due, today);
  const overdue = isPast(new Date(assignment.dueDate));

  let daysText = 'Today';
  if (overdue) {
    daysText = `${Math.abs(daysRemaining)}d overdue`;
  } else if (daysRemaining === 0) {
    daysText = 'Today';
  } else if (daysRemaining === 1) {
    daysText = 'Tomorrow';
  } else if (daysRemaining === 2) {
    daysText = 'DAT';
  } else {
    daysText = `${daysRemaining}d left`;
  }

  return (
    <div className={`${colors.bg} border ${colors.border} border-l-4 p-4 rounded-xl shadow-sm flex items-center justify-between gap-2 transition-all`}>
      <div className="flex-1 min-w-0">
        <h3 className="font-semibold text-sm text-slate-100 truncate">
          {assignment.title}
        </h3>
        <span className={`text-xs font-medium ${colors.text}`}>{assignment.student} · {assignment.course}</span>
      </div>

      <div className="flex items-center gap-2">
        <span className={`text-xs font-semibold ${overdue ? 'text-rose-400' : daysRemaining === 1 ? 'text-red-300' : daysRemaining === 2 ? 'text-orange-300' : 'text-slate-400'}`}>
          {daysText}
        </span>
        <div className="flex items-center gap-1">
          <button onClick={() => onEdit(assignment)} className="p-1.5 text-slate-400 hover:text-slate-200">
            <Edit className="w-4 h-4" />
          </button>
          <button onClick={() => onDelete(assignment.id)} className="p-1.5 text-slate-400 hover:text-rose-400">
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
});
