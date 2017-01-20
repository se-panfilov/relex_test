import {
  INCREASE_COUNTER,
  DECREASE_COUNTER
} from '../constants/action_types';

const initialState = 0;

export default function(state = initialState, action) {
  switch (action.type) {
    case INCREASE_COUNTER:
      return state + 1;

    case DECREASE_COUNTER:
      return state - 1;

    default:
      return state;
  }
}
