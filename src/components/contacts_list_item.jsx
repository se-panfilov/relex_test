import React, { PropTypes } from 'react';

class ContactsListItem extends React.Component {
  static propTypes = {
    id: PropTypes.number.isRequired,
    firstName: PropTypes.string.isRequired,
    lastName: PropTypes.string.isRequired
  };

  render () {
    return (
      <li className="contacts__list-item">
        <span className="">{this.props.firstName} {this.props.lastName}</span>
      </li>
    );
  }
}

export default ContactsListItem
