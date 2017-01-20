import React, { PropTypes }from 'react';
import { connect } from 'react-redux';

// import styles from './ContactsList.css';

import { addContact, removeContact } from '../actions/contacts';
import { ContactsListItem } from '../components/contacts_list_item';

class ContactsList extends React.Component {
  static propTypes = {
    contacts: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired
  };

  render () {
    return (
      <div className="contacts">
        <ul className="contacts__list">
          <li>asd</li>
          /*{
            mapValues(this.props.contacts, (contact) => {
              return (<ContactsListItem
                key={contact.id}
                id={contact.id}
                firstName={contact.firstName}
                lastName={contact.firstName}
                {...this.props.actions} />);
            })
          }*/
        </ul>
      </div>
    );
  }
}

export default connect(state => ({
  ContactsListData: state.contacts
}))(ContactsList);
