import React, { PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import * as ContactsActions from '../actions/contacts';
import { ContactsList, ContactDetails } from '../components';
// import { getSelected } from '../reducers';
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

    console.warn(this.props.selectedContact)
    return (
      <div className="app">
        <h1>Contacts</h1>
        <ContactsList contacts={contacts} actions={actions}/>
        <ContactDetails selected={selectedContact} actions={actions}/>
      </div>
    );
  }
}
//
// const mapStateToProps = (state) => {
//   return {
//     selectedContact: getSelectedContact(state)
//   }
// };
//
// const mapDispatchToProps = (dispatch) => {
//   return bindActionCreators({
//     contacts: state.contacts.contacts,
//     selectedContact
//   }, dispatch)
// };

export default connect(state => {
  // console.info(state.contacts)
  // console.info(getSelected())
  // console.info(getSelectedContact(state.contacts))
  return {
    contacts: state.contacts.contacts,
    // mapDispatchToProps
    selectedContact: getSelectedContact(state.contacts)
    // selected: state.contacts.selected
    // contacts: state.contacts
  }
})(ContactsApp);
//
// function isMaxHistoryReached(state) {
//   return state.search.history === 10;
// }
//
// function mapStateToProps(state) {
//   return {
//     searchHasMaxHistory: isMaxHistoryReached.bind(ContactsApp, state)
//   };
// }
// connect(mapStateToProps)(ContactsApp);
