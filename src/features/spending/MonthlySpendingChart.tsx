import { memo } from 'react';
import { Box } from '@mui/material';
import { LineChart } from '@mui/x-charts/LineChart';
import { useCustomer } from '../../hooks/useCustomer';
import { colors } from '../../styles/colors';
import type { SpendingChartProps } from '../../types/components';
import {
  formatAxisCurrency,
  formatCurrency,
  formatMonth,
} from '../../utils/formatters';
import {
  MONTHLY_SPENDING_GRADIENT_ID,
  monthlySpendingChartStyles,
} from '../../styles/monthlySpendingChartStyles';

const CHART_HEIGHT = 280;
const MIN_CHART_WIDTH = 360;
const WIDTH_PER_POINT = 44;

export const MonthlySpendingChart = memo(function MonthlySpendingChart({
  trends,
  formatLabel = formatMonth,
}: SpendingChartProps) {
  const { currency: DASHBOARD_CURRENCY } = useCustomer();
  const formatSpent = (value: number | null) =>
    value === null ? '' : formatCurrency(value, DASHBOARD_CURRENCY);
  const formatTick = (value: number) =>
    formatAxisCurrency(value, DASHBOARD_CURRENCY);
  return (
    <Box
      sx={monthlySpendingChartStyles.viewport}
      role="region"
      aria-label="Spending chart, scroll horizontally for more dates"
      tabIndex={0}
    >
      <Box
        sx={[
          monthlySpendingChartStyles.chart,
          {
            minWidth: Math.max(
              MIN_CHART_WIDTH,
              trends.length * WIDTH_PER_POINT,
            ),
          },
        ]}
      >
        <LineChart
          height={CHART_HEIGHT}
          hideLegend
          grid={{ horizontal: true }}
          xAxis={[
            {
              scaleType: 'point',
              data: trends.map(({ month }) => month),
              valueFormatter: formatLabel,
            },
          ]}
          yAxis={[{ valueFormatter: formatTick, width: 72 }]}
          series={[
            {
              data: trends.map(({ totalSpent }) => totalSpent),
              label: 'Total spent',
              area: true,
              curve: 'monotoneX',
              color: colors.brand.redStrong,
              valueFormatter: formatSpent,
            },
          ]}
        >
          <defs>
            <linearGradient
              id={MONTHLY_SPENDING_GRADIENT_ID}
              x1="0"
              y1="0"
              x2="0"
              y2="1"
            >
              <stop
                offset="0%"
                stopColor={colors.brand.redStrong}
                stopOpacity={0.35}
              />
              <stop
                offset="100%"
                stopColor={colors.brand.redStrong}
                stopOpacity={0}
              />
            </linearGradient>
          </defs>
        </LineChart>
      </Box>
    </Box>
  );
});
