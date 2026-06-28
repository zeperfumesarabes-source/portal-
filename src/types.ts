export interface RedemptionOption {
  minPoints: number;
  maxPoints: number;
  category: string;
  title: string;
  description: string;
  estimatedValue: string;
}

export interface CategoryItem {
  id: string;
  title: string;
  description: string;
  iconName: 'plane' | 'hotel' | 'ship' | 'shopping-bag';
  whatsappMessage: string;
}

export interface TrustFactor {
  title: string;
  description: string;
  iconName: 'shield' | 'award' | 'zap';
}
