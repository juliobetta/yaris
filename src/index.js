import React from 'react';
import ReactDOM from 'react-dom';
import App from './app';
import configureStore from './app/config/store';
import { PRODUCTION } from './app/config/constants';
import './theme/main.less';

(() => {
  const target = document.querySelector('main');

  const store = configureStore();

  ReactDOM.render(
    <App store={store} />,
    target
  );

  if(process.env.NODE_ENV === PRODUCTION && offlineRuntime !== undefined) {
    offlineRuntime.install({
      onUpdating: () => undefined,
      onUpdateReady: () => offlineRuntime.applyUpdate(),
      onUpdated: () => { window.onbeforeunload = null; window.location.reload(true); },
      onUpdateFailed: () => undefined
    });
  }
})();
