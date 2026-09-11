import React, { memo } from 'react';
import { Bell, ShieldCheck, Smartphone } from 'lucide-react';

export const SettingsView = memo(function SettingsView() {
  const requestNotificationPermission = async () => {
    if ('Notification' in window) {
      const permission = await Notification.requestPermission();
      if (permission === 'granted') {
        new Notification('TrackIt Notifications Active', {
          body: 'You will now receive alerts for pending assignments!',
        });
      }
    } else {
      alert('Notifications are not supported in this browser.');
    }
  };

  return (
    <div className="space-y-4 pb-24 text-sm">
      <h2 className="text-sm font-bold text-slate-300 uppercase tracking-wider">App Settings</h2>

      <div className="bg-slate-900 border border-slate-800 rounded-xl divide-y divide-slate-800">
        <div className="p-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Bell className="w-5 h-5 text-indigo-400" />
            <div>
              <p className="font-semibold text-slate-100">Push Notifications</p>
              <p className="text-xs text-slate-400">Get reminders for pending assignments</p>
            </div>
          </div>
          <button
            onClick={requestNotificationPermission}
            className="px-3 py-1.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg text-xs font-semibold"
          >
            Enable
          </button>
        </div>

        <div className="p-4 flex items-center gap-3">
          <ShieldCheck className="w-5 h-5 text-emerald-400" />
          <div>
            <p className="font-semibold text-slate-100">Offline Local Storage</p>
            <p className="text-xs text-slate-400">Data automatically synced to device storage</p>
          </div>
        </div>

        <div className="p-4 flex items-center gap-3">
          <Smartphone className="w-5 h-5 text-indigo-400" />
          <div>
            <p className="font-semibold text-slate-100">PWA Status</p>
            <p className="text-xs text-slate-400">Standalone progressive application active</p>
          </div>
        </div>
      </div>
    </div>
  );
});
