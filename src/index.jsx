import React from 'react';
import ReactDOM from 'react-dom';
// import { combineReducers, createStore } from 'redux';
// import { Provider } from 'react-redux';
//
// import * as reducers from './reducers';
// import ContactsApp from './containers/contacts_app';
//
// const reducer = combineReducers(reducers);
// const store = createStore(reducer);
//
// ReactDOM.render((
//   <Provider store={store}>
//     <ContactsApp/>
//   </Provider>
// ), document.getElementById('main'));


import App from './containers/App';

// React.render(<App />, document.getElementById('main'));
ReactDOM.render(<App />, document.getElementById('main'));
