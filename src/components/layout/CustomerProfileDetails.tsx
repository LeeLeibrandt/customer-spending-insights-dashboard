import { memo } from 'react';
import { Box, Typography } from '@mui/material';
import type { CustomerProfileDetailsProps } from '../../types/components';
import { AccountType } from '../../types/enums';
import { formatCurrency, formatDate } from '../../utils/formatters';
import { layoutStyles } from '../../styles/layoutStyles';

const ACCOUNT_TYPE_LABELS: Record<AccountType, string> = {
  [AccountType.Standard]: 'Standard',
  [AccountType.Premium]: 'Premium',
};

export const CustomerProfileDetails = memo(function CustomerProfileDetails({
  profile,
}: CustomerProfileDetailsProps) {
  const fields = [
    { label: 'Account type', value: ACCOUNT_TYPE_LABELS[profile.accountType] },
    { label: 'Member since', value: formatDate(profile.joinDate) },
    {
      label: 'Lifetime spent',
      value: formatCurrency(profile.totalSpent, profile.currency),
    },
    { label: 'Currency', value: profile.currency },
  ];

  return (
    <Box component="dl" sx={layoutStyles.profilePanel}>
      {fields.map(({ label, value }) => (
        <Box key={label} sx={layoutStyles.profileField}>
          <Typography component="dt" sx={layoutStyles.profileLabel}>
            {label}
          </Typography>
          <Typography component="dd" sx={layoutStyles.profileValue}>
            {value}
          </Typography>
        </Box>
      ))}
    </Box>
  );
});
