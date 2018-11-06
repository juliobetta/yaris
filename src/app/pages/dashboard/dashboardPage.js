import React, { Fragment, PureComponent } from 'react';
import { Link } from 'react-router-dom';
import i18n from 'app/i18n';
import { routes } from 'config/routes';
import Counter from 'components/Counter';

class Dashboard extends PureComponent {
  render() {
    return (
      <Fragment>
        <h1>{i18n.t('pages.dashboard.title')}</h1>
        <Counter initialValue={0} resetLabel={i18n.t('shared.actions.reset')} />
        <Link to={routes.root}>{i18n.t('pages.root.linkBack')}</Link>
      </Fragment>
    );
  }
}

export default Dashboard;
