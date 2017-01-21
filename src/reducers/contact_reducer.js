import {
  ADD_CONTACT,
  SELECT_CONTACT,
  REMOVE_CONTACT
} from '../constants/action_types';

const initialState = {
  selectedId: null,
  contacts: [
    { _id: 1, firstName: 'Morpheus', lastName: 'Unknown' },
    { _id: 2, firstName: 'Tomas', lastName: 'Anderson' },
    { _id: 3, firstName: 'Trinity', lastName: 'Willbeneosgf' },
    { _id: 4, firstName: 'Ghost', lastName: 'Forgotten' }
  ]
};

export default function (state = initialState, action) {
  if (action.type === ADD_CONTACT) return addContact({ firstName: action.firstName, lastName: action.lastName }, state);
  if (action.type === SELECT_CONTACT) return selectContact(action.id, state);
  if (action.type === REMOVE_CONTACT) return removeContact(action.id, state);
  return state;
}

function Contact (firstName, lastName, contactsArr) {
  // TODO (S.Panfilov)add  checks here for mandatory fields
  this._id = this.getNewId(contactsArr);
  // TODO (S.Panfilov)perhaps init set/get
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

function addContact ({ firstName, lastName }, state) {
  const newState = Object.assign({}, state); // TODO (S.Panfilov)check for immutable
  newState.contacts = state.contacts.concat(new Contact(firstName, lastName, state.contacts));
  return newState;
}

function selectContact (id, state) {
  const newState = Object.assign({}, state);
  if (newState.contacts.filter(v => v._id === id).length < 1) throw 'selectContact: unknown id';
  newState.selectedId = id;

  return newState;
}

function getSelectedContact (state) {
  // TODO (S.Panfilov)perhaps it's a bad place for getter
  if (!state.selectedId && state.selectedId !== 0) return null;
  const result = state.contacts.filter(v => v._id === state.selectedId);
  return result.length > 0 ? result[0] : null;
}

function removeContact (id, state) {
  const newState = Object.assign({}, state);
  newState.contacts = state.contacts.filter(v => v._id !== id);
  if (newState.selectedId === id) newState.selectedId = null;

  return newState;
}
