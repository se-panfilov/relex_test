import { expect } from 'chai';

import reducer from '../../src/reducers/counter_reducer';
import { increase, decrease } from '../../src/actions/counter_actions';

describe('Counter reducer', function() {
  it('can increase the counter', function() {
    const currentState = 5;
    const newState = reducer(currentState, increase());

    expect(newState).to.equal(6);
  });

  it('can decrease the counter', function() {
    const currentState = 5;
    const newState = reducer(currentState, decrease());

    expect(newState).to.equal(4);
  });
});
