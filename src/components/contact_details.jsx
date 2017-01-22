import React, { PropTypes } from 'react';
import { connect } from 'react-redux';

// import styles from './ContactsDetails.css';

import { addContact, selectContact, removeContact } from '../actions/contacts';
import ContactsListItem from './contacts_list_item';

export default class ContactDetails extends React.Component {
  static propTypes = {
    // selected: PropTypes.object.isRequired,
    selected: PropTypes.object,
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

    let submitBtn;
    if (this.state.editing) {
      submitBtn = <button type="submit"
                          onClick={e => {
                            e.preventDefault();
                            this.onClick('remove');
                          }}
      >Remove
      </button>
    } else {
      submitBtn = <button type="submit"
                          onClick={e => {
                            e.preventDefault();
                            this.onClick('add');
                          }}
      >Add
      </button>
    }

    let getInput = (name, selected) => {
      if (selected) {
        return <input type="text"
                      value={selected[name]}
                      onChange={this.onInputChange(name)}
                      readOnly="readOnly"
        />
      }
      return null
    };

    return (
      <div className="contacts-details">
        <form name="contact-details-form"
              id="contact-details-form"
              className="contacts-details__form">
          {getInput('firstName', selected)}
          {getInput('lastName', selected)}
          {submitBtn}
        </form>
      </div>
    );
  }
}
