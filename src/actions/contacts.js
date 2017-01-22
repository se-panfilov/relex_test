import {
  ADD_CONTACT,
  SELECT_CONTACT,
  // GET_SELECT_CONTACT,
  REMOVE_CONTACT
} from '../constants/action_types';

export function addContact (firstName, lastName) {
  return {
    type: ADD_CONTACT,
    firstName,
    lastName
  };
}

export function selectContact (id) {
  return {
    type: SELECT_CONTACT,
    id
  };
}

export function removeContact (id) {
  return {
    type: REMOVE_CONTACT,
    id
  };
}

// export function getSelectedContact () {
//   return {
//     type: GET_SELECT_CONTACT
//   };
// }
