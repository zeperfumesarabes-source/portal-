import React, { useState, useEffect } from 'react';
import { MessageSquare } from 'lucide-react';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import Simulator from './components/Simulator';
import Categories from './components/Categories';
import Features from './components/Features';
import ContactSection from './components/ContactSection';
import Footer from './components/Footer';
import AdminPanel from './components/AdminPanel';
import { getWhatsAppLink, logWhatsAppClick } from './data';

export default function App() {
  const [isAdmin, setIsAdmin] = useState<boolean>(false);

  useEffect(() => {
    // Check initial hash
    const checkHash = () => {
      setIsAdmin(window.location.hash === '#admin');
    };
    checkHash();

    // Listen to changes
    window.addEventListener('hashchange', checkHash);
    return () => window.removeEventListener('hashchange', checkHash);
  }, []);

  const handleFloatingWap = () => {
    const message = 'Olá! Acessei o site através do celular e gostaria de atendimento imediato para meus pontos Livelo.';
    logWhatsAppClick('Floating Widget', message);
    window.open(getWhatsAppLink(message), '_blank');
  };

  const handleBackToSite = () => {
    window.location.hash = '';
    setIsAdmin(false);
  };

  if (isAdmin) {
    return <AdminPanel onBack={handleBackToSite} />;
  }

  return (
    <div className="relative min-h-screen bg-[#070B19] text-slate-100 flex flex-col justify-between selection:bg-[#E6007E]/30 selection:text-white">
      
      {/* Decorative overhead subtle grid or mesh */}
      <div className="absolute top-0 inset-x-0 h-[600px] bg-[linear-gradient(to_right,#0d1636_1px,transparent_1px),linear-gradient(to_bottom,#0d1636_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-30 pointer-events-none"></div>

      {/* Main Page Layout */}
      <div>
        <Navbar />
        <main>
          <HeroSection />
          <Simulator />
          <Categories />
          <Features />
          <ContactSection />
        </main>
        <Footer />
      </div>

      {/* Floating Interactive WhatsApp Bubble */}
      <button
        onClick={handleFloatingWap}
        id="floating-whatsapp-bubble"
        aria-label="Falar no WhatsApp"
        className="fixed bottom-6 right-6 z-50 bg-[#25D366] hover:bg-[#20ba5a] text-white p-4 rounded-full shadow-2xl shadow-[#25D366]/30 hover:scale-110 active:scale-95 transition-all duration-300 group flex items-center justify-center cursor-pointer glow-green"
      >
        <MessageSquare className="w-6 h-6 fill-current" />
        
        {/* Pulsing state ring */}
        <span className="absolute -top-1 -right-1 flex h-3.5 w-3.5">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-500 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-rose-600"></span>
        </span>

        {/* Hover Text Label */}
        <span className="max-w-0 overflow-hidden group-hover:max-w-xs group-hover:ml-2 text-xs font-bold uppercase tracking-wider transition-all duration-300 whitespace-nowrap">
          Fale Conosco
        </span>
      </button>

    </div>
  );
}
