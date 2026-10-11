import { memo } from 'react';
import ClearOutlined from '@mui/icons-material/ClearOutlined';
import { Box, Button, TextField } from '@mui/material';
import type { DateRangeFieldsProps } from '../types/components';
import { isDateRangeReversed } from '../utils/periods';
import { componentStyles } from './componentStyles';

const RANGE_ERROR = 'Choose a start date on or before the end date.';
const EMPTY_DATE_RANGE = { startDate: '', endDate: '' };

export const DateRangeFields = memo(function DateRangeFields({
  value,
  onChange,
}: DateRangeFieldsProps) {
  const hasError = isDateRangeReversed(value);
  const hasDates = value.startDate !== '' || value.endDate !== '';

  return (
    <Box sx={componentStyles.dateRangeFields}>
      <TextField
        type="date"
        size="small"
        label="From"
        value={value.startDate}
        onChange={(event) =>
          onChange({ ...value, startDate: event.target.value })
        }
        error={hasError}
        helperText={hasError ? RANGE_ERROR : undefined}
        sx={componentStyles.dateField}
        slotProps={{
          inputLabel: { shrink: true },
          htmlInput: { max: value.endDate || undefined },
        }}
      />
      <TextField
        type="date"
        size="small"
        label="To"
        value={value.endDate}
        onChange={(event) =>
          onChange({ ...value, endDate: event.target.value })
        }
        error={hasError}
        sx={componentStyles.dateField}
        slotProps={{
          inputLabel: { shrink: true },
          htmlInput: { min: value.startDate || undefined },
        }}
      />
      {hasDates && (
        <Button
          variant="outlined"
          startIcon={<ClearOutlined />}
          onClick={() => onChange(EMPTY_DATE_RANGE)}
          sx={componentStyles.clearDatesButton}
        >
          Clear dates
        </Button>
      )}
    </Box>
  );
});
