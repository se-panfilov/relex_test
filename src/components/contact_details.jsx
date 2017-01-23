import React, { PropTypes } from 'react';
// import styles from './ContactsDetails.css';

export default class ContactDetails extends React.Component {
  static propTypes = { // TODO (S.Panfilov)fix isRequired
    selected: PropTypes.object,
    onSave: PropTypes.func,
    onAdd: PropTypes.func,
    onRemove: PropTypes.func
  };

  constructor(props) {
    super(props);

    this.state = {
      editing: !!(props.selected && props.selected._id),
      data: {
        firstName: '',
        lastName: ''
      }
    };
  }

  componentWillReceiveProps(nextProps) {
    const newState = Object.assign({}, this.state);
    const selected = nextProps.selected || { firstName: '', lastName: '' };

    Object.assign(newState.data, selected);
    newState.editing = !!(this.props.selected && this.props.selected._id);

    this.setState(newState);
  }

  onInputChange(fieldName, event) {
    const newState = Object.assign({}, this.state);
    newState.data[fieldName] = event.target.value;
    this.setState(newState);
  }

  getInput(name) {
    return <input type="text"
                  value={this.state.data[name]}
                  onChange={(e) => this.onInputChange.call(this, name, e)}
    />;
  }

  onSubmit() {
    const method = (this.state.editing) ? 'onSave' : 'onAdd';
    this.props[method](this.state.data);
  }

  render() {
    return (
      <div className="contacts-details">
        <form name="contact-details-form"
              id="contact-details-form"
              className="contacts-details__form">
          {this.getInput('firstName')}
          {this.getInput('lastName')}
          <button type="submit"
                  onClick={(e) => {
                    e.preventDefault();
                    this.onSubmit.call(this);
                  }}
          >{this.state.editing ? 'Save' : 'Create'}
          </button>
          {this.state.editing ?
            <button type="button"
                    onClick={(e) => {
                      e.preventDefault();
                      this.props.onRemove(this.state.data);
                    }}
            >Remove
            </button> : <span />
          }
        </form>
      </div>
    );
  }
}
