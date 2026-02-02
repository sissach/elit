
import React, { useState, useEffect } from 'react';
import { Booking } from '../types';

const TIME_SLOTS = [
  '09:00', '10:00', '11:00', '12:00', '14:00', '15:00', '16:00', '17:00', '18:00'
];

interface BookingFormProps {
  existingBookings: Booking[];
  onAddBooking: (booking: Booking) => void;
}

const BookingForm: React.FC<BookingFormProps> = ({ existingBookings, onAddBooking }) => {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    phone: '',
    date: '',
    time: ''
  });

  useEffect(() => {
    setFormData(prev => ({ ...prev, time: '' }));
  }, [formData.date]);

  const isSlotBooked = (date: string, time: string) => {
    return existingBookings.some(b => b.date === date && b.time === time);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.time) {
      alert("Veuillez choisir un horaire.");
      return;
    }
    
    const newBooking: Booking = {
      id: Math.random().toString(36).substr(2, 9),
      ...formData
    };

    onAddBooking(newBooking);
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="text-center py-20 animate-in zoom-in-95 duration-500">
        <div className="w-20 h-20 bg-gold/10 rounded-full flex items-center justify-center mx-auto mb-6">
          <span className="material-symbols-outlined text-gold text-4xl">check_circle</span>
        </div>
        <h2 className="font-display italic text-4xl mb-4">Merci, {formData.firstName}</h2>
        <p className="text-gray-400 font-light max-w-xs mx-auto">
          Votre rendez-vous pour le <span className="text-gold font-medium">{new Date(formData.date).toLocaleDateString('fr-FR')}</span> à <span className="text-gold font-medium">{formData.time}</span> a bien été enregistré.
        </p>
        <button 
          onClick={() => setSubmitted(false)}
          className="mt-8 text-gold text-[10px] font-bold uppercase tracking-widest hover:underline"
        >
          Prendre un autre rendez-vous
        </button>
      </div>
    );
  }

  return (
    <div className="bg-white p-6 md:p-12 rounded-[3rem] shadow-xl border border-gray-100 max-w-2xl mx-auto">
      <div className="text-center mb-10">
        <span className="text-gold text-[10px] font-bold uppercase tracking-[0.4em] block mb-2">Réservation</span>
        <h2 className="font-display italic text-4xl text-charcoal">Prendre Rendez-vous</h2>
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-1.5">
            <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400 ml-1">Prénom</label>
            <input 
              required
              type="text" 
              placeholder="Ex: Jean"
              className="w-full bg-gray-50 border border-transparent rounded-2xl p-4 focus:ring-1 focus:ring-gold focus:bg-white transition-all outline-none"
              value={formData.firstName}
              onChange={(e) => setFormData({...formData, firstName: e.target.value})}
            />
          </div>
          <div className="space-y-1.5">
            <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400 ml-1">Nom</label>
            <input 
              required
              type="text" 
              placeholder="Ex: Dupont"
              className="w-full bg-gray-50 border border-transparent rounded-2xl p-4 focus:ring-1 focus:ring-gold focus:bg-white transition-all outline-none"
              value={formData.lastName}
              onChange={(e) => setFormData({...formData, lastName: e.target.value})}
            />
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-1.5">
            <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400 ml-1">Téléphone</label>
            <input 
              required
              type="tel" 
              placeholder="06 12 34 56 78"
              className="w-full bg-gray-50 border border-transparent rounded-2xl p-4 focus:ring-1 focus:ring-gold focus:bg-white transition-all outline-none"
              value={formData.phone}
              onChange={(e) => setFormData({...formData, phone: e.target.value})}
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400 ml-1">Date souhaitée</label>
            <input 
              required
              type="date" 
              min={new Date().toISOString().split('T')[0]}
              className="w-full bg-gray-50 border border-transparent rounded-2xl p-4 focus:ring-1 focus:ring-gold focus:bg-white transition-all outline-none"
              value={formData.date}
              onChange={(e) => setFormData({...formData, date: e.target.value})}
            />
          </div>
        </div>

        {formData.date && (
          <div className="space-y-4 animate-in fade-in slide-in-from-top-2 duration-500">
            <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400 ml-1">Choisir une heure disponible</label>
            <div className="grid grid-cols-3 sm:grid-cols-5 gap-3">
              {TIME_SLOTS.map((time) => {
                const isBooked = isSlotBooked(formData.date, time);
                const isSelected = formData.time === time;
                
                return (
                  <button
                    key={time}
                    type="button"
                    disabled={isBooked}
                    onClick={() => setFormData({ ...formData, time })}
                    className={`
                      py-3 px-2 rounded-xl text-xs font-bold transition-all border
                      ${isBooked 
                        ? 'bg-gray-100 text-gray-300 border-gray-100 cursor-not-allowed line-through' 
                        : isSelected
                          ? 'bg-gold text-white border-gold shadow-lg shadow-gold/20'
                          : 'bg-white text-charcoal border-gray-100 hover:border-gold hover:text-gold'
                      }
                    `}
                  >
                    {time}
                    {isBooked && <span className="block text-[8px] font-normal no-underline opacity-60">Occupé</span>}
                  </button>
                );
              })}
            </div>
          </div>
        )}

        <button 
          type="submit" 
          disabled={!formData.time}
          className={`w-full py-5 rounded-2xl font-bold uppercase tracking-[0.2em] text-xs transition-all shadow-lg active:scale-95 mt-4 ${
            formData.time 
            ? 'bg-charcoal text-white hover:bg-gold hover:shadow-gold/20' 
            : 'bg-gray-200 text-gray-400 cursor-not-allowed'
          }`}
        >
          Confirmer la réservation
        </button>
      </form>
    </div>
  );
};

export default BookingForm;
