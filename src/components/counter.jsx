import React from 'react';
import { connect } from 'react-redux';

import ReadMe from './readme';
import { increase, decrease } from '../actions/counter_actions';

class Counter extends React.Component {
  render() {
    return (
      <div>
        <button onClick={() => this.props.dispatch(decrease())}>-</button>
        <div>{this.props.counter}</div>
        <button onClick={() => this.props.dispatch(increase())}>+</button>
        <ReadMe />
      </div>
    );
  }
}

export default connect(state => ({
  counter: state.counter
}))(Counter);
