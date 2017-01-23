import React, { PropTypes } from 'react';

export default class ContactsListItem extends React.Component {
  static propTypes = {
    id: PropTypes.number.isRequired,
    firstName: PropTypes.string.isRequired,
    lastName: PropTypes.string.isRequired,
    onClick: PropTypes.func
  };

  render() {
    return (
      <li className="contacts-list__list-item">
        <a href="#"
          className="contacts-list__item-text"
          onClick={e => {
            e.preventDefault();
            this.props.onClick();
          }}
        >{this.props.firstName} {this.props.lastName}</a>
      </li>
    );
  }
}
