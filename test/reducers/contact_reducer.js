import reducer from '../../src/reducers/contact_reducer'
import { addContact, editContact, selectContact, removeContact } from '../../src/actions/contacts';

import { expect } from 'chai';

describe('contact reducer:', () => {
  it('should handle initial state', () => {
    expect(
      reducer(undefined, {})
    ).to.deep.equal({ _selectedId: null, contacts: [] })
  });

  describe('Add Contact:', () => {
    it('check add contact don\'t affect selectedId', () => {
      const currentState = { _selectedId: null, contacts: [] };
      const newState = reducer(currentState, addContact('John', 'Smith'));
      expect(newState._selectedId).to.be.null;
    });

    it('can add new contact', () => {
      const currentState = { _selectedId: null, contacts: [] };
      const newState = reducer(currentState, addContact('John', 'Smith'));

      const newContact = newState.contacts[0];

      expect(newState.contacts.length).to.equal(1);
      expect(newContact.firstName).to.equal('John');
      expect(newContact.lastName).to.equal('Smith');
      expect(newContact._id).to.be.a('number')
    });

    it('can add new contact with first name only', () => {
      const currentState = { _selectedId: null, contacts: [] };
      const newState = reducer(currentState, addContact('John'));

      const newContact = newState.contacts[0];

      expect(newState.contacts.length).to.equal(1);
      expect(newContact.firstName).to.equal('John');
      expect(newContact.lastName).to.be.undefined;
      expect(newContact._id).to.be.a('number')
    });

    it('can add new contact with last name only', () => {
      const currentState = { _selectedId: null, contacts: [] };
      const newState = reducer(currentState, addContact(null, 'Smith'));

      const newContact = newState.contacts[0];

      expect(newState.contacts.length).to.equal(1);
      expect(newContact.firstName).to.be.null;
      expect(newContact.lastName).to.equal('Smith');
      expect(newContact._id).to.be.a('number')
    });

    it('check that addContact drop extra ergs', () => {
      const currentState = { _selectedId: null, contacts: [] };
      const newState = reducer(currentState, addContact('John', 'Smith', 'Some', 'Other'));

      const newContact = newState.contacts[0];

      expect(newState.contacts.length).to.equal(1);
      expect(newContact.firstName).to.equal('John');
      expect(newContact.lastName).to.equal('Smith');
      expect(newContact._id).to.be.a('number');
      expect(Object.keys(newContact).length).to.equal(3)
    });

  })


});
