import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { initialState, increment, decrement, reset } from './state';
import Styles from './index.less';


class Counter extends PureComponent {
  static propTypes = {
    initialValue: PropTypes.number,
    resetLabel: PropTypes.string,
    step: PropTypes.number
  }

  static defaultProps = {
    initialValue: 1,
    step: 1
  }

  state = initialState(this.props.initialValue);

  render() {
    const { initialValue, step, resetLabel } = this.props;

    return (
      <div className={Styles.Counter}>
        <div>
          <button onClick={this.handleDecrement(initialValue, step)}>–</button> { ' ' }
          <button onClick={this.handleIncrement(step)}>+</button> { ' ' }
          <button className="reset" onClick={this.handleReset(initialValue)}>{resetLabel}</button>
        </div>

        <span className="counter">{this.state.counter}</span>
      </div>
    );
  }

  handleIncrement = step => () => this.setState(state => increment(state, step));
  handleDecrement = (initialValue, step) => () => {
    const newState = decrement(this.state, step);

    if(initialValue <= newState.counter) {
      this.setState({ ...this.state, ...newState });
    }
  };
  handleReset = initialValue => () => this.setState(() => reset(initialValue))
}


export default Counter;
