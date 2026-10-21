import { useCallback, useEffect, useState } from 'react';
import { Box } from '@mui/material';
import type { DashboardLayoutProps } from '../../types/components';
import type { DashboardView } from '../../types/enums';
import { AppHeader } from './AppHeader';
import { AppSidebar } from './AppSidebar';
import { layoutStyles } from '../../styles/layoutStyles';

export function DashboardLayout({
  activeView,
  onSelectView,
  children,
}: DashboardLayoutProps) {
  const [isNavigationOpen, setIsNavigationOpen] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [activeView]);

  const openNavigation = useCallback(() => setIsNavigationOpen(true), []);
  const closeNavigation = useCallback(() => setIsNavigationOpen(false), []);
  const handleSelectView = useCallback(
    (view: DashboardView) => {
      onSelectView(view);
      setIsNavigationOpen(false);
    },
    [onSelectView],
  );

  return (
    <Box sx={layoutStyles.root}>
      <AppHeader onOpenNavigation={openNavigation} />
      <AppSidebar
        activeView={activeView}
        isMobileOpen={isNavigationOpen}
        onSelectView={handleSelectView}
        onClose={closeNavigation}
      />
      <Box component="main" sx={layoutStyles.content}>
        <Box sx={layoutStyles.contentOffset} />
        {children}
      </Box>
    </Box>
  );
}
