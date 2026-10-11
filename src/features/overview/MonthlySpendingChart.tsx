import { memo } from 'react';
import { Box } from '@mui/material';
import { LineChart } from '@mui/x-charts/LineChart';
import { DASHBOARD_CURRENCY } from '../../services/spendingInsightsService';
import { colors } from '../../styles/colors';
import type { MonthlySpendingProps } from '../../types/components';
import {
  formatAxisCurrency,
  formatCurrency,
  formatMonth,
} from '../../utils/formatters';
import {
  MONTHLY_SPENDING_GRADIENT_ID,
  monthlySpendingChartStyles,
} from './monthlySpendingChartStyles';

const CHART_HEIGHT = 280;

const formatSpent = (value: number | null) =>
  value === null ? '' : formatCurrency(value, DASHBOARD_CURRENCY);

const formatTick = (value: number) =>
  formatAxisCurrency(value, DASHBOARD_CURRENCY);

export const MonthlySpendingChart = memo(function MonthlySpendingChart({
  trends,
}: MonthlySpendingProps) {
  return (
    <Box sx={monthlySpendingChartStyles.chart} aria-hidden="true">
      <LineChart
        height={CHART_HEIGHT}
        hideLegend
        grid={{ horizontal: true }}
        xAxis={[
          {
            scaleType: 'point',
            data: trends.map(({ month }) => month),
            valueFormatter: formatMonth,
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
  );
});
