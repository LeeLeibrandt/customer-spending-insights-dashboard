import { fireEvent, screen, waitFor, within } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import { OverviewView } from '../../../features/overview/OverviewView';
import { createHandlers } from '../../../mocks/handlers';
import { renderWithTheme } from '../../renderWithTheme';
import { server } from '../../server';

const requestedUrls: string[] = [];

function recordRequest({ request }: { request: Request }) {
  requestedUrls.push(request.url);
}

describe('OverviewView', () => {
  beforeEach(() => {
    requestedUrls.length = 0;
    server.use(...createHandlers('2024-09-16'));
    server.events.on('request:start', recordRequest);
  });

  afterEach(() => {
    server.events.removeListener('request:start', recordRequest);
  });

  it('loads the summary for the selected period', async () => {
    renderWithTheme(
      <OverviewView title="Spending insights" description="Overview" />,
    );

    fireEvent.mouseDown(
      await screen.findByRole('combobox', { name: 'Period' }),
    );
    fireEvent.click(
      within(screen.getByRole('listbox')).getByRole('option', {
        name: 'Last 90 days',
      }),
    );

    await waitFor(() =>
      expect(
        requestedUrls.some((url) => url.includes('summary?period=90d')),
      ).toBe(true),
    );
  });
});
