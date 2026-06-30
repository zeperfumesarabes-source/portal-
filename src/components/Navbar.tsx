import React from 'react';
import { MessageSquare, ShieldCheck } from 'lucide-react';
import { getWhatsAppLink, getConfig, logWhatsAppClick } from '../data';

export default function Navbar() {
  const config = getConfig();
  
  const handleWap = () => {
    const message = 'Olá! Acessei o site de especialista em resgates Livelo e gostaria de falar com vocês.';
    logWhatsAppClick('Navbar Header CTA', message);
    window.open(getWhatsAppLink(message), '_blank');
  };

  return (
    <header className="sticky top-0 z-50 bg-[#070B19]/80 backdrop-blur-md border-b border-[#1A285A]/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo Brand matching the reference flyer */}
          <div className="flex items-center space-x-3">
            <div className="relative flex items-center justify-center w-10 h-10 bg-[#E6007E] rounded-2xl shadow-lg shadow-[#E6007E]/30 animate-pulse">
              <span className="text-white font-extrabold text-2xl -mt-0.5">+</span>
              {/* Decorative rings */}
              <div className="absolute -inset-1 border border-[#E6007E]/20 rounded-2xl animate-ping opacity-30"></div>
            </div>
            <div className="flex flex-col">
              <span className="text-white font-black text-2xl tracking-tighter">
                livelo<span className="text-[#E6007E]">.</span>
              </span>
              <span className="text-[10px] text-gray-400 uppercase tracking-widest font-mono -mt-1">
                Especialista
              </span>
            </div>
          </div>

          {/* Center Badges for desktop */}
          <nav className="hidden md:flex items-center space-x-6 text-sm text-gray-300 font-medium">
            <a href="#simulador" className="hover:text-[#E6007E] transition-colors">Simulador</a>
            <a href="#servicos" className="hover:text-[#E6007E] transition-colors">Opções de Resgate</a>
            <a href="#beneficios" className="hover:text-[#E6007E] transition-colors">Benefícios</a>
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-[#1A285A] text-slate-100 border border-[#E6007E]/30">
              <ShieldCheck className="w-3.5 h-3.5 mr-1 text-[#E6007E]" /> Atendimento Verificado
            </span>
          </nav>

          {/* Quick CTA to WhatsApp */}
          <div className="flex items-center space-x-2">
            <button
              onClick={handleWap}
              id="nav-whatsapp-btn"
              className="inline-flex items-center space-x-2 bg-gradient-to-r from-[#E6007E] to-[#C5006B] hover:from-[#C5006B] hover:to-[#A30055] text-white px-5 py-2.5 rounded-full text-sm font-semibold transition-all shadow-lg shadow-[#E6007E]/20 hover:scale-105 active:scale-95 cursor-pointer"
            >
              <MessageSquare className="w-4 h-4 fill-current" />
              <span>Fale Conosco</span>
              <span className="hidden lg:inline text-xs bg-white/20 px-2 py-0.5 rounded-full ml-1">
                {config.whatsappFormatted}
              </span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
