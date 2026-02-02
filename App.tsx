
import React, { useState, useEffect, useRef } from 'react';
import { Tab, SiteContent, Service, Booking, GalleryImage } from './types';
import { SERVICES } from './constants';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Philosophy from './components/Philosophy';
import Services from './components/Services';
import Hours from './components/Hours';
import Footer from './components/Footer';
import BottomNav from './components/BottomNav';
import BookingForm from './components/BookingForm';
import AdminDashboard from './components/AdminDashboard';
import UserUpload from './components/UserUpload';

const INITIAL_CONTENT: SiteContent = {
  heroTitle: "L'Excellence du Style",
  heroSubtitle: "Découvrez Elit Coiff, votre destination beauté et bien-être au cœur de Saint-Louis.",
  philosophyTitle: "Votre Image, Notre Art",
  philosophyText: "Chez Elit Coiff, nous croyons que chaque coupe est une signature. Situé à Saint-Louis, notre salon combine techniques modernes et savoir-faire traditionnel pour sublimer votre allure unique.",
  phone: "+33 9 50 82 66 80",
  email: "contact@elitcoiff-saintlouis.fr",
  address: "36 Rue de Mulhouse, 68300 Saint-Louis",
  logoUrl: "", 
  heroImageUrl: "https://images.unsplash.com/photo-1585747860715-2ba37e788b70?auto=format&fit=crop&q=80&w=2000",
  services: SERVICES,
  gallery: [
    { id: '1', type: 'hair', src: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&q=80&w=800', title: 'Coupe Homme', category: 'Coiffure' },
    { id: '2', type: 'beard', src: 'https://images.unsplash.com/photo-1599351431202-1e0f0137899a?auto=format&fit=crop&q=80&w=800', title: 'Barbier', category: 'Barbe' },
  ]
};

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<Tab>(Tab.HOME);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isZooming, setIsZooming] = useState(false);
  const bookingRef = useRef<HTMLDivElement>(null);
  
  const [content, setContent] = useState<SiteContent>(() => {
    const saved = localStorage.getItem('elitcoiff_content');
    return saved ? JSON.parse(saved) : INITIAL_CONTENT;
  });
  
  const [bookings, setBookings] = useState<Booking[]>(() => {
    const saved = localStorage.getItem('elitcoiff_bookings');
    return saved ? JSON.parse(saved) : [];
  });

  const [userPhotos, setUserPhotos] = useState<GalleryImage[]>(() => {
    const saved = localStorage.getItem('elitcoiff_user_photos');
    return saved ? JSON.parse(saved) : [];
  });
  
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  const [galleryFilter, setGalleryFilter] = useState<'all' | 'hair' | 'beard' | 'community'>('all');

  useEffect(() => {
    setIsZooming(true);
    const timer = setTimeout(() => setIsZooming(false), 500);
    window.scrollTo({ top: 0, behavior: 'smooth' });
    return () => setTimeout(() => {
      localStorage.setItem('elitcoiff_user_photos', JSON.stringify(userPhotos));
    }, 100);
  }, [activeTab, userPhotos]);

  const updateContent = (key: keyof SiteContent, value: any) => {
    setContent(prev => ({ ...prev, [key]: value }));
    setHasUnsavedChanges(true);
  };

  const saveToStorage = () => {
    localStorage.setItem('elitcoiff_content', JSON.stringify(content));
    setHasUnsavedChanges(false);
    alert('Modifications enregistrées !');
  };

  const handleAddBooking = (newBooking: Booking) => {
    setBookings(prev => [...prev, newBooking]);
    localStorage.setItem('elitcoiff_bookings', JSON.stringify([...bookings, newBooking]));
  };

  const handleDeleteBooking = (id: string) => {
    if (confirm('Supprimer cette réservation ?')) {
      const newBookings = bookings.filter(b => b.id !== id);
      setBookings(newBookings);
      localStorage.setItem('elitcoiff_bookings', JSON.stringify(newBookings));
    }
  };

  const handleUserPhotoUpload = (base64: string) => {
    const newPhoto: GalleryImage = {
      id: Date.now().toString(),
      src: base64,
      title: 'Look Client',
      category: 'Communauté',
      type: 'hair'
    };
    setUserPhotos(prev => [newPhoto, ...prev]);
    setGalleryFilter('community');
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (username === 'admin' && password === '007') {
      setIsLoggedIn(true);
      setUsername('');
      setPassword('');
    } else {
      alert('Identifiants incorrects');
    }
  };

  const scrollToBooking = () => {
    if (activeTab !== Tab.HOME) {
      setActiveTab(Tab.HOME);
      setTimeout(() => bookingRef.current?.scrollIntoView({ behavior: 'smooth' }), 300);
    } else {
      bookingRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const getCombinedGallery = () => {
    if (galleryFilter === 'community') return userPhotos;
    const baseGallery = galleryFilter === 'all' 
      ? content.gallery 
      : content.gallery.filter(img => img.type === galleryFilter);
    return galleryFilter === 'all' ? [...userPhotos, ...baseGallery] : baseGallery;
  };

  const filteredImages = getCombinedGallery();

  return (
    <div className={`min-h-screen bg-background-light selection:bg-gold/30 transition-all duration-500 ${isZooming ? 'scale-[0.99] opacity-90' : 'scale-100 opacity-100'}`}>
      <Navbar onBookingClick={scrollToBooking} />
      
      <main className="pb-24">
        <div key={activeTab} className="animate-zoom-in">
          
          {activeTab === Tab.HOME && (
            <>
              <Hero content={content} updateContent={updateContent} isEditMode={isEditMode} onBookingClick={scrollToBooking} />
              <Philosophy content={content} updateContent={updateContent} isEditMode={isEditMode} />
              <Services content={content} updateContent={updateContent} isEditMode={isEditMode} onServiceClick={scrollToBooking} />
              <div ref={bookingRef} className="py-20 px-8 bg-background-light scroll-mt-24">
                <BookingForm existingBookings={bookings} onAddBooking={handleAddBooking} />
              </div>
              <Hours content={content} updateContent={updateContent} isEditMode={isEditMode} />
              <Footer content={content} updateContent={updateContent} isEditMode={isEditMode} />
            </>
          )}

          {activeTab === Tab.GALLERY && (
            <div className="p-8 max-w-screen-xl mx-auto min-h-screen">
              <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
                <div className="group cursor-default transition-transform duration-500 hover:scale-110 origin-left">
                  <span className="text-gold group-hover:text-charcoal text-[10px] font-bold uppercase tracking-widest transition-colors duration-500">Inspiration</span>
                  <h2 className="text-4xl font-medium font-display italic group-hover:text-gold transition-colors duration-500">Galerie Elit Coiff</h2>
                </div>
                <div className="flex bg-white/50 backdrop-blur-sm p-1.5 rounded-full border border-gray-100 flex-wrap">
                  {[
                    {id: 'all', label: 'Tout'},
                    {id: 'hair', label: 'Coiffure'},
                    {id: 'beard', label: 'Barbe'},
                    {id: 'community', label: 'Communauté'}
                  ].map((cat) => (
                    <button
                      key={cat.id}
                      onClick={() => setGalleryFilter(cat.id as any)}
                      className={`px-6 py-2.5 rounded-full text-[10px] font-bold uppercase tracking-widest transition-all ${
                        galleryFilter === cat.id ? 'bg-charcoal text-white shadow-lg' : 'text-gray-400 hover:text-charcoal'
                      }`}
                    >
                      {cat.label}
                    </button>
                  ))}
                </div>
              </div>

              <UserUpload onImageUpload={handleUserPhotoUpload} />
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredImages.length > 0 ? filteredImages.map((img) => (
                  <div key={img.id} className="group relative overflow-hidden rounded-[2.5rem] aspect-square shadow-md bg-gray-200">
                    <img 
                      src={img.src} 
                      alt={img.title}
                      className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                      onError={(e) => {
                        e.currentTarget.src = "https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&q=80&w=800";
                      }}
                    />
                    <div className="absolute inset-0 bg-charcoal/60 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-8 backdrop-blur-[2px]">
                      <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                        <span className="text-gold text-[9px] uppercase font-bold tracking-[0.3em] mb-2 block">{img.category}</span>
                        <h3 className="text-white font-display italic text-2xl">{img.title}</h3>
                      </div>
                    </div>
                  </div>
                )) : (
                  <div className="col-span-full py-20 text-center text-gray-400 font-light italic">
                    Aucune photo dans cette catégorie pour le moment.
                  </div>
                )}
              </div>
            </div>
          )}

          {activeTab === Tab.ADMIN && (
            <div className="p-8 max-w-5xl mx-auto min-h-[70vh]">
              {!isLoggedIn ? (
                <div className="bg-white p-10 rounded-[2rem] shadow-xl border border-gray-100 w-full max-w-lg mx-auto mt-20">
                  <form onSubmit={handleLogin} className="space-y-4">
                    <h2 className="text-center font-display italic text-3xl mb-8">Accès Admin</h2>
                    <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} className="w-full bg-gray-50 border-none rounded-xl p-4" placeholder="admin" />
                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full bg-gray-50 border-none rounded-xl p-4" placeholder="007" />
                    <button type="submit" className="w-full bg-charcoal text-white py-4 rounded-xl font-bold uppercase tracking-widest text-xs hover:bg-gold transition-all">Connexion</button>
                  </form>
                </div>
              ) : (
                <AdminDashboard 
                  bookings={bookings} 
                  onDeleteBooking={handleDeleteBooking} 
                  content={content} 
                  updateContent={updateContent}
                  setIsEditMode={setIsEditMode}
                  isEditMode={isEditMode}
                  setIsLoggedIn={setIsLoggedIn}
                />
              )}
            </div>
          )}
          
          {activeTab === Tab.SERVICES && <Services content={content} updateContent={updateContent} isEditMode={isEditMode} onServiceClick={scrollToBooking} />}
          {activeTab === Tab.BOOKING && <div className="p-8 max-w-screen-xl mx-auto"><BookingForm existingBookings={bookings} onAddBooking={handleAddBooking} /></div>}
          {activeTab === Tab.CONTACT && <><Hours content={content} updateContent={updateContent} isEditMode={isEditMode} /><Footer content={content} updateContent={updateContent} isEditMode={isEditMode} /></>}
        </div>
      </main>

      {isLoggedIn && hasUnsavedChanges && (
        <div className="fixed bottom-28 left-1/2 -translate-x-1/2 z-[110]">
          <button onClick={saveToStorage} className="bg-gold text-white px-8 py-4 rounded-full shadow-2xl font-bold uppercase tracking-widest text-[10px] animate-bounce">Sauvegarder les modifications</button>
        </div>
      )}

      <BottomNav activeTab={activeTab} setActiveTab={setActiveTab} />
      
      <style>{`
        @keyframes zoom-in { from { transform: scale(0.95); opacity: 0; } to { transform: scale(1); opacity: 1; } }
        .animate-zoom-in { animation: zoom-in 0.6s cubic-bezier(0.23, 1, 0.32, 1) forwards; }
      `}</style>
    </div>
  );
};

export default App;
