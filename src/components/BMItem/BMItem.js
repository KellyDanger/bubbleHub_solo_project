import React, {Component} from 'react';
import {connect} from 'react-redux';

class BMItem extends Component {

  render(){
    return(
      <p>{JSON.stringify(this.props.reduxState.bmReducer)}</p>
    )
  }
}

const mapStoreToProps = reduxState => ({
  reduxState
})

export default connect(mapStoreToProps)(BMItem);