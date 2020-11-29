import React, { Component } from 'react';
import { connect } from 'react-redux';
import LogOutButton from '../LogOutButton/LogOutButton';
import './Dashboard.css';


class Dashboard extends Component {


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
  bubbleMates = () => {
    this.props.history.push('/bubblemates');
  }
  activitySelect = () => {
    this.props.history.push('/activityselect')
  }

  render() {
    return (
      <>
        <div className="dashContain">
          <h1 id="welcome">{this.props.reduxState.user.username}'s Dashboard</h1>
          <h2>Your Current BubbleMates Are</h2>
          <div className="hubMatesCont" onClick={this.bubbleMates}>
            {this.props.reduxState.myBmReducer[0] && 
            this.props.reduxState.myBmReducer.map((bm) =>{
            return <div className="bmCont" key={bm.id}>
              <p>{bm.name}</p> 
              <p>HubNumber is: {bm.hubNumber} </p> 
              <p>
            {bm.hubNumber > this.props.reduxState.user.tolerance &&
              <i id="flag" class="far fa-flag"></i>}
            {bm.hubNumber <= this.props.reduxState.user.tolerance &&
              <i class="far fa-check-circle"></i>
            }</p>
            </div>

            })}
          </div>
          <div onClick={this.activitySelect}>
            <h2>Your Current Activities Are</h2>
              {this.props.reduxState.userActivityReducer.map((activity) => { return(
                activity.active === true &&
                <div className="activityCont" key={activity.id}>
                  <p>{activity.description}</p>
                </div> 
              )})}
          </div>
          
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


