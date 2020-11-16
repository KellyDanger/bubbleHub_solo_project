import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';

class BMDashboard extends Component {

  render() {
    return(
      <div>
        <p>This is where you see your bubblemates</p>
      </div>
    )
  }
}

export default connect(mapStoreToProps)(BMDashboard);