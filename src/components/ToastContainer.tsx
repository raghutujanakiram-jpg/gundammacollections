import React from 'react';
import { CheckCircle2, Info, AlertCircle, X } from 'lucide-react';
import { useShop } from '../context/ShopContext';

export const ToastContainer: React.FC = () => {
  const { toasts, removeToast } = useShop();

  if (toasts.length === 0) return null;

  return (
    <div className="fixed top-24 right-4 z-50 flex flex-col gap-2 max-w-sm pointer-events-none">
      {toasts.map(toast => (
        <div
          key={toast.id}
          className="pointer-events-auto flex items-start gap-2.5 p-3 rounded-lg shadow-xl bg-white dark:bg-[#1f1017] border border-amber-900/15 dark:border-amber-500/20 text-stone-900 dark:text-stone-100 text-xs animate-in slide-in-from-right fade-in duration-200"
        >
          {toast.type === 'success' && (
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
          )}
          {toast.type === 'info' && (
            <Info className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
          )}
          {toast.type === 'error' && (
            <AlertCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
          )}

          <div className="flex-1 space-y-1">
            <p className="font-medium leading-relaxed font-sans-clean">
              {toast.message}
            </p>
            {toast.action && (
              <button
                type="button"
                onClick={() => {
                  toast.action?.onClick();
                  removeToast(toast.id);
                }}
                className="text-[11px] font-bold text-amber-800 dark:text-amber-400 hover:underline cursor-pointer inline-flex items-center gap-1"
              >
                <span>{toast.action.label}</span>
                <span>→</span>
              </button>
            )}
          </div>

          <button
            onClick={() => removeToast(toast.id)}
            className="text-stone-400 hover:text-stone-600 dark:hover:text-stone-200 p-0.5"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      ))}
    </div>
  );
};
