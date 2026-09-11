import React, { memo } from 'react';
import { Download, X } from 'lucide-react';
import { usePWAInstall } from '../hooks/usePWAInstall';

export const InstallPrompt = memo(function InstallPrompt() {
  const { isInstallable, promptInstall } = usePWAInstall();
  const [dismissed, setDismissed] = React.useState(false);

  if (!isInstallable || dismissed) return null;

  return (
    <div className="fixed top-4 left-4 right-4 z-50 bg-indigo-600 text-white p-3 rounded-xl shadow-xl flex items-center justify-between">
      <div className="flex items-center gap-3">
        <Download className="w-5 h-5" />
        <div className="text-xs">
          <p className="font-bold">Install TrackIt App</p>
          <p className="text-indigo-100">Add to home screen for offline access</p>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <button
          onClick={promptInstall}
          className="px-3 py-1 bg-white text-indigo-600 rounded-lg text-xs font-bold shadow"
        >
          Install
        </button>
        <button onClick={() => setDismissed(true)} className="p-1 hover:bg-indigo-500 rounded-lg">
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
});
