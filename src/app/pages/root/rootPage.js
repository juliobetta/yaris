import React, { Fragment, PureComponent } from 'react';
import { Link } from 'react-router-dom';
import i18n from 'app/i18n';
import { routes } from 'config/routes';

class Root extends PureComponent {
  render() {
    return (
      <Fragment>
        <h1>{i18n.t('pages.root.title')}</h1>
        <Link to={routes.dashboard}>{i18n.t('pages.dashboard.link')}</Link>
      </Fragment>
    );
  }
}

export default Root;
