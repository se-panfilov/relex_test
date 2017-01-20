import React from 'react';
import { connect } from 'react-redux';

import { addContact, removeContact } from '../actions/contacts';
import { ContactsListItem } from '../components/contacts_list_item';

class Contactslist extends React.Component {
  constructor(props) {
    super(props);
    console.info(props);
  }
  render () {
    return (
      <div className="contacts">
        <ul className="contacts__list">
          {/*{this.props.contacts.map(item => (*/}
            {/*//console.log(connect)*/}
            {/*<li key={item.id}>{item.firstName}</li>*/}
            {/*//<ContactsListItem firstName={item.firstName} lastName={item.lastName}></ContactsListItem>*/}
          {/*))}*/}
        </ul>
      </div>
    );
  }
}

@connect(state => ({
  ContactslistData: state.contacts
}))

export default Contactslist
