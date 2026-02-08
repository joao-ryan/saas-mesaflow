import React from 'react';
import Sidebar from './Sidebar';
import { useUIStore } from '../../store/ui.store';

interface PageLayoutProps {
  children: React.ReactNode;
  title: string;
}

const PageLayout: React.FC<PageLayoutProps> = ({ children, title }) => {
  const { isSidebarOpen } = useUIStore();

  return (
    <div className="min-h-screen bg-[#0B0B0B] flex text-[#E5E5E5] font-sans">
      <Sidebar />
      <main className={`flex-1 transition-all duration-300 ${isSidebarOpen ? 'ml-64' : 'ml-20'}`}>
        <header className="sticky top-0 z-40 bg-[#0B0B0B]/80 backdrop-blur-xl border-b border-[#262626] px-8 py-6">
          <h1 className="text-2xl font-800 text-white tracking-tight uppercase">{title}</h1>
        </header>
        <div className="p-8 max-w-7xl mx-auto">
          {children}
        </div>
      </main>
    </div>
  );
};

export default PageLayout;
