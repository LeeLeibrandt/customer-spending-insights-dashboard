import type { ReactNode } from 'react';
import type { SvgIconComponent } from '@mui/icons-material';
import type { SpendingCategory } from './categories';
import type { CategoryIcon, DashboardView, GoalStatus, Period } from './enums';
import type { SpendingGoal } from './goals';
import type { ApiRequestResult } from './apiRequest';
import type { DateRange } from './common';
import type { CustomerProfile } from './customer';
import type {
  CategorySpending,
  CategorySpendingQuery,
  MonthlySpendingTrend,
  SpendingBucket,
} from './spending';
import type { Transaction } from './transactions';

export interface NavigationItem {
  view: DashboardView;
  label: string;
  description: string;
  icon: SvgIconComponent;
}

export interface AppHeaderProps {
  onOpenNavigation: () => void;
}

export interface AppSidebarProps {
  activeView: DashboardView;
  isMobileOpen: boolean;
  onSelectView: (view: DashboardView) => void;
  onClose: () => void;
}

export interface PageHeaderProps {
  title: string;
  description: string;
  action?: ReactNode;
}

export interface DashboardLayoutProps {
  activeView: DashboardView;
  onSelectView: (view: DashboardView) => void;
  children?: ReactNode;
}

export interface StatCardProps {
  icon: SvgIconComponent;
  label: string;
  value: string;
  change?: number;
}

export interface ChangeIndicatorProps {
  value: number;
  label: string;
}

export interface SpendingSummaryCardsProps {
  period: Period;
}

export interface SelectOption<T extends string> {
  value: T;
  label: string;
  category?: SpendingCategory;
}

export interface SelectFieldProps<T extends string> {
  label: string;
  value: T;
  options: SelectOption<T>[];
  onChange: (value: T) => void;
  icon?: SvgIconComponent;
}

export interface ViewProps {
  title: string;
  description: string;
}

export interface SectionCardProps {
  title: string;
  subtitle?: string;
  action?: ReactNode;
  children: ReactNode;
}

export interface RequestErrorProps {
  message: string;
  onRetry: () => void;
}

export interface CategoryIconProps {
  icon: CategoryIcon;
  color: string;
}

export interface CategorySpendingCardProps {
  query: CategorySpendingQuery;
}

export interface CategorySpendingRowProps {
  category: CategorySpending;
}

export interface MonthlySpendingProps {
  trends: MonthlySpendingTrend[];
}

export interface SpendingChartProps {
  trends: SpendingBucket[];
  formatLabel?: (value: string) => string;
}

export interface MonthlySpendingTableProps extends MonthlySpendingProps {
  isVisible?: boolean;
}

export interface MonthlySpendingCardProps {
  months: number;
  showTable?: boolean;
}

export interface OverviewViewProps extends ViewProps {
  onViewTransactions: () => void;
}

export interface RecentTransactionsCardProps {
  onViewAll: () => void;
}

export interface TransactionRowProps {
  transaction: Transaction;
}

export interface TransactionsTableProps {
  transactions: Transaction[];
}

export interface RequestContentProps<T> {
  result: ApiRequestResult<T>;
  errorMessage: string;
  skeletonHeight?: number;
  loadingFallback?: ReactNode;
  children: (data: T) => ReactNode;
}

export interface CustomerProfileDetailsProps {
  profile: CustomerProfile;
}

export interface DateRangeFieldsProps {
  value: DateRange;
  onChange: (value: DateRange) => void;
}

export interface TransactionFiltersProps {
  categoryOptions: SelectOption<string>[];
  category: string;
  onCategoryChange: (category: string) => void;
  dateRange: DateRange;
  onDateRangeChange: (dateRange: DateRange) => void;
}

export interface ProgressBarProps {
  value: number;
  color?: string;
}

export interface GoalStatusLabelProps {
  status: GoalStatus;
}

export interface GoalCardProps {
  goal: SpendingGoal;
  category?: SpendingCategory;
}

export interface GoalStatusDetails {
  label: string;
  icon: SvgIconComponent;
  color: string;
  tint: string;
}
