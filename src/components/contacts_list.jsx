import React, { PropTypes } from 'react';
import { connect } from 'react-redux';

// import styles from './ContactsList.css';

import { addContact, selectContact, removeContact } from '../actions/contacts';
import ContactsListItem from './contacts_list_item';

export default class ContactsList extends React.Component {
  static propTypes = {
    contacts: PropTypes.array.isRequired,
    actions: PropTypes.object.isRequired
  };

  render () {
    const { contacts, dispatch } = this.props;
    // const actions = bindActionCreators(ContactsActions, dispatch);

    return (
      <div className="contacts">
        <ul className="contacts__list">
          {contacts.map(item =>
            <ContactsListItem
              key={item._id}
              id={item._id}
              firstName={item.firstName}
              lastName={item.lastName}
              />
          )}
        </ul>
      </div>
    );
  }
}
