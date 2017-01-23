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
      filter: '',
      displayed: props.contacts.slice()
    };
  }

  componentWillReceiveProps(nextProps) {
    const newState = Object.assign({}, this.state);
    // newState.displayed = nextProps.contacts.slice();
    newState.displayed = this.getFilteredList(nextProps.contacts, this.state.filter);

    this.setState(newState);
  }

  onInputChange(event) {
    const newState = Object.assign({}, this.state);
    newState.filter = event.target.value;
    newState.displayed = this.getFilteredList(this.props.contacts, event.target.value);
    this.setState(newState);
  }

  getFilteredList(arr, value) {
    if (!value && value === '') return arr;

    return arr.filter(v => {
      const firstName = v.firstName.toLowerCase();
      const lastName = v.lastName.toLowerCase();
      const val = value.toLowerCase();

      return firstName.includes(val) || lastName.includes(val);
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
      container: {},
      top: {
        marginBottom: '15px',
        display: 'flex'
      },
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
        border: '1px solid #ccc',
        borderRadius: '4px'
      },
      list: {
        margin: 0,
        padding: '0 15px'
      }
    };

    return (
      <div className="contacts-list" style={style.container}>
        <div className="contacts-list__top" style={style.top}>
          <div className="contacts-list__top-column">
            <input type="search"
              className="contacts-list__input--search"
              style={style.search}
              placeholder="Search"
              value={this.state.filter}
              onChange={
                this.onInputChange.bind(this)
              }
            />
          </div>
          <div className="contacts-list__top-column">
            <button type="button"
              className="contacts-list__btn"
              style={style.button}
              onClick={() => {
                actions.selectContact();
              }}
            >+
            </button>
          </div>
        </div>
        <ul className="contacts-list__list" style={style.list}>
          {this.state.displayed.map(item =>
            this.getListItem(item, contacts, actions.selectContact, style.listItem)
          )}
        </ul>
      </div>
    );
  }
}
