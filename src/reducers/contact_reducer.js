import {
  ADD_CONTACT,
  SELECT_CONTACT,
  REMOVE_CONTACT
} from '../constants/action_types';

const initialState = {
  // _selectedId: null, // TODO (S.Panfilov)revert null
  _selectedId: 2,
  get selected () {// TODO (S.Panfilov) redo this (take a look at shopping-cart example)
    console.info(123213)
    // TODO (S.Panfilov) perhaps it's a bad place for getter
    if (!this._selectedId && this._selectedId !== 0) return null;
    return (this.contacts.filter(v => v._id === this._selectedId))[0];
  },
  contacts: [
    { _id: 1, firstName: 'Samuel', lastName: 'Colt' },
    { _id: 2, firstName: 'Gal', lastName: 'Uziel' },
    { _id: 3, firstName: 'John', lastName: 'Thompson' },
    { _id: 4, firstName: 'Mikhail', lastName: 'Kalashnikov' },
    { _id: 5, firstName: 'Gaston', lastName: 'Glock' },
    { _id: 6, firstName: 'Leon', lastName: 'Nagant' }
  ]
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

// export const getSelected = (state = initialState) => {
//   // if(!state) return
//   if (!state._selectedId && state._selectedId !== 0) return null;
//   return (state.contacts.filter(v => v._id === state._selectedId))[0];
//   // return state.selected
// };

function Contact (firstName, lastName, contactsArr) {
  if (!firstName && !lastName) throw 'new Contact: firstName or lastName must be specified';
  this._id = this.getNewId(contactsArr);
  this.firstName = firstName;
  this.lastName = lastName;
}

Contact.prototype.getNewId = function (arr) {
  if (arr.length === 0) return 0;

  // TODO (S.Panfilov) This would be sucks in case of async, but ok for test task
  const latestId = arr.sort((a, b) => b._id - a._id)[0]._id;
  const time = +((new Date()).getTime().toString().slice(-5));
  return +latestId + 1 + time;
};
