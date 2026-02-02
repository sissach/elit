
import { Service } from './types';

export const SERVICES: Service[] = [
  {
    id: '1',
    name: 'Coupe Haute Couture',
    description: 'Design personnalisé, visagisme et dégradés de précision.',
    price: '55€',
    icon: 'content_cut'
  },
  {
    id: '5',
    name: 'Barbe & Style Traditionnel',
    description: 'Taille de barbe, contours au rasoir et finitions précises.',
    price: '35€',
    icon: 'face'
  },
  {
    id: '2',
    name: 'Coloration & Éclat',
    description: 'Balayage, ombré et rituels de brillance.',
    price: '85€',
    icon: 'palette'
  },
  {
    id: '3',
    name: 'Soins Profonds',
    description: 'Protocoles revitalisants et soins du cuir chevelu.',
    price: '40€',
    icon: 'auto_awesome'
  },
  {
    id: '4',
    name: 'Brushing Prestige',
    description: 'Mise en forme, volume et finition soyeuse.',
    price: '35€',
    icon: 'wind_power'
  }
];

// Utilisation de la nouvelle image premium pour l'accueil
export const HERO_IMAGE = "input_file_6.png";
