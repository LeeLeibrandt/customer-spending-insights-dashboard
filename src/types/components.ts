import type { ReactNode } from 'react';
import type { SvgIconComponent } from '@mui/icons-material';
import type { DashboardView } from './enums';

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
}

export interface DashboardLayoutProps {
  activeView: DashboardView;
  onSelectView: (view: DashboardView) => void;
  children?: ReactNode;
}
