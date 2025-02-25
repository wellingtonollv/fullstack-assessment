import { useState, ReactNode } from 'react';
import { ModalProviderContext } from './ModalContext';
import { ResponsiveModal } from '@/shared/components/ResponsiveModal';

export const ModalProvider = ({ children }: { children: ReactNode }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [content, setContent] = useState<ReactNode | null>(null);
  const [title, setTitle] = useState('');

  const open = (modalContent: ReactNode, title: string) => {
    setContent(modalContent);
    setIsOpen(true);
    setTitle(title);
  };

  const close = () => {
    setIsOpen(false);
    setContent(null);
    setTitle('');
  };

  return (
    <ModalProviderContext.Provider value={{ isOpen, content, open, close }}>
      {children}
      <ResponsiveModal open={isOpen} setOpen={setIsOpen} title={title}>
        {content}
      </ResponsiveModal>
    </ModalProviderContext.Provider>
  );
};
