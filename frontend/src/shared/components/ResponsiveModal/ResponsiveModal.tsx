import { ReactNode } from 'react';
import { useMediaQuery } from '@/shared/hooks/useMediaQuery';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/shared/components/ui/dialog';
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
} from '@/shared/components/ui/drawer';
import { QUERYS } from './constants/querys';

interface ResponsiveModalProps {
  title: string;
  children: ReactNode;
  open: boolean;
  setOpen: (open: boolean) => void;
}

export const ResponsiveModal = ({
  title,
  children,
  open,
  setOpen,
}: ResponsiveModalProps) => {
  const isDesktop = useMediaQuery(QUERYS.TABLET);

  if (isDesktop) {
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-h-screen overflow-y-auto sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>{title}</DialogTitle>
          </DialogHeader>
          {children}
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerContent>
        <DrawerHeader className="text-left">
          <DrawerTitle>{title}</DrawerTitle>
        </DrawerHeader>
        <div className="px-4 py-6">{children}</div>
      </DrawerContent>
    </Drawer>
  );
};
