import React, { useState, useMemo } from 'react';
import { Coins, HelpCircle, ArrowRight, Plane, Building2, Ship, ShoppingBag, Sparkles } from 'lucide-react';
import { REDEMPTION_OPTIONS, getWhatsAppLink } from '../data';

export default function Simulator() {
  const [points, setPoints] = useState<number>(45000);
  const [category, setCategory] = useState<string>('Passagens');

  // Filter the options that fit the current points range and selected category
  const activeOptions = useMemo(() => {
    return REDEMPTION_OPTIONS.filter((option) => {
      const matchCategory = option.category === category;
      const matchPoints = points >= option.minPoints && points <= option.maxPoints;
      // Handle the maximum upper bound if points are above 150k
      const isMaxBound = points > 150000 && option.minPoints > 150000 && option.category === category;
      return matchCategory && (matchPoints || isMaxBound);
    });
  }, [points, category]);

  const handleWhatsappSimulate = () => {
    const formattedPoints = points.toLocaleString('pt-BR');
    const rewardTitle = activeOptions.length > 0 ? activeOptions[0].title : 'Viagem Especial';
    const message = `Olá! Fiz uma simulação no site com ${formattedPoints} pontos na categoria de ${category}. Tenho interesse em resgatar o benefício: ${rewardTitle}. Gostaria de falar com um especialista.`;
    window.open(getWhatsAppLink(message), '_blank');
  };

  return (
    <section id="simulador" className="py-20 bg-gradient-to-b from-[#070B19] to-[#0D1636] border-t border-[#1A285A]/40">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-[#E6007E] text-xs font-bold uppercase tracking-widest bg-[#E6007E]/10 px-3 py-1.5 rounded-full border border-[#E6007E]/20">
            Simulador de Milhas e Viagens
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white mt-4 uppercase tracking-tight">
            Descubra o valor dos seus pontos
          </h2>
          <p className="text-slate-300 text-sm sm:text-base mt-2 font-light">
            Selecione a quantidade aproximada de pontos que você tem acumulados na Livelo e veja o que você pode resgatar agora mesmo.
          </p>
        </div>

        {/* Simulator Box with beautiful glow and borders */}
        <div className="bg-[#0D1636]/80 backdrop-blur-md rounded-3xl p-6 sm:p-10 border border-[#1A285A] shadow-2xl relative overflow-hidden">
          
          {/* Subtle graphic accent */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-[#E6007E]/10 to-transparent rounded-bl-3xl pointer-events-none"></div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
            
            {/* Left Controls Column */}
            <div className="space-y-6">
              
              {/* Point Slider Container */}
              <div className="bg-[#070B19]/60 p-5 rounded-2xl border border-[#1A285A]/40">
                <div className="flex justify-between items-center mb-4">
                  <label className="text-xs font-bold text-slate-300 uppercase tracking-widest flex items-center">
                    <Coins className="w-4 h-4 text-[#E6007E] mr-1.5" /> Saldo de Pontos
                  </label>
                  <span className="text-2xl font-black text-white font-mono tracking-tight">
                    {points.toLocaleString('pt-BR')}{' '}
                    <span className="text-[#E6007E] text-xs font-bold uppercase">PTS</span>
                  </span>
                </div>

                <input
                  type="range"
                  min="10000"
                  max="250000"
                  step="5000"
                  value={points}
                  onChange={(e) => setPoints(Number(e.target.value))}
                  className="w-full h-2.5 bg-[#1A285A] rounded-lg appearance-none cursor-pointer accent-[#E6007E] hover:accent-[#C5006B]"
                />

                <div className="flex justify-between text-[10px] text-gray-500 font-bold font-mono mt-2.5">
                  <span>10.000 PTS</span>
                  <span>120.000 PTS</span>
                  <span>250.000+ PTS</span>
                </div>
              </div>

              {/* Category Selector Tabs */}
              <div>
                <label className="text-xs font-bold text-slate-300 uppercase tracking-widest mb-3 block">
                  Escolha o Destino dos Seus Pontos:
                </label>
                <div className="grid grid-cols-2 gap-3">
                  {[
                    { id: 'Passagens', label: 'Passagens', icon: Plane },
                    { id: 'Hoteis', label: 'Hotéis e Resorts', icon: Building2 },
                    { id: 'Cruzeiros', label: 'Cruzeiros', icon: Ship },
                    { id: 'Produtos', label: 'iPhones & Lojas', icon: ShoppingBag },
                  ].map((tab) => {
                    const Icon = tab.icon;
                    const isActive = category === tab.id;
                    return (
                      <button
                        key={tab.id}
                        type="button"
                        onClick={() => setCategory(tab.id)}
                        className={`flex items-center space-x-2 p-3.5 rounded-xl border text-left transition-all cursor-pointer ${
                          isActive
                            ? 'bg-[#E6007E] border-[#E6007E] text-white shadow-lg shadow-[#E6007E]/20'
                            : 'bg-[#070B19]/50 border-[#1A285A]/60 text-slate-300 hover:bg-[#1A285A]/40'
                        }`}
                      >
                        <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-[#E6007E]'}`} />
                        <span className="text-xs font-bold uppercase tracking-wider">{tab.label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

            </div>

            {/* Right Rewards Output Column */}
            <div className="bg-gradient-to-b from-[#070B19] to-[#121B3F] p-6 sm:p-8 rounded-2xl border border-[#1A285A]/60 flex flex-col justify-between h-full min-h-[300px]">
              
              <div>
                <span className="text-[10px] font-bold uppercase tracking-widest text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded border border-emerald-500/20 inline-block mb-3 animate-pulse">
                  Simulação Disponível
                </span>

                {activeOptions.length > 0 ? (
                  activeOptions.map((option, index) => (
                    <div key={index} className="space-y-4">
                      <div>
                        <span className="text-xs text-gray-400 uppercase tracking-wider">Você Pode Resgatar:</span>
                        <h3 className="text-xl sm:text-2xl font-black text-white mt-1 leading-tight tracking-tight">
                          {option.title}
                        </h3>
                      </div>
                      <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-light">
                        {option.description}
                      </p>
                      
                      <div className="pt-3 border-t border-dashed border-[#1A285A]">
                        <span className="text-xs text-slate-400 uppercase tracking-wider block">Equivalente Comercial em Dinheiro:</span>
                        <span className="text-2xl font-black text-[#E6007E] block font-mono mt-1">
                          {option.estimatedValue}
                        </span>
                        <span className="text-[10px] text-gray-500 block leading-normal mt-1">
                          *Aproveite a máxima valorização de milhas aéreas com nossos especialistas.
                        </span>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-8">
                    <p className="text-slate-300 text-sm">Selecione opções para estimar.</p>
                  </div>
                )}
              </div>

              {/* Action Button inside simulator card */}
              <div className="pt-6 mt-6 border-t border-[#1A285A]">
                <button
                  onClick={handleWhatsappSimulate}
                  id="simulate-whatsapp-cta"
                  className="w-full inline-flex items-center justify-center space-x-2 bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white font-bold py-3.5 px-6 rounded-xl text-xs uppercase tracking-widest transition-all shadow-lg hover:scale-[1.02] active:scale-95 cursor-pointer glow-green"
                >
                  <Sparkles className="w-4 h-4 text-white animate-pulse" />
                  <span>Resgatar Pelo WhatsApp</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
