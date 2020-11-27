import React, { Component } from 'react';
import { connect } from 'react-redux';
import swal from 'sweetalert';
import ActivityItem from '../ActivityItem/ActivityItem';
import './ActivitySelect.css';
// import mapStoreToProps from '../../redux/mapStoreToProps';

class ActivitySelect extends Component {

  componentDidMount = () => {
    this.fetchUserActivities(); //fetches the activities list for this user from the DB
  }
  componentDidUpdate = () => {
    this.props.dispatch({type:'FETCH_HUBNUMBER'})
    //updates the user's hubnumber in the hub Number Reducer
  }
//sends dispatch to activity saga with the logged in user's id in payload
  fetchUserActivities = () => {
    this.props.dispatch({type: 'FETCH_USER_ACTIVITIES', payload: this.props.reduxState.user.id})
  }

//on click, this sends the selected activity id to the activity saga
//this also dispatches the number from the hubNumberReducer to the hubNumber Saga for ADD_HUBNUMBER (updates DB)
  addUserActivity = (event, param) => {
    //this is one click behind on updating hubnumber
    this.props.dispatch({
      type:'ADD_USER_ACTIVITY',
      payload: {id: param}
    })
    // this.props.dispatch({type:'ADD_HUBNUMBER', payload: this.props.reduxState.hubNumberReducer});
    this.fetchUserActivities();
  }

//on click, this sends the selected activity id to the activity saga
//this also dispatches the number from the hubNumberReducer to the hubNumber Saga for ADD_HUBNUMBER (updates DB)
  deleteUserActivity = (event, param) => {
    // sends param and user.id as payload to acivity.saga payload logs as correct numbers (activity id and userid)
    this.props.dispatch({
      type: 'DELETE_USER_ACTIVITY',
      payload: {id:param}
    })
    // this.props.dispatch({type:'ADD_HUBNUMBER', payload: this.props.reduxState.hubNumberReducer});
    this.fetchUserActivities();
  }


//Adds the caluclated hub number to the user's HubNumber in the DB
  submitData = (event, param) => {
    console.log('AddingHubNumber', param);
    this.props.dispatch({
      type: 'ADD_HUBNUMBER',
      payload: {num: param}
    })
    this.props.history.push('/bubblemates')
  }

  render() {
    return(
      <>
        <div className="container">
        <button className="activityBtn" onClick={(event) => this.submitData(event, this.props.reduxState.hubNumberReducer)}>Submit</button>
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
                    <ActivityItem activity={activity} addUserActivity={this.addUserActivity} deleteUserActivity={this.deleteUserActivity}/>
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