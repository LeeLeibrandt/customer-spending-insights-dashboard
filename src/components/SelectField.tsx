import { memo } from 'react';
import { InputAdornment, MenuItem, TextField } from '@mui/material';
import type { SelectFieldProps } from '../types/components';
import { componentStyles } from './componentStyles';

function SelectFieldBase<T extends string>({
  label,
  value,
  options,
  onChange,
  icon: Icon,
}: SelectFieldProps<T>) {
  return (
    <TextField
      select
      size="small"
      label={label}
      value={value}
      onChange={(event) => onChange(event.target.value as T)}
      sx={componentStyles.selectField}
      slotProps={{
        input: {
          startAdornment: Icon && (
            <InputAdornment position="start">
              <Icon fontSize="small" sx={componentStyles.selectFieldIcon} />
            </InputAdornment>
          ),
        },
      }}
    >
      {options.map((option) => (
        <MenuItem key={option.value} value={option.value}>
          {option.label}
        </MenuItem>
      ))}
    </TextField>
  );
}

export const SelectField = memo(SelectFieldBase) as typeof SelectFieldBase;
