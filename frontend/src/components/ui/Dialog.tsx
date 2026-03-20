import type { ReactNode, MouseEvent } from 'react';

interface DialogProps {
  children: ReactNode;
  onClose: () => void;
}

export function Dialog({ children, onClose }: DialogProps) {
  const handleBackdrop = (e: MouseEvent) => {
    if (e.target === e.currentTarget) onClose();
  };

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center"
      onClick={handleBackdrop}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-stone-900/40 dark:bg-stone-950/60 backdrop-blur-[2.5px]" />

      {/* Content */}
      <div className="relative z-10 w-full max-w-md mx-4">
        {children}
      </div>
    </div>
  );
}
