import { CategoryItem, RedemptionOption, TrustFactor } from './types';

export const WHATSAPP_NUMBER = '5573998630223';
export const WHATSAPP_FORMATTED = '(73) 99863-0223';

export const CATEGORIES: CategoryItem[] = [
  {
    id: 'passagens',
    title: 'Passagens Aéreas',
    description: 'Nacionais e internacionais com as melhores tarifas e companhias parceiras.',
    iconName: 'plane',
    whatsappMessage: 'Olá! Vim pelo site e gostaria de fazer uma cotação de PASSAGEM AÉREA usando meus pontos Livelo.',
  },
  {
    id: 'hoteis',
    title: 'Hotéis e Hospedagens',
    description: 'De pousadas charmosas a resorts luxuosos all-inclusive com suporte completo.',
    iconName: 'hotel',
    whatsappMessage: 'Olá! Gostaria de consultar opções de HOTÉIS E HOSPEDAGENS com resgate de pontos Livelo.',
  },
  {
    id: 'cruzeiros',
    title: 'Cruzeiros e Pacotes',
    description: 'Roteiros incríveis na costa brasileira e internacional com cabines exclusivas.',
    iconName: 'ship',
    whatsappMessage: 'Olá! Estou interessado em pacotes de CRUZEIROS ou viagens completas usando meus pontos Livelo.',
  },
  {
    id: 'produtos',
    title: 'Produtos e Experiências',
    description: 'Resgate iPhones, eletrodomésticos, eletrônicos ou jantares e passeios incríveis.',
    iconName: 'shopping-bag',
    whatsappMessage: 'Olá! Gostaria de falar com um especialista sobre RESGATE DE PRODUTOS ou experiências com pontos Livelo.',
  },
];

export const TRUST_FACTORS: TrustFactor[] = [
  {
    title: 'Atendimento Especializado',
    description: 'Especialistas focados em encontrar a maior valorização para os seus pontos.',
    iconName: 'shield',
  },
  {
    title: 'Segurança e Confiança',
    description: 'Processo 100% transparente com confirmação direta no seu aplicativo Livelo.',
    iconName: 'award',
  },
  {
    title: 'Agilidade no Atendimento',
    description: 'Sem filas ou ligações infinitas. Resolução rápida e humanizada pelo WhatsApp.',
    iconName: 'zap',
  },
];

export const REDEMPTION_OPTIONS: RedemptionOption[] = [
  {
    minPoints: 10000,
    maxPoints: 30000,
    category: 'Passagens',
    title: 'Voos Nacionais Curta Distância',
    description: 'Passagens aéreas de ida e volta para capitais próximas ou trechos regionais selecionados.',
    estimatedValue: 'R$ 350 - R$ 800',
  },
  {
    minPoints: 10000,
    maxPoints: 30000,
    category: 'Hoteis',
    title: 'Diárias de Hotéis Nacionais',
    description: '1 a 2 diárias em hotéis confortáveis de categoria turística ou superior.',
    estimatedValue: 'R$ 300 - R$ 600',
  },
  {
    minPoints: 10000,
    maxPoints: 30000,
    category: 'Produtos',
    title: 'Eletroportáteis e Perfumes Importados',
    description: 'Fritadeiras elétricas, cafeteiras premium ou fragrâncias de grifes renomadas.',
    estimatedValue: 'R$ 250 - R$ 500',
  },
  
  {
    minPoints: 30001,
    maxPoints: 80000,
    category: 'Passagens',
    title: 'Passagens para América do Sul',
    description: 'Voos de ida e volta para Buenos Aires, Santiago, Montevidéu ou capitais do Nordeste.',
    estimatedValue: 'R$ 1.200 - R$ 2.500',
  },
  {
    minPoints: 30001,
    maxPoints: 80000,
    category: 'Hoteis',
    title: 'Finais de Semana All-Inclusive',
    description: 'Hospedagens de fim de semana em resorts nacionais com sistema tudo incluso para o casal.',
    estimatedValue: 'R$ 1.500 - R$ 3.000',
  },
  {
    minPoints: 30001,
    maxPoints: 80000,
    category: 'Produtos',
    title: 'IPhones de Geração Anterior ou iPads',
    description: 'Dispositivos Apple de excelente desempenho ou Smart TVs de alta resolução.',
    estimatedValue: 'R$ 2.000 - R$ 3.800',
  },

  {
    minPoints: 80001,
    maxPoints: 150000,
    category: 'Passagens',
    title: 'Voos Internacionais (EUA ou Europa)',
    description: 'Trechos de ida e volta para Miami, Orlando, Lisboa ou Madri voando em classe econômica.',
    estimatedValue: 'R$ 3.500 - R$ 6.000',
  },
  {
    minPoints: 80001,
    maxPoints: 150000,
    category: 'Hoteis',
    title: 'Resorts de Luxo e Spa 5 Estrelas',
    description: 'Até 4 noites de hospedagem premium em locais exclusivos na Bahia, Gramado ou Rio.',
    estimatedValue: 'R$ 3.000 - R$ 5.500',
  },
  {
    minPoints: 80001,
    maxPoints: 150000,
    category: 'Cruzeiros',
    title: 'Mini Cruzeiro Costa Brasileira',
    description: 'Cabine externa com pensão completa para até 4 noites em navios luxuosos da MSC ou Costa.',
    estimatedValue: 'R$ 3.500 - R$ 5.000',
  },

  {
    minPoints: 150001,
    maxPoints: 1000000,
    category: 'Passagens',
    title: 'Passagens Classe Executiva',
    description: 'O auge do conforto! Voos internacionais de longa distância com poltrona-cama e serviço VIP.',
    estimatedValue: 'R$ 12.000 - R$ 22.000',
  },
  {
    minPoints: 150001,
    maxPoints: 1000000,
    category: 'Cruzeiros',
    title: 'Cruzeiro Premium de 7+ Noites',
    description: 'Cruzeiros completos de uma semana pelo Caribe ou Sul do Brasil com varanda e serviços adicionais.',
    estimatedValue: 'R$ 7.000 - R$ 14.000',
  },
  {
    minPoints: 150001,
    maxPoints: 1000000,
    category: 'Hoteis',
    title: 'Roteiro de Luxo Customizado',
    description: 'Hospedagem em hotéis boutique de grife pelo mundo com serviços de concierge integrados.',
    estimatedValue: 'R$ 8.000 - R$ 16.000',
  },
];

export function getWhatsAppLink(message: string): string {
  const encodedText = encodeURIComponent(message);
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodedText}`;
}
