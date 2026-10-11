import { DEFAULT_PERIOD } from '../../utils/periods';
import { SpendingSummaryCards } from './SpendingSummaryCards';

export function OverviewView() {
  return <SpendingSummaryCards period={DEFAULT_PERIOD} />;
}
