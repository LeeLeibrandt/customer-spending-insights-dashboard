import type { AccountType } from './enums';

export interface CustomerProfile {
  customerId: string;
  name: string;
  email: string;
  joinDate: string;
  accountType: AccountType;
  totalSpent: number;
  currency: string;
}
