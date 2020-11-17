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
        <table>
          <thead>
            <tr>
              <th>Activity</th>
              <th>Response</th>
            </tr>
            </thead>
            <tbody>
              {this.props.reduxState.activityReducer.map((activity) => {
                return (
                  <tr key={activity.id}>
                    <ActivityItem activity={activity}/>
                  </tr>
                )
              })}
            </tbody>
        </table>
      </div>
    )
  }
}
const mapStoreToProps = reduxState => ({
  reduxState
})

export default connect(mapStoreToProps)(ActivitySelect);