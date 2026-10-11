import { screen, within } from '@testing-library/react';
import { beforeEach, describe, expect, it } from 'vitest';
import { GoalsView } from '../../../features/goals/GoalsView';
import { createHandlers } from '../../../mocks/handlers';
import { renderWithTheme } from '../../renderWithTheme';
import { server } from '../../server';

const STATUS_LABEL = /^(On track|Warning|Exceeded)$/;

describe('GoalsView', () => {
  beforeEach(() => {
    server.use(...createHandlers('2024-09-16'));
  });

  it('shows each monthly goal with a text status', async () => {
    renderWithTheme(<GoalsView title="Goals" description="Budgets" />);

    const goal = await screen.findByRole('region', { name: 'Groceries' });
    expect(within(goal).getByText(STATUS_LABEL)).toBeInTheDocument();
    expect(within(goal).getByText('14 days remaining')).toBeInTheDocument();
    expect(screen.getAllByText(STATUS_LABEL)).toHaveLength(4);
  });
});
