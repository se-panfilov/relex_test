import {
  INCREASE_COUNTER,
  DECREASE_COUNTER
} from '../constants/action_types';

export function increase() {
  return {
    type: INCREASE_COUNTER
  };
}

export function decrease() {
  return {
    type: DECREASE_COUNTER
  };
}
