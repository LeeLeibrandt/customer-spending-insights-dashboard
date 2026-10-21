import { useCallback, useMemo, useState } from 'react';
import type { ChangeEvent } from 'react';
import SortOutlined from '@mui/icons-material/SortOutlined';
import { TablePagination, Typography } from '@mui/material';
import { componentStyles } from '../../styles/componentStyles';
import { PageHeader } from '../../components/layout/PageHeader';
import { RequestContent } from '../../components/request/RequestContent';
import { SectionCard } from '../../components/cards/SectionCard';
import { SelectField } from '../../components/inputs/SelectField';
import { TransactionsTable } from '../../components/transactions/TransactionsTable';
import { useApiRequest } from '../../hooks/useApiRequest';
import { useDateRangeFilter } from '../../hooks/useDateRangeFilter';
import { useFilters } from '../../hooks/useFilters';
import {
  DASHBOARD_CUSTOMER_ID,
  getTransactions,
} from '../../services/spendingInsightsService';
import type { ViewProps } from '../../types/components';
import { TransactionSortOrder } from '../../types/enums';
import { SORT_OPTIONS } from './sortOptions';
import { TransactionFilters } from './TransactionFilters';

const DEFAULT_PAGE_SIZE = 20;
const PAGE_SIZE_OPTIONS = [10, 20, 50, 100];
const ALL_CATEGORIES = '';

export function TransactionsView({ title, description }: ViewProps) {
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(DEFAULT_PAGE_SIZE);
  const [sortBy, setSortBy] = useState(TransactionSortOrder.DateDesc);
  const [category, setCategory] = useState(ALL_CATEGORIES);
  const resetPage = useCallback(() => setPage(0), []);
  const { dateRange, appliedDateRange, changeDateRange } =
    useDateRangeFilter(resetPage);
  const { data: filters } = useFilters();

  const categoryOptions = useMemo(
    () => [
      { value: ALL_CATEGORIES, label: 'All categories' },
      ...(filters?.categories ?? []).map((category) => ({
        value: category.name,
        label: category.name,
        category,
      })),
    ],
    [filters],
  );

  const requestTransactions = useCallback(
    (signal: AbortSignal) =>
      getTransactions(
        DASHBOARD_CUSTOMER_ID,
        {
          limit: pageSize,
          offset: page * pageSize,
          sortBy,
          category: category || undefined,
          startDate: appliedDateRange.startDate || undefined,
          endDate: appliedDateRange.endDate || undefined,
        },
        signal,
      ),
    [page, pageSize, sortBy, category, appliedDateRange],
  );
  const result = useApiRequest(requestTransactions);

  const handlePageChange = useCallback(
    (_event: unknown, nextPage: number) => setPage(nextPage),
    [],
  );
  const handlePageSizeChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      setPageSize(Number(event.target.value));
      setPage(0);
    },
    [],
  );
  const handleSortChange = useCallback((nextSortBy: TransactionSortOrder) => {
    setSortBy(nextSortBy);
    setPage(0);
  }, []);
  const handleCategoryChange = useCallback((nextCategory: string) => {
    setCategory(nextCategory);
    setPage(0);
  }, []);

  return (
    <>
      <PageHeader title={title} description={description} />
      <SectionCard
        title="All transactions"
        action={
          <SelectField
            label="Sort by"
            value={sortBy}
            options={SORT_OPTIONS}
            onChange={handleSortChange}
            icon={SortOutlined}
          />
        }
      >
        <TransactionFilters
          categoryOptions={categoryOptions}
          category={category}
          onCategoryChange={handleCategoryChange}
          dateRange={dateRange}
          onDateRangeChange={changeDateRange}
        />
        <RequestContent
          result={result}
          errorMessage="Your transactions could not be loaded."
        >
          {(data) => (
            <>
              {data.transactions.length === 0 ? (
                <Typography variant="body2" color="text.secondary">
                  No transactions match these filters.
                </Typography>
              ) : (
                <TransactionsTable transactions={data.transactions} />
              )}
              <TablePagination
                component="div"
                sx={componentStyles.pagination}
                count={data.pagination.total}
                page={page}
                rowsPerPage={pageSize}
                rowsPerPageOptions={PAGE_SIZE_OPTIONS}
                onPageChange={handlePageChange}
                onRowsPerPageChange={handlePageSizeChange}
              />
            </>
          )}
        </RequestContent>
      </SectionCard>
    </>
  );
}
