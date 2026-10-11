import { useState } from 'react';
import { DashboardLayout } from '../components/layout/DashboardLayout';
import { OverviewView } from '../features/overview/OverviewView';
import { DashboardView } from '../types/enums';

export function App() {
  const [activeView, setActiveView] = useState(DashboardView.Overview);

  return (
    <DashboardLayout activeView={activeView} onSelectView={setActiveView}>
      {activeView === DashboardView.Overview && <OverviewView />}
    </DashboardLayout>
  );
}
