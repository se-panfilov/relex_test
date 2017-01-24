import {
  addContact,
  editContact,
  selectContact,
  removeContact
} from '../../src/actions/contacts';

import {
  ADD_CONTACT,
  EDIT_CONTACT,
  SELECT_CONTACT,
  REMOVE_CONTACT
} from '../../src/constants/action_types';

import { expect } from 'chai';

describe('todo actions', () => {
  it('addContact should create ADD_CONTACT action', () => {
    expect(addContact('John', 'Smith')).to.deep.equal({
      type: ADD_CONTACT,
      firstName: 'John',
      lastName: 'Smith'
    })
  });

  it('editContact should create EDIT_CONTACT action', () => {
    expect(editContact(123, 'John', 'Smith')).to.deep.equal({
      type: EDIT_CONTACT,
      id: 123,
      firstName: 'John',
      lastName: 'Smith'
    })
  });

  it('selectContact should create SELECT_CONTACT action', () => {
    expect(selectContact(123)).to.deep.equal({
      type: SELECT_CONTACT,
      id: 123
    })
  });

  it('removeContact should create REMOVE_CONTACT action', () => {
    expect(removeContact(123)).to.deep.equal({
      type: REMOVE_CONTACT,
      id: 123
    })
  });

});
