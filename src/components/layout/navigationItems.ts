import BarChartOutlined from '@mui/icons-material/BarChartOutlined';
import DonutLargeOutlined from '@mui/icons-material/DonutLargeOutlined';
import FlagOutlined from '@mui/icons-material/FlagOutlined';
import ReceiptLongOutlined from '@mui/icons-material/ReceiptLongOutlined';
import ShowChartOutlined from '@mui/icons-material/ShowChartOutlined';
import type { NavigationItem } from '../../types/components';
import { DashboardView } from '../../types/enums';

export const NAVIGATION_ITEMS: NavigationItem[] = [
  {
    view: DashboardView.Overview,
    label: 'Spending insights',
    description: 'Understand where your money goes',
    icon: BarChartOutlined,
  },
  {
    view: DashboardView.Categories,
    label: 'Categories',
    description: 'See how your spending splits across categories',
    icon: DonutLargeOutlined,
  },
  {
    view: DashboardView.Trends,
    label: 'Trends',
    description: 'Compare your spending month by month',
    icon: ShowChartOutlined,
  },
  {
    view: DashboardView.Transactions,
    label: 'Transactions',
    description: 'Search, filter, and sort your transactions',
    icon: ReceiptLongOutlined,
  },
  {
    view: DashboardView.Goals,
    label: 'Goals',
    description: 'Track your monthly budgets',
    icon: FlagOutlined,
  },
];
