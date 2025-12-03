import React from 'react';
import { ChevronDown } from 'lucide-react';
import { Section } from '../types';
import { useAppContext } from '../context/AppContext';

interface HeroProps {
  onExplore: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onExplore }) => {
  const { t } = useAppContext();

  return (
    <header className="relative h-screen w-full overflow-hidden flex items-center justify-center text-center">
      {/* Background Image with Overlay */}
      <div 
        className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1562602833-0f4ab2fc46e3?q=80&w=2000&auto=format&fit=crop')`,
        }}
      >
        <div className="absolute inset-0 bg-black/40 mix-blend-multiply"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 px-4 max-w-4xl mx-auto space-y-6 animate-fade-in-up">
        <span className="text-thai-gold font-sans font-medium tracking-[0.2em] uppercase text-sm md:text-base mb-2 block">
          {t('hero.welcome')}
        </span>
        <h1 className="text-5xl md:text-7xl lg:text-8xl font-serif text-white leading-tight font-medium">
          {t('hero.title.line1')} <br />
          <span className="italic text-white/90">{t('hero.title.line2')}</span>
        </h1>
        <p className="text-white/80 text-lg md:text-xl font-light max-w-2xl mx-auto leading-relaxed">
          {t('hero.desc')}
        </p>
        
        <div className="pt-8">
          <button 
            onClick={onExplore}
            className="group relative inline-flex items-center justify-center px-8 py-3 overflow-hidden font-medium text-white transition duration-300 ease-out border-2 border-white rounded-full shadow-md"
          >
            <span className="absolute inset-0 flex items-center justify-center w-full h-full text-white duration-300 -translate-x-full bg-thai-gold group-hover:translate-x-0 ease">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
            </span>
            <span className="absolute flex items-center justify-center w-full h-full text-white transition-all duration-300 transform group-hover:translate-x-full ease">{t('hero.explore')}</span>
            <span className="relative invisible">{t('hero.explore')}</span>
          </button>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce z-10 text-white/70">
        <ChevronDown size={32} />
      </div>
    </header>
  );
};
