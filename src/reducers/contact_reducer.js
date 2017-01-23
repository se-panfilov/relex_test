import {
  ADD_CONTACT,
  EDIT_CONTACT,
  SELECT_CONTACT,
  REMOVE_CONTACT
} from '../constants/action_types';

import Contact from '../entities/Contact';

const initialState = {
  _selectedId: null,
  contacts: []
};

const actions = {
  [ADD_CONTACT]({ firstName, lastName }, state) {
    if (!firstName && !lastName) throw `${ADD_CONTACT}: no data passed`;
    if (!isStringOrNotExist(firstName) || !isStringOrNotExist(lastName)) {
      throw `${ADD_CONTACT}: firstName or lastName shall be Sting or null`;
    }
    state.contacts = state.contacts.concat(new Contact(firstName, lastName));
    return state;
  },
  [EDIT_CONTACT]({ id, firstName, lastName }, state) {
    // // const newState = Object.assign({}, state)
    // const newState = {}
    // newState.contacts = []
    // newState.contacts.push({ firstName: firstName })
    // // newState.contacts[0].firstName = firstName
    // return newState
    if (!isStringOrNotExist(firstName) || !isStringOrNotExist(lastName)) {
      throw `${EDIT_CONTACT}: firstName or lastName shall be Sting or null`;
    }

    if (!firstName && !lastName) throw `${EDIT_CONTACT}: no data passed`;

    let index;
    const contact = state.contacts.filter((v, i) => {
      const result = v._id === id;
      if (result) index = i;
      return result;
    })[0];

    if (!contact) throw `${EDIT_CONTACT}: unknown Id: ${id}`;

    if (firstName) state.contacts[index].firstName = firstName;
    if (lastName) state.contacts[index].lastName = lastName;

    return state;
  },
  [SELECT_CONTACT]({ id }, state) {
    if (!id) {
      state._selectedId = null;
      return state;
    }

    if (state.contacts.filter(v => v._id === id).length < 1) throw `${SELECT_CONTACT}: unknown id: ${id}`;
    state._selectedId = id;
    return state;
  },
  [REMOVE_CONTACT]({ id }, state) {
    state.contacts = state.contacts.filter(v => v._id !== id);
    if (state._selectedId === id) state._selectedId = null;
    return state;
  }
};

function isStringOrNotExist(val) {
  if (!val && val !== 0) return true;
  return (typeof val === 'string' || val instanceof String);
}

function createStateCopy(state) {
  const newState = Object.assign({}, state);
  //Avoid to create shallow copy of an array here
  newState.contacts = state.contacts.map(a => Object.assign({}, a));
  return newState;
}

export default function(state = initialState, action) {
  if (!actions.hasOwnProperty(action.type)) return state;
  // now we're able to modify state in methods below
  return actions[action.type](action, createStateCopy(state));
}

export const getSelectedContact = (state) => {
  if (!state._selectedId && state._selectedId !== 0) return null;
  return (state.contacts.filter(v => v._id === state._selectedId))[0];
};
