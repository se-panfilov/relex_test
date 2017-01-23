import React, { PropTypes } from 'react';

export default class ContactsListItem extends React.Component {
  static propTypes = {
    id: PropTypes.number.isRequired,
    firstName: PropTypes.string.isRequired,
    lastName: PropTypes.string.isRequired,
    onClick: PropTypes.func
  };

  render() {
    const style = {
      listItem: {
        color: '#555',
        textDecoration: 'none',
        listStyle: 'none'
      },
      link: {
        color: '#555',
        textDecoration: 'none'
      }
    };

    return (
      <li className="contacts-list__list-item" style={style.listItem}>
        <a href="#"
          className="contacts-list__item-text"
          style={style.link}
          onClick={e => {
            e.preventDefault();
            this.props.onClick();
          }}
        >{this.props.firstName} {this.props.lastName}</a>
      </li>
    );
  }
}
