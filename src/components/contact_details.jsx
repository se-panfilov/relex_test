import React, { PropTypes } from 'react';
// import styles from './ContactsDetails.css';

export default class ContactDetails extends React.Component {
  constructor (props) {
    super(props);

    this.state = {
      editing: false,
      data: {}
    };
  }

  static propTypes = { // TODO (S.Panfilov)fix isRequired
    selected: PropTypes.object,
    actions: PropTypes.object.isRequired,
    onSave: PropTypes.func
  };

  onInputChange (fieldName, event) {
    this.setState({
      data: {
        [fieldName]: event.target.value
      }
    });
  }

  componentWillReceiveProps (nextProps) {
    const selectedProp = nextProps.selected;
    const newState = Object.assign({}, this.state);

    for (const fieldName in selectedProp) {
      if (selectedProp.hasOwnProperty(fieldName)) {
        if (selectedProp[fieldName] !== this.state.data[fieldName]) {
          newState.data[fieldName] = selectedProp[fieldName]
        }
      }
    }

    this.setState(newState);
  }

  getInput (name, selected) {
    if (selected) {
      return <input type="text"
                    value={this.state.data[name]}
                    onChange={(e) => this.onInputChange.call(this, name, e)}
      />
    }
    return null
  };

  render () {
    const { selected, dispatch } = this.props;
    // const actions = bindActionCreators(ContactsActions, dispatch);

    let submitBtn;
    if (this.state.editing) {
      // submitBtn = <button type="submit"
      //                     onClick={e => {
      //                       e.preventDefault();
      //                       this.props.onClick('remove');
      //                     }}
      {/*>Remove*/
      }
      {/*</button>*/
      }
    } else {
      submitBtn = <button type="submit"
                          onClick={e => {
                            e.preventDefault();
                            console.warn(this.state.data)
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
