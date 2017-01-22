import React, { PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import * as ContactsActions from '../actions/contacts';
import { ContactsList, ContactDetails } from '../components';
import { getSelectedContact } from '../reducers/contact_reducer';

class ContactsApp extends React.Component {
  static propTypes = {
    contacts: PropTypes.array.isRequired,
    // actions: PropTypes.object.isRequired
    dispatch: PropTypes.func.isRequired
  };

  render () {
    const { contacts, selectedContact, dispatch } = this.props;
    const actions = bindActionCreators(ContactsActions, dispatch);

    console.info(actions)
    return (
      <div className="app">
        <h1>Contacts</h1>
        <ContactsList contacts={contacts} actions={actions}/>
        <ContactDetails
          selected={selectedContact}
          actions={actions}
          onSave={
            (v, e) => {
              console.log(11111)
              console.info(v)
              console.info(e)
              console.log(11111)
            }
          }
        />
      </div>
    );
  }
}

export default connect(state => {
  // console.info(state.contacts)
  return {
    contacts: state.contacts.contacts,
    selectedContact: getSelectedContact(state.contacts)
  }
})(ContactsApp);
