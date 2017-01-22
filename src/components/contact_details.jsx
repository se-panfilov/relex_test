import React, { PropTypes } from 'react';
import { connect } from 'react-redux';

// import styles from './ContactsDetails.css';

import { addContact, selectContact, removeContact } from '../actions/contacts';
import ContactsListItem from './contacts_list_item';

export default class ContactDetails extends React.Component {
  static propTypes = {
    selected: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired
  };

  state = {
    editing: false
  };

  onInputChange (fieldName, event) {

  }

  onClick (fieldName, event) {
    console.info(this.props.selected)
  }

  render () {
    const { selected, dispatch } = this.props;
    // const actions = bindActionCreators(ContactsActions, dispatch);

    let element;
    if (this.state.editing) {
      element = <button type="submit"
                        onClick={e => {
                          e.preventDefault();
                          this.onClick('remove');
                        }}
      >Remove
      </button>
    } else {
      element = <button type="submit"
                        onClick={e => {
                          e.preventDefault();
                          this.onClick('add');
                        }}
      >Add
      </button>
    }

    return (
      <div className="contacts-details">
        <form name="contact-details-form"
              id="contact-details-form"
              className="contacts-details__form">
          <input type="text"
                 value={selected.firstName}
                 onChange={this.onInputChange('firstName')}
                 readOnly="readOnly"
          />
          <input type="text"
                 value={selected.lastName}
                 onChange={this.onInputChange('lastName')}
                 readOnly="readOnly"
          />
          {element}
        </form>
      </div>
    );
  }
}
