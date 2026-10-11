import CheckCircleOutlined from '@mui/icons-material/CheckCircleOutlined';
import ErrorOutlined from '@mui/icons-material/ErrorOutlined';
import WarningAmberOutlined from '@mui/icons-material/WarningAmberOutlined';
import { colors } from '../../styles/colors';
import type { GoalStatusDetails } from '../../types/components';
import { GoalStatus } from '../../types/enums';

export const GOAL_STATUS_DETAILS: Record<GoalStatus, GoalStatusDetails> = {
  [GoalStatus.OnTrack]: {
    label: 'On track',
    icon: CheckCircleOutlined,
    color: colors.success,
    tint: colors.successTint,
  },
  [GoalStatus.Warning]: {
    label: 'Warning',
    icon: WarningAmberOutlined,
    color: colors.warning,
    tint: colors.warningTint,
  },
  [GoalStatus.Exceeded]: {
    label: 'Exceeded',
    icon: ErrorOutlined,
    color: colors.brand.redStrong,
    tint: colors.brand.redTint,
  },
};
