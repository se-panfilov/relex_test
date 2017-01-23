import React, { PropTypes } from 'react';
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
    const newState = Object.assign({}, this.state);
    newState.displayed = nextProps.contacts.slice();

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

  getListItem(item, contacts, selectContact, style) {
    if (contacts && contacts.length > 0) {
      return (<ContactsListItem
        key={item._id}
        id={item._id}
        firstName={item.firstName}
        lastName={item.lastName}
        onClick={() => {
          selectContact(item._id);
        }}
        style={style}
      />);
    }
  }

  render() {
    const { contacts, actions } = this.props;

    const style = {
      search: {
        display: 'block',
        width: '100%',
        height: '34px',
        padding: '6px 12px',
        fontSize: '14px',
        lineHeight: '1.42857143',
        color: '#555',
        backgroundColor: '#fff',
        border: '1px solid #ccc',
        borderRadius: '4px'
      },
      button: {
        color: '#333',
        backgroundColor: '#fff',
        borderColor: '#ccc',
        display: 'inline-block',
        padding: '6px 12px',
        marginBottom: '0',
        fontSize: '14px',
        fontWeight: '400',
        lineHeight: '1.42857143',
        textAlign: 'center',
        whiteSpace: 'nowrap',
        verticalAlign: 'middle',
        cursor: 'pointer',
        backgroundImage: 'none',
        border: '1px solid transparent',
        borderRadius: '4px'
      },
      list: {
        margin: 0,
        padding: 0
      }
    };

    return (
      <div className="contacts-list">
        <input type="search"
          className="contacts-list__input--search"
          style={style.search}
          placeholder="Search"
          value={this.state.input}
          onChange={
            this.onInputChange.bind(this)
          }
        />
        <button type="button"
          className="contacts-list__btn"
          style={style.search}
          onClick={() => {
            actions.selectContact();
          }}
        >+
        </button>
        <ul className="contacts-list__list" style={style.list}>
          {this.state.displayed.map(item =>
            this.getListItem(item, contacts, actions.selectContact, style.listItem)
          )}
        </ul>
      </div>
    );
  }
}
