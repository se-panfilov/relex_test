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
    const { contacts, dispatch, actions } = this.props;
    const { selectContact } = actions;

    return (
      <div className="contacts-list">
        <ul className="contacts-list__list">
          {contacts.map(item =>
            <ContactsListItem
              key={item._id}
              id={item._id}
              firstName={item.firstName}
              lastName={item.lastName}
              onClick={() => {
                return actions.selectContact(item._id)
              }}
            />
          )}
        </ul>
      </div>
    );
  }
}
