import React from 'react';
import { ArrowRight, Sparkles, ShieldCheck, Plane, Building2, Ship, ShoppingBag } from 'lucide-react';
import { getWhatsAppLink, logWhatsAppClick } from '../data';
import heroImage from '../assets/images/cruise_hero_banner_1782605095148.jpg';

export default function HeroSection() {
  const handleWap = () => {
    const message = 'Olá! Gostaria de falar com um especialista em resgate de pontos Livelo para planejar minha próxima viagem.';
    logWhatsAppClick('Hero Primary CTA', message);
    window.open(getWhatsAppLink(message), '_blank');
  };

  return (
    <section className="relative overflow-hidden pt-12 pb-20 md:py-24 lg:py-32 bg-gradient-to-b from-[#070B19] via-[#0D1636] to-[#070B19]">
      {/* Decorative ambient background glows */}
      <div className="absolute top-1/4 -left-32 w-96 h-96 bg-[#E6007E]/10 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-10 -right-32 w-96 h-96 bg-[#1A285A]/40 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column - Sales & Information */}
          <div className="lg:col-span-7 flex flex-col space-y-8 text-center lg:text-left">
            
            {/* Top Banner Accent */}
            <div className="inline-flex items-center justify-center lg:justify-start space-x-2">
              <span className="bg-[#1A285A] text-[#E6007E] text-xs font-bold px-3 py-1.5 rounded-md uppercase tracking-wider border border-[#E6007E]/30 inline-flex items-center">
                <Sparkles className="w-3 h-3 mr-1.5 animate-pulse" /> Aproveite seus Pontos
              </span>
              <span className="text-gray-400 text-xs hidden sm:inline">•</span>
              <span className="text-[#E6007E] text-xs font-semibold tracking-wider uppercase hidden sm:inline">
                Viva Experiências
              </span>
            </div>

            {/* Typography Master Header matching the image */}
            <div className="space-y-4">
              <p className="text-sm sm:text-base font-extrabold text-white tracking-widest uppercase bg-[#E6007E] px-4 py-1.5 rounded-md inline-block transform -skew-x-6 shadow-md">
                ESPECIALISTA EM
              </p>
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-slate-100 tracking-tight leading-[1.1] uppercase">
                Resgate de <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-white to-white">
                  Pontos
                </span>{' '}
                <span className="text-[#E6007E] block sm:inline relative">
                  Livelo
                  {/* Underline accent */}
                  <span className="absolute left-0 bottom-1 w-full h-1.5 bg-[#E6007E]/40 rounded"></span>
                </span>
              </h1>
              <p className="text-lg sm:text-xl text-slate-300 font-light max-w-xl mx-auto lg:mx-0">
                Tire suas dúvidas e <span className="text-[#E6007E] font-medium">aproveite</span> seus benefícios com suporte premium e seguro pelo WhatsApp.
              </p>
            </div>

            {/* Quick Stats Grid matching bottom of main text */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-2xl mx-auto lg:mx-0 pt-4">
              <div className="bg-[#0D1636]/60 p-3.5 rounded-xl border border-[#1A285A]/60 flex flex-col items-center justify-center text-center">
                <Plane className="w-6 h-6 text-[#E6007E] mb-1.5" />
                <span className="text-[11px] font-semibold text-slate-300 uppercase tracking-wider leading-tight">Passagens Aéreas</span>
              </div>
              <div className="bg-[#0D1636]/60 p-3.5 rounded-xl border border-[#1A285A]/60 flex flex-col items-center justify-center text-center">
                <Building2 className="w-6 h-6 text-[#E6007E] mb-1.5" />
                <span className="text-[11px] font-semibold text-slate-300 uppercase tracking-wider leading-tight">Hotéis e Hospedagem</span>
              </div>
              <div className="bg-[#0D1636]/60 p-3.5 rounded-xl border border-[#1A285A]/60 flex flex-col items-center justify-center text-center">
                <Ship className="w-6 h-6 text-[#E6007E] mb-1.5" />
                <span className="text-[11px] font-semibold text-slate-300 uppercase tracking-wider leading-tight">Cruzeiros e Pacotes</span>
              </div>
              <div className="bg-[#0D1636]/60 p-3.5 rounded-xl border border-[#1A285A]/60 flex flex-col items-center justify-center text-center">
                <ShoppingBag className="w-6 h-6 text-[#E6007E] mb-1.5" />
                <span className="text-[11px] font-semibold text-slate-300 uppercase tracking-wider leading-tight">Produtos e Lojas</span>
              </div>
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-4">
              <button
                onClick={handleWap}
                id="hero-primary-cta"
                className="w-full sm:w-auto inline-flex items-center justify-center space-x-3 bg-gradient-to-r from-[#E6007E] to-[#C5006B] hover:from-[#C5006B] hover:to-[#A30055] text-white px-8 py-4 rounded-xl font-bold transition-all shadow-lg shadow-[#E6007E]/30 hover:scale-[1.03] active:scale-95 cursor-pointer glow-pink group text-base"
              >
                <span>Falar com Especialista</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
              <a
                href="#simulador"
                className="w-full sm:w-auto inline-flex items-center justify-center text-slate-300 hover:text-white bg-[#1A285A]/50 hover:bg-[#1A285A]/80 border border-[#E6007E]/20 hover:border-[#E6007E]/50 px-8 py-4 rounded-xl font-bold transition-all text-base"
              >
                Simular Meus Pontos
              </a>
            </div>

            {/* Direct Trust Label */}
            <div className="flex items-center justify-center lg:justify-start space-x-4 pt-2 text-slate-400 text-xs">
              <span className="flex items-center">
                <ShieldCheck className="w-4 h-4 text-emerald-500 mr-1.5" /> Seguro e Criptografado
              </span>
              <span>•</span>
              <span>Transparência Garantida</span>
            </div>

          </div>

          {/* Right Column - Luxury Visual Composition */}
          <div className="lg:col-span-5 relative flex justify-center items-center">
            
            {/* The white background curve frame resembling the flyer */}
            <div className="absolute -inset-2 bg-gradient-to-tr from-[#E6007E] via-white to-transparent rounded-[32px] rotate-2 opacity-90 blur-[1px]"></div>
            
            {/* Main Image frame wrapper */}
            <div className="relative bg-white p-2 sm:p-3 rounded-[30px] overflow-hidden shadow-2xl w-full max-w-md md:max-w-lg aspect-[4/3] sm:aspect-square flex flex-col justify-between">
              
              <div className="absolute inset-0 bg-[#070B19]">
                <img
                  src={heroImage}
                  alt="Cruzeiro de Luxo com pontos Livelo"
                  className="w-full h-full object-cover transition-transform duration-1000 hover:scale-105"
                  referrerPolicy="no-referrer"
                />
                {/* Visual shade overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent"></div>
              </div>

              {/* Float Cards (Replicating credit cards in the image overlay) */}
              <div className="absolute bottom-4 left-4 right-4 bg-slate-900/90 backdrop-blur-md border border-white/10 p-4 rounded-2xl flex items-center justify-between shadow-xl">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-[#E6007E] rounded-xl flex items-center justify-center text-white font-extrabold text-xl shadow-md">
                    +
                  </div>
                  <div>
                    <p className="text-white text-xs font-bold leading-none uppercase tracking-wider">Pontos Livelo</p>
                    <p className="text-[#E6007E] text-[10px] font-mono mt-0.5">TRANSFORMAM EM SONHOS</p>
                  </div>
                </div>
                <div className="text-right">
                  <span className="inline-block bg-[#E6007E]/20 text-[#E6007E] font-extrabold text-[10px] px-2.5 py-1 rounded-md border border-[#E6007E]/30 uppercase tracking-widest">
                    Milhas Turbo
                  </span>
                </div>
              </div>

              {/* Mini tag indicator */}
              <div className="absolute top-4 right-4 bg-[#E6007E] text-white text-[10px] font-bold px-3 py-1.5 rounded-full shadow-md uppercase tracking-widest">
                Parceiro Oficial
              </div>

            </div>

            {/* Glowing bubble effects around the frame */}
            <div className="absolute -top-6 -right-6 w-12 h-12 bg-gradient-to-r from-[#E6007E] to-pink-500 rounded-full flex items-center justify-center text-white shadow-lg shadow-[#E6007E]/40 font-black animate-bounce">
              %
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
