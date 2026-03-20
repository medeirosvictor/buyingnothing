import { useState, useCallback, useEffect } from 'react';
import type { ReactNode } from 'react';
import { DialogContext } from '@/context/dialogContext';
import { Dialog } from '@/components/ui/Dialog';

export function DialogProvider({ children }: { children: ReactNode }) {
  const [content, setContent] = useState<ReactNode | null>(null);
  const isOpen = content !== null;

  const open = useCallback((node: ReactNode) => setContent(node), []);
  const close = useCallback(() => setContent(null), []);

  // Close on Escape
  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [isOpen, close]);

  return (
    <DialogContext.Provider value={{ open, close, isOpen }}>
      {children}
      {isOpen && <Dialog onClose={close}>{content}</Dialog>}
    </DialogContext.Provider>
  );
}
