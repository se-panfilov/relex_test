import React from 'react';

class ContactsListItem extends React.Component {
  // constructor(props) {
  //   super(props);
  //   this.state = {secondsElapsed: 0};
  // }
  render () {
    return (
      <li className="contacts__list-item">
        <span className="">{this.props.firstName} {this.props.lastName}</span>
      </li>
    );
  }
}

export default ContactsListItem
