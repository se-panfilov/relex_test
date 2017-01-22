import React, { PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import * as ContactsActions from '../actions/contacts';
import { ContactsList, ContactDetails } from '../components';
import { getSelected } from '../reducers';

class ContactsApp extends React.Component {
  static propTypes = {
    contacts: PropTypes.array.isRequired,
    // actions: PropTypes.object.isRequired
    dispatch: PropTypes.func.isRequired
  };

  render () {
    const { contacts, selected, dispatch } = this.props;
    const actions = bindActionCreators(ContactsActions, dispatch);

    return (
      <div className="app">
        <h1>Contacts</h1>
        <ContactsList contacts={contacts} actions={actions}/>
        <ContactDetails selected={selected} actions={actions}/>
      </div>
    );
  }
}

export default connect(state => {
  // console.info(state)
  // console.info(getSelected())
  return {
    contacts: state.contacts.contacts,
    selected: state.contacts.selected
    // contacts: state.contacts
  }
})(ContactsApp);
