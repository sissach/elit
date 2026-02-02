
import React from 'react';
import { SiteContent } from '../types';
import EditableText from './EditableText';

interface PhilosophyProps {
  content: SiteContent;
  updateContent: (key: keyof SiteContent, value: any) => void;
  isEditMode: boolean;
}

const Philosophy: React.FC<PhilosophyProps> = ({ content, updateContent, isEditMode }) => {
  return (
    <section className="py-24 px-8 bg-white" id="philosophie">
      <div className="flex flex-col items-center text-center max-w-2xl mx-auto">
        <span className="text-gold font-bold tracking-[0.4em] text-[10px] uppercase mb-4">Notre Philosophie</span>
        <h2 className="text-charcoal text-4xl md:text-5xl font-medium font-display italic">
          <EditableText 
            value={content.philosophyTitle} 
            onSave={(v) => updateContent('philosophyTitle', v)} 
            isEditing={isEditMode} 
          />
        </h2>
        <p className="text-gray-500 text-base md:text-lg font-light leading-relaxed pt-8">
          <EditableText 
            value={content.philosophyText} 
            onSave={(v) => updateContent('philosophyText', v)} 
            isEditing={isEditMode} 
            multiline
          />
        </p>
        <div className="mt-12 flex items-center gap-3">
          <div className="w-16 h-[1px] bg-gold/20"></div>
          <span className="material-symbols-outlined text-gold text-xl">spa</span>
          <div className="w-16 h-[1px] bg-gold/20"></div>
        </div>
      </div>
    </section>
  );
};

export default Philosophy;
