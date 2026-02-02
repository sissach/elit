
import React, { useState } from 'react';
import { SiteContent, Service } from '../types';
import EditableText from './EditableText';

interface ServicesProps {
  content: SiteContent;
  updateContent: (key: keyof SiteContent, value: any) => void;
  isEditMode: boolean;
  onServiceClick?: () => void;
}

// Composant pour les icônes SVG personnalisées avec animations en boucle
const ServiceIcon = ({ icon, isSnipping }: { icon: string; isSnipping: boolean }) => {
  const iconProps = {
    className: `w-8 h-8 transition-all duration-300 ${isSnipping ? 'scale-125' : ''}`,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "1.2",
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
  };

  switch (icon) {
    case 'content_cut': // Coupe
      return (
        <svg {...iconProps} className={`${iconProps.className} animate-loop-snip`}>
          <g 
            className={isSnipping ? 'animate-snip-left' : ''} 
            style={{ transformOrigin: '12px 10px' }}
          >
            <circle cx="6" cy="18" r="3" />
            <path d="M7.5 15.5L17 4" />
          </g>
          <g 
            className={isSnipping ? 'animate-snip-right' : ''} 
            style={{ transformOrigin: '12px 10px' }}
          >
            <circle cx="18" cy="18" r="3" />
            <path d="M16.5 15.5L7 4" />
          </g>
          <circle cx="12" cy="10" r="0.5" fill="currentColor" />
        </svg>
      );
    case 'face': // Barbier / Visage
      return (
        <svg {...iconProps} className={`${iconProps.className} animate-loop-float`}>
          <path d="M12 21a9 9 0 1 1 0-18 9 9 0 0 1 0 18Z" />
          <path d="M8 10h.01" />
          <path d="M16 10h.01" />
          <path d="M12 14v2" />
          <path d="M7 16c1 2 2.5 3 5 3s4-1 5-3" />
        </svg>
      );
    case 'palette': // Coloration
      return (
        <svg {...iconProps} className={`${iconProps.className} animate-loop-pulse`}>
          <path d="M12 21.5C16.6944 21.5 20.5 17.6944 20.5 13C20.5 8.30558 12 2.5 12 2.5C12 2.5 3.5 8.30558 3.5 13C3.5 17.6944 7.30558 21.5 12 21.5Z" />
          <path d="M12 11V15" />
          <path d="M10 13H14" />
        </svg>
      );
    case 'auto_awesome': // Soins
      return (
        <svg {...iconProps} className={`${iconProps.className} animate-loop-twinkle`}>
          <path d="M12 3V5M12 19V21M3 12H5M19 12H21M5.636 5.636L7.05 7.05M16.95 16.95L18.364 18.364M5.636 18.364L7.05 16.95M16.95 7.05L18.364 5.636" />
          <circle cx="12" cy="12" r="4" />
        </svg>
      );
    case 'wind_power': // Brushing
      return (
        <svg {...iconProps} className={`${iconProps.className} animate-loop-drift`}>
          <path d="M3 13H10M3 10H14M3 16H12" />
          <path d="M15 10C15 8.34315 16.3431 7 18 7C19.6569 7 21 8.34315 21 10C21 11.6569 19.6569 13 18 13" />
          <path d="M18 13V21" />
        </svg>
      );
    default:
      return null;
  }
};

const Services: React.FC<ServicesProps> = ({ content, updateContent, isEditMode, onServiceClick }) => {
  const [activeSnipId, setActiveSnipId] = useState<string | null>(null);

  const handleServiceUpdate = (id: string, field: keyof Service, newValue: string) => {
    const updatedServices = content.services.map(s => 
      s.id === id ? { ...s, [field]: newValue } : s
    );
    updateContent('services', updatedServices);
  };

  const triggerSnip = (id: string, icon: string) => {
    if (icon === 'content_cut' && !activeSnipId) {
      setActiveSnipId(id);
      setTimeout(() => {
        setActiveSnipId(null);
        if (onServiceClick) onServiceClick();
      }, 350);
    } else if (onServiceClick) {
      onServiceClick();
    }
  };

  return (
    <section className="py-24 px-6 bg-background-light" id="services">
      <div className="flex items-center justify-between mb-12 px-2 max-w-screen-xl mx-auto">
        <div>
          <span className="text-gold text-[10px] font-bold uppercase tracking-widest">Prestations</span>
          <h2 className="text-charcoal text-4xl font-medium font-display italic">Nos Services</h2>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-screen-xl mx-auto">
        {content.services.map((service) => (
          <div 
            key={service.id} 
            onClick={() => triggerSnip(service.id, service.icon)}
            className={`group relative bg-white p-8 rounded-[2rem] border border-gray-100 flex flex-col gap-6 shadow-sm hover:shadow-2xl transition-all duration-500 ease-in-out cursor-pointer overflow-hidden ${activeSnipId === service.id ? 'scale-110 rotate-1' : 'hover:-translate-y-2 hover:scale-[1.03] hover:bg-charcoal'}`}
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-gold/5 rounded-full -mr-16 -mt-16 transition-all duration-700 group-hover:bg-gold/10 group-hover:scale-150"></div>
            
            <div className={`relative z-10 bg-gold/10 text-gold rounded-full w-14 h-14 flex items-center justify-center transition-all duration-500 group-hover:bg-gold group-hover:text-white ${activeSnipId === service.id ? 'scale-125 shadow-lg shadow-gold/20' : 'group-hover:rotate-[360deg]'}`}>
              <ServiceIcon 
                icon={service.icon} 
                isSnipping={activeSnipId === service.id} 
              />
            </div>
            
            <div className="relative z-10 flex justify-between items-end">
              <div className="flex-1">
                <h3 className="font-bold text-xl text-charcoal group-hover:text-white transition-colors duration-500">
                  <EditableText 
                    value={service.name} 
                    onSave={(v) => handleServiceUpdate(service.id, 'name', v)} 
                    isEditing={isEditMode} 
                  />
                </h3>
                <p className="text-sm text-gray-400 mt-2 font-light group-hover:text-white/60 transition-colors duration-500">
                  <EditableText 
                    value={service.description} 
                    onSave={(v) => handleServiceUpdate(service.id, 'description', v)} 
                    isEditing={isEditMode} 
                  />
                </p>
              </div>
              <span className="text-gold font-bold text-base whitespace-nowrap ml-4 transition-transform duration-500 group-hover:scale-125">
                Dès <EditableText 
                  value={service.price} 
                  onSave={(v) => handleServiceUpdate(service.id, 'price', v)} 
                  isEditing={isEditMode} 
                />
              </span>
            </div>
          </div>
        ))}
      </div>

      <style>{`
        /* Animations au clic */
        @keyframes snip-left {
          0% { transform: rotate(0deg); }
          30% { transform: rotate(-35deg); }
          100% { transform: rotate(0deg); }
        }
        @keyframes snip-right {
          0% { transform: rotate(0deg); }
          30% { transform: rotate(35deg); }
          100% { transform: rotate(0deg); }
        }
        .animate-snip-left {
          animation: snip-left 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
        }
        .animate-snip-right {
          animation: snip-right 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
        }

        /* Animations en boucle */
        @keyframes loop-snip {
          0%, 100% { transform: scale(1) rotate(0deg); }
          50% { transform: scale(1.05) rotate(-5deg); }
        }
        @keyframes loop-float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-4px); }
        }
        @keyframes loop-pulse {
          0%, 100% { transform: scale(1); opacity: 1; }
          50% { transform: scale(1.1); opacity: 0.8; }
        }
        @keyframes loop-twinkle {
          0%, 100% { opacity: 1; filter: drop-shadow(0 0 0px gold); }
          50% { opacity: 0.6; filter: drop-shadow(0 0 4px gold); }
        }
        @keyframes loop-drift {
          0%, 100% { transform: translateX(0); }
          50% { transform: translateX(3px); }
        }

        .animate-loop-snip { animation: loop-snip 3s ease-in-out infinite; }
        .animate-loop-float { animation: loop-float 4s ease-in-out infinite; }
        .animate-loop-pulse { animation: loop-pulse 3.5s ease-in-out infinite; }
        .animate-loop-twinkle { animation: loop-twinkle 2s ease-in-out infinite; }
        .animate-loop-drift { animation: loop-drift 5s ease-in-out infinite; }

        /* Mise en pause des animations au survol de la carte */
        .group:hover .animate-loop-snip,
        .group:hover .animate-loop-float,
        .group:hover .animate-loop-pulse,
        .group:hover .animate-loop-twinkle,
        .group:hover .animate-loop-drift {
          animation-play-state: paused;
        }
      `}</style>
    </section>
  );
};

export default Services;
