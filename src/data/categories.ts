export type CategoryType = 'shopping' | 'train' | 'bus' | 'culture' | 'food' | 'airport';

export interface Category {
  id: CategoryType;
  name: string;
  icon: string;
  color: string;
}

export const categories: Category[] = [
  { id: 'shopping', name: '쇼핑', icon: '🛍️', color: '#E91E63' },
  { id: 'train', name: '열차', icon: '🚄', color: '#2196F3' },
  { id: 'bus', name: '버스', icon: '🚌', color: '#FF9800' },
  { id: 'culture', name: '문화', icon: '📚', color: '#9C27B0' },
  { id: 'food', name: '맛집', icon: '🍽️', color: '#4CAF50' },
  { id: 'airport', name: '공항', icon: '✈️', color: '#00BCD4' },
];

export const getCategoryById = (id: string): Category | undefined => {
  return categories.find(cat => cat.id === id);
};
