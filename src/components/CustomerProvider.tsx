import type { ReactNode } from 'react';
import { useApiRequest } from '../hooks/useApiRequest';
import { CustomerContext } from '../hooks/useCustomer';
import {
  DASHBOARD_CUSTOMER_ID,
  getCustomerProfile,
} from '../services/spendingInsightsService';
import { CURRENCY_CODE_PATTERN } from '../utils/patterns';
import { RequestContent } from './RequestContent';

async function requestProfile(signal: AbortSignal) {
  const profile = await getCustomerProfile(DASHBOARD_CUSTOMER_ID, signal);
  if (
    !profile ||
    profile.customerId !== DASHBOARD_CUSTOMER_ID ||
    typeof profile.name !== 'string' ||
    !CURRENCY_CODE_PATTERN.test(profile.currency)
  ) {
    throw new Error('The customer endpoint returned an invalid profile.');
  }
  return profile;
}

function LoadedCustomerProvider({ children }: { children: ReactNode }) {
  const result = useApiRequest(requestProfile);
  return (
    <RequestContent
      result={result}
      errorMessage="Your customer profile could not be loaded. Check your connection and try again."
    >
      {(profile) => (
        <CustomerContext.Provider value={profile}>
          {children}
        </CustomerContext.Provider>
      )}
    </RequestContent>
  );
}

export function CustomerProvider({ children }: { children: ReactNode }) {
  return <LoadedCustomerProvider>{children}</LoadedCustomerProvider>;
}
