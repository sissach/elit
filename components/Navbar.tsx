
import React from 'react';

interface NavbarProps {
  onBookingClick?: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ onBookingClick }) => {
  return (
    <nav className="sticky top-0 z-50 flex items-center bg-white px-6 py-4 border-b border-gray-100 shadow-sm h-20">
      {/* Colonne Gauche (Vide pour le centrage) */}
      <div className="flex-1 hidden sm:flex"></div>

      {/* Colonne Centre : Logo avec inversion de couleur et zoom intense au survol */}
      <div className="flex-1 flex justify-start sm:justify-center overflow-visible">
        <div className="group flex items-center gap-3 transition-all duration-500 ease-out hover:scale-[1.5] cursor-pointer origin-center z-50 py-2">
          <span className="material-symbols-outlined text-gold group-hover:text-charcoal text-3xl transition-colors duration-500">content_cut</span>
          <div className="flex flex-col">
            <h2 className="text-charcoal group-hover:text-gold text-xl font-bold leading-none font-display italic transition-colors duration-500">Elit Coiffure</h2>
            <span className="text-[8px] uppercase tracking-[0.3em] font-bold text-gold group-hover:text-charcoal transition-colors duration-500">SAINT-LOUIS</span>
          </div>
        </div>
      </div>
      
      {/* Colonne Droite : Bouton de réservation */}
      <div className="flex-1 flex justify-end">
        <button 
          onClick={onBookingClick}
          className="bg-gold text-white px-6 py-2.5 rounded-full text-[10px] font-bold uppercase tracking-widest transition-all hover:bg-charcoal active:scale-95 whitespace-nowrap"
        >
          Réserver
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
