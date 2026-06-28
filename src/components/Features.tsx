import React from 'react';
import { ShieldCheck, Award, Zap } from 'lucide-react';
import { TRUST_FACTORS } from '../data';

export default function Features() {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'shield':
        return <ShieldCheck className="w-8 h-8 text-[#E6007E]" />;
      case 'award':
        return <Award className="w-8 h-8 text-[#E6007E]" />;
      case 'zap':
        return <Zap className="w-8 h-8 text-[#E6007E]" />;
      default:
        return <ShieldCheck className="w-8 h-8 text-[#E6007E]" />;
    }
  };

  return (
    <section id="beneficios" className="py-20 bg-gradient-to-b from-[#0D1636] to-[#070B19] border-t border-[#1A285A]/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Section */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-[#E6007E] text-xs font-bold uppercase tracking-widest bg-[#E6007E]/10 px-3 py-1.5 rounded-full border border-[#E6007E]/20">
            Nossos Compromissos
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white mt-4 uppercase tracking-tight">
            Segurança em primeiro lugar
          </h2>
          <p className="text-slate-300 text-sm sm:text-base mt-2 font-light">
            Entenda como funciona o nosso suporte especializado para tornar sua experiência com pontos Livelo simples e vantajosa.
          </p>
        </div>

        {/* Benefits Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {TRUST_FACTORS.map((factor, index) => (
            <div
              key={index}
              className="bg-[#070B19]/50 border border-[#1A285A]/50 rounded-2xl p-6 flex items-start space-x-4 hover:border-[#E6007E]/30 transition-all"
            >
              <div className="flex-shrink-0 p-3 bg-[#0D1636] rounded-xl border border-[#1A285A]">
                {getIcon(factor.iconName)}
              </div>
              <div className="space-y-1">
                <h3 className="text-base font-bold text-white uppercase tracking-tight">
                  {factor.title}
                </h3>
                <p className="text-slate-300 text-xs sm:text-sm leading-relaxed font-light">
                  {factor.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Informative Help Callout */}
        <div className="mt-12 bg-gradient-to-r from-[#1A285A]/40 to-[#0D1636]/40 border border-[#E6007E]/10 p-6 sm:p-8 rounded-3xl text-center">
          <p className="text-xs sm:text-sm text-slate-300 font-light leading-relaxed max-w-3xl mx-auto">
            💡 <strong className="text-white font-semibold">Dica de Especialista:</strong> Nunca deixe seus pontos Livelo vencerem ou os troque por produtos com baixo valor de resgate nos canais tradicionais. Convertemos seus pontos em passagens aéreas e viagens de luxo que rendem até <strong className="text-[#E6007E] font-extrabold">3x mais valor de mercado!</strong>
          </p>
        </div>

      </div>
    </section>
  );
}
