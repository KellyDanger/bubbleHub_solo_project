import React, { Component } from 'react';
import { connect } from 'react-redux';
// import mapStoreToProps from '../../redux/mapStoreToProps';

class ActivitySelect extends Component {

  componentDidMount = () => {
    this.props.dispatch({
      type: 'FETCH_ACTIVITIES'
    })
  }

  render() {
    return(
      <div>
        <p>This is where you Select your Activities</p>
        {JSON.stringify(this.props.reduxState.activityReducer)}
      </div>
    )
  }
}
const mapStoreToProps = reduxState => ({
  reduxState
})

export default connect(mapStoreToProps)(ActivitySelect);