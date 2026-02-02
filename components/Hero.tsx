
import React from 'react';
import { SiteContent } from '../types';
import EditableText from './EditableText';

interface HeroProps {
  content: SiteContent;
  updateContent: (key: keyof SiteContent, value: any) => void;
  isEditMode: boolean;
  onBookingClick?: () => void;
}

const Hero: React.FC<HeroProps> = ({ content, updateContent, isEditMode, onBookingClick }) => {
  return (
    <section className="relative h-[80vh] flex flex-col items-center justify-center p-6 text-center overflow-hidden bg-charcoal">
      <div className="absolute inset-0 z-0">
        <img 
          alt="Hero" 
          className="w-full h-full object-cover opacity-60" 
          src={content.heroImageUrl} 
          onError={(e) => {
            e.currentTarget.src = "https://images.unsplash.com/photo-1585747860715-2ba37e788b70?auto=format&fit=crop&q=80&w=2000";
          }}
        />
      </div>
      
      <div className="relative z-10 flex flex-col gap-6 items-center max-w-3xl">
        {/* Emblème avec inversion de couleur et zoom au survol */}
        <div className="group flex flex-col items-center gap-2 cursor-pointer transition-transform duration-500 hover:scale-125">
          <div className="w-20 h-20 bg-gold/20 group-hover:bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center border border-gold/30 group-hover:border-white/30 mb-2 transition-all duration-500">
            <span className="material-symbols-outlined text-white group-hover:text-gold text-4xl transition-colors duration-500">content_cut</span>
          </div>
          <div className="flex flex-col gap-1 text-center">
            <h2 className="text-white group-hover:text-gold text-2xl font-display italic leading-none transition-colors duration-500">Elit Coiffure</h2>
            <span className="text-gold group-hover:text-white text-[10px] font-bold tracking-[0.5em] uppercase transition-colors duration-500">SAINT-LOUIS</span>
          </div>
        </div>

        <div className="flex flex-col gap-4 mt-4">
          <h1 className="text-white text-5xl md:text-7xl font-display italic leading-tight">
            <EditableText value={content.heroTitle} onSave={(v) => updateContent('heroTitle', v)} isEditing={isEditMode} />
          </h1>
        </div>
        
        <p className="text-white/90 text-lg max-w-xl font-light leading-relaxed">
          <EditableText value={content.heroSubtitle} onSave={(v) => updateContent('heroSubtitle', v)} isEditing={isEditMode} />
        </p>
        
        <button 
          onClick={onBookingClick}
          className="mt-4 bg-gold text-white px-10 py-4 rounded-full text-xs font-bold uppercase tracking-[0.2em] shadow-xl hover:bg-white hover:text-charcoal transition-all"
        >
          Prendre Rendez-vous
        </button>
      </div>
    </section>
  );
};

export default Hero;
