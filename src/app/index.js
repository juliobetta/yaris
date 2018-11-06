import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Provider } from 'react-redux';
import Routes from 'config/routes';

class App extends Component {
  static propTypes = {
    store: PropTypes.instanceOf(Object)
  }

  render() {
    return (
      <Provider store={this.props.store}>
        <Routes />
      </Provider>
    );
  }
}

export default App;
