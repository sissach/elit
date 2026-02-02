
import React from 'react';
import { SiteContent } from '../types';
import EditableText from './EditableText';

interface HoursProps {
  content?: SiteContent;
  updateContent?: (key: keyof SiteContent, value: any) => void;
  isEditMode?: boolean;
}

const Hours: React.FC<HoursProps> = ({ content, updateContent, isEditMode = false }) => {
  return (
    <section className="py-24 px-6 max-w-screen-xl mx-auto" id="horaires">
      {/* Carte principale avec effet de groupe, zoom et inversion de couleurs au survol */}
      <div className="group bg-charcoal text-white rounded-[3rem] p-8 md:p-16 relative overflow-hidden shadow-2xl transition-all duration-700 hover:scale-[1.05] hover:bg-white hover:text-charcoal cursor-default border border-transparent hover:border-gray-100">
        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-16">
          <div>
            <div className="mb-10">
              <span className="text-gold group-hover:text-charcoal text-[10px] font-bold uppercase tracking-[0.3em] block mb-3 transition-colors duration-500">Nous trouver</span>
              <h2 className="text-4xl font-medium font-display italic transition-colors duration-500">Horaires d'Ouverture</h2>
            </div>
            <div className="space-y-6">
              {[
                { label: 'Lundi - Vendredi', time: '09:00 — 19:00' },
                { label: 'Samedi', time: '08:30 — 16:30', highlight: true },
                { label: 'Dimanche', time: 'Fermé', faded: true }
              ].map((row, idx) => (
                <div key={idx} className={`flex justify-between items-center border-b border-white/5 group-hover:border-charcoal/10 pb-4 transition-colors duration-500 ${row.highlight ? 'text-gold' : ''}`}>
                  <span className={`${row.faded ? 'text-white/20 italic group-hover:text-charcoal/20' : row.highlight ? 'font-bold' : 'text-white/60 group-hover:text-charcoal/60'} text-base font-light transition-colors duration-500`}>
                    {row.label}
                  </span>
                  <span className={`text-base transition-colors duration-500 ${row.faded ? 'text-white/20 italic group-hover:text-charcoal/20' : row.highlight ? 'font-bold' : ''}`}>
                    {row.time}
                  </span>
                </div>
              ))}
            </div>
          </div>
          
          <div className="lg:border-l lg:border-white/10 lg:pl-16 group-hover:border-charcoal/10 flex flex-col justify-center transition-colors duration-500">
            <div className="flex items-start gap-5 mb-8">
              <span className="material-symbols-outlined text-gold group-hover:text-charcoal text-3xl transition-colors duration-500">location_on</span>
              <div>
                <p className="font-medium text-2xl leading-snug transition-colors duration-500">
                  {content && updateContent ? (
                    <EditableText 
                      value={content.address} 
                      onSave={(v) => updateContent('address', v)} 
                      isEditing={isEditMode} 
                    />
                  ) : (
                    "36 Rue de Mulhouse"
                  )}
                </p>
                <p className="text-white/50 group-hover:text-charcoal/50 font-light text-lg transition-colors duration-500">68300 Saint-Louis, France</p>
              </div>
            </div>
            <button className="w-full flex items-center justify-center gap-4 bg-white/5 group-hover:bg-charcoal/5 hover:bg-white/10 py-5 rounded-2xl transition-all border border-white/10 group-hover:border-charcoal/10 group/btn active:scale-95">
              <span className="material-symbols-outlined text-gold group-hover:text-charcoal group-hover/btn:scale-110 transition-transform">directions</span>
              <span className="text-xs font-bold uppercase tracking-[0.2em] group-hover:text-charcoal transition-colors duration-500">Itinéraire Maps</span>
            </button>
          </div>
        </div>
        
        {/* Elements décoratifs dynamiques */}
        <div className="absolute -top-24 -right-24 w-80 h-80 bg-gold/10 group-hover:bg-gold/5 rounded-full blur-[120px] transition-colors duration-700"></div>
        <div className="absolute -bottom-24 -left-24 w-60 h-60 bg-white/5 group-hover:bg-charcoal/5 rounded-full blur-[100px] transition-colors duration-700"></div>
      </div>
    </section>
  );
};

export default Hours;
