import { lazy } from 'react';

const Dashboard = lazy(() => import('./Dashboard'));

const AnalyticsDashboardAppConfig = {
  settings: {
    layout: {
      config: {},
    },
  },
  routes: [
    {
      path: 'dashboards',
      element: <Dashboard />,
    },
  ],
};

export default AnalyticsDashboardAppConfig;
