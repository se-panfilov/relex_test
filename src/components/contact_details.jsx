import React, { PropTypes } from 'react';
import { connect } from 'react-redux';

// import styles from './ContactsDetails.css';

import { addContact, selectContact, removeContact } from '../actions/contacts';
import ContactsListItem from './contacts_list_item';

export default class ContactDetails extends React.Component {
  constructor (props) {
    super(props);

    this.state = {
      editing: false,
      data: {}
    };

    // if (this.props.selected) {
    //   this.state.data.firstName = this.props.selected.firstName;
    //   this.state.data.lastName = this.props.selected.lastName;
    // }
  }

  static propTypes = {
    // selected: PropTypes.object.isRequired,
    selected: PropTypes.object,
    actions: PropTypes.object.isRequired,
    onSave: PropTypes.func
  };

  onInputChange (fieldName, event) {

    console.info(event.target.value)

    this.setState({
      data: {
        [fieldName]: event.target.value
      }
    });

    // this.state.data[fieldName] = event.target.value
    console.info(this.state.data);

    // this.state.data[fieldName] = event.target.value
  }

  // getValue (name) {
  //   return this.props.selected[name]
  // }

  // initInputs () {
  //   if (this.props.selected) {
  //     // TODO (S.Panfilov) this.setState({value: event.target.value});
  //     this.state.data.firstName = this.state.data.firstName || this.props.selected.firstName;
  //     // this.state.data.lastName = this.props.selected.lastName;
  //
  //     // this.setState({
  //     //   data: {
  //     //     firstName: this.state.data.firstName || this.props.selected.firstName,
  //     //     lastName: this.state.data.firstName || this.props.selected.lastName
  //     //   }
  //     // });
  //   }
  // }

  componentWillReceiveProps (nextProps) {
    const selectedProp = nextProps.selected;

    // for (const fieldName in selectedProp) {
    //   if (selectedProp.hasOwnProperty(fieldName)) {
    //     if (selectedProp[fieldName] !== this.state.data[fieldName]) {
    //       this.setState({ data: { [fieldName]: selectedProp [fieldName] } });
    //     }
    //   }
    // }

    if (selectedProp.firstName !== this.state.data.firstName) {
      this.setState({ data: { firstName: selectedProp.firstName, lastName: selectedProp.lastName } });
    }

    console.info(this.state.data)
  }

  getInput (name, selected) {
    // console.warn(name)
    // console.warn(this.state.data)
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

    // if (this.props.selected) {
    //   // TODO (S.Panfilov) this.setState({value: event.target.value});
    //   this.state.data.firstName = this.props.selected.firstName;
    //   this.state.data.lastName = this.props.selected.lastName;
    // }

    // this.initInputs()

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
