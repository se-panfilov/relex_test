import {
  ADD_CONTACT,
  EDIT_CONTACT,
  SELECT_CONTACT,
  REMOVE_CONTACT
} from '../constants/action_types';

export function addContact(firstName, lastName) {
  return {
    type: ADD_CONTACT,
    firstName,
    lastName
  };
}

export function editContact(id, firstName, lastName) {
  return {
    type: EDIT_CONTACT,
    id,
    firstName,
    lastName
  };
}

export function selectContact(id) {
  return {
    type: SELECT_CONTACT,
    id
  };
}

export function removeContact(id) {
  return {
    type: REMOVE_CONTACT,
    id
  };
}
