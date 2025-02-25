import { ReactNode, createContext } from 'react';

type ModalState = {
  isOpen: boolean;
  content: ReactNode | null;
  close: () => void;
  open: (content: ReactNode, title: string) => void;
};

export const ModalProviderContext = createContext<ModalState | undefined>(
  undefined,
);
