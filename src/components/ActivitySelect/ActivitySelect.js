import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';

class ActivitySelect extends Component {

  render() {
    return(
      <div>
        <p>This is where you Select your Activities</p>
      </div>
    )
  }
}

export default connect(mapStoreToProps)(ActivitySelect);