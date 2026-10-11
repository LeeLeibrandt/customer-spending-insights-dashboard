import { memo } from 'react';
import BoltOutlined from '@mui/icons-material/BoltOutlined';
import DirectionsCarOutlined from '@mui/icons-material/DirectionsCarOutlined';
import MovieOutlined from '@mui/icons-material/MovieOutlined';
import RestaurantOutlined from '@mui/icons-material/RestaurantOutlined';
import ShoppingBagOutlined from '@mui/icons-material/ShoppingBagOutlined';
import ShoppingCartOutlined from '@mui/icons-material/ShoppingCartOutlined';
import type { SvgIconComponent } from '@mui/icons-material';
import { Box } from '@mui/material';
import type { CategoryIconProps } from '../types/components';
import { CategoryIcon as CategoryIconName } from '../types/enums';
import { componentStyles } from './componentStyles';

const CATEGORY_ICONS: Record<CategoryIconName, SvgIconComponent> = {
  [CategoryIconName.ShoppingCart]: ShoppingCartOutlined,
  [CategoryIconName.Film]: MovieOutlined,
  [CategoryIconName.Car]: DirectionsCarOutlined,
  [CategoryIconName.Utensils]: RestaurantOutlined,
  [CategoryIconName.ShoppingBag]: ShoppingBagOutlined,
  [CategoryIconName.Zap]: BoltOutlined,
};

export const CategoryIcon = memo(function CategoryIcon({
  icon,
  color,
}: CategoryIconProps) {
  const Icon = CATEGORY_ICONS[icon];

  return (
    <Box sx={componentStyles.categoryIcon} aria-hidden="true">
      <Icon fontSize="small" sx={{ color }} />
    </Box>
  );
});
