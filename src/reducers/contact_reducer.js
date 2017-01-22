import {
  ADD_CONTACT,
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
  [SELECT_CONTACT] ({ id }, state) {
    if (state.contacts.filter(v => v._id === id).length < 1) throw 'selectContact: unknown id';
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
  const newState = Object.assign({}, state);
  return actions[action.type](action, newState);
}

export const getSelectedContact = (state = initialState) => {// TODO (S.Panfilov) initialState?
  // if(!state) return
  if (!state._selectedId && state._selectedId !== 0) return null;
  return (state.contacts.filter(v => v._id === state._selectedId))[0];
};
