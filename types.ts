
export enum Tab {
  HOME = 'home',
  SERVICES = 'services',
  BOOKING = 'booking',
  GALLERY = 'gallery',
  CONTACT = 'contact',
  ADMIN = 'admin'
}

export interface Service {
  id: string;
  name: string;
  description: string;
  price: string;
  icon: string;
}

export interface Booking {
  id: string;
  firstName: string;
  lastName: string;
  phone: string;
  date: string; // YYYY-MM-DD
  time: string; // HH:MM
}

export interface GalleryImage {
  id: string;
  src: string;
  title: string;
  category: string;
  type: 'hair' | 'beard';
}

export interface SiteContent {
  heroTitle: string;
  heroSubtitle: string;
  philosophyTitle: string;
  philosophyText: string;
  phone: string;
  email: string;
  address: string;
  logoUrl: string;
  heroImageUrl: string;
  services: Service[];
  gallery: GalleryImage[];
}
