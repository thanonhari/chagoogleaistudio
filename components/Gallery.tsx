import React, { useState, useEffect } from 'react';
import { X, ZoomIn, ImageOff, Facebook, Twitter, Link as LinkIcon, Check } from 'lucide-react';
import { useAppContext } from '../context/AppContext';

interface GalleryImage {
  id: string;
  src: string;
  categoryKey: string;
  captionKey: string;
}

const GALLERY_IMAGES: GalleryImage[] = [
  // Temples
  {
    id: '1',
    src: 'https://images.unsplash.com/photo-1548013146-72479768bada?q=80&w=1200&auto=format&fit=crop', // Wat Sothon style
    categoryKey: 'gallery.cat.temples',
    captionKey: 'gallery.cap.1'
  },
  {
    id: '2',
    src: 'https://images.unsplash.com/photo-1590422915835-1d683783a382?q=80&w=1200&auto=format&fit=crop', // Golden Temple style
    categoryKey: 'gallery.cat.temples',
    captionKey: 'gallery.cap.2'
  },
  {
    id: '3',
    src: 'https://images.unsplash.com/photo-1599554316656-96a575458060?q=80&w=1200&auto=format&fit=crop', // Pink Ganesha / Statue style
    categoryKey: 'gallery.cat.temples',
    captionKey: 'gallery.cap.3'
  },
  // Markets
  {
    id: '4',
    src: 'https://images.unsplash.com/photo-1533929736472-594e45aa8bb6?q=80&w=1200&auto=format&fit=crop', // Wooden market
    categoryKey: 'gallery.cat.markets',
    captionKey: 'gallery.cap.4'
  },
  {
    id: '5',
    src: 'https://images.unsplash.com/photo-1510526084992-628d0119e79d?q=80&w=1200&auto=format&fit=crop', // Traditional coffee/drinks
    categoryKey: 'gallery.cat.markets',
    captionKey: 'gallery.cap.5'
  },
  // Nature / River
  {
    id: '6',
    src: 'https://images.unsplash.com/photo-1562602833-0f4ab2fc46e3?q=80&w=1200&auto=format&fit=crop', // River scenic
    categoryKey: 'gallery.cat.nature',
    captionKey: 'gallery.cap.6'
  },
  {
    id: '7',
    src: 'https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?q=80&w=1200&auto=format&fit=crop', // Boat on water
    categoryKey: 'gallery.cat.nature',
    captionKey: 'gallery.cap.7'
  },
  // Culinary
  {
    id: '8',
    src: 'https://images.unsplash.com/photo-1601342630318-7740cb4e9d6d?q=80&w=1200&auto=format&fit=crop', // Mangoes
    categoryKey: 'gallery.cat.culinary',
    captionKey: 'gallery.cap.8'
  },
  {
    id: '9',
    src: 'https://images.unsplash.com/photo-1524108873098-b86db822bf85?q=80&w=1200&auto=format&fit=crop', // Grilled snacks (Khanom Chak vibe)
    categoryKey: 'gallery.cat.culinary',
    captionKey: 'gallery.cap.9'
  }
];

interface GalleryItemProps {
  image: GalleryImage;
  onClick: (image: GalleryImage) => void;
}

const GalleryItem: React.FC<GalleryItemProps> = ({ image, onClick }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);
  const { t } = useAppContext();

  const handleImageLoad = () => {
    setIsLoaded(true);
  };

  const handleImageError = () => {
    setHasError(true);
    setIsLoaded(true); // Stop loading skeleton
  };

  if (hasError) {
    return (
      <div className="aspect-square w-full h-full bg-stone-50 dark:bg-stone-900 rounded-lg flex items-center justify-center border border-stone-100 dark:border-stone-800">
        <div className="flex flex-col items-center gap-2">
           <ImageOff className="text-thai-gold/30 dark:text-thai-gold/20 w-8 h-8" strokeWidth={1.5} />
        </div>
      </div>
    );
  }

  return (
    <div 
      className="relative group cursor-pointer overflow-hidden rounded-lg bg-stone-200 dark:bg-stone-800 aspect-square"
      onClick={() => onClick(image)}
    >
      <img
        src={image.src}
        alt={t(image.captionKey)}
        loading="lazy"
        onLoad={handleImageLoad}
        onError={handleImageError}
        className={`w-full h-full object-cover transition-all duration-700 ease-out transform group-hover:scale-110 ${
          isLoaded ? 'opacity-100 blur-0' : 'opacity-0 blur-sm'
        }`}
      />
      
      {/* Hover Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-stone-900/90 via-stone-900/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
        <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
          <div className="flex items-center gap-2 text-thai-gold mb-1">
            <ZoomIn size={16} />
            <span className="text-xs font-bold tracking-wider uppercase">{t(image.categoryKey)}</span>
          </div>
          <p className="text-white font-serif text-lg leading-tight">
            {t(image.captionKey)}
          </p>
        </div>
      </div>
    </div>
  );
};

export const Gallery: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null);
  const [copied, setCopied] = useState(false);
  const { t } = useAppContext();

  const categories = ['all', 'temples', 'markets', 'nature', 'culinary'];

  const filteredImages = activeCategory === 'all' 
    ? GALLERY_IMAGES 
    : GALLERY_IMAGES.filter(img => img.categoryKey === `gallery.cat.${activeCategory}`);

  useEffect(() => {
    setCopied(false);
  }, [selectedImage]);

  const handleCopy = (url: string) => {
    navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const shareFacebook = (url: string) => {
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`, '_blank');
  };

  const shareTwitter = (text: string, url: string) => {
    window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`, '_blank');
  };

  return (
    <section className="py-24 bg-white dark:bg-stone-900 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center mb-12 space-y-4">
          <span className="text-thai-gold font-bold uppercase tracking-widest text-sm">{t('gallery.subtitle')}</span>
          <h2 className="text-4xl font-serif text-stone-900 dark:text-white">{t('gallery.title')}</h2>
          <p className="text-stone-600 dark:text-stone-300 max-w-2xl mx-auto">
            {t('gallery.desc')}
          </p>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                activeCategory === cat
                  ? 'bg-river-blue dark:bg-thai-gold text-white shadow-md transform scale-105'
                  : 'bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-300 hover:bg-stone-200 dark:hover:bg-stone-700'
              }`}
            >
              {t(`gallery.cat.${cat}`)}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {filteredImages.map((image) => (
            <GalleryItem 
              key={image.id} 
              image={image} 
              onClick={setSelectedImage} 
            />
          ))}
        </div>
      </div>

      {/* Lightbox Modal */}
      {selectedImage && (
        <div className="fixed inset-0 z-50 bg-black/95 backdrop-blur-sm flex items-center justify-center p-4 animate-fadeIn">
          <button 
            onClick={() => setSelectedImage(null)}
            className="absolute top-6 right-6 text-white/70 hover:text-white transition-colors bg-white/10 p-2 rounded-full"
          >
            <X size={32} />
          </button>
          
          <div className="max-w-5xl w-full max-h-[90vh] flex flex-col items-center">
            <img 
              src={selectedImage.src} 
              alt={t(selectedImage.captionKey)} 
              className="max-w-full max-h-[70vh] object-contain rounded-lg shadow-2xl"
            />
            
            <div className="mt-6 text-center w-full">
              <span className="text-thai-gold text-sm font-bold tracking-widest uppercase block mb-2">
                {t(selectedImage.categoryKey)}
              </span>
              <h3 className="text-white font-serif text-2xl md:text-3xl mb-6">
                {t(selectedImage.captionKey)}
              </h3>
              
              {/* Share Buttons */}
              <div className="flex items-center justify-center gap-4">
                <button 
                  onClick={() => shareFacebook(selectedImage.src)}
                  className="p-3 rounded-full bg-white/10 hover:bg-thai-gold text-white transition-all duration-300 backdrop-blur-sm"
                  title="Share on Facebook"
                >
                  <Facebook size={20} />
                </button>
                <button 
                  onClick={() => shareTwitter(t(selectedImage.captionKey), selectedImage.src)}
                  className="p-3 rounded-full bg-white/10 hover:bg-thai-gold text-white transition-all duration-300 backdrop-blur-sm"
                  title="Share on Twitter"
                >
                  <Twitter size={20} />
                </button>
                <button 
                  onClick={() => handleCopy(selectedImage.src)}
                  className="p-3 rounded-full bg-white/10 hover:bg-thai-gold text-white transition-all duration-300 backdrop-blur-sm flex items-center justify-center"
                  title="Copy Image Link"
                >
                  {copied ? <Check size={20} /> : <LinkIcon size={20} />}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
