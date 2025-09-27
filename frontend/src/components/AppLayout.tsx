'use client';

import TopBar from './TopBar';
import BottomBar from './BottomBar';

interface AppLayoutProps {
  children: React.ReactNode;
  title: string;
  user?: {
    name: string;
    role: string;
  };
  showBottomNav?: boolean;
}

export default function AppLayout({ 
  children, 
  title, 
  user, 
  showBottomNav = true 
}: AppLayoutProps) {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <TopBar title={title} user={user} />
      
      <main className={`flex-1 overflow-y-auto ${showBottomNav ? 'pb-20' : 'pb-4'}`}>
        {children}
      </main>
      
      {showBottomNav && <BottomBar />}
    </div>
  );
}