
import React, { useState } from 'react';
import { Booking, SiteContent, GalleryImage } from '../types';

interface AdminDashboardProps {
  bookings: Booking[];
  onDeleteBooking: (id: string) => void;
  content: SiteContent;
  updateContent: (key: keyof SiteContent, value: any) => void;
  isEditMode: boolean;
  setIsEditMode: (v: boolean) => void;
  setIsLoggedIn: (v: boolean) => void;
}

const AdminDashboard: React.FC<AdminDashboardProps> = ({ 
  bookings, onDeleteBooking, content, updateContent, isEditMode, setIsEditMode, setIsLoggedIn 
}) => {
  const [activeSubTab, setActiveSubTab] = useState<'bookings' | 'images'>('bookings');

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>, target: 'hero' | string) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      const base64 = reader.result as string;
      if (target === 'hero') updateContent('heroImageUrl', base64);
      else {
        const newGallery = content.gallery.map(img => 
          img.id === target ? { ...img, src: base64 } : img
        );
        updateContent('gallery', newGallery);
      }
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="bg-white p-8 rounded-[3rem] shadow-xl border border-gray-100 w-full animate-in fade-in">
      <div className="flex flex-col md:flex-row justify-between gap-6 mb-10 pb-6 border-b">
        <div>
          <h2 className="font-display italic text-3xl">Tableau de Bord</h2>
          <div className="flex gap-4 mt-4">
            <button 
              onClick={() => setActiveSubTab('bookings')}
              className={`text-xs font-bold uppercase tracking-widest ${activeSubTab === 'bookings' ? 'text-gold' : 'text-gray-400'}`}
            >
              Réservations
            </button>
            <button 
              onClick={() => setActiveSubTab('images')}
              className={`text-xs font-bold uppercase tracking-widest ${activeSubTab === 'images' ? 'text-gold' : 'text-gray-400'}`}
            >
              Gestion Images
            </button>
          </div>
        </div>
        <div className="flex gap-4 h-fit">
          <button onClick={() => setIsEditMode(!isEditMode)} className={`px-6 py-3 rounded-xl text-[10px] font-bold uppercase tracking-widest transition-all ${isEditMode ? 'bg-gold text-white' : 'bg-charcoal text-white'}`}>
            {isEditMode ? 'Mode Vision' : 'Mode Édition'}
          </button>
          <button onClick={() => setIsLoggedIn(false)} className="px-6 py-3 rounded-xl text-[10px] font-bold uppercase tracking-widest text-red-500 border border-red-100">Déconnexion</button>
        </div>
      </div>

      {activeSubTab === 'bookings' ? (
        <div className="space-y-6">
          <h3 className="font-bold uppercase text-[10px] text-gray-400 tracking-widest">Dernières Réservations ({bookings.length})</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {bookings.length === 0 ? <p className="text-gray-300 italic">Aucune réservation pour le moment.</p> : 
              bookings.map(b => (
                <div key={b.id} className="p-5 bg-gray-50 rounded-2xl flex justify-between items-center">
                  <div>
                    <p className="font-bold">{b.firstName} {b.lastName}</p>
                    <p className="text-xs text-gray-400">{b.date} • {b.time} • {b.phone}</p>
                  </div>
                  <button onClick={() => onDeleteBooking(b.id)} className="text-red-400 hover:text-red-600">
                    <span className="material-symbols-outlined">delete</span>
                  </button>
                </div>
              ))
            }
          </div>
        </div>
      ) : (
        <div className="space-y-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-4 col-span-full">
              <label className="block text-xs font-bold uppercase tracking-widest text-gray-400">Image Accueil (Hero)</label>
              <div className="flex items-center gap-6">
                <div className="w-32 h-20 bg-gray-100 rounded-xl overflow-hidden border">
                  <img src={content.heroImageUrl} className="w-full h-full object-cover" />
                </div>
                <input type="file" onChange={(e) => handleFileUpload(e, 'hero')} className="text-xs" accept="image/*" />
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <label className="block text-xs font-bold uppercase tracking-widest text-gray-400">Images de la Galerie</label>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {content.gallery.map(img => (
                <div key={img.id} className="space-y-2">
                  <div className="aspect-square bg-gray-100 rounded-xl overflow-hidden border">
                    <img src={img.src} className="w-full h-full object-cover" />
                  </div>
                  <input type="file" onChange={(e) => handleFileUpload(e, img.id)} className="text-[10px] w-full" accept="image/*" />
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
