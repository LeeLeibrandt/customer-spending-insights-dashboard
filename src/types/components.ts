import type { ReactNode } from 'react';
import type { SvgIconComponent } from '@mui/icons-material';
import type { CategoryIcon, DashboardView, Period } from './enums';
import type { DateRangePreset } from './filters';
import type { CategorySpending, MonthlySpendingTrend } from './spending';

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

export interface PeriodSelectProps {
  value: Period;
  presets: DateRangePreset[];
  onChange: (period: Period) => void;
}

export interface ViewProps {
  title: string;
  description: string;
}

export interface SectionCardProps {
  title: string;
  subtitle?: string;
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
  period: Period;
}

export interface CategorySpendingRowProps {
  category: CategorySpending;
}

export interface MonthlySpendingProps {
  trends: MonthlySpendingTrend[];
}
