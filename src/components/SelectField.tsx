import { memo } from 'react';
import { InputAdornment, MenuItem, TextField } from '@mui/material';
import type { SelectFieldProps } from '../types/components';
import { CategoryIcon } from './CategoryIcon';
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
        select: { displayEmpty: true },
        inputLabel: { shrink: true },
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
        <MenuItem
          key={option.value}
          value={option.value}
          sx={componentStyles.selectOption}
        >
          {option.category && (
            <CategoryIcon
              icon={option.category.icon}
              color={option.category.color}
            />
          )}
          {option.label}
        </MenuItem>
      ))}
    </TextField>
  );
}

export const SelectField = memo(SelectFieldBase) as typeof SelectFieldBase;
