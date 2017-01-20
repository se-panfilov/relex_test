import {
  ADD_CONTACT,
  REMOVE_CONTACT
} from '../constants/action_types';

export function addContact(firstName, lastName) {
  return {
    type: ADD_CONTACT,
    firstName,
    lastName
  };
}

export function removeContact(id) {
  return {
    type: REMOVE_CONTACT,
    id
  };
}
