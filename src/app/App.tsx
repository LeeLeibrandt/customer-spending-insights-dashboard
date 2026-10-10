import { useState } from 'react';
import { DashboardLayout } from '../components/layout/DashboardLayout';
import { DashboardView } from '../types/enums';

export function App() {
  const [activeView, setActiveView] = useState(DashboardView.Overview);

  return (
    <DashboardLayout activeView={activeView} onSelectView={setActiveView} />
  );
}
