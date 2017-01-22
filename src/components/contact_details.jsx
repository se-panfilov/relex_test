import React, { PropTypes } from 'react';
import { connect } from 'react-redux';

// import styles from './ContactsDetails.css';

import { addContact, selectContact, removeContact } from '../actions/contacts';
import ContactsListItem from './contacts_list_item';

export default class ContactDetails extends React.Component {
  static propTypes = {
    // selected: PropTypes.object.isRequired,
    selected: PropTypes.object,
    actions: PropTypes.object.isRequired,
    onSave: PropTypes.func
  };

  state = {
    editing: false,
    data: {
      firstName: (this.props.selected) ? this.props.selected.firstName : null,
      lastName: (this.props.selected) ? this.props.selected.lastName : null,
    }
  };

  onInputChange (fieldName, event) {
    this.state.data[fieldName] = event.target.value
  }

  render () {
    const { selected, dispatch } = this.props;
    // const actions = bindActionCreators(ContactsActions, dispatch);

    let submitBtn;
    if (this.state.editing) {
      // submitBtn = <button type="submit"
      //                     onClick={e => {
      //                       e.preventDefault();
      //                       this.props.onClick('remove');
      //                     }}
      {/*>Remove*/
      }
      {/*</button>*/
      }
    } else {
      submitBtn = <button type="submit"
                          onClick={e => {
                            e.preventDefault();
                            this.props.onSave('save', this.state.data);
                          }}
      >Save
      </button>
    }

    let getInput = (name, selected) => {

      if (selected) {
        return <input type="text"
                      defaultValue={selected[name]}
                      onChange={(e) => this.onInputChange(name, e)}
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
