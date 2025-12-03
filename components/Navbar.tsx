import React, { useState, useEffect } from 'react';
import { Menu, X, Compass, Moon, Sun, Globe } from 'lucide-react';
import { Section } from '../types';
import { useAppContext } from '../context/AppContext';

interface NavbarProps {
  currentSection: Section;
  onNavigate: (section: Section) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ currentSection, onNavigate }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { language, setLanguage, theme, toggleTheme, t } = useAppContext();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { id: Section.HOME, label: t('nav.home') },
    { id: Section.ABOUT, label: t('nav.about') },
    { id: Section.TOURS, label: t('nav.tours') },
    { id: Section.GALLERY, label: t('nav.gallery') },
    { id: Section.CONTACT, label: t('nav.contact') },
  ];

  const toggleLanguage = () => {
    setLanguage(language === 'en' ? 'th' : 'en');
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-white/90 dark:bg-stone-900/90 backdrop-blur-md shadow-sm py-4 text-stone-800 dark:text-stone-100' 
          : 'bg-transparent py-6 text-white'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
        <div 
          className="flex items-center gap-2 cursor-pointer group"
          onClick={() => onNavigate(Section.HOME)}
        >
          <Compass className={`w-8 h-8 ${isScrolled ? 'text-thai-gold' : 'text-white'} transition-colors`} />
          <span className="font-serif text-2xl font-bold tracking-wide">River Tales</span>
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-8">
          {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => onNavigate(link.id)}
              className={`text-sm font-medium tracking-widest uppercase hover:text-thai-gold transition-colors ${
                currentSection === link.id ? 'text-thai-gold underline underline-offset-4' : ''
              }`}
            >
              {link.label}
            </button>
          ))}
          
          <div className="h-6 w-px bg-current opacity-20 mx-2"></div>

          {/* Settings Toggles */}
          <div className="flex items-center gap-4">
             <button 
              onClick={toggleLanguage}
              className="flex items-center gap-1 text-sm font-medium hover:text-thai-gold transition-colors"
             >
                <Globe size={18} />
                <span>{language.toUpperCase()}</span>
             </button>

             <button 
              onClick={toggleTheme}
              className="hover:text-thai-gold transition-colors"
             >
                {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
             </button>
          </div>

          <button 
            className={`px-6 py-2 rounded-full border transition-all hover:bg-thai-gold hover:border-thai-gold hover:text-white ${
              isScrolled ? 'border-stone-300 dark:border-stone-600' : 'border-white'
            }`}
            onClick={() => onNavigate(Section.TOURS)}
          >
            {t('nav.book')}
          </button>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center gap-4">
          <button 
              onClick={toggleTheme}
              className={`${isScrolled ? 'text-stone-800 dark:text-white' : 'text-white'}`}
             >
                {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
          </button>
          <button 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className={`${isScrolled ? 'text-stone-800 dark:text-white' : 'text-white'}`}
          >
            {isMobileMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-white dark:bg-stone-900 shadow-lg py-6 flex flex-col items-center gap-6 text-stone-800 dark:text-stone-100 animate-fadeIn border-t dark:border-stone-800">
          {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => {
                onNavigate(link.id);
                setIsMobileMenuOpen(false);
              }}
              className="text-lg font-medium"
            >
              {link.label}
            </button>
          ))}
          <div className="w-16 h-px bg-stone-200 dark:bg-stone-700 my-2"></div>
          <button onClick={toggleLanguage} className="flex items-center gap-2">
            <Globe size={18} />
            <span>Switch to {language === 'en' ? 'Thai' : 'English'}</span>
          </button>
        </div>
      )}
    </nav>
  );
};
