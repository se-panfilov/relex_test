import React from 'react';
import{ mount, render, shallow } from 'enzyme';
import sinon from 'sinon';
import ContactsList from '../../src/components/contacts_list';

import { Provider } from 'react-redux';
import * as reducers from '../../src/reducers';
import { combineReducers, createStore } from 'redux';

const reducer = combineReducers(reducers);
const store = createStore(reducer);

import chai from 'chai';
const { expect } = chai;
import chaiEnzyme from 'chai-enzyme';

chai.use(chaiEnzyme());

function setup(contacts, actions) {
  const component = render(
    <Provider store={store}>
      <ContactsList contacts={contacts} actions={actions} />
    </Provider>
  );

  return {
    component: component,
    input: component.find('input'),
    button: component.find('button'),
    list: component.find('ul'),
  }
}

const firstName = 'John';
const lastName = 'Smith';
const contacts = [
  {
    _id: 111,
    firstName,
    lastName
  },
  {
    _id: 222,
    firstName: 'Max',
    lastName: 'Power'
  }
];

describe('ContactListItem component', () => {
  it('should have same length as array', () => {
    const { list } = setup(contacts, {});
    expect(list.children()).to.have.length(contacts.length);
  });

  // it('can filter list', () => {
  //   const { component, input, list } = setup(contacts, {});
  //   expect(list.children()).to.have.length(contacts.length);
  //   input.simulate('change', { target: { value: 'Max' } });
  //   expect(list.children()).to.have.length(contacts.length - 1);
  // });

});
