import React from 'react';

const ReadMe = () => (
  <div>
    <h1>Exercise</h1>
    <p>The counter is just here as an example of how the application could be structured.</p>
    <p>
      The goal of this exercise is too build a small address book application.<br />
      It should have the following features:
      <ul>
        <li>List of all address book entries, sorted by name</li>
        <li>Filtering the entries</li>
        <li>Creating a new entry</li>
        <li>Modifying an entry</li>
        <li>Deleting an entry</li>
      </ul>
      It could look something like this:
    </p>
    <p><img width="795" height="485" src="/images/address_book.png" /></p>
    <p>
      Implement this address book using React and Redux. More information on React and Redux can be found <a href="https://facebook.github.io/react/">here</a> and <a href="http://redux.js.org/">here</a>.
    </p>
  </div>
);

export default ReadMe;
