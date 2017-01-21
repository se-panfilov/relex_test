import React, { PropTypes } from 'react';
import { connect } from 'react-redux';

// import styles from './ContactsList.css';

import { addContact, removeContact } from '../actions/contacts';
import { ContactsListItem } from '../components/contacts_list_item';

export default class ContactsList extends React.Component {
  static propTypes = {
    contacts: PropTypes.array.isRequired//,
    // actions: PropTypes.object.isRequired
  };

  render () {
    // const { contacts, dispatch } = this.props;
    // const actions = bindActionCreators(FriendsActions, dispatch);

    return (
      <div className="contacts">
        <ul className="contacts__list">
          <li>asd</li>
          {contacts.map(item =>
            <li key={item.id}>{item.firstName}</li>
            //<ContactsListItem firstName={item.firstName} lastName={item.lastName}></ContactsListItem>
          )}
        </ul>
      </div>
    );
  }
}
