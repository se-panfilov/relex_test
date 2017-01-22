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

  constructor (props) {
    super(props);

    this.state = {
      displayed: props.contacts
    };
  }

  onInputChange (e) {

    const newDisplayed = this.props.contacts.filter(v => {
      const firstName = v.firstName.toLowerCase();
      const lastName = v.lastName.toLowerCase();
      const val = e.target.value.toLowerCase();

      return firstName.includes(val) || lastName.includes(val)
    });

    this.setState({
      displayed: newDisplayed
    })
  };

  render () {
    const { contacts, dispatch, actions } = this.props;
    const { selectContact } = actions;

    let getListItem;
    if (contacts && contacts.length > 0) {
      getListItem = (item) => <ContactsListItem
        key={item._id}
        id={item._id}
        firstName={item.firstName}
        lastName={item.lastName}
        onClick={() => {
          selectContact(item._id)
        }}
      />
    }

    return (
      <div className="contacts-list">
        <input type="search"
               placeholder="Search"
               value={this.state.input}
               onChange={
                 this.onInputChange.bind(this)
               }/>
        <ul className="contacts-list__list">
          {this.state.displayed.map(item =>
            getListItem(item)
          )}
        </ul>
      </div>
    );
  }
}
