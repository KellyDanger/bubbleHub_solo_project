import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';

class CreateProfile extends Component {

  render() {
    return(
      <div>
        <p>This is where you Create a Profile</p>
      </div>
    )
  }
}

export default connect(mapStoreToProps)(CreateProfile);