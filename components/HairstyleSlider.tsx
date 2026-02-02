
import React, { useState, useEffect, useRef } from 'react';

const SLIDE_IMAGES = [
  {
    url: 'input_file_6.png',
    title: 'Notre Espace Barbier',
    category: 'Tradition & Modernité'
  },
  {
    url: 'input_file_2.png',
    title: 'Espace Barbier Moderne',
    category: 'Notre Studio'
  },
  {
    url: 'input_file_1.png',
    title: 'Accueil Elit Coiff By Murat',
    category: 'Bienvenue'
  },
  {
    url: 'input_file_3.png',
    title: 'Expertise & Précision',
    category: 'Coiffure Homme'
  },
  {
    url: 'input_file_0.png',
    title: 'Votre Salon à Saint-Louis',
    category: 'Emplacement'
  }
];

const HairstyleSlider: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const timeoutRef = useRef<number | null>(null);

  const resetTimeout = () => {
    if (timeoutRef.current) {
      window.clearTimeout(timeoutRef.current);
    }
  };

  useEffect(() => {
    resetTimeout();
    timeoutRef.current = window.setTimeout(
      () =>
        setCurrentIndex((prevIndex) =>
          prevIndex === SLIDE_IMAGES.length - 1 ? 0 : prevIndex + 1
        ),
      5000
    );

    return () => {
      resetTimeout();
    };
  }, [currentIndex]);

  return (
    <section className="py-20 bg-white overflow-hidden">
      <div className="max-w-screen-xl mx-auto px-6 mb-12 flex items-end justify-between">
        <div>
          <span className="text-gold text-[10px] font-bold uppercase tracking-[0.4em] block mb-2">Notre Univers</span>
          <h2 className="text-4xl font-display italic text-charcoal">Le Salon en Images</h2>
        </div>
        <div className="flex gap-4">
          <button 
            onClick={() => setCurrentIndex(prev => prev === 0 ? SLIDE_IMAGES.length - 1 : prev - 1)}
            className="w-12 h-12 rounded-full border border-gray-100 flex items-center justify-center hover:bg-gold hover:text-white transition-all active:scale-90"
          >
            <span className="material-symbols-outlined">chevron_left</span>
          </button>
          <button 
            onClick={() => setCurrentIndex(prev => prev === SLIDE_IMAGES.length - 1 ? 0 : prev + 1)}
            className="w-12 h-12 rounded-full border border-gray-100 flex items-center justify-center hover:bg-gold hover:text-white transition-all active:scale-90"
          >
            <span className="material-symbols-outlined">chevron_right</span>
          </button>
        </div>
      </div>

      <div className="relative h-[60vh] md:h-[70vh] w-full px-6 max-w-screen-xl mx-auto">
        <div className="h-full w-full overflow-hidden rounded-[3rem] relative shadow-2xl">
          {SLIDE_IMAGES.map((slide, index) => (
            <div
              key={index}
              className={`absolute inset-0 transition-all duration-1000 ease-in-out transform ${
                index === currentIndex ? 'opacity-100 translate-x-0 scale-100' : 'opacity-0 translate-x-full scale-105'
              }`}
            >
              <img
                src={slide.url}
                alt={slide.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-charcoal/80 via-transparent to-transparent"></div>
              <div className="absolute bottom-12 left-12 right-12 text-white animate-in slide-in-from-bottom-8 duration-700">
                <span className="text-gold text-[10px] font-bold uppercase tracking-widest mb-2 block">
                  {slide.category}
                </span>
                <h3 className="text-4xl md:text-5xl font-display italic leading-tight">
                  {slide.title}
                </h3>
              </div>
            </div>
          ))}
        </div>
        
        {/* Indicators */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-3 z-20">
          {SLIDE_IMAGES.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`h-1.5 rounded-full transition-all duration-500 ${
                index === currentIndex ? 'w-8 bg-gold' : 'w-2 bg-white/30 hover:bg-white/50'
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default HairstyleSlider;
