import React, { Component } from 'react';
import { connect } from 'react-redux';
import LogOutButton from '../LogOutButton/LogOutButton';
import ActivityItem from '../ActivityItem/ActivityItem';
// import mapStoreToProps from '../../redux/mapStoreToProps';

class Dashboard extends Component {


  // this component doesn't do much to start, just renders some user info to the DOM
  componentDidMount = () => {
    this.props.dispatch({type: 'FETCH_MY_BMS'});
    this.props.dispatch({type: 'FETCH_USER_ACTIVITIES', payload: this.props.reduxState.user.id})
  }

  // Recieves click event and activity as param from ActivityItem.js
  deleteUserActivity = (event, param) => {
    // sends param and user.id as payload to acivity.saga payload logs as correct numbers (activity id and userid)
    this.props.dispatch({
      type: 'DELETE_USER_ACTIVITY',
      payload: {id:param}
    })
    this.fetchUserActivities();
  }
  


  render() {
    return (
      <>
        <div>
          <h1 id="welcome">Welcome, {this.props.reduxState.user.username}!</h1>
          <p>Your Current HubMates Are</p>
          <ul>
            {this.props.reduxState.myBmReducer[0] && 
            this.props.reduxState.myBmReducer.map((bm) =>{
            return <li key={bm.id}>{bm.name} whose HubNumber is: {bm.hubNumber}</li>
            })}
          </ul>
        
          <LogOutButton className="log-in" />
        </div>
      </>
    );
  }
}


const mapStoreToProps = reduxState => ({
  reduxState
})

export default connect(mapStoreToProps)(Dashboard);


