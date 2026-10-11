import { useCallback, useState } from 'react';
import { DashboardLayout } from '../components/layout/DashboardLayout';
import { NAVIGATION_ITEMS } from '../components/layout/navigationItems';
import { PageHeader } from '../components/layout/PageHeader';
import { CategoriesView } from '../features/categories/CategoriesView';
import { OverviewView } from '../features/overview/OverviewView';
import { TransactionsView } from '../features/transactions/TransactionsView';
import { DashboardView } from '../types/enums';

export function App() {
  const [activeView, setActiveView] = useState(DashboardView.Overview);
  const activeItem = NAVIGATION_ITEMS.find(({ view }) => view === activeView);
  const showTransactions = useCallback(
    () => setActiveView(DashboardView.Transactions),
    [],
  );

  const renderView = () => {
    if (!activeItem) {
      return null;
    }

    const viewProps = {
      title: activeItem.label,
      description: activeItem.description,
    };

    switch (activeView) {
      case DashboardView.Overview:
        return (
          <OverviewView {...viewProps} onViewTransactions={showTransactions} />
        );
      case DashboardView.Categories:
        return <CategoriesView {...viewProps} />;
      case DashboardView.Transactions:
        return <TransactionsView {...viewProps} />;
      default:
        return <PageHeader {...viewProps} />;
    }
  };

  return (
    <DashboardLayout activeView={activeView} onSelectView={setActiveView}>
      {renderView()}
    </DashboardLayout>
  );
}
