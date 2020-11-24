import React, { Component } from 'react';
import { connect } from 'react-redux';
import swal from 'sweetalert';
import ActivityItem from '../ActivityItem/ActivityItem';
// import mapStoreToProps from '../../redux/mapStoreToProps';

class ActivitySelect extends Component {
  state = {
    activeArray: []
  }
  componentDidMount = () => {
    this.fetchActivities();
    this.fetchUserActivities(); 
    // this.activeArrayBuilder(this.props.reduxState.activityReducer, this.props.reduxState.userActivityReducer)
  }
  
  // activeArrayBuilder = (mainArray, userArray) => {
  //   let megaArray = mainArray.concat(userArray)
  //   let tempArray = [];
  //   megaArray.sort((a,b) => a.description.localeCompare(b.description))
  //   console.log('DIGGING', megaArray[0].id);
    
  //   for(let i = 0; i < megaArray.length; i++){
  //     if(megaArray[i] === megaArray[i+1]) {
  //       console.log('at I', megaArray[i]);
  //       tempArray.push(megaArray[i])
  //     }
  //   }
  //   console.log('ARRAY IS', tempArray); 
  // }


//load all the activities from the DB
  fetchActivities = () => {
    this.props.dispatch({type: 'FETCH_ACTIVITIES'})
  }
//fetch all the activities for the logged in user and store in useractivity reducer
  fetchUserActivities = () => {
    this.props.dispatch({type: 'FETCH_USER_ACTIVITIES', payload: this.props.reduxState.user.id})
  }
//on click, this adds the targeted activity to this user's activities
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
      </div>
      </>
    )
  }
}

//TRIAL
// {this.props.reduxState.activityReducer.map((activity) => {
//   {this.props.reduxState.userActivityReducer.map((userActivity) => {
//     if(activity.description === userActivity.description){

//       return (               
//         <tr>
//           <ActivityItem activity={activity} handleClick={this.handleClick} deleteActivity={this.deleteActivity}/>
//         </tr>
//       )
//     }else {
//       return (
//         <tr className='unchosenAct'>
//           <ActivityItem activity={activity} handleClick={this.handleClick} deleteActivity={this.deleteActivity}/>
//         </tr>
//       )
//     }
//   })}
// })}

// ----------
 


const mapStoreToProps = reduxState => ({
  reduxState
})

export default connect(mapStoreToProps)(ActivitySelect);