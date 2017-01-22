import React from 'react';
import { combineReducers, createStore } from 'redux';
import { Provider } from 'react-redux';

import ContactsApp from '../containers/contacts_app';
import * as reducers from '../reducers';

const reducer = combineReducers(reducers);
const store = createStore(reducer);

//Add Demo data
import { addContact, selectContact } from '../actions/contacts';
store.dispatch(addContact('Samuel', 'Colt'));
store.dispatch(addContact('Gal', 'Uziel'));
store.dispatch(addContact('John', 'Thompson'));
store.dispatch(addContact('Mikhail', 'Kalashnikov'));
store.dispatch(addContact('Gaston', 'Glock'));
store.dispatch(addContact('Leon', 'Nagant'));
//End of Demo data

export default class App extends React.Component {
  render () {
    return (
      <div>
        <Provider store={store}>
          <ContactsApp/>
        </Provider>
      </div>
    );
  }
}
