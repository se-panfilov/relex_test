import React, { PropTypes } from 'react';
// import styles from './ContactsDetails.css';

export default class ContactDetails extends React.Component {
  static propTypes = { // TODO (S.Panfilov)fix isRequired
    selected: PropTypes.object,
    actions: PropTypes.object.isRequired,
    onSave: PropTypes.func,
    onAdd: PropTypes.func,
    onRemove: PropTypes.func
  };

  constructor (props) {
    super(props);

    this.state = {
      editing: false,
      data: {
        firstName: 'qqq',
        lastName: 'www'
      }
    };

    // TODO (S.Panfilov) curWorkPoint: fix edit mode and fix add new contact
    this.setMode(selected);
  }

  onInputChange (fieldName, event) {
    const newState = Object.assign({}, this.state);
    newState.data[fieldName] = event.target.value;
    this.setState(newState);
  }

  componentWillReceiveProps (nextProps) {
    const selectedProp = nextProps.selected || { firstName: 'qqq', lastName: 'www' }; // TODO (S.Panfilov) fix this alts
    const newState = Object.assign({}, this.state);

    for (const fieldName in selectedProp) {
      if (selectedProp.hasOwnProperty(fieldName)) {
        if (selectedProp[fieldName] !== this.state.data[fieldName]) {
          newState.data[fieldName] = selectedProp[fieldName];
        }
      }
    }

    this.setState(newState);
  }

  getInput (name, selected) {
    console.info(selected)
    // if (selected) {
    return <input type="text"
                  value={this.state.data[name]}
                  onChange={(e) => this.onInputChange.call(this, name, e)}
    />
    // }
    // return null
  };

  setMode (selected) {
    const newState = Object.assign({}, this.state);
    newState.editing = !!(selected && (selected._id || selected.id === 0));
    this.setState(newState);
  }

  render () {
    let { selected, dispatch } = this.props;
    // const actions = bindActionCreators(ContactsActions, dispatch);

    console.warn(this.state.editing)
    if (!selected) selected = { firstName: 'qqq', lastName: 'www' }; // TODO (S.Panfilov) fix this alts

    let submitBtn;
    if (!this.state.editing) {
      submitBtn = <button type="submit"
                          onClick={e => {
                            e.preventDefault();
                            this.props.onAdd({
                              firstName: this.state.data.firstName,
                              lastName: this.state.data.lastName
                            });
                          }}
      >Save
      </button>
    } else {
      submitBtn = <button type="submit"
                          onClick={e => {
                            e.preventDefault();
                            this.props.onSave(this.state.data);
                          }}
      >Save
      </button>
    }


    return (
      <div className="contacts-details">
        <form name="contact-details-form"
              id="contact-details-form"
              className="contacts-details__form">
          {this.getInput('firstName', selected)}
          {this.getInput('lastName', selected)}
          {submitBtn}
        </form>
      </div>
    );
  }
}
