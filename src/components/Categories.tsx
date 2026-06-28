import React from 'react';
import { Plane, Building2, Ship, ShoppingBag, ArrowUpRight } from 'lucide-react';
import { CATEGORIES, getWhatsAppLink } from '../data';

export default function Categories() {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'plane':
        return <Plane className="w-8 h-8 text-[#E6007E]" />;
      case 'hotel':
        return <Building2 className="w-8 h-8 text-[#E6007E]" />;
      case 'ship':
        return <Ship className="w-8 h-8 text-[#E6007E]" />;
      case 'shopping-bag':
        return <ShoppingBag className="w-8 h-8 text-[#E6007E]" />;
      default:
        return <Plane className="w-8 h-8 text-[#E6007E]" />;
    }
  };

  const handleCategoryClick = (msg: string) => {
    window.open(getWhatsAppLink(msg), '_blank');
  };

  return (
    <section id="servicos" className="py-20 bg-[#070B19] relative">
      {/* Absolute glow lines */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[1px] bg-gradient-to-r from-transparent via-[#E6007E]/20 to-transparent"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header Section */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-[#E6007E] text-xs font-bold uppercase tracking-widest bg-[#E6007E]/10 px-3 py-1.5 rounded-full border border-[#E6007E]/20">
            Principais Categorias
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white mt-4 uppercase tracking-tight">
            O que você deseja resgatar?
          </h2>
          <p className="text-slate-300 text-sm sm:text-base mt-2 font-light">
            Clique na categoria que você deseja simular e seja direcionado instantaneamente para falar com nosso consultor especializado no WhatsApp.
          </p>
        </div>

        {/* Categories Grid (4 Columns responsive) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {CATEGORIES.map((cat) => (
            <div
              key={cat.id}
              onClick={() => handleCategoryClick(cat.whatsappMessage)}
              className="bg-[#0D1636]/60 hover:bg-[#0D1636] border border-[#1A285A]/50 hover:border-[#E6007E]/50 rounded-2xl p-6 transition-all duration-300 group cursor-pointer hover:-translate-y-1 flex flex-col justify-between h-full relative"
            >
              <div>
                {/* Icon Circle */}
                <div className="w-16 h-16 rounded-2xl bg-[#070B19]/80 border border-[#1A285A]/80 flex items-center justify-center mb-6 group-hover:bg-[#E6007E]/10 group-hover:border-[#E6007E]/30 transition-all">
                  {getIcon(cat.iconName)}
                </div>

                <h3 className="text-lg font-bold text-white mb-2 tracking-tight group-hover:text-[#E6007E] transition-colors">
                  {cat.title}
                </h3>
                <p className="text-slate-300 text-xs sm:text-sm leading-relaxed font-light mb-6">
                  {cat.description}
                </p>
              </div>

              {/* Action Button inside card */}
              <div className="flex items-center text-xs font-bold uppercase tracking-wider text-[#E6007E] group-hover:text-white transition-colors">
                <span>Simular Agora</span>
                <ArrowUpRight className="w-4 h-4 ml-1.5 transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </div>

              {/* Small accent border effect */}
              <div className="absolute top-0 left-0 w-0 h-1 bg-[#E6007E] rounded-t-2xl group-hover:w-full transition-all duration-500"></div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
