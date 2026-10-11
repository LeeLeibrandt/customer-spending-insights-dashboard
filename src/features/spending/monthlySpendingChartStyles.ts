import type { SxProps, Theme } from '@mui/material/styles';
import { lineClasses } from '@mui/x-charts/LineChart';

export const MONTHLY_SPENDING_GRADIENT_ID = 'monthly-spending-gradient';

export const monthlySpendingChartStyles = {
  chart: {
    [`& .${lineClasses.area}`]: {
      fill: `url(#${MONTHLY_SPENDING_GRADIENT_ID})`,
    },
  },
} satisfies Record<string, SxProps<Theme>>;
