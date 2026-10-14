import { memo } from 'react';
import ClearOutlined from '@mui/icons-material/ClearOutlined';
import { Box, Button } from '@mui/material';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import dayjs, { type Dayjs } from 'dayjs';
import type { DateRangeFieldsProps } from '../types/components';
import { isDateRangeReversed } from '../utils/periods';
import { componentStyles } from './componentStyles';

const RANGE_ERROR = 'Choose a start date on or before the end date.';
const DATE_FORMAT = 'YYYY-MM-DD';
const EMPTY_DATE_RANGE = { startDate: '', endDate: '' };

function toDayjs(isoDate: string): Dayjs | null {
  return isoDate ? dayjs(isoDate) : null;
}

function toIsoDate(date: Dayjs | null): string {
  return date?.isValid() ? date.format(DATE_FORMAT) : '';
}

export const DateRangeFields = memo(function DateRangeFields({
  value,
  onChange,
}: DateRangeFieldsProps) {
  const hasError = isDateRangeReversed(value);
  const hasDates = value.startDate !== '' || value.endDate !== '';

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Box sx={componentStyles.dateRangeFields}>
        <DatePicker
          label="From"
          format={DATE_FORMAT}
          value={toDayjs(value.startDate)}
          onChange={(date) =>
            onChange({ ...value, startDate: toIsoDate(date) })
          }
          maxDate={toDayjs(value.endDate) ?? undefined}
          slotProps={{
            textField: {
              size: 'small',
              error: hasError,
              helperText: hasError ? RANGE_ERROR : undefined,
              sx: componentStyles.dateField,
            },
          }}
        />
        <DatePicker
          label="To"
          format={DATE_FORMAT}
          value={toDayjs(value.endDate)}
          onChange={(date) => onChange({ ...value, endDate: toIsoDate(date) })}
          minDate={toDayjs(value.startDate) ?? undefined}
          slotProps={{
            textField: {
              size: 'small',
              error: hasError,
              sx: componentStyles.dateField,
            },
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
    </LocalizationProvider>
  );
});
