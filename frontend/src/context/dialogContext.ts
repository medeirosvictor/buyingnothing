import { createContext } from 'react';
import type { ReactNode } from 'react';

export interface DialogContextType {
  open: (content: ReactNode) => void;
  close: () => void;
  isOpen: boolean;
}

export const DialogContext = createContext<DialogContextType | undefined>(undefined);
