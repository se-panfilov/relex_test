import React, { PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import * as ContactsActions from '../actions/contacts';
import { ContactsList } from '../components';

class ContactsApp extends React.Component {
// class ContactsApp extends React.Component {
  static propTypes = {
    contacts: PropTypes.array.isRequired,
    // actions: PropTypes.object.isRequired
    dispatch: PropTypes.func.isRequired
  };

  render () {
    const { Contacts, dispatch } = this.props;
    const actions = bindActionCreators(ContactsActions, dispatch);

    return (
    <div className="app">
      <h1>Contacts</h1>
      <ContactsList contacts={contacts} actions={actions} />
    </div>
    );
  }
}

export default connect(state => ({
  contacts: state.contacts
}))(ContactsList);
