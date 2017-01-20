import {
  ADD_CONTACT,
  REMOVE_CONTACT
} from '../constants/action_types';

const initialState = 0;

const someState = [];//ContactsList

export default function (state = initialState, action) {
  if (action.type === ADD_CONTACT) return addContact();
  if (action.type === REMOVE_CONTACT) return removeContact();
  return state;
}


function Contact (firstName, lastName, someState) {
  // TODO (S.Panfilov)add  checks here for mandatory fields
  this.id = this.getNewId(someState);
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

function addContact ({ firstName, lastName }) {
  someState.push(new Contact(firstName, lastName))
}

function removeContact () {

}
