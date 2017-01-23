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
        _id: null,
        firstName: '',
        lastName: ''
      }
    };
  }

  componentWillReceiveProps(nextProps) {
    const newState = Object.assign({}, this.state);
    const selected = nextProps.selected || { _id: null, firstName: '', lastName: '' };

    Object.assign(newState.data, selected);
    newState.editing = !!(selected._id);

    this.setState(newState);
  }

  onInputChange(fieldName, event) {
    const newState = Object.assign({}, this.state);
    newState.data[fieldName] = event.target.value;
    this.setState(newState);
  }

  getInput(name, style) {
    return (<input type="text"
      value={this.state.data[name]}
      onChange={(e) => this.onInputChange.call(this, name, e)}
      style={style}
    />);
  }

  onSubmit() {
    const method = (this.state.editing) ? 'onSave' : 'onAdd';
    this.props[method](this.state.data);
  }

  render() {
    const style = {
      inputBlock: {
        display: 'block',
        margin: '15px'
      },
      input: {
        display: 'block',
        height: '34px',
        padding: '6px 12px',
        fontSize: '14px',
        lineHeight: '1.42857143',
        color: '#555',
        backgroundColor: '#fff',
        border: '1px solid #ccc',
        borderRadius: '4px'
      },
      btn: {
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
        borderRadius: '4px',
        margin: '3px'
      }
    };

    console.info(this.state.editing)

    return (
      <div className="contacts-details">
        <form name="contact-details-form"
          id="contact-details-form"
          className="contacts-details__form">
          <div className="contacts-details__input-block" style={style.inputBlock}>
            <label> First Name
              {this.getInput('firstName', style.input)}
            </label>
          </div>
          <div className="contacts-details__input-block" style={style.inputBlock}>
            <label> Last Name
              {this.getInput('lastName', style.input)}
            </label>
          </div>
          <div className="contacts-details__controls">
            <button type="submit"
              className="contacts-details__btn"
              style={style.btn}
              onClick={(e) => {
                e.preventDefault();
                this.onSubmit.call(this);
              }}
            >{this.state.editing ? 'Save' : 'Create'}
            </button>
            {this.state.editing ?
              <button type="button"
                className="contacts-details__btn"
                style={style.btn}
                onClick={(e) => {
                  e.preventDefault();
                  this.props.onRemove(this.state.data);
                }}
              >Remove
              </button> : <span />
            }
          </div>
        </form>
      </div>
    );
  }
}
