import { Avatar, Box, Typography } from '@mui/material';
import { useApiRequest } from '../../hooks/useApiRequest';
import {
  DASHBOARD_CUSTOMER_ID,
  getCustomerProfile,
} from '../../services/spendingInsightsService';
import { formatInitials } from '../../utils/formatters';
import { layoutStyles } from './layoutStyles';

const requestProfile = (signal: AbortSignal) =>
  getCustomerProfile(DASHBOARD_CUSTOMER_ID, signal);

export function CustomerSummary() {
  const { data: profile } = useApiRequest(requestProfile);

  if (!profile) {
    return null;
  }

  return (
    <Box sx={layoutStyles.customer}>
      <Avatar sx={layoutStyles.customerAvatar}>
        {formatInitials(profile.name)}
      </Avatar>
      <Typography variant="body2" sx={layoutStyles.customerName}>
        {profile.name}
      </Typography>
    </Box>
  );
}
