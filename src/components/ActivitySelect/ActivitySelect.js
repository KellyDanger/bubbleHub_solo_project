import React, { Component } from 'react';
import { connect } from 'react-redux';
import ActivityItem from '../ActivityItem/ActivityItem';
// import mapStoreToProps from '../../redux/mapStoreToProps';

class ActivitySelect extends Component {

  componentDidMount = () => {
    this.fetchActivities(); 
  }

  fetchActivities = () => {
    this.props.dispatch({type: 'FETCH_ACTIVITIES'})
  }

  handleClick = (event, param) => {
    event.preventDefault();
    this.props.dispatch({
      type:'ADD_USER_ACTIVITY',
      payload: param
    })
  }

  // Recieves click event and activity as param from ActivityItem.js
  deleteActivity = (event, param) => {
    // sends param and user.id as payload to acivity.saga payload logs as correct numbers (activity id and userid)
    this.props.dispatch({
      type: 'DELETE_ACTIVITY',
      payload: param
    })
  }
  // submitData = () => {
  //     this.props.dispatch({
  //       type: 'FETCH_HUBNUMBER',
  //       payload: this.props.reduxState.user.id
  //     })
  // this.props.history.push('/');
  // }

  submitData = (event, param) => {
    this.props.dispatch({
      type: 'ADD_HUBNUMBER',
      payload: {id: param}
    })
    this.props.history.push('/bubblemates')
  }

  render() {
    return(
      <div>
        <table>
          <thead>
            <tr>
              <th>Activity</th>
              <th>Add</th>
              <th>Remove</th>
            </tr>
            </thead>
            <tbody>
              {this.props.reduxState.activityReducer.map((activity) => {
                return (
                  <tr key={activity.id}>
                    <ActivityItem activity={activity} handleClick={this.handleClick} deleteActivity={this.deleteActivity}/>
                  </tr>
                )
              })}
            </tbody>
        </table>
        <button onClick={(event) => this.submitData(event, this.props.reduxState.hubNumberReducer)}>Submit</button>
      </div>
    )
  }
}
const mapStoreToProps = reduxState => ({
  reduxState
})

export default connect(mapStoreToProps)(ActivitySelect);