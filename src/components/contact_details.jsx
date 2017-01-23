import React, { PropTypes } from 'react';
// import styles from './ContactsDetails.css';

export default class ContactDetails extends React.Component {
  static propTypes = { // TODO (S.Panfilov)fix isRequired
    selected: PropTypes.object,
    onSave: PropTypes.func,
    onAdd: PropTypes.func,
    onRemove: PropTypes.func
  };

  constructor (props) {
    super(props);

    this.state = {
      editing: !!(props.selected && props.selected._id),
      data: {
        firstName: '',
        lastName: ''
      }
    };
  }

  onInputChange (fieldName, event) {
    const newState = Object.assign({}, this.state);
    newState.data[fieldName] = event.target.value;
    this.setState(newState);
  }

  componentWillReceiveProps (nextProps) {
    const newState = Object.assign({}, this.state);
    const selected = nextProps.selected || { firstName: '', lastName: '' };
    Object.assign(newState.data, selected);

    // if (!nextProps.selected) nextProps.selected = Object.assign({}, this.state.data);
    // console.info(nextProps.selected)
    // for (const fieldName in nextProps.selected) {
    //   // console.info(123)
    //   if (nextProps.selected.hasOwnProperty(fieldName)) {
    //     // console.info(`nextProps.selected[${fieldName}]: ${nextProps.selected[fieldName]}`)
    //     if (nextProps.selected[fieldName] !== this.state.data[fieldName]) {
    //       newState.data[fieldName] = nextProps.selected[fieldName];
    //     }
    //   }
    // }

    newState.editing = !!(this.props.selected && this.props.selected._id);

    console.warn(newState.editing)
    this.setState(newState);
  }

  getInput (name) {
    // console.info(this.state.data)
    return <input type="text"
                  value={this.state.data[name]}
                  onChange={(e) => this.onInputChange.call(this, name, e)}
    />
  };

  setMode (selected) {
    const newState = Object.assign({}, this.state);
    newState.editing = !!(selected && (selected._id || selected._id === 0));
    this.setState(newState);
  }

  onSubmit () {
    const method = (this.state.editing) ? 'onSave' : 'onAdd';
    this.props[method](this.state.data);
  }

  render () {
    let { selected, dispatch } = this.props;

    console.log(this.state.editing);
    // if (!selected) selected = { firstName: 'qqq', lastName: 'www' }; // TODO (S.Panfilov) fix this alts
    // if (!selected) selected = {}; // TODO (S.Panfilov) fix this alts

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
            < button type="button"
                     onClick={(e) => {
                       e.preventDefault();
                       this.props.onRemove(this.state.data);
                     }}
            >Remove
            </button> : <span></span>
          }
        </form>
      </div>
    );
  }
}
