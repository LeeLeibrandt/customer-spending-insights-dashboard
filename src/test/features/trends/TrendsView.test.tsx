import { screen, waitFor, within } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import { TrendsView } from '../../../features/trends/TrendsView';
import { createHandlers } from '../../../mocks/handlers';
import { renderWithTheme } from '../../renderWithTheme';
import { recordRequests } from '../../requestRecorder';
import { selectOption } from '../../selectOption';
import { server } from '../../server';

describe('TrendsView', () => {
  let recorder: ReturnType<typeof recordRequests>;

  beforeEach(() => {
    server.use(...createHandlers('2024-09-16'));
    recorder = recordRequests();
  });

  afterEach(() => {
    recorder.stop();
  });

  it('shows a monthly table and changes the number of months', async () => {
    renderWithTheme(<TrendsView title="Trends" description="Monthly" />);

    const table = await screen.findByRole('table', {
      name: 'Monthly spending',
    });
    expect(within(table).getAllByRole('row')).toHaveLength(13);

    await selectOption('Months', 'Last 24 months');

    await waitFor(() =>
      expect(recorder.urls.some((url) => url.includes('months=24'))).toBe(true),
    );
  });
});
