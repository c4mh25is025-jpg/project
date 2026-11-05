import React, { useEffect } from 'react';
import { CheckCircle2, Info, X } from 'lucide-react';

export interface ToastMessage {
  id: string;
  title: string;
  description?: string;
  type?: 'success' | 'info';
}

interface NotificationToastProps {
  toasts: ToastMessage[];
  onDismiss: (id: string) => void;
}

export const NotificationToast: React.FC<NotificationToastProps> = ({ toasts, onDismiss }) => {
  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col gap-2 max-w-sm pointer-events-none">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className="pointer-events-auto bg-[#0F172A] text-white p-3 px-4 rounded-[6px] shadow-[0_10px_15px_-3px_rgba(15,23,42,0.12),0_4px_6px_-4px_rgba(15,23,42,0.03)] border border-[#334155] flex items-start justify-between gap-3 animate-in fade-in slide-in-from-bottom-2 duration-150"
        >
          <div className="flex items-start gap-2.5">
            {toast.type === 'info' ? (
              <Info className="w-4 h-4 text-[#93C5FD] shrink-0 mt-0.5" />
            ) : (
              <CheckCircle2 className="w-4 h-4 text-[#34D399] shrink-0 mt-0.5" />
            )}
            <div>
              <p className="text-xs font-semibold">{toast.title}</p>
              {toast.description && (
                <p className="text-[11px] text-[#94A3B8] mt-0.5">{toast.description}</p>
              )}
            </div>
          </div>
          <button
            type="button"
            onClick={() => onDismiss(toast.id)}
            className="text-[#94A3B8] hover:text-white p-0.5"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      ))}
    </div>
  );
};
