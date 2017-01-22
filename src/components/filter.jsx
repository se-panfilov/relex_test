import React, { PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { search } from 'redux/modules/search-term';

@connect(
  null,
  dispatch => bindActionCreators({ search }, dispatch)
)

export default class Filter extends React.Component {
  static propTypes = {
    search: PropTypes.func.isRequired,
  };

  render () {
    return (
      <input type="search" onChange={search}/>
    );
  }
}
