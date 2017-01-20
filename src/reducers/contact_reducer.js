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
  // console.info(action);
  if (action.type === ADD_CONTACT) return addContact({ firstName: 'qqq', lastName: 'www' }, state);// TODO (S.Panfilov)
  if (action.type === REMOVE_CONTACT) return removeContact('123', state);// TODO (S.Panfilov)
  return state;
}


function Contact (firstName, lastName, someState) {
  // TODO (S.Panfilov)add  checks here for mandatory fields
  this._id = this.getNewId(someState);
  // TODO (S.Panfilov)perhaps init set/get
  this.firstName = firstName;
  this.lastName = lastName;
}

Contact.prototype.getNewId = function (contactsArr) {
  if (contactsArr.length === 0) return 0;

  // TODO (S.Panfilov) This would be sucks in case of async, but ok for test task
  const latestId = contactsArr.sort((a, b) => b.id - a.id)[0].id;
  const time = (new Date()).getTime().toString().slice(-5);
  return latestId + 1 + time;
};

function addContact ({ firstName, lastName }, state) {
  state.contacts.push(new Contact(firstName, lastName));// TODO (S.Panfilov)check initialState for immutable
  return state;
}

function removeContact (id, state) {
  state.contacts = state.contacts.filter(v => v.id !== id);// TODO (S.Panfilov)check initialState for immutable
  return state;
}
