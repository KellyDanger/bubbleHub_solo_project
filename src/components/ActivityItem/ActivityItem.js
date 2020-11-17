import React, { Component } from 'react';
import { connect } from 'react-redux';


class ActivityItem extends Component {

  render(){
    return(
      <>
      {this.props.reduxState.activityReducer.map((activity) => {
        return (
        <tr>
          <td>{activity.description}</td>
          <td>{activity.riskLevel}</td>
          <td><button>Yes</button></td>
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