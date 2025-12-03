import React from 'react';
import { Clock, Tag } from 'lucide-react';
import { Tour } from '../types';
import { useAppContext } from '../context/AppContext';

interface TourCardProps {
  tour: Tour;
}

export const TourCard: React.FC<TourCardProps> = ({ tour }) => {
  const { t } = useAppContext();
  
  return (
    <div className="group bg-white dark:bg-stone-900 rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border border-transparent dark:border-stone-800">
      <div className="relative h-64 overflow-hidden">
        <img 
          src={tour.imageUrl} 
          alt={tour.title} 
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute top-4 right-4 bg-white/90 backdrop-blur text-stone-900 px-4 py-1 rounded-full text-sm font-bold shadow-sm">
          {tour.price}
        </div>
      </div>
      
      <div className="p-6">
        <h3 className="text-2xl font-serif text-stone-900 dark:text-white mb-2 group-hover:text-river-blue dark:group-hover:text-thai-gold transition-colors">
          {tour.title}
        </h3>
        
        <div className="flex items-center gap-4 text-stone-500 dark:text-stone-400 text-sm mb-4">
          <div className="flex items-center gap-1">
            <Clock size={16} />
            <span>{tour.duration}</span>
          </div>
          <div className="flex items-center gap-1">
            <Tag size={16} />
            <span>{t('tour.guided')}</span>
          </div>
        </div>

        <p className="text-stone-600 dark:text-stone-300 mb-6 line-clamp-3">
          {tour.description}
        </p>

        <div className="flex flex-wrap gap-2 mb-6">
          {tour.highlights.slice(0, 3).map((tag, idx) => (
            <span key={idx} className="bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-300 px-3 py-1 rounded-md text-xs font-medium uppercase tracking-wider">
              {tag}
            </span>
          ))}
        </div>

        <button className="w-full bg-stone-900 dark:bg-stone-800 text-white py-3 rounded-lg font-medium tracking-wide hover:bg-thai-gold dark:hover:bg-thai-gold transition-colors duration-300">
          {t('tour.view_details')}
        </button>
      </div>
    </div>
  );
};
