import {
  ADD_CONTACT,
  REMOVE_CONTACT
} from '../constants/action_types';

const initialState = {
  contacts: [//ContactsList
    { _id: 1, firstName: 'Morpheus', lastName: 'Unknown' },
    { _id: 2, firstName: 'Tomas', lastName: 'Anderson' },
    { _id: 3, firstName: 'Trinity', lastName: 'Willbeneosgf' },
    { _id: 4, firstName: 'Ghost', lastName: 'Forgotten' }
  ]
};

export default function (state = initialState, action) {
  if (action.type === ADD_CONTACT) return addContact({ firstName: action.firstName, lastName: action.lastName }, state);
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
  const newState =  Object.assign({}, state); // TODO (S.Panfilov)check for immutable
  newState.contacts = state.contacts.concat(new Contact(firstName, lastName, state.contacts));
  return newState;
}

function removeContact (id, state) {
  const newState =  Object.assign({}, state);
  newState.contacts = state.contacts.filter(v => v._id !== id);
  return newState;
}
