import {
  ADD_CONTACT,
  EDIT_CONTACT,
  SELECT_CONTACT,
  REMOVE_CONTACT
} from '../constants/action_types';

import Contact from '../entities/Contact'

const initialState = {
  _selectedId: null,
  contacts: []
};

const actions = {
  [ADD_CONTACT] ({ firstName, lastName }, state) {
    state.contacts = state.contacts.concat(new Contact(firstName, lastName, state.contacts));
    return state;
  },
  [EDIT_CONTACT] ({ id, firstName, lastName }, state) {
    // TODO (S.Panfilov)check for unknown id error

    let index;// TODO (S.Panfilov)check index
    const contact = state.contacts.filter((v, i) => {
      const result = v._id === id;
      if (result) index = i;
      return result
    })[0];

    if (!contact) throw 'EDIT_CONTACT: unknown Id';

    // const index = state.contacts.findIndex(v => v._id === contact._id);
    if (firstName) state.contacts[index].firstName = firstName;
    if (lastName) state.contacts[index].firstName = lastName;

    return state;
  },
  [SELECT_CONTACT] ({ id }, state) {
    if (state.contacts.filter(v => v._id === id).length < 1) throw 'SELECT_CONTACT: unknown id';
    state._selectedId = id;
    return state;
  },
  [REMOVE_CONTACT] ({ id }, state) {
    state.contacts = state.contacts.filter(v => v._id !== id);
    if (state._selectedId === id) state._selectedId = null;
    return state;
  }
};

export default function (state = initialState, action) {
  if (!actions.hasOwnProperty(action.type)) return state;
  const newState = Object.assign({}, state);// now we're able to modify state in methods below
  return actions[action.type](action, newState);
}

export const getSelectedContact = (state = initialState) => {// TODO (S.Panfilov) initialState?
  // if(!state) return
  if (!state._selectedId && state._selectedId !== 0) return null;
  return (state.contacts.filter(v => v._id === state._selectedId))[0];
};