import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { TourCard } from './components/TourCard';
import { AIGuide } from './components/AIGuide';
import { Footer } from './components/Footer';
import { Gallery } from './components/Gallery';
import { Tour, Section } from './types';
import { MapPin, Calendar, Star } from 'lucide-react';
import { AppProvider, useAppContext } from './context/AppContext';

// Component wrapper to access context
const MainContent: React.FC = () => {
  const [currentSection, setCurrentSection] = useState<Section>(Section.HOME);
  const { t } = useAppContext();

  const scrollToSection = (section: Section) => {
    setCurrentSection(section);
    const element = document.getElementById(section);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const TOURS: Tour[] = [
    {
      id: '1',
      title: t('tour.1.title'),
      description: t('tour.1.desc'),
      price: '฿1,500',
      duration: t('tour.1.duration'),
      imageUrl: 'https://images.unsplash.com/photo-1548013146-72479768bada?q=80&w=1200', // Gold temple
      highlights: ['Wat Sothon', 'Pink Ganesha', 'Blessing Ceremony']
    },
    {
      id: '2',
      title: t('tour.2.title'),
      description: t('tour.2.desc'),
      price: '฿2,200',
      duration: t('tour.2.duration'),
      imageUrl: 'https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?q=80&w=800',
      highlights: ['River Lunch', 'Sunset View', 'Local History']
    },
    {
      id: '3',
      title: t('tour.3.title'),
      description: t('tour.3.desc'),
      price: '฿1,200',
      duration: t('tour.3.duration'),
      imageUrl: 'https://images.unsplash.com/photo-1533929736472-594e45aa8bb6?q=80&w=800',
      highlights: ['Old Market', 'Street Food', 'Walking Tour']
    }
  ];

  return (
    <div className="min-h-screen bg-stone-50 dark:bg-stone-950 transition-colors duration-300">
      <Navbar currentSection={currentSection} onNavigate={scrollToSection} />
      
      {/* Home Section */}
      <div id={Section.HOME}>
        <Hero onExplore={() => scrollToSection(Section.TOURS)} />
      </div>

      {/* About Section - Brief Intro */}
      <section id={Section.ABOUT} className="py-24 bg-white dark:bg-stone-900 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <div className="space-y-6">
              <span className="text-thai-gold font-bold uppercase tracking-widest text-sm">{t('about.subtitle')}</span>
              <h2 className="text-4xl md:text-5xl font-serif text-stone-900 dark:text-white leading-tight">
                {t('about.title')} <br/>
                <span className="text-river-blue dark:text-teal-500">{t('about.title.highlight')}</span>
              </h2>
              <p className="text-stone-600 dark:text-stone-300 text-lg leading-relaxed">
                {t('about.desc')}
              </p>
              
              <div className="grid grid-cols-2 gap-8 pt-4">
                <div className="flex flex-col gap-2">
                  <div className="w-12 h-12 bg-stone-100 dark:bg-stone-800 rounded-full flex items-center justify-center text-thai-gold">
                    <Calendar size={24} />
                  </div>
                  <h4 className="font-bold text-stone-900 dark:text-white">{t('about.yearround')}</h4>
                  <p className="text-sm text-stone-500 dark:text-stone-400">{t('about.yearround.desc')}</p>
                </div>
                <div className="flex flex-col gap-2">
                  <div className="w-12 h-12 bg-stone-100 dark:bg-stone-800 rounded-full flex items-center justify-center text-thai-gold">
                    <Star size={24} />
                  </div>
                  <h4 className="font-bold text-stone-900 dark:text-white">{t('about.toprated')}</h4>
                  <p className="text-sm text-stone-500 dark:text-stone-400">{t('about.toprated.desc')}</p>
                </div>
              </div>
            </div>
            
            <div className="relative">
              <div className="absolute -top-4 -left-4 w-24 h-24 bg-thai-gold/20 rounded-tl-3xl -z-10"></div>
              <img 
                src="https://images.unsplash.com/photo-1528181304800-259b0884855d?q=80&w=800&auto=format&fit=crop" 
                alt="Thai Culture" 
                className="w-full h-[500px] object-cover rounded-lg shadow-2xl"
              />
              <div className="absolute -bottom-6 -right-6 bg-white dark:bg-stone-800 p-6 rounded-lg shadow-xl max-w-xs hidden md:block border border-stone-100 dark:border-stone-700">
                <p className="font-serif italic text-stone-600 dark:text-stone-300 text-lg">{t('about.quote')}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Tours Section */}
      <section id={Section.TOURS} className="py-24 bg-stone-100 dark:bg-stone-950 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 space-y-4">
            <span className="text-thai-gold font-bold uppercase tracking-widest text-sm">{t('tours.subtitle')}</span>
            <h2 className="text-4xl font-serif text-stone-900 dark:text-white">{t('tours.title')}</h2>
            <div className="w-20 h-1 bg-thai-gold mx-auto"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {TOURS.map(tour => (
              <TourCard key={tour.id} tour={tour} />
            ))}
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <div id={Section.GALLERY}>
        <Gallery />
      </div>

      {/* Parallax / Feature Strip */}
      <section className="relative py-32 bg-fixed bg-cover bg-center" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1506665531195-3566af2b4dfa?q=80&w=2670&auto=format&fit=crop')" }}>
        <div className="absolute inset-0 bg-river-blue/80 dark:bg-black/80 mix-blend-multiply"></div>
        <div className="relative z-10 text-center text-white px-4">
          <MapPin size={48} className="mx-auto mb-6 text-thai-gold" />
          <h2 className="text-4xl md:text-5xl font-serif mb-6">{t('parallax.title')}</h2>
          <p className="text-xl max-w-2xl mx-auto font-light mb-8 text-white/90">
            {t('parallax.desc')}
          </p>
          <button 
            onClick={() => scrollToSection(Section.CONTACT)}
            className="bg-white text-river-blue px-8 py-3 rounded-full font-bold hover:bg-thai-gold hover:text-white transition-colors duration-300"
          >
            {t('parallax.contact')}
          </button>
        </div>
      </section>

      {/* Contact Section */}
      <section id={Section.CONTACT} className="py-24 bg-white dark:bg-stone-900 transition-colors duration-300">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="text-thai-gold font-bold uppercase tracking-widest text-sm">{t('contact.subtitle')}</span>
          <h2 className="text-4xl font-serif text-stone-900 dark:text-white mb-8">{t('contact.title')}</h2>
          <form className="space-y-6 text-left" onSubmit={(e) => e.preventDefault()}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-stone-700 dark:text-stone-300 mb-1">{t('contact.name')}</label>
                <input type="text" className="w-full px-4 py-3 bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 rounded-lg focus:ring-2 focus:ring-thai-gold focus:border-transparent outline-none transition-all dark:text-white" />
              </div>
              <div>
                <label className="block text-sm font-medium text-stone-700 dark:text-stone-300 mb-1">{t('contact.email')}</label>
                <input type="email" className="w-full px-4 py-3 bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 rounded-lg focus:ring-2 focus:ring-thai-gold focus:border-transparent outline-none transition-all dark:text-white" />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-stone-700 dark:text-stone-300 mb-1">{t('contact.message')}</label>
              <textarea rows={4} className="w-full px-4 py-3 bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 rounded-lg focus:ring-2 focus:ring-thai-gold focus:border-transparent outline-none transition-all dark:text-white"></textarea>
            </div>
            <button className="w-full bg-river-blue dark:bg-thai-gold text-white font-bold py-4 rounded-lg hover:bg-stone-800 dark:hover:bg-white dark:hover:text-stone-900 transition-colors shadow-lg">
              {t('contact.send')}
            </button>
          </form>
        </div>
      </section>

      <Footer />
      <AIGuide />
    </div>
  );
};

const App: React.FC = () => {
  return (
    <AppProvider>
      <MainContent />
    </AppProvider>
  );
};

export default App;
