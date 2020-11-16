import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';

class RiskTolerance extends Component {

  render() {
    return(
      <div>
        <p>This is where you Set your Risk Tolerance</p>
      </div>
    )
  }
}

export default connect(mapStoreToProps)(RiskTolerance);