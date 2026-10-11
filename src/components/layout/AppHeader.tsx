import { memo } from 'react';
import MenuIcon from '@mui/icons-material/Menu';
import { AppBar, Box, IconButton, Toolbar } from '@mui/material';
import type { AppHeaderProps } from '../../types/components';
import { CustomerSummary } from './CustomerSummary';
import { layoutStyles } from './layoutStyles';

export const AppHeader = memo(function AppHeader({
  onOpenNavigation,
}: AppHeaderProps) {
  return (
    <AppBar position="fixed" elevation={0} sx={layoutStyles.header}>
      <Toolbar sx={layoutStyles.headerToolbar}>
        <IconButton
          color="inherit"
          edge="start"
          aria-label="Open navigation"
          onClick={onOpenNavigation}
          sx={layoutStyles.menuButton}
        >
          <MenuIcon />
        </IconButton>
        <Box sx={layoutStyles.headerSpacer} />
        <CustomerSummary />
      </Toolbar>
    </AppBar>
  );
});
