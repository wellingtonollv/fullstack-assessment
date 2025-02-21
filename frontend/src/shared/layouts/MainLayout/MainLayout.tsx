import { Header } from '@/shared/components/Header';
import { PropsWithChildren } from 'react';

export const MainLayout = ({ children }: PropsWithChildren) => {
  return (
    <div className="flex">
      <div className="flex w-full flex-col">
        <Header />
        <main className="container mx-auto p-10">{children}</main>
      </div>
    </div>
  );
};
