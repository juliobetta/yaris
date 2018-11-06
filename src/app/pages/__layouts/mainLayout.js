import React, { PureComponent } from 'react';
import { Route } from 'react-router';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class BaseLayout extends PureComponent {
  static propTypes = {
    component: PropTypes.func.isRequired
  }

  render() {
    const { component, ...rest } = this.props;

    return (
      <Route {...rest} render={this.renderComponent(component)} />
    );
  }

  /**
   * Render the composed component set in config/routes.js
   * @param {React.Component} Component
   * @return {function(matchProps): React.Component} the router matched props
   */
  renderComponent = Component => matchProps => (
    <div>
      <nav>{process.env.PROJECT_NAME}</nav>

      <Component
        {...matchProps}
        {...{
          history: matchProps.history,
          ...this.props
        }}
        location={this.props.location}
      />
    </div>
  );
}

export default connect(state => ({
  locale: state.i18n.locale
}))(BaseLayout);
