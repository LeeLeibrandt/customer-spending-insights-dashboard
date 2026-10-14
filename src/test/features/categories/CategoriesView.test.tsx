import { fireEvent, screen, waitFor, within } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import { CategoriesView } from '../../../features/categories/CategoriesView';
import { createHandlers } from '../../../mocks/handlers';
import { renderWithTheme } from '../../renderWithTheme';
import { recordRequests } from '../../requestRecorder';
import { server } from '../../server';
import { getDateInput } from '../../dateInput';

describe('CategoriesView', () => {
  let recorder: ReturnType<typeof recordRequests>;

  beforeEach(() => {
    server.use(...createHandlers('2024-09-16'));
    recorder = recordRequests();
  });

  afterEach(() => {
    recorder.stop();
  });

  it('uses a custom date range once both dates are set', async () => {
    renderWithTheme(
      <CategoriesView title="Categories" description="By category" />,
    );

    const card = await screen.findByRole('region', {
      name: 'Spending by category',
    });
    expect(within(card).getByText('Groceries')).toBeInTheDocument();
    expect(
      screen.queryByRole('button', { name: 'Clear dates' }),
    ).not.toBeInTheDocument();

    fireEvent.change(getDateInput('From'), {
      target: { value: '2024-08-01' },
    });
    fireEvent.change(getDateInput('To'), {
      target: { value: '2024-08-31' },
    });

    await waitFor(() =>
      expect(
        recorder.urls.some((url) =>
          url.includes('startDate=2024-08-01&endDate=2024-08-31'),
        ),
      ).toBe(true),
    );
    expect(
      screen.getByText(/Showing your custom date range/),
    ).toBeInTheDocument();

    fireEvent.click(screen.getByRole('button', { name: 'Clear dates' }));

    expect(getDateInput('From')).toHaveValue('');
    expect(
      screen.getByText(
        'Choose a period, or set both dates for a custom range.',
      ),
    ).toBeInTheDocument();
  });
});
