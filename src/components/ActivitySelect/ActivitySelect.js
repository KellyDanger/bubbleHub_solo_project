import React, { Component } from 'react';
import { connect } from 'react-redux';
import swal from 'sweetalert';
import ActivityItem from '../ActivityItem/ActivityItem';
// import mapStoreToProps from '../../redux/mapStoreToProps';

class ActivitySelect extends Component {

  componentDidMount = () => {
    this.fetchActivities();
    this.fetchUserActivities(); 
  }


//load all the activities from the DB
  fetchActivities = () => {
    this.props.dispatch({type: 'FETCH_ACTIVITIES'})
  }
//fetch all the activities for the logged in user and store in useractivity reducer
  fetchUserActivities = () => {
    this.props.dispatch({type: 'FETCH_USER_ACTIVITIES', payload: this.props.reduxState.user.id})
  }
//on click, this adds the targeted activity to this user's activities
  addUserActivity = (event, param) => {
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
//Adds the caluclated hub number to the user's HubNumber in the DB
  submitData = (event, param) => {
    this.props.dispatch({
      type: 'ADD_HUBNUMBER',
      payload: {id: param}
    })
    this.props.history.push('/bubblemates')
  }
  render() {
    return(
      <>
        <div className="container">
        <button onClick={(event) => this.submitData(event, this.props.reduxState.hubNumberReducer)}>Submit</button>
        <table className="table-striped">
            <thead>
              <tr>
                <th>Activity</th>
                <th colSpan='2' className='text-center'>Do You Do This</th>
              </tr>
            </thead>
            {this.props.reduxState.userActivityReducer[0] && 
            <>
            <tbody>
              {this.props.reduxState.userActivityReducer.map((activity) => {
                return (
                  <tr key={activity.id} id={activity.id}>
                    <ActivityItem activity={activity} addUserActivity={this.addUserActivity} deleteActivity={this.deleteActivity}/>
                  </tr>
                )})}
            </tbody></>}
        </table>
      </div>
      </>
    )
  }
}

const mapStoreToProps = reduxState => ({
  reduxState
})

export default connect(mapStoreToProps)(ActivitySelect);