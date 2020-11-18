import React, { Component } from 'react';
import { connect } from 'react-redux';


class ActivityItem extends Component {
  //TO DO...send value of checked box to hubNumber Saga and add to saga State
  state = {
    activitiesArray:[{
      activity_id: this.props.activity.id,
      user_id: this.props.reduxState.user.id
    }],
  }

  handleClick = (event, param) => {
    console.log('clicked', param.riskLevel)
    event.preventDefault();
    this.setState ({
      ...this.state.activitiesArray,
      activitiesArray: [{
        id: param.id,
      }]
    })
    console.log('STATE', this.state.activitiesArray);   
    this.props.dispatch({
        type: 'ADD_USER_ACTIVITY',
        payload: this.state
    })
  }
//TODO conditional rendering of button text/functionality


  render(){
    return(
      <>
        <td>{this.props.activity.description}</td>
        <td><button id={this.props.activity.id} onClick={(event) => this.handleClick(event, this.props.activity)}>Add to My Activities</button></td>
      </>
    )
  }
}

const mapStoreToProps = reduxState => ({
  reduxState
})

export default connect(mapStoreToProps)(ActivityItem);