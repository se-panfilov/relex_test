import React, { PropTypes } from 'react';

export default class ContactsListItem extends React.Component {
  static propTypes = {
    id: PropTypes.number.isRequired,
    firstName: PropTypes.string.isRequired,
    lastName: PropTypes.string.isRequired
  };

  render () {
    return (
      <li className="contacts-list__list-item">
        <span className="contacts-list__item-text">{this.props.firstName} {this.props.lastName}</span>
      </li>
    );
  }
}
