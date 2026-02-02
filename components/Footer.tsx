
import React from 'react';
import { SiteContent } from '../types';
import EditableText from './EditableText';

interface FooterProps {
  content: SiteContent;
  updateContent: (key: keyof SiteContent, value: any) => void;
  isEditMode: boolean;
}

const Footer: React.FC<FooterProps> = ({ content, updateContent, isEditMode }) => {
  return (
    <footer className="group bg-charcoal text-white pt-20 pb-32 px-8 transition-all duration-700 hover:bg-white hover:text-charcoal border-t border-transparent hover:border-gray-100 cursor-default">
      <div className="max-w-screen-xl mx-auto flex flex-col items-center gap-12">
        {/* Logo Footer avec inversion de couleur et zoom au survol */}
        <div className="group/logo text-center flex flex-col items-center cursor-pointer transition-transform duration-500 hover:scale-125">
          <span className="material-symbols-outlined text-gold group-hover/logo:text-charcoal group-hover:text-charcoal text-4xl mb-4 transition-colors duration-500">content_cut</span>
          <h2 className="text-4xl font-display italic mb-2 text-white group-hover:text-charcoal group-hover/logo:text-gold transition-colors duration-500">Elit Coiffure</h2>
          <p className="text-gold group-hover:text-charcoal group-hover/logo:text-charcoal text-[10px] uppercase tracking-[0.4em] transition-colors duration-500">SAINT-LOUIS • Salon Mixte</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 w-full text-center border-t border-white/10 group-hover:border-charcoal/10 pt-12 transition-colors duration-500">
          <div className="space-y-2">
            <h4 className="text-gold group-hover:text-charcoal text-[10px] font-bold uppercase tracking-widest transition-colors duration-500">Téléphone</h4>
            <p className="text-lg font-light">
              <EditableText value={content.phone} onSave={(v) => updateContent('phone', v)} isEditing={isEditMode} />
            </p>
          </div>
          <div className="space-y-2">
            <h4 className="text-gold group-hover:text-charcoal text-[10px] font-bold uppercase tracking-widest transition-colors duration-500">Adresse</h4>
            <p className="text-lg font-light">
              <EditableText value={content.address} onSave={(v) => updateContent('address', v)} isEditing={isEditMode} />
            </p>
          </div>
          <div className="space-y-2">
            <h4 className="text-gold group-hover:text-charcoal text-[10px] font-bold uppercase tracking-widest transition-colors duration-500">Email</h4>
            <p className="text-lg font-light">
              <EditableText value={content.email} onSave={(v) => updateContent('email', v)} isEditing={isEditMode} />
            </p>
          </div>
        </div>
        
        <div className="pt-12 flex gap-8 opacity-50 group-hover:opacity-100 transition-opacity duration-500">
          <a href="#" className="hover:text-gold group-hover:text-charcoal group-hover:hover:text-gold transition-all"><span className="material-symbols-outlined">share</span></a>
          <a href="#" className="hover:text-gold group-hover:text-charcoal group-hover:hover:text-gold transition-all"><span className="material-symbols-outlined">photo_camera</span></a>
        </div>
        
        <p className="text-[9px] uppercase tracking-[0.2em] opacity-30 group-hover:opacity-50 transition-opacity duration-500">© 2024 Elit Coiffure. Tous droits réservés.</p>
      </div>
    </footer>
  );
};

export default Footer;
