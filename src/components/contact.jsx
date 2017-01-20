import React from 'react';
import { connect } from 'react-redux';

import { addContact, removeContact } from '../actions/contacts';

class Counter extends React.Component {
  render () {
    return (
      <div>
        <button onClick={() => this.props.dispatch(addContact())}>-</button>
        <div>{this.props.counter}</div>
        <button onClick={() => this.props.dispatch(removeContact())}>+</button>
      </div>
    );
  }
}

export default connect(state => ({
  counter: state.counter
}))(Counter);
