import React, { Component } from 'react';
import { connect } from 'react-redux';
import ActivityItem from '../ActivityItem/ActivityItem';
// import mapStoreToProps from '../../redux/mapStoreToProps';

class ActivitySelect extends Component {
  // state = {
  //   activity: null,
  //   userId: this.props.reduxState.user.id,
  // }

  componentDidMount = () => {
    this.props.dispatch({type: 'FETCH_ACTIVITIES'})
    this.props.dispatch({type: 'FETCH_USER_TOLERANCE'});  
  }

  handleClick = (event, param) => {
    event.preventDefault();
    // this.setState ({ 
    //   activity: param.id,
    // })
    this.props.dispatch({
      type:'ADD_USER_ACTIVITY',
      payload: [param, this.props.reduxState.user.id]
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
      payload: [param, this.props.reduxState.user.id]
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
                    <ActivityItem activity={activity} handleClick={this.handleClick}/>
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