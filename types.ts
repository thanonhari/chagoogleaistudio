export interface Tour {
  id: string;
  title: string;
  description: string;
  price: string;
  duration: string;
  imageUrl: string;
  highlights: string[];
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  text: string;
  timestamp: Date;
}

export enum Section {
  HOME = 'home',
  TOURS = 'tours',
  GALLERY = 'gallery',
  ABOUT = 'about',
  CONTACT = 'contact'
}