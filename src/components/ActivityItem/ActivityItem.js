import React, { Component } from 'react';
import { connect } from 'react-redux';


class ActivityItem extends Component {
  state = {
    hubNumber: 0,
  }

  addToUser = (event) => {
    console.log('clicked', event.target.value);
    console.log('clicked', this.state);
    this.setState ({
      hubNumber: this.state.hubNumber += Number(event.target.value)
    })
  }


  render(){
    return(
      <>
      {this.props.reduxState.activityReducer.map((activity) => {
        return (
        <tr id={activity.id} key={activity.id}>
          <td>{activity.description}</td>
          <td><button value={activity.riskLevel} onClick={this.addToUser}>Add to My Activities</button></td>
        </tr>
        )
      })}
      </>
    )
  }
}


const mapStoreToProps = reduxState => ({
  reduxState
})

export default connect(mapStoreToProps)(ActivityItem);