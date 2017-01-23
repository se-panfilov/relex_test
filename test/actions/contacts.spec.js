import * as actions from '../../src/actions/contacts'
import { expect } from 'chai';

describe('todo actions', () => {
  it('addContact should create ADD_CONTACT action', () => {
    expect(actions.addContact('John', 'Smith')).to.deep.equal({
      type: 'ADD_CONTACT',
      firstName: 'John',
      lastName: 'Smith'
    })
  });

  it('editContact should create EDIT_CONTACT action', () => {
    expect(actions.editContact(123, 'John', 'Smith')).to.deep.equal({
      type: 'EDIT_CONTACT',
      id: 123,
      firstName: 'John',
      lastName: 'Smith'
    })
  });

  it('selectContact should create SELECT_CONTACT action', () => {
    expect(actions.selectContact(123)).to.deep.equal({
      type: 'SELECT_CONTACT',
      id: 123
    })
  });

  it('removeContact should create REMOVE_CONTACT action', () => {
    expect(actions.removeContact(123)).to.deep.equal({
      type: 'REMOVE_CONTACT',
      id: 123
    })
  });

});
