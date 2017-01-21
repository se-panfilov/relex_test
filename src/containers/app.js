import React from 'react';
import { combineReducers, createStore } from 'redux';
import { Provider } from 'react-redux';

import ContactsApp from '../containers/contacts_app';
import * as reducers from '../reducers';

const reducer = combineReducers(reducers);
const store = createStore(reducer);

export default class App extends React.Component {
  render () {
    return (
      <div>
        <Provider store={store}>// TODO (S.Panfilov) cur work point //store.contacts just empty
          <ContactsApp contacts="store.contacts"/>
        </Provider>
      </div>
    );
  }
}
