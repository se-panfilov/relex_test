import React from 'react';
import ReactDOM from 'react-dom';
import { combineReducers, createStore } from 'redux';
import { Provider } from 'react-redux';

import * as reducers from './reducers';
import ContactsList from './components/contacts_list';

const store = createStore(combineReducers(reducers));

// TODO (S.Panfilov)
import { addContact, removeContact } from './actions/contacts';
store.dispatch(addContact('John', 'Smith'));
// store.dispatch(addContact(1));
// store.dispatch(removeContact(4));
// TODO (S.Panfilov)


ReactDOM.render((
  <Provider store={store}>
    <ContactsList/>
    {/*{() => <ContactsList /> }*/}
  </Provider>
), document.getElementById('main'));
