import React from 'react';
import { Star, Users, Check, Heart } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-[#070B19] border-t border-[#1A285A]/50">
      
      {/* Pink highlights ribbon matching the absolute bottom of the reference flyer */}
      <div className="bg-[#E6007E] py-6 text-white border-t border-pink-400/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-4 items-center justify-between text-center divide-y md:divide-y-0 md:divide-x divide-white/20">
            
            {/* Badge 1 */}
            <div className="flex items-center justify-center space-x-3 py-3 md:py-0">
              <div className="bg-white/20 p-2 rounded-full">
                <Star className="w-5 h-5 text-white fill-current" />
              </div>
              <span className="text-xs sm:text-sm font-extrabold uppercase tracking-wider">
                Melhores Opções de Resgate
              </span>
            </div>

            {/* Badge 2 */}
            <div className="flex items-center justify-center space-x-3 py-3 md:py-0">
              <div className="bg-white/20 p-2 rounded-full">
                <Users className="w-5 h-5 text-white" />
              </div>
              <span className="text-xs sm:text-sm font-extrabold uppercase tracking-wider">
                Somos Especialistas em Livelo
              </span>
            </div>

            {/* Badge 3 */}
            <div className="flex items-center justify-center space-x-3 py-3 md:py-0">
              <div className="bg-white/20 p-2 rounded-full">
                <Check className="w-5 h-5 text-white" />
              </div>
              <span className="text-xs sm:text-sm font-extrabold uppercase tracking-wider">
                Mais Benefícios para Você
              </span>
            </div>

          </div>
        </div>
      </div>

      {/* Main footer credentials & disclosure */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left text-gray-500 text-xs">
          
          <div className="space-y-2">
            <div className="flex items-center justify-center md:justify-start space-x-2">
              <div className="w-3 h-3 bg-[#E6007E] rounded-full"></div>
              <span className="text-white font-bold text-sm tracking-tight">livelo<span className="text-[#E6007E]">.</span> Especialista</span>
            </div>
            <p className="max-w-md font-light leading-relaxed">
              Assessoria independente e personalizada para maximizar o valor de milhas e pontos de fidelidade. Resgates seguros com suporte completo de ponta a ponta.
            </p>
          </div>

          <div className="space-y-2 text-center md:text-right">
            <p className="font-mono">© 2026 Resgate de Pontos Livelo. Todos os direitos reservados.</p>
            <p className="text-[10px] text-gray-600 max-w-sm ml-auto font-light leading-relaxed">
              *Nota: Livelo é uma marca registrada de titularidade da Livelo S.A. Este site atua como assessoria de intermediação independente e não representa formalmente a instituição oficial.
            </p>
          </div>

        </div>

        {/* Made with signet */}
        <div className="mt-8 pt-6 border-t border-[#1A285A]/30 text-center text-[10px] text-gray-600 flex items-center justify-center space-x-1 font-light">
          <span>Desenvolvido com</span>
          <Heart className="w-3 h-3 text-[#E6007E] fill-current" />
          <span>para simplificar suas viagens.</span>
        </div>

      </div>

    </footer>
  );
}
