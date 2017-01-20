import React from 'react';
import ReactDOM from 'react-dom';
import { combineReducers, createStore } from 'redux';
import { Provider } from 'react-redux';

import * as reducers from './reducers';
import Counter from './components/counter';

const store = createStore(combineReducers(reducers));

ReactDOM.render((
  <Provider store={store}>
    <Counter />
  </Provider>
), document.getElementById('main'));
