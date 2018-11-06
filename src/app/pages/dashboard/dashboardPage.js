import React, { Fragment, PureComponent } from 'react';
import { Link } from 'react-router-dom';
import { I18n } from 'react-redux-i18n';
import { routes } from 'config/routes';
import Counter from 'components/Counter';

class Dashboard extends PureComponent {
  render() {
    return (
      <Fragment>
        <h1>{I18n.t('pages.dashboard.title')}</h1>
        <Counter initialValue={0} resetLabel={I18n.t('shared.actions.reset')} />
        <Link to={routes.root}>{I18n.t('pages.root.linkBack')}</Link>
      </Fragment>
    );
  }
}

export default Dashboard;
