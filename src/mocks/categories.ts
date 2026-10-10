import type { SpendingCategory } from '../types/categories';
import { CategoryIcon } from '../types/enums';

export const MOCK_CATEGORIES: SpendingCategory[] = [
  { name: 'Groceries', color: '#FF6B6B', icon: CategoryIcon.ShoppingCart },
  { name: 'Entertainment', color: '#4ECDC4', icon: CategoryIcon.Film },
  { name: 'Transportation', color: '#45B7D1', icon: CategoryIcon.Car },
  { name: 'Dining', color: '#F7DC6F', icon: CategoryIcon.Utensils },
  { name: 'Shopping', color: '#BB8FCE', icon: CategoryIcon.ShoppingBag },
  { name: 'Utilities', color: '#85C1E9', icon: CategoryIcon.Zap },
];
