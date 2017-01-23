import { expect } from 'chai';
import reducer from '../../src/reducers/contact_reducer';
import { _p } from '../../src/reducers/contact_reducer';

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

    it('can\t edit contact with non-string values', () => {
      expect(() => reducer(state, editContact(originalEntity._id, 123, 323))).to.throw(`${EDIT_CONTACT}: firstName or lastName shall be Sting or null`);
    });
  });

  describe('Select Contact:', () => {
    let state;
    const originalEntity = {
      firstName: 'John',
      lastName: 'Smith',
      _id: null
    };

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

    it('check select contact don\'t affect contacts array size', () => {
      const newState = reducer(state, selectContact(originalEntity._id));
      expect(newState.contacts.length).to.equal(1);
    });

    it('can select contact', () => {
      const newState = reducer(state, selectContact(originalEntity._id));
      expect(newState._selectedId).to.equal(originalEntity._id);
    });

    it('check selectContact to return new state object', () => {
      const newState = reducer(state, selectContact(originalEntity._id));
      expect(newState._selectedId).to.equal(originalEntity._id);
      expect(state._selectedId).to.be.null;
    });

    it('can\'t select contact with unknown Id', () => {
      const badId = 6666666;
      expect(() => reducer(state, selectContact(badId))).to.throw(`${SELECT_CONTACT}: unknown Id: ${badId}`);
    });

    it('can select contact without Id (un select case)', () => {
      const newState = reducer(state, selectContact());
      expect(newState._selectedId).to.be.null;
    });

  });

  describe('Remove Contact:', () => {
    let state;

    const entities = {
      one: {
        firstName: 'John',
        lastName: 'Smith',
        _id: null
      },
      two: {
        firstName: 'Ada',
        lastName: 'Lovelace',
        _id: null
      }
    };

    beforeEach(() => {
      state = { _selectedId: null, contacts: [] };
      let firstState = reducer(state, addContact(entities.one.firstName, entities.one.lastName));
      let secondState = reducer(firstState, addContact(entities.two.firstName, entities.two.lastName));
      let thirdState = reducer(secondState, selectContact(secondState.contacts[0]._id));//Select John Smith
      entities.one._id = thirdState.contacts[0]._id;
      entities.two._id = thirdState.contacts[1]._id;
      state = thirdState;
    });

    afterEach(() => {
      state = { _selectedId: null, contacts: [] };
      entities.one._id = null;
      entities.two._id = null;
    });

    it('check remove contact don\'t affect selectedId', () => {
      const newState = reducer(state, removeContact(entities.two._id));
      expect(newState._selectedId).to.equal(entities.one._id);
    });

    it('check remove contact can affect selectedId', () => {
      const newState = reducer(state, removeContact(entities.one._id));
      expect(newState._selectedId).to.be.null;
    });

    it('can remove one contact', () => {
      expect(state.contacts.length).to.equal(2);

      const newState = reducer(state, removeContact(entities.two._id));
      const newContact = newState.contacts[0];

      expect(newState.contacts.length).to.equal(1);
      expect(newContact.firstName).to.not.equal(entities.two.firstName);
      expect(newContact.lastName).to.not.equal(entities.two.lastName);
      expect(newContact._id).to.be.a('number');
      expect(newContact._id).to.not.equal(entities.two._id);
    });

    it('can remove all contacts', () => {
      expect(state.contacts.length).to.equal(2);

      const stateOne = reducer(state, removeContact(entities.one._id));
      const stateTwo = reducer(stateOne, removeContact(entities.two._id));

      expect(stateTwo.contacts.length).to.equal(0);
      expect(stateTwo._selectedId).to.be.null;
    });

    it('check removeContact to return new state object', () => {
      const newState = reducer(state, removeContact(entities.one._id));
      expect(newState.contacts.length).to.equal(1);
      expect(state.contacts.length).to.equal(2);
    });

    it('can\'t remove contact with unknown Id', () => {
      const badId = 6666666;
      expect(() => reducer(state, removeContact(badId))).to.throw(`${REMOVE_CONTACT}: unknown Id: ${badId}`);
    });

    it('can\'t remove contact without Id ', () => {
      expect(() => reducer(state, removeContact())).to.throw(`${REMOVE_CONTACT}: no Id provided`);
    });

  });
  describe('Private functions:', () => {

    describe('isStringOrNotExist:', () => {
      it('check is string', () => {
        expect(_p.isStringOrNotExist('some')).to.be.true;
        expect(_p.isStringOrNotExist('0')).to.be.true;
        expect(_p.isStringOrNotExist('')).to.be.true;
        expect(_p.isStringOrNotExist((1).toString())).to.be.true;
        expect(_p.isStringOrNotExist(new String())).to.be.true;
      });

      it('check is not exist', () => {
        expect(_p.isStringOrNotExist(null)).to.be.true;
        expect(_p.isStringOrNotExist(undefined)).to.be.true;
        expect(_p.isStringOrNotExist()).to.be.true;
      });

      it('check is not a string', () => {
        expect(_p.isStringOrNotExist(+'123')).to.be.false;
        expect(_p.isStringOrNotExist({})).to.be.false;
        expect(_p.isStringOrNotExist([])).to.be.false;
        expect(_p.isStringOrNotExist(123123)).to.be.false;
        expect(_p.isStringOrNotExist(0)).to.be.false;
        expect(_p.isStringOrNotExist(Infinity)).to.be.false;
      });

    });

    describe('createStateCopy:', () => {

      it('check is create new object', () => {
        const state = { _selectedId: null, contacts: [{ _id: 111, firstName: 'qqq', lastName: 'www' }] };
        const newState = _p.createStateCopy(state);

        newState.contacts.push({ _id: 222, firstName: 'eee', lastName: 'rrr' });

        expect(state.contacts.length).to.equal(1);
        expect(newState.contacts.length).to.equal(2);

        state.contacts[0].firstName = 'rrr';

        expect(state.contacts[0].firstName).to.equal('rrr');
        expect(newState.contacts[0].firstName).to.equal('qqq');
      });

      it('can\'t create state from void', () => {
        expect(() => _p.createStateCopy()).to.throw(`createStateCopy: no state provided`);
      });

    });

    describe('getSelectedContact:', () => {

      it('can return selected object', () => {
        const originalEntity = {
          firstName: 'John',
          lastName: 'Smith',
          _id: null
        };

        let state = { _selectedId: null, contacts: [] };
        const stateOne = reducer(state, addContact(originalEntity.firstName, originalEntity.lastName));
        const stateTwo = reducer(stateOne, selectContact(stateOne.contacts[0]._id));
        originalEntity._id = stateTwo.contacts[0]._id;
        state = stateTwo;

        expect(state._selectedId).to.equal(stateTwo.contacts[0]._id);

        const result = _p.getSelectedContact(state);
        expect(result).to.be.deep.equal(state.contacts[0]);
      });


      it('can return null when nothing selected', () => {
        const originalEntity = {
          firstName: 'John',
          lastName: 'Smith',
          _id: null
        };

        let state = { _selectedId: null, contacts: [] };
        const newState = reducer(state, addContact(originalEntity.firstName, originalEntity.lastName));
        originalEntity._id = newState.contacts[0]._id;
        state = newState;

        expect(state._selectedId).to.be.null;

        const result = _p.getSelectedContact(state);
        expect(result).to.be.null;
      });

      it('can\'t create state from void', () => {
        expect(() => _p.getSelectedContact()).to.throw(`getSelectedContact: no state provided`);
      });

    });

    describe('main:', () => {
      it('should handle initial state', () => {
        expect(reducer(undefined, {})).to.deep.equal({ _selectedId: null, contacts: [] })
      });

      it('should return state when unknown action type', () => {
        const state = { _selectedId: null, contacts: [] };
        const action = {type: 'some'};
        expect(reducer(state, action)).to.deep.equal(state)
      });

    });


  });
// TODO (S.Panfilov) add checks in case of id===0
});
