import { createContext, useContext } from 'react';
import type { CustomerProfile } from '../types/customer';

export const CustomerContext = createContext<CustomerProfile | null>(null);

export function useCustomer(): CustomerProfile {
  const customer = useContext(CustomerContext);
  if (!customer) throw new Error('Customer data has not been loaded.');
  return customer;
}
