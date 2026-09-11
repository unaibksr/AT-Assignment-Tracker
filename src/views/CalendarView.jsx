import React from 'react';
import { useAssignments } from '../context/AssignmentContext';
import { format, startOfMonth, endOfMonth, eachDayOfInterval, isSameDay, isToday, differenceInDays, startOfDay } from 'date-fns';

export const CalendarView = React.memo(function CalendarView({ onEdit }) {
  const { assignments, getStudentColor, COLOR_MAP } = useAssignments();
  const today = new Date();
  const monthStart = startOfMonth(today);
  const monthEnd = endOfMonth(today);
  const days = eachDayOfInterval({ start: monthStart, end: monthEnd });

  const getAssignmentsForDay = React.useCallback((day) => {
    return assignments.filter((a) => isSameDay(new Date(a.dueDate), day));
  }, [assignments]);

  const upcoming = React.useMemo(() => {
    return assignments
      .filter((a) => new Date(a.dueDate) >= today)
      .sort((a, b) => differenceInDays(startOfDay(new Date(a.dueDate)), startOfDay(new Date(b.dueDate))));
  }, [assignments, today]);

  return (
    <div className="space-y-4 pb-24">
      <h2 className="text-sm font-bold text-slate-300 uppercase tracking-wider">
        {format(today, 'MMMM yyyy')}
      </h2>

      <div className="bg-slate-900 border border-slate-800 rounded-xl p-3">
        <div className="grid grid-cols-7 mb-2">
          {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((d) => (
            <div key={d} className="text-center text-[10px] font-semibold text-slate-500 uppercase">
              {d}
            </div>
          ))}
        </div>

        <div className="grid grid-cols-7 gap-1">
          {Array.from({ length: (monthStart.getDay() + 6) % 7 }).map((_, i) => (
            <div key={`empty-${i}`} className="aspect-square" />
          ))}
          {days.map((day) => {
            const dayAssignments = getAssignmentsForDay(day);
            const hasAssignments = dayAssignments.length > 0;
            const isCurrentDay = isToday(day);

            const studentDots = {};
            dayAssignments.forEach((a) => {
              if (!studentDots[a.student]) {
                studentDots[a.student] = true;
              }
            });

            return (
              <div
                key={day.toString()}
                className={`aspect-square flex flex-col items-center justify-center rounded-lg text-xs relative ${
                  isCurrentDay
                    ? 'bg-indigo-600 text-white'
                    : hasAssignments
                    ? 'bg-indigo-500/10 text-indigo-400 border border-indigo-500/30'
                    : 'text-slate-400'
                }`}
              >
                <span className="font-medium">{format(day, 'd')}</span>
                {hasAssignments && (
                  <div className="flex gap-0.5 mt-0.5">
                    {Object.keys(studentDots).map((student) => {
                      const colorData = getStudentColor(student);
                      return (
                        <span
                          key={student}
                          className={`w-1 h-1 rounded-full ${colorData.dot}`}
                        />
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      <div className="space-y-3">
        <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Upcoming Assignments</h3>
        {upcoming.length === 0 ? (
          <div className="text-center py-6 bg-slate-900/50 rounded-xl border border-slate-800/50 text-slate-400 text-xs">
            No upcoming assignments
          </div>
        ) : (
          upcoming.map((a) => {
            const colors = getStudentColor(a.student);
            return (
              <div
                key={a.id}
                onClick={() => onEdit(a)}
                className={`${colors.bg} border ${colors.border} rounded-xl p-3 cursor-pointer hover:bg-slate-800 transition-colors`}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-semibold text-slate-100">{a.title}</p>
                    <p className={`text-xs ${colors.text}`}>{a.student} · {a.course}</p>
                  </div>
                  <span className="text-xs text-slate-400">{format(new Date(a.dueDate), 'MMM d, yyyy')}</span>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
});
