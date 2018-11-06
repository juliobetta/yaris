import React from 'react';
import { BrowserRouter as Router, Switch } from 'react-router-dom';
import { MainLayout } from 'pages/__layouts';
import {
  Root,
  Dashboard
} from 'pages';

export const routes = {
  get root() {
    return '/';
  },

  get dashboard() {
    return '/dashboard';
  }
};

export default () => (
  <Router>
    <Switch>
      <MainLayout exact path={routes.root} component={Root} />
      <MainLayout exact path={routes.dashboard} component={Dashboard} />
    </Switch>
  </Router>
);
