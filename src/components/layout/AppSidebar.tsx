import { memo } from 'react';
import {
  Box,
  Drawer,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
  useMediaQuery,
} from '@mui/material';
import type { Theme } from '@mui/material/styles';
import type { AppSidebarProps } from '../../types/components';
import { layoutStyles } from './layoutStyles';
import { NAVIGATION_ITEMS } from './navigationItems';

export const AppSidebar = memo(function AppSidebar({
  activeView,
  isMobileOpen,
  onSelectView,
  onClose,
}: AppSidebarProps) {
  const isDesktop = useMediaQuery((theme: Theme) => theme.breakpoints.up('md'));

  return (
    <Box component="nav" aria-label="Dashboard" sx={layoutStyles.sidebar}>
      <Drawer
        variant={isDesktop ? 'permanent' : 'temporary'}
        open={isDesktop || isMobileOpen}
        onClose={onClose}
        slotProps={{ paper: { sx: layoutStyles.sidebarPaper } }}
      >
        <Box sx={layoutStyles.brand}>
          <Box
            component="img"
            src="/favicon.svg?v=5"
            alt=""
            sx={layoutStyles.brandMark}
          />
          <Typography component="p" sx={layoutStyles.brandName} noWrap>
            Spending Insights
          </Typography>
        </Box>
        <List sx={layoutStyles.navigationList}>
          {NAVIGATION_ITEMS.map(({ view, label, icon: Icon }) => (
            <ListItemButton
              key={view}
              selected={view === activeView}
              aria-current={view === activeView ? 'page' : undefined}
              onClick={() => onSelectView(view)}
              sx={layoutStyles.navigationItem}
            >
              <ListItemIcon>
                <Icon fontSize="small" />
              </ListItemIcon>
              <ListItemText
                primary={label}
                slotProps={{
                  primary: { sx: layoutStyles.navigationLabel },
                }}
              />
            </ListItemButton>
          ))}
        </List>
      </Drawer>
    </Box>
  );
});
