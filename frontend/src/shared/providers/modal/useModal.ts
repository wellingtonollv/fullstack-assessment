//create use Modal

import { useContext } from 'react';
import { ModalProviderContext } from './ModalContext';

export const useModal = () => {
  const context = useContext(ModalProviderContext);

  if (!context) {
    throw new Error('useModal must be used within a ThemeProvider');
  }

  return context;
};
