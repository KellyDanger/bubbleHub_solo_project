import React, { Component } from 'react';
import { connect } from 'react-redux';
import ActivityItem from '../ActivityItem/ActivityItem';
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
        {/* {JSON.stringify(this.props.reduxState.activityReducer)} */}
        <div>
        <table>
          <thead>
            <tr>
              <th>Activity</th>
              <th>Response</th>
            </tr>
            </thead>
            <tbody>
              <ActivityItem/>
            </tbody>
        </table>
      </div> 
      </div>
    )
  }
}
const mapStoreToProps = reduxState => ({
  reduxState
})

export default connect(mapStoreToProps)(ActivitySelect);