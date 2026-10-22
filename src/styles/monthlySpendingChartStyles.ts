import type { SxProps, Theme } from '@mui/material/styles';
import { chartsSurfaceClasses } from '@mui/x-charts/ChartsSurface';
import { lineClasses } from '@mui/x-charts/LineChart';

export const MONTHLY_SPENDING_GRADIENT_ID = 'monthly-spending-gradient';

export const monthlySpendingChartStyles = {
  viewport: {
    overflowX: 'auto',
    '&:focus-visible': {
      outline: '2px solid currentColor',
      outlineOffset: 2,
    },
  },
  chart: {
    [`& .${chartsSurfaceClasses.root}`]: {
      touchAction: 'pan-x pan-y',
    },
    [`& .${lineClasses.area}`]: {
      fill: `url(#${MONTHLY_SPENDING_GRADIENT_ID})`,
    },
  },
} satisfies Record<string, SxProps<Theme>>;
