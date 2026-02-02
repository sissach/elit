
import React from 'react';
import { Tab } from '../types';

interface BottomNavProps {
  activeTab: Tab;
  setActiveTab: (tab: Tab) => void;
}

const BottomNav: React.FC<BottomNavProps> = ({ activeTab, setActiveTab }) => {
  const items = [
    { id: Tab.HOME, label: 'Accueil', icon: 'home' },
    { id: Tab.SERVICES, label: 'Services', icon: 'content_cut' },
    { id: Tab.BOOKING, label: 'Réserver', icon: 'calendar_month' },
    { id: Tab.CONTACT, label: 'Contact', icon: 'chat_bubble' },
    { id: Tab.ADMIN, label: 'Admin', icon: 'settings' }
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 h-24 bg-white/90 backdrop-blur-2xl border-t border-gray-100 px-6 pb-4 flex items-center justify-around z-[100] shadow-[0_-10px_25px_-5px_rgba(0,0,0,0.05)]">
      {items.map((item) => {
        const isActive = activeTab === item.id;
        return (
          <button
            key={item.id}
            onClick={() => setActiveTab(item.id)}
            className={`flex flex-col items-center gap-1.5 transition-all duration-300 ${
              isActive ? 'text-gold scale-110' : 'text-gray-400 hover:text-gray-600'
            }`}
          >
            <span className={`material-symbols-outlined text-[28px] ${isActive ? 'fill-1' : ''}`}>
              {item.icon}
            </span>
            <span className={`text-[9px] uppercase tracking-tighter font-bold ${isActive ? 'opacity-100' : 'opacity-60'}`}>
              {item.label}
            </span>
          </button>
        );
      })}
    </div>
  );
};

export default BottomNav;
