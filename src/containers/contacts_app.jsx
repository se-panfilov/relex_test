import React, { PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import * as ContactsActions from '../actions/contacts';
import { ContactsList, ContactDetails } from '../components';
import { getSelectedContact } from '../reducers/contact_reducer';

class ContactsApp extends React.Component {
  static propTypes = {
    contacts: PropTypes.array.isRequired,
    dispatch: PropTypes.func.isRequired
  };

  render() {
    const { contacts, selectedContact, dispatch } = this.props;
    const actions = bindActionCreators(ContactsActions, dispatch);

    return (
      <div className="app">
        <h1>Contacts</h1>
        <ContactsList contacts={contacts} actions={actions} />
        <ContactDetails
          selected={selectedContact}
          onSave={contact => actions.editContact(contact._id, contact.firstName, contact.lastName)}
          onAdd={contact => actions.addContact(contact.firstName, contact.lastName)}
          onRemove={contact => {
            actions.selectContact();
            actions.removeContact(contact._id);
          }}
        />
      </div>
    );
  }
}

export default connect(state => {
  return {
    contacts: state.contacts.contacts,
    selectedContact: getSelectedContact(state.contacts)
  };
})(ContactsApp);
