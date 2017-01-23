import React, { PropTypes } from 'react';
// import styles from './ContactsList.css';

import ContactsListItem from './contacts_list_item';

export default class ContactsList extends React.Component {
  static propTypes = {
    contacts: PropTypes.array.isRequired,
    actions: PropTypes.object.isRequired
  };

  constructor(props) {
    super(props);

    this.state = {
      displayed: props.contacts.slice()
    };
  }

  componentWillReceiveProps(nextProps) {
    const nextContacts = nextProps.contacts;
    const newState = Object.assign({}, this.state);

    for (const fieldName in nextContacts) {
      if (nextContacts.hasOwnProperty(fieldName)) {
        newState[fieldName] = nextContacts[fieldName];
      }
    }

    this.setState(newState);
  }

  onInputChange(e) {
    const newDisplayed = this.props.contacts.filter(v => {
      const firstName = v.firstName.toLowerCase();
      const lastName = v.lastName.toLowerCase();
      const val = e.target.value.toLowerCase();

      return firstName.includes(val) || lastName.includes(val);
    });

    this.setState({
      displayed: newDisplayed
    });
  }

  getListItem(item, contacts, selectContact) {
    if (contacts && contacts.length > 0) {
      return (<ContactsListItem
        key={item._id}
        id={item._id}
        firstName={item.firstName}
        lastName={item.lastName}
        onClick={() => {
          selectContact(item._id);
        }}
      />);
    }
  }

  render() {
    const { contacts, actions } = this.props;

    return (
      <div className="contacts-list">
        <input type="search"
          placeholder="Search"
          value={this.state.input}
          onChange={
            this.onInputChange.bind(this)
          }
        />
        <button type="button"
          className="contacts-list__btn"
          onClick={() => {
            actions.selectContact();
          }}
        >+
        </button>
        <ul className="contacts-list__list">
          {this.state.displayed.map(item =>
            this.getListItem(item, contacts, actions.selectContact)
          )}
        </ul>
      </div>
    );
  }
}
