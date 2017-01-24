import React from 'react';
import{ mount, render, shallow } from 'enzyme';
// import jest from 'jest';
import sinon from 'sinon';
import ContactsListItem from '../../src/components/contacts_list_item';

import chai from 'chai';
const { expect } = chai;
import chaiEnzyme from 'chai-enzyme';

chai.use(chaiEnzyme());

function setup(item, style) {
  const selectContact = sinon.stub();

  const component = shallow(
    <ContactsListItem
      key={item._id}
      id={item._id}
      firstName={item.firstName}
      lastName={item.lastName}
      onClick={() => {
        selectContact(item._id);
      }}
      style={style}
    />
  );

  return {
    component: component,
    actions: selectContact,
    link: component.find('a'),
    listItem: component.find('li'),
  }
}

const firstName = 'John';
const lastName = 'Smith';
const item = {
  _id: 123,
  firstName,
  lastName
};

describe('ContactListItem component', () => {
  it('should display first name and last name', () => {
    const { listItem } = setup(item);
    expect(listItem.text()).to.equal(`${firstName} ${lastName}`);
  });

  it('simulates click events', () => {
    const onClick = sinon.spy();
    const { link, actions } = setup(item);
    console.info(link.props().onClick);
    link.simulate('click', {
      preventDefault: onClick
    });
    expect(actions).to.have.property('callCount', 1);
    expect(onClick).to.have.property('callCount', 1);
  });

});
