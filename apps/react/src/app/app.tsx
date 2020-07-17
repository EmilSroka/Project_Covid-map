import React from 'react';

import './app.scss';

import Dashboard from './dashboard/dashboard';
import { Route } from 'react-router-dom';

export const App = () => {
  return (
    <Route
      path={['/date/:date', '/interval/:startDate/:stopDate', '/']}
      component={Dashboard}
    />
  );
};

export default App;
