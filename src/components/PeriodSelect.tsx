import { memo } from 'react';
import CalendarTodayOutlined from '@mui/icons-material/CalendarTodayOutlined';
import { InputAdornment, MenuItem, TextField } from '@mui/material';
import type { PeriodSelectProps } from '../types/components';
import type { Period } from '../types/enums';
import { componentStyles } from './componentStyles';

export const PeriodSelect = memo(function PeriodSelect({
  value,
  presets,
  onChange,
}: PeriodSelectProps) {
  return (
    <TextField
      select
      size="small"
      label="Period"
      value={value}
      onChange={(event) => onChange(event.target.value as Period)}
      sx={componentStyles.periodSelect}
      slotProps={{
        input: {
          startAdornment: (
            <InputAdornment position="start">
              <CalendarTodayOutlined
                fontSize="small"
                sx={componentStyles.periodSelectIcon}
              />
            </InputAdornment>
          ),
        },
      }}
    >
      {presets.map((preset) => (
        <MenuItem key={preset.value} value={preset.value}>
          {preset.label}
        </MenuItem>
      ))}
    </TextField>
  );
});
