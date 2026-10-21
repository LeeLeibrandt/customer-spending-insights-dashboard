import { AccountType } from '../../types/enums';
import type { CustomerRecord } from '../../types/customer';

export const MOCK_CUSTOMER: CustomerRecord = {
  customerId: '12345',
  name: 'John Doe',
  email: 'john.doe@example.com',
  joinDate: '2022-08-15',
  accountType: AccountType.Premium,
  currency: 'ZAR',
};
