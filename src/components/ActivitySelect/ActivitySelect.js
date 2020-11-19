import React, { Component } from 'react';
import { connect } from 'react-redux';
import ActivityItem from '../ActivityItem/ActivityItem';
// import mapStoreToProps from '../../redux/mapStoreToProps';

class ActivitySelect extends Component {
  state = {
    activitiesArray: [],
    userId: this.props.reduxState.user.id
  }

  componentDidMount = () => {
    this.props.dispatch({
      type: 'FETCH_ACTIVITIES'
    })
  }

  handleClick = (event, param) => {
    console.log('clicked', param.riskLevel)
    event.preventDefault();
    this.setState ({
      activitiesArray: [...this.state.activitiesArray, param.id]  
    }) 
  }
  
  submitData = () => {
    console.log('This is the state', this.state);
    this.props.dispatch({
      type: 'ADD_USER_ACTIVITY',
      payload: this.state
  })
  }

  render() {
    return(
      <div>
             {JSON.stringify(this.state)}
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
                    <ActivityItem activity={activity} handleClick={this.handleClick}/>
                  </tr>
                )
              })}
            </tbody>
        </table>
        <button onClick={this.submitData}>Submit</button>
      </div>
    )
  }
}
const mapStoreToProps = reduxState => ({
  reduxState
})

export default connect(mapStoreToProps)(ActivitySelect);