import {
  ADD_CONTACT,
  REMOVE_CONTACT
} from '../constants/action_types';

export function addContact() {
  return {
    type: ADD_CONTACT
  };
}

export function removeContact() {
  return {
    type: REMOVE_CONTACT
  };
}
