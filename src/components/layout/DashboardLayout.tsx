import { useState } from 'react';
import { Box } from '@mui/material';
import type { DashboardLayoutProps } from '../../types/components';
import type { DashboardView } from '../../types/enums';
import { AppHeader } from './AppHeader';
import { AppSidebar } from './AppSidebar';
import { layoutStyles } from './layoutStyles';
import { NAVIGATION_ITEMS } from './navigationItems';
import { PageHeader } from './PageHeader';

export function DashboardLayout({
  activeView,
  onSelectView,
  children,
}: DashboardLayoutProps) {
  const [isNavigationOpen, setIsNavigationOpen] = useState(false);
  const activeItem = NAVIGATION_ITEMS.find(({ view }) => view === activeView);

  const handleSelectView = (view: DashboardView) => {
    onSelectView(view);
    setIsNavigationOpen(false);
  };

  return (
    <Box sx={layoutStyles.root}>
      <AppHeader onOpenNavigation={() => setIsNavigationOpen(true)} />
      <AppSidebar
        activeView={activeView}
        isMobileOpen={isNavigationOpen}
        onSelectView={handleSelectView}
        onClose={() => setIsNavigationOpen(false)}
      />
      <Box component="main" sx={layoutStyles.content}>
        <Box sx={layoutStyles.contentOffset} />
        {activeItem && (
          <PageHeader
            title={activeItem.label}
            description={activeItem.description}
          />
        )}
        {children}
      </Box>
    </Box>
  );
}
