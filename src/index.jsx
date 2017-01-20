import React from 'react';
import ReactDOM from 'react-dom';
import { combineReducers, createStore } from 'redux';
import { Provider } from 'react-redux';

import * as reducers from './reducers';
import ContactsList from './components/contacts_list';

const store = createStore(combineReducers(reducers));

ReactDOM.render((
  <Provider store={store}>
    <ContactsList />
  </Provider>
), document.getElementById('main'));
