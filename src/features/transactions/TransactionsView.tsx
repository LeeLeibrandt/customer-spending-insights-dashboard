import { useCallback, useState } from 'react';
import type { ChangeEvent } from 'react';
import SortOutlined from '@mui/icons-material/SortOutlined';
import { TablePagination, Typography } from '@mui/material';
import { PageHeader } from '../../components/layout/PageHeader';
import { RequestContent } from '../../components/RequestContent';
import { SectionCard } from '../../components/SectionCard';
import { SelectField } from '../../components/SelectField';
import { TransactionsTable } from '../../components/TransactionsTable';
import { useApiRequest } from '../../hooks/useApiRequest';
import {
  DASHBOARD_CUSTOMER_ID,
  getTransactions,
} from '../../services/spendingInsightsService';
import type { ViewProps } from '../../types/components';
import { TransactionSortOrder } from '../../types/enums';
import { SORT_OPTIONS } from './sortOptions';

const DEFAULT_PAGE_SIZE = 20;
const PAGE_SIZE_OPTIONS = [10, 20, 50, 100];

export function TransactionsView({ title, description }: ViewProps) {
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(DEFAULT_PAGE_SIZE);
  const [sortBy, setSortBy] = useState(TransactionSortOrder.DateDesc);

  const requestTransactions = useCallback(
    (signal: AbortSignal) =>
      getTransactions(
        DASHBOARD_CUSTOMER_ID,
        { limit: pageSize, offset: page * pageSize, sortBy },
        signal,
      ),
    [page, pageSize, sortBy],
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

  return (
    <>
      <PageHeader title={title} description={description} />
      <RequestContent
        result={result}
        errorMessage="Your transactions could not be loaded."
      >
        {(data) => (
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
            {data.transactions.length === 0 ? (
              <Typography variant="body2" color="text.secondary">
                No transactions found.
              </Typography>
            ) : (
              <TransactionsTable transactions={data.transactions} />
            )}
            <TablePagination
              component="div"
              count={data.pagination.total}
              page={page}
              rowsPerPage={pageSize}
              rowsPerPageOptions={PAGE_SIZE_OPTIONS}
              onPageChange={handlePageChange}
              onRowsPerPageChange={handlePageSizeChange}
            />
          </SectionCard>
        )}
      </RequestContent>
    </>
  );
}
