import { expect } from 'chai';
import reducer from '../../src/reducers/contact_reducer';

import {
  ADD_CONTACT,
  EDIT_CONTACT,
  SELECT_CONTACT,
  REMOVE_CONTACT
} from '../../src/constants/action_types';

import {
  addContact,
  editContact,
  selectContact,
  removeContact
} from '../../src/actions/contacts';

describe('contact reducer:', () => {
  it('should handle initial state', () => {
    expect(
      reducer(undefined, {})
    ).to.deep.equal({ _selectedId: null, contacts: [] })
  });

  describe('Add Contact:', () => {
    let state;
    const firstName = 'John';
    const lastName = 'Smith';

    beforeEach(() => {
      state = { _selectedId: null, contacts: [] };
    });

    afterEach(() => {
      state = { _selectedId: null, contacts: [] };
    });

    it('check add contact don\'t affect selectedId', () => {
      const state = { _selectedId: null, contacts: [] };
      const newState = reducer(state, addContact(firstName, lastName));
      expect(newState._selectedId).to.be.null;
    });

    it('can add new contact', () => {
      const state = { _selectedId: null, contacts: [] };
      const newState = reducer(state, addContact(firstName, lastName));

      const newContact = newState.contacts[0];

      expect(newState.contacts.length).to.equal(1);
      expect(newContact.firstName).to.equal(firstName);
      expect(newContact.lastName).to.equal(lastName);
      expect(newContact._id).to.be.a('number');
    });

    it('check addContact to return new state object', () => {
      const state = { _selectedId: null, contacts: [] };
      const newState = reducer(state, addContact(firstName, lastName));

      const newContact = newState.contacts[0];

      expect(newState.contacts.length).to.equal(1);
      expect(newState._selectedId).to.be.null;
      expect(newContact.firstName).to.equal(firstName);
      expect(newContact.lastName).to.equal(lastName);
      expect(newContact._id).to.be.a('number');

      expect(state.contacts.length).to.equal(0);
      expect(state._selectedId).to.be.null;
    });

    it('can add new contact with first name only', () => {
      const state = { _selectedId: null, contacts: [] };
      const newState = reducer(state, addContact(firstName));

      const newContact = newState.contacts[0];

      expect(newState.contacts.length).to.equal(1);
      expect(newContact.firstName).to.equal(firstName);
      expect(newContact.lastName).to.be.undefined;
      expect(newContact._id).to.be.a('number');
    });

    it('can add new contact with last name only', () => {
      const state = { _selectedId: null, contacts: [] };
      const newState = reducer(state, addContact(null, lastName));

      const newContact = newState.contacts[0];

      expect(newState.contacts.length).to.equal(1);
      expect(newContact.firstName).to.be.null;
      expect(newContact.lastName).to.equal(lastName);
      expect(newContact._id).to.be.a('number');
    });

    it('can\'t add without first and last names', () => {
      expect(() => reducer(state, addContact())).to.throw(`${ADD_CONTACT}: no data passed`);
    });

    it('check that addContact drop extra args', () => {
      const state = { _selectedId: null, contacts: [] };
      const newState = reducer(state, addContact(firstName, lastName, 'Some', 'Other'));

      const newContact = newState.contacts[0];

      expect(newState.contacts.length).to.equal(1);
      expect(newContact.firstName).to.equal(firstName);
      expect(newContact.lastName).to.equal(lastName);
      expect(newContact._id).to.be.a('number');
      expect(Object.keys(newContact).length).to.equal(3);
    });

    it('can\t add new contact with non-string values', () => {
      expect(() => reducer(state, addContact(123, 323))).to.throw(`${ADD_CONTACT}: firstName or lastName shall be Sting or null`);
    });

  });

  describe('Edit Contact:', () => {
    let state;
    const originalEntity = {
      firstName: 'John',
      lastName: 'Smith',
      _id: null
    };
    const newFirstName = 'Max';
    const newLastName = 'Power';

    beforeEach(() => {
      state = { _selectedId: null, contacts: [] };
      const newState = reducer(state, addContact(originalEntity.firstName, originalEntity.lastName));
      originalEntity._id = newState.contacts[0]._id;
      state = newState;
    });

    afterEach(() => {
      state = { _selectedId: null, contacts: [] };
      originalEntity._id = null;
    });

    it('check edit contact don\'t affect selectedId', () => {
      const newState = reducer(state, editContact(originalEntity._id, newFirstName, newLastName));
      expect(newState._selectedId).to.be.null;
    });

    it('can edit contact', () => {
      const newState = reducer(state, editContact(originalEntity._id, newFirstName, newLastName));
      const newContact = newState.contacts[0];

      expect(newState.contacts.length).to.equal(1);
      expect(newContact.firstName).to.equal(newFirstName);
      expect(newContact.lastName).to.equal(newLastName);
      expect(newContact._id).to.be.a('number');
    });

    it('check editContact to return new state object', () => {
      const newState = reducer(state, editContact(originalEntity._id, newFirstName, newLastName));

      const newContact = newState.contacts[0];
      const oldContact = state.contacts[0];

      expect(newState.contacts.length).to.equal(1);
      expect(newState._selectedId).to.be.null;
      expect(newContact.firstName).to.equal(newFirstName);
      expect(newContact.lastName).to.equal(newLastName);
      expect(newContact._id).to.be.a('number');

      expect(state.contacts.length).to.equal(1);
      expect(state._selectedId).to.be.null;
      expect(oldContact.firstName).to.equal(originalEntity.firstName);
      expect(oldContact.lastName).to.equal(originalEntity.lastName);
      expect(oldContact._id).to.be.a('number');
    });

    it('can edit first name only', () => {
      const newState = reducer(state, editContact(originalEntity._id, newFirstName));
      const newContact = newState.contacts[0];

      expect(newState.contacts.length).to.equal(1);
      expect(newContact.firstName).to.equal(newFirstName);
      expect(newContact.lastName).to.equal(originalEntity.lastName);
      expect(newContact._id).to.be.a('number');
    });

    it('can edit last name only', () => {
      const newState = reducer(state, editContact(originalEntity._id, null, newLastName));
      const newContact = newState.contacts[0];

      expect(newState.contacts.length).to.equal(1);
      expect(newContact.firstName).to.equal(originalEntity.firstName);
      expect(newContact.lastName).to.equal(newLastName);
      expect(newContact._id).to.be.a('number');
    });

    it('can\'t edit without first and last names', () => {
      expect(() => reducer(state, editContact(originalEntity._id))).to.throw(`${EDIT_CONTACT}: no data passed`);
    });

    it('check that addContact drop extra args', () => {
      const newState = reducer(state, editContact(originalEntity._id, newFirstName, newLastName, 'Some', 'Other', 'Values'));

      const newContact = newState.contacts[0];

      expect(newState.contacts.length).to.equal(1);
      expect(newContact.firstName).to.equal(newFirstName);
      expect(newContact.lastName).to.equal(newLastName);
      expect(newContact._id).to.be.a('number');
      expect(Object.keys(newContact).length).to.equal(3);
    });

    it('can\'t edit contact with unknown Id', () => {
      const badId = 6666666;
      expect(() => reducer(state, editContact(badId, newFirstName, newLastName))).to.throw(`${EDIT_CONTACT}: unknown Id: ${badId}`);
    });

    it('can\'t edit contact without Id', () => {
      expect(() => reducer(state, editContact(null, newFirstName, newLastName))).to.throw(`${EDIT_CONTACT}: unknown Id: null`);
    });

    it('can\t add new contact with non-string values', () => {
      expect(() => reducer(state, editContact(originalEntity._id, 123, 323))).to.throw(`${EDIT_CONTACT}: firstName or lastName shall be Sting or null`);
    });
  });

});
