import { useId, useState } from 'react';
import type { MouseEvent } from 'react';
import KeyboardArrowDown from '@mui/icons-material/KeyboardArrowDown';
import { Avatar, Button, Popover, Typography } from '@mui/material';
import { useApiRequest } from '../../hooks/useApiRequest';
import {
  DASHBOARD_CUSTOMER_ID,
  getCustomerProfile,
} from '../../services/spendingInsightsService';
import { formatInitials } from '../../utils/formatters';
import { CustomerProfileDetails } from './CustomerProfileDetails';
import { layoutStyles } from './layoutStyles';

const requestProfile = (signal: AbortSignal) =>
  getCustomerProfile(DASHBOARD_CUSTOMER_ID, signal);

export function CustomerSummary() {
  const { data: profile } = useApiRequest(requestProfile);
  const [anchorElement, setAnchorElement] = useState<HTMLElement | null>(null);
  const panelId = useId();

  if (!profile) {
    return null;
  }

  const isOpen = anchorElement !== null;

  return (
    <>
      <Button
        aria-haspopup="dialog"
        aria-expanded={isOpen}
        aria-controls={isOpen ? panelId : undefined}
        onClick={(event: MouseEvent<HTMLElement>) =>
          setAnchorElement(event.currentTarget)
        }
        sx={layoutStyles.customer}
      >
        <Avatar sx={layoutStyles.customerAvatar}>
          {formatInitials(profile.name)}
        </Avatar>
        <Typography variant="body2" sx={layoutStyles.customerName}>
          {profile.name}
        </Typography>
        <KeyboardArrowDown fontSize="small" sx={layoutStyles.customerChevron} />
      </Button>
      <Popover
        id={panelId}
        open={isOpen}
        anchorEl={anchorElement}
        onClose={() => setAnchorElement(null)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        slotProps={{ paper: { role: 'dialog', 'aria-label': 'Your profile' } }}
      >
        <CustomerProfileDetails profile={profile} />
      </Popover>
    </>
  );
}
