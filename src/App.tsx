import React from 'react';
import AppRoutes from './routes/AppRoutes';
import { AppProviders } from './context/MultiProvider';

const App = () => {
  return (
    <AppProviders>
      <AppRoutes />
    </AppProviders>
  );
};

export default App;
