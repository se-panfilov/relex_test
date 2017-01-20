import React from 'react';
import ReactDOM from 'react-dom';
import { combineReducers, createStore } from 'redux';
import { Provider } from 'react-redux';

import * as reducers from './reducers';
import Contact from './components/contact';

const store = createStore(combineReducers(reducers));

ReactDOM.render((
  <Provider store={store}>
    <Contact />
  </Provider>
), document.getElementById('main'));
