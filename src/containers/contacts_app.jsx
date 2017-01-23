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

    const style = {
      app: {
        display: 'flex'
      },
      leftColumn: {
        flex: '1 0 20%',
        margin: '5px'
      },
      rightColumn: {
        flex: '1 0 80%',
        margin: '5px'
      }
    };

    return (
      <div className="app" style={style.app}>
        <div className="app__column" style={style.leftColumn}>
          <ContactsList contacts={contacts} actions={actions} />
        </div>
        <div className="app__column" style={style.rightColumn}>
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
