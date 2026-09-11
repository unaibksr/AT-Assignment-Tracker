import React, { useState, useCallback, memo } from 'react';
import { AssignmentProvider, useAssignments } from './context/AssignmentContext';
import { Header } from './components/Header';
import { BottomNav } from './components/BottomNav';
import { AssignmentDrawer } from './components/AssignmentDrawer';
import { InstallPrompt } from './components/InstallPrompt';

import { DashboardView } from './views/DashboardView';
import { StudentsView } from './views/StudentsView';
import { CalendarView } from './views/CalendarView';
import { SettingsView } from './views/SettingsView';

import { Plus } from 'lucide-react';

const MemoizedHeader = memo(Header);
const MemoizedBottomNav = memo(BottomNav);
const MemoizedDashboardView = memo(DashboardView);
const MemoizedStudentsView = memo(StudentsView);
const MemoizedCalendarView = memo(CalendarView);
const MemoizedSettingsView = memo(SettingsView);
const MemoizedInstallPrompt = memo(InstallPrompt);

function AppContent() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [editingAssignment, setEditingAssignment] = useState(null);

  const { addAssignment, updateAssignment } = useAssignments();

  const handleEdit = useCallback((assignment) => {
    setEditingAssignment(assignment);
    setIsDrawerOpen(true);
  }, []);

  const handleCreateNew = useCallback(() => {
    setEditingAssignment(null);
    setIsDrawerOpen(true);
  }, []);

  const handleDrawerClose = useCallback(() => {
    setIsDrawerOpen(false);
    setEditingAssignment(null);
  }, []);

  const handleDrawerSubmit = useCallback((data) => {
    if (editingAssignment) {
      updateAssignment(editingAssignment.id, data);
    } else {
      addAssignment(data);
    }
  }, [editingAssignment, addAssignment, updateAssignment]);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans flex flex-col max-w-md mx-auto relative border-x border-slate-900">
      <MemoizedInstallPrompt />
      <MemoizedHeader />

      <main className="flex-1 p-4 overflow-y-auto">
        {activeTab === 'dashboard' && <MemoizedDashboardView onEdit={handleEdit} />}
        {activeTab === 'students' && <MemoizedStudentsView />}
        {activeTab === 'calendar' && <MemoizedCalendarView onEdit={handleEdit} />}
        {activeTab === 'settings' && <MemoizedSettingsView />}
      </main>

      <button
        onClick={handleCreateNew}
        className="fixed bottom-20 right-6 z-40 p-4 bg-indigo-600 hover:bg-indigo-500 rounded-full shadow-2xl text-white transition-transform active:scale-95"
        aria-label="Add Assignment"
      >
        <Plus className="w-6 h-6" />
      </button>

      <AssignmentDrawer
        isOpen={isDrawerOpen}
        onClose={handleDrawerClose}
        onSubmit={handleDrawerSubmit}
        initialData={editingAssignment}
      />

      <MemoizedBottomNav activeTab={activeTab} setActiveTab={setActiveTab} />
    </div>
  );
}

export default function App() {
  return (
    <AssignmentProvider>
      <AppContent />
    </AssignmentProvider>
  );
}
