import React from 'react';
import { useAssignments } from '../context/AssignmentContext';
import { QuickActionCard } from '../components/QuickActionCard';
import { differenceInDays, startOfDay } from 'date-fns';

export const DashboardView = React.memo(function DashboardView({ onEdit }) {
  const { assignments, deleteAssignment } = useAssignments();

  const sorted = React.useMemo(() => {
    return [...assignments].sort((a, b) => {
      const aDay = startOfDay(new Date(a.dueDate));
      const bDay = startOfDay(new Date(b.dueDate));
      return differenceInDays(aDay, bDay);
    });
  }, [assignments]);

  return (
    <div className="space-y-6 pb-24">
      <div>
        <h2 className="text-sm font-bold text-slate-300 uppercase tracking-wider mb-3">
          All Assignments
        </h2>
        {sorted.length === 0 ? (
          <div className="text-center py-8 bg-slate-900/50 rounded-xl border border-slate-800/50 text-slate-400 text-xs">
            No assignments yet. Create one to get started!
          </div>
        ) : (
          <div className="space-y-3">
            {sorted.map((a) => (
              <QuickActionCard
                key={a.id}
                assignment={a}
                onEdit={onEdit}
                onDelete={deleteAssignment}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
});
