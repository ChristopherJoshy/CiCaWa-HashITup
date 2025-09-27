'use client';

import { Bell, Menu, User } from 'lucide-react';

interface TopBarProps {
  title: string;
  user?: {
    name: string;
    role: string;
  };
}

export default function TopBar({ title, user }: TopBarProps) {
  return (
    <div className="bg-emerald-500 text-white p-4 shadow-lg sticky top-0 z-50" style={{
      background: 'linear-gradient(135deg, var(--emerald-500), var(--emerald-600))'
    }}>
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <button className="p-1 rounded-lg hover:bg-white hover:bg-opacity-20 transition-colors">
            <Menu className="h-6 w-6" />
          </button>
          <h1 className="text-xl font-semibold truncate">{title}</h1>
        </div>
        
        <div className="flex items-center space-x-2">
          <button className="p-2 rounded-lg hover:bg-white hover:bg-opacity-20 transition-colors relative">
            <Bell className="h-5 w-5" />
            <div className="absolute -top-1 -right-1 bg-red-500 text-xs rounded-full w-5 h-5 flex items-center justify-center text-white font-medium">
              3
            </div>
          </button>
          {user ? (
            <div className="flex items-center space-x-2 bg-white bg-opacity-20 rounded-lg px-3 py-2">
              <div className="bg-white bg-opacity-30 rounded-full p-1">
                <User className="h-4 w-4" />
              </div>
              <span className="text-sm hidden sm:block font-medium">{user.name}</span>
            </div>
          ) : (
            <button className="p-2 rounded-lg hover:bg-white hover:bg-opacity-20 transition-colors">
              <User className="h-5 w-5" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}