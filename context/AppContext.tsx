import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export type Language = 'en' | 'th';
export type Theme = 'light' | 'dark';

interface AppContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  theme: Theme;
  toggleTheme: () => void;
  t: (key: string) => string;
}

const translations: Record<string, Record<Language, string>> = {
  // Navigation
  'nav.home': { en: 'Home', th: 'หน้าหลัก' },
  'nav.about': { en: 'Our Story', th: 'เรื่องราวของเรา' },
  'nav.tours': { en: 'Experience', th: 'ประสบการณ์' },
  'nav.gallery': { en: 'Gallery', th: 'แกลเลอรี' },
  'nav.contact': { en: 'Contact', th: 'ติดต่อเรา' },
  'nav.book': { en: 'Book Now', th: 'จองเลย' },

  // Hero
  'hero.welcome': { en: "Welcome to Thailand's Hidden Gem", th: "ยินดีต้อนรับสู่อัญมณีที่ซ่อนอยู่ของไทย" },
  'hero.title.line1': { en: 'Chachoengsao', th: 'ฉะเชิงเทรา' },
  'hero.title.line2': { en: 'The River City', th: 'เมืองสายน้ำ' },
  'hero.desc': { en: 'Experience the spiritual serenity of Wat Sothon, the vintage charm of 100-year-old markets, and the majestic Bang Pakong River.', th: 'สัมผัสความสงบทางจิตวิญญาณของวัดโสธร เสน่ห์ย้อนยุคของตลาดร้อยปี และความยิ่งใหญ่ของแม่น้ำบางปะกง' },
  'hero.explore': { en: 'Explore Tours', th: 'ดูแพ็คเกจทัวร์' },

  // About
  'about.subtitle': { en: 'Discover Authenticity', th: 'ค้นพบวิถีไทยแท้' },
  'about.title': { en: 'Where Tradition Meets', th: 'เมื่อประเพณีบรรจบกับ' },
  'about.title.highlight': { en: 'Tranquility', th: 'ความสงบ' },
  'about.desc': { en: "Just a short drive from Bangkok, Chachoengsao offers a peaceful escape into Thailand's rich cultural tapestry. From the shimmering roofs of ancient temples to the wooden walkways of century-old markets, every corner tells a story.", th: "เพียงขับรถไม่นานจากกรุงเทพฯ ฉะเชิงเทราคือสถานที่หลีกหนีความวุ่นวายสู่ความสงบ สัมผัสวัฒนธรรมไทยที่งดงาม จากหลังคาวัดที่ระยิบระยับสู่ทางเดินไม้ของตลาดเก่าแก่นับศตวรรษ ทุกมุมล้วนมีเรื่องราว" },
  'about.yearround': { en: 'Year-Round', th: 'เที่ยวได้ตลอดปี' },
  'about.yearround.desc': { en: 'Perfect for any season', th: 'เหมาะสำหรับทุกฤดูกาล' },
  'about.toprated': { en: 'Top Rated', th: 'ยอดนิยม' },
  'about.toprated.desc': { en: 'Curated experiences', th: 'ประสบการณ์ที่คัดสรรแล้ว' },
  'about.quote': { en: '"The river whispers stories of the past to those who listen."', th: '"สายน้ำกระซิบเรื่องราวในอดีตแก่ผู้ที่ตั้งใจฟัง"' },

  // Tours
  'tours.subtitle': { en: 'Curated Packages', th: 'แพ็คเกจคัดพิเศษ' },
  'tours.title': { en: 'Unforgettable Journeys', th: 'การเดินทางที่น่าจดจำ' },
  'tour.view_details': { en: 'View Details', th: 'ดูรายละเอียด' },
  'tour.guided': { en: 'Guided Tour', th: 'มีไกด์นำเที่ยว' },
  'tour.1.title': { en: 'Spiritual Temple Journey', th: 'เส้นทางศรัทธามหามงคล' },
  'tour.1.desc': { en: 'Visit the revered Wat Sothon Wararam Worawihan and witness the stunning Pink Ganesha. A day of merit-making.', th: 'สักการะหลวงพ่อโสธร ณ วัดโสธรวรารามวรวิหาร และชมพระพิฆเนศองค์ใหญ่สีชมพู วันแห่งการทำบุญและสิริมงคล' },
  'tour.1.duration': { en: 'Full Day', th: 'เต็มวัน' },
  'tour.2.title': { en: 'Bang Pakong River Cruise', th: 'ล่องเรือแม่น้ำบางปะกง' },
  'tour.2.desc': { en: 'Drift along the lifeblood of the province. Enjoy a traditional Thai lunch on board while watching local life.', th: 'ล่องเรือชมวิถีชีวิตริมน้ำบางปะกง เพลิดเพลินกับอาหารกลางวันแบบไทยดั้งเดิมบนเรือ' },
  'tour.2.duration': { en: '4 Hours', th: '4 ชั่วโมง' },
  'tour.3.title': { en: 'Vintage Market Nostalgia', th: 'ย้อนรอยตลาดเก่า' },
  'tour.3.desc': { en: 'Step back in time at the 100-year-old Klong Suan Market. Taste authentic local snacks like Khanom Chak.', th: 'ย้อนเวลากลับไปที่ตลาดคลองสวน 100 ปี ลิ้มรสขนมจากและกาแฟโบราณ' },
  'tour.3.duration': { en: 'Half Day', th: 'ครึ่งวัน' },

  // Gallery
  'gallery.subtitle': { en: 'Visual Journey', th: 'การเดินทางผ่านภาพถ่าย' },
  'gallery.title': { en: 'Glimpses of Chachoengsao', th: 'มนต์เสน่ห์ฉะเชิงเทรา' },
  'gallery.desc': { en: 'Immerse yourself in the vibrant colors, spiritual aura, and rustic charm of our province through our lens.', th: 'ดื่มด่ำกับสีสันอันสดใส พลังแห่งศรัทธา และเสน่ห์ของวิถีชีวิตท้องถิ่นผ่านมุมมองของเรา' },
  'gallery.cat.all': { en: 'All', th: 'ทั้งหมด' },
  'gallery.cat.temples': { en: 'Temples', th: 'วัดวาอาราม' },
  'gallery.cat.markets': { en: 'Markets', th: 'ตลาดเก่า' },
  'gallery.cat.nature': { en: 'Nature', th: 'ธรรมชาติ' },
  'gallery.cat.culinary': { en: 'Culinary', th: 'อาหาร' },
  
  // Gallery Captions
  'gallery.cap.1': { en: 'Wat Sothon Wararam Worawihan', th: 'วัดโสธรวรารามวรวิหาร' },
  'gallery.cap.2': { en: 'Golden Spires of Faith', th: 'ยอดพระอุโบสถสีทอง' },
  'gallery.cap.3': { en: 'Temple at Twilight', th: 'วัดยามพลบค่ำ' },
  'gallery.cap.4': { en: 'Vintage Charm of Market', th: 'เสน่ห์ตลาดเก่า' },
  'gallery.cap.5': { en: 'Traditional Coffee', th: 'กาแฟโบราณ' },
  'gallery.cap.6': { en: 'Cruising the Bang Pakong', th: 'ล่องเรือบางปะกง' },
  'gallery.cap.7': { en: 'River Life Serenity', th: 'วิถีชีวิตริมน้ำ' },
  'gallery.cap.8': { en: 'Sweet Golden Mangoes', th: 'มะม่วงน้ำดอกไม้สีทอง' },
  'gallery.cap.9': { en: 'Khanom Chak Grilled Sweets', th: 'ขนมจากปิ้งร้อนๆ' },

  // Parallax
  'parallax.title': { en: 'Plan Your Perfect Trip', th: 'วางแผนการเดินทางของคุณ' },
  'parallax.desc': { en: 'Not sure where to start? Let our AI-powered local guide, Siri-Sorn, craft a personalized itinerary just for you.', th: 'ไม่รู้จะเริ่มที่ไหน? ให้ "ศิริสอน" ไกด์ AI ท้องถิ่นของเราช่วยวางแผนการเดินทางให้คุณ' },
  'parallax.contact': { en: 'Contact Us', th: 'ติดต่อเรา' },

  // Contact
  'contact.subtitle': { en: 'Get in Touch', th: 'ติดต่อสอบถาม' },
  'contact.title': { en: 'Begin Your Adventure', th: 'เริ่มต้นการผจญภัย' },
  'contact.name': { en: 'Name', th: 'ชื่อ' },
  'contact.email': { en: 'Email', th: 'อีเมล' },
  'contact.message': { en: 'Message', th: 'ข้อความ' },
  'contact.send': { en: 'Send Inquiry', th: 'ส่งข้อความ' },

  // Footer
  'footer.about': { en: 'Curating authentic experiences in Chachoengsao. We believe in sustainable tourism that honors the local culture and the majestic Bang Pakong river.', th: 'คัดสรรประสบการณ์ท่องเที่ยวฉะเชิงเทราแบบเจาะลึก เราเชื่อในการท่องเที่ยวแบบยั่งยืนที่เคารพวัฒนธรรมท้องถิ่นและแม่น้ำบางปะกง' },
  'footer.explore': { en: 'Explore', th: 'สำรวจ' },
  'footer.contact': { en: 'Contact Us', th: 'ติดต่อเรา' },
  'footer.rights': { en: 'Chachoengsao River Tales. All rights reserved.', th: 'River Tales ฉะเชิงเทรา สงวนลิขสิทธิ์' },

  // AI Guide
  'ai.button': { en: 'Ask AI Guide', th: 'ถามไกด์ AI' },
  'ai.title': { en: 'Siri-Sorn', th: 'ศิริสอน' },
  'ai.subtitle': { en: 'AI Local Expert', th: 'ผู้เชี่ยวชาญท้องถิ่น' },
  'ai.welcome': { en: 'Sawasdee! I am Siri-Sorn, your personal guide to Chachoengsao. Ask me about the best times to visit temples, local food recommendations, or how to get here!', th: 'สวัสดีค่ะ! หนูชื่อศิริสอน เป็นไกด์ส่วนตัวของคุณในฉะเชิงเทรา ถามหนูได้ทุกเรื่องเลยนะคะ ไม่ว่าจะเป็นเวลาที่ดีที่สุดในการไหว้พระ ร้านอาหารเด็ดๆ หรือวิธีเดินทางมาที่นี่!' },
  'ai.placeholder': { en: 'Ask about food, temples...', th: 'ถามเกี่ยวกับอาหาร, วัด...' },
  'ai.loading': { en: 'Consulting the spirits...', th: 'กำลังปรึกษาเจ้าที่...' },
  'ai.disclaimer': { en: 'AI can make mistakes. Please verify important travel details.', th: 'AI อาจมีข้อผิดพลาด โปรดตรวจสอบข้อมูลสำคัญอีกครั้ง' },
};

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('en');
  const [theme, setTheme] = useState<Theme>('light');

  useEffect(() => {
    // Check system preference or saved theme
    const savedTheme = localStorage.getItem('theme') as Theme;
    if (savedTheme) {
      setTheme(savedTheme);
    } else if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
      setTheme('dark');
    }
  }, []);

  useEffect(() => {
    const root = window.document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  const t = (key: string) => {
    return translations[key]?.[language] || key;
  };

  return (
    <AppContext.Provider value={{ language, setLanguage, theme, toggleTheme, t }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};
