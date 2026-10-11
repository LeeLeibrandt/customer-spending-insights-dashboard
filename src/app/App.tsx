import { useState } from 'react';
import { DashboardLayout } from '../components/layout/DashboardLayout';
import { NAVIGATION_ITEMS } from '../components/layout/navigationItems';
import { PageHeader } from '../components/layout/PageHeader';
import { OverviewView } from '../features/overview/OverviewView';
import { DashboardView } from '../types/enums';

export function App() {
  const [activeView, setActiveView] = useState(DashboardView.Overview);
  const activeItem = NAVIGATION_ITEMS.find(({ view }) => view === activeView);

  return (
    <DashboardLayout activeView={activeView} onSelectView={setActiveView}>
      {activeItem &&
        (activeView === DashboardView.Overview ? (
          <OverviewView
            title={activeItem.label}
            description={activeItem.description}
          />
        ) : (
          <PageHeader
            title={activeItem.label}
            description={activeItem.description}
          />
        ))}
    </DashboardLayout>
  );
}
