import { http, HttpResponse } from 'msw';
import type { DateRange } from '../types/common';
import { GoalStatus, TransactionSortOrder } from '../types/enums';
import type { Transaction } from '../types/transactions';
import {
  addMonths,
  getDayOfMonth,
  getDaysInMonth,
  isIsoDate,
  toIsoMonth,
} from '../utils/dates';
import {
  calculateAverage,
  calculatePercentage,
  calculatePercentageChange,
} from '../utils/money';
import {
  DEFAULT_PERIOD,
  getPeriodDateRange,
  getPreviousDateRange,
  isPeriod,
  isValidDateRange,
} from '../utils/periods';
import {
  calculateTotals,
  calculateTotalsByCategory,
  calculateTotalsByMonth,
  filterTransactionsByDate,
  findTopCategory,
} from '../utils/spendingCalculations';
import { MOCK_CATEGORIES } from './data/categories';
import { MOCK_CUSTOMER } from './data/customer';
import { MOCK_DATE_RANGE_PRESETS } from './data/dateRangePresets';
import { MOCK_GOAL_BUDGETS } from './data/goalBudgets';
import { createMockTransactions } from './transactions';

const CUSTOMER_PATH = '/api/customers/:customerId';
const DEFAULT_TREND_MONTHS = 12;
const MAX_TREND_MONTHS = 24;
const DEFAULT_TRANSACTION_LIMIT = 20;
const MAX_TRANSACTION_LIMIT = 100;
const GOAL_WARNING_PERCENTAGE = 80;

function badRequest(message: string) {
  return HttpResponse.json({ message }, { status: 400 });
}

function notFound() {
  return HttpResponse.json({ message: 'Customer not found' }, { status: 404 });
}

function isKnownCustomer(customerId: unknown): boolean {
  return customerId === MOCK_CUSTOMER.customerId;
}

function parseInteger(
  value: string | null,
  defaultValue: number,
  min: number,
  max: number,
): number | null {
  const parsed = value === null ? defaultValue : Number(value);
  return Number.isInteger(parsed) && parsed >= min && parsed <= max
    ? parsed
    : null;
}

function getPeriodRange(value: string | null, today: string): DateRange | null {
  const period = value ?? DEFAULT_PERIOD;
  return isPeriod(period) ? getPeriodDateRange(period, today) : null;
}

function getGoalStatus(currentSpent: number, monthlyBudget: number) {
  if (currentSpent > monthlyBudget) {
    return GoalStatus.Exceeded;
  }

  return (currentSpent / monthlyBudget) * 100 >= GOAL_WARNING_PERCENTAGE
    ? GoalStatus.Warning
    : GoalStatus.OnTrack;
}

function compareTransactions(sortBy: TransactionSortOrder) {
  return (first: Transaction, second: Transaction) => {
    switch (sortBy) {
      case TransactionSortOrder.DateAsc:
        return first.date.localeCompare(second.date);
      case TransactionSortOrder.AmountDesc:
        return second.amount - first.amount;
      case TransactionSortOrder.AmountAsc:
        return first.amount - second.amount;
      default:
        return second.date.localeCompare(first.date);
    }
  };
}

export function createHandlers(today: string) {
  const transactions = createMockTransactions(today);

  return [
    http.get(`${CUSTOMER_PATH}/profile`, ({ params }) => {
      if (!isKnownCustomer(params.customerId)) {
        return notFound();
      }

      return HttpResponse.json({
        ...MOCK_CUSTOMER,
        totalSpent: calculateTotals(transactions).amount,
      });
    }),

    http.get(`${CUSTOMER_PATH}/spending/summary`, ({ params, request }) => {
      if (!isKnownCustomer(params.customerId)) {
        return notFound();
      }

      const period =
        new URL(request.url).searchParams.get('period') ?? DEFAULT_PERIOD;
      const range = getPeriodRange(period, today);

      if (!range) {
        return badRequest('Unsupported period');
      }

      const current = filterTransactionsByDate(transactions, range);
      const previous = filterTransactionsByDate(
        transactions,
        getPreviousDateRange(range),
      );
      const currentTotals = calculateTotals(current);
      const previousTotals = calculateTotals(previous);

      return HttpResponse.json({
        period,
        totalSpent: currentTotals.amount,
        transactionCount: currentTotals.transactionCount,
        averageTransaction: calculateAverage(
          currentTotals.amount,
          currentTotals.transactionCount,
        ),
        topCategory: findTopCategory(current) ?? '',
        comparedToPrevious: {
          spentChange: calculatePercentageChange(
            currentTotals.amount,
            previousTotals.amount,
          ),
          transactionChange: calculatePercentageChange(
            currentTotals.transactionCount,
            previousTotals.transactionCount,
          ),
        },
      });
    }),

    http.get(`${CUSTOMER_PATH}/spending/categories`, ({ params, request }) => {
      if (!isKnownCustomer(params.customerId)) {
        return notFound();
      }

      const searchParams = new URL(request.url).searchParams;
      const startDate = searchParams.get('startDate');
      const endDate = searchParams.get('endDate');
      const hasCustomRange = startDate !== null || endDate !== null;
      const dateRange = hasCustomRange
        ? { startDate: startDate ?? '', endDate: endDate ?? '' }
        : getPeriodRange(searchParams.get('period'), today);

      if (!dateRange || !isValidDateRange(dateRange)) {
        return badRequest('Invalid period or date range');
      }

      const inRange = filterTransactionsByDate(transactions, dateRange);
      const { amount: totalAmount } = calculateTotals(inRange);
      const totalsByCategory = calculateTotalsByCategory(inRange);

      const categories = MOCK_CATEGORIES.flatMap((category) => {
        const totals = totalsByCategory.get(category.name);
        return totals
          ? [
              {
                ...category,
                amount: totals.amount,
                percentage: calculatePercentage(totals.amount, totalAmount),
                transactionCount: totals.transactionCount,
              },
            ]
          : [];
      }).sort((first, second) => second.amount - first.amount);

      return HttpResponse.json({ dateRange, totalAmount, categories });
    }),

    http.get(`${CUSTOMER_PATH}/spending/trends`, ({ params, request }) => {
      if (!isKnownCustomer(params.customerId)) {
        return notFound();
      }

      const months = parseInteger(
        new URL(request.url).searchParams.get('months'),
        DEFAULT_TREND_MONTHS,
        1,
        MAX_TREND_MONTHS,
      );

      if (months === null) {
        return badRequest(`Months must be from 1 to ${MAX_TREND_MONTHS}`);
      }

      const totalsByMonth = calculateTotalsByMonth(transactions);
      const currentMonth = toIsoMonth(today);

      const trends = Array.from({ length: months }, (_, index) => {
        const month = addMonths(currentMonth, index - (months - 1));
        const totals = totalsByMonth.get(month) ?? {
          amount: 0,
          transactionCount: 0,
        };

        return {
          month,
          totalSpent: totals.amount,
          transactionCount: totals.transactionCount,
          averageTransaction: calculateAverage(
            totals.amount,
            totals.transactionCount,
          ),
        };
      });

      return HttpResponse.json({ trends });
    }),

    http.get(`${CUSTOMER_PATH}/transactions`, ({ params, request }) => {
      if (!isKnownCustomer(params.customerId)) {
        return notFound();
      }

      const searchParams = new URL(request.url).searchParams;
      const limit = parseInteger(
        searchParams.get('limit'),
        DEFAULT_TRANSACTION_LIMIT,
        1,
        MAX_TRANSACTION_LIMIT,
      );
      const offset = parseInteger(
        searchParams.get('offset'),
        0,
        0,
        Number.MAX_SAFE_INTEGER,
      );
      const sortBy =
        searchParams.get('sortBy') ?? TransactionSortOrder.DateDesc;
      const category = searchParams.get('category');
      const startDate = searchParams.get('startDate') ?? undefined;
      const endDate = searchParams.get('endDate') ?? undefined;

      if (
        limit === null ||
        offset === null ||
        !Object.values<string>(TransactionSortOrder).includes(sortBy) ||
        (startDate !== undefined && !isIsoDate(startDate)) ||
        (endDate !== undefined && !isIsoDate(endDate))
      ) {
        return badRequest('Invalid transaction query');
      }

      const matches = filterTransactionsByDate(transactions, {
        startDate,
        endDate,
      })
        .filter(
          (transaction) =>
            category === null || transaction.category === category,
        )
        .sort(compareTransactions(sortBy as TransactionSortOrder));

      return HttpResponse.json({
        transactions: matches.slice(offset, offset + limit),
        pagination: {
          total: matches.length,
          limit,
          offset,
          hasMore: offset + limit < matches.length,
        },
      });
    }),

    http.get(`${CUSTOMER_PATH}/goals`, ({ params }) => {
      if (!isKnownCustomer(params.customerId)) {
        return notFound();
      }

      const totalsByCategory = calculateTotalsByCategory(
        filterTransactionsByDate(transactions, {
          startDate: `${toIsoMonth(today)}-01`,
          endDate: today,
        }),
      );
      const daysRemaining = getDaysInMonth(today) - getDayOfMonth(today);

      const goals = MOCK_GOAL_BUDGETS.map((budget) => {
        const currentSpent = totalsByCategory.get(budget.category)?.amount ?? 0;

        return {
          ...budget,
          currentSpent,
          percentageUsed: calculatePercentage(
            currentSpent,
            budget.monthlyBudget,
            2,
          ),
          daysRemaining,
          status: getGoalStatus(currentSpent, budget.monthlyBudget),
        };
      });

      return HttpResponse.json({ goals });
    }),

    http.get(`${CUSTOMER_PATH}/filters`, ({ params }) => {
      if (!isKnownCustomer(params.customerId)) {
        return notFound();
      }

      return HttpResponse.json({
        categories: MOCK_CATEGORIES,
        dateRangePresets: MOCK_DATE_RANGE_PRESETS,
      });
    }),
  ];
}
