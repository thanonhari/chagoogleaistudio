import React from 'react';
import { Facebook, Instagram, Twitter, MapPin, Phone, Mail } from 'lucide-react';
import { useAppContext } from '../context/AppContext';

export const Footer: React.FC = () => {
  const { t } = useAppContext();

  return (
    <footer className="bg-stone-900 dark:bg-black text-stone-400 py-16 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          
          {/* Brand */}
          <div className="space-y-4">
            <h3 className="text-2xl font-serif font-bold text-white">River Tales</h3>
            <p className="text-sm leading-relaxed max-w-xs">
              {t('footer.about')}
            </p>
            <div className="flex space-x-4 pt-2">
              <a href="#" className="hover:text-thai-gold transition-colors"><Facebook size={20} /></a>
              <a href="#" className="hover:text-thai-gold transition-colors"><Instagram size={20} /></a>
              <a href="#" className="hover:text-thai-gold transition-colors"><Twitter size={20} /></a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-medium mb-4 uppercase tracking-wider text-sm">{t('footer.explore')}</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:text-white transition-colors">{t('nav.about')}</a></li>
              <li><a href="#" className="hover:text-white transition-colors">{t('nav.tours')}</a></li>
              <li><a href="#" className="hover:text-white transition-colors">{t('nav.gallery')}</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white font-medium mb-4 uppercase tracking-wider text-sm">{t('footer.contact')}</h4>
            <ul className="space-y-4 text-sm">
              <li className="flex items-start gap-3">
                <MapPin size={18} className="text-thai-gold mt-0.5" />
                <span>123 Na Mueang Road, Chachoengsao City,<br/>Thailand 24000</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone size={18} className="text-thai-gold" />
                <span>+66 38 123 456</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail size={18} className="text-thai-gold" />
                <span>hello@rivertales.th</span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-stone-800 mt-12 pt-8 text-center text-xs">
          <p>&copy; {new Date().getFullYear()} {t('footer.rights')}</p>
        </div>
      </div>
    </footer>
  );
};
