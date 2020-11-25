import React, { Component } from 'react';
import { connect } from 'react-redux';


class ActivityItem extends Component {
//TODO conditional rendering of button text/functionality


  render(){
    return(
      <>
        {/* lists each activity in the DB  */}
        <td>{this.props.activity.description}</td>
        <td>
          {/* Button for each activity (props.activity passed by ActivitySelect.js) on click, fires off handleClick from ActivitySelect with the click event, and the specific activity associated with that button as parameters */}
          <button id={this.props.activity.id} onClick={(event) => this.props.handleClick(event, this.props.activity)}>You Bet!</button>
        </td>
        <td>
          {/* Fires off deleteActivity function with this activity sent as a prop */}
          <button className='deleteActivity' onClick={(event) => this.props.deleteActivity(event, this.props.activity)}>Delete</button>
        </td>
      </>
    )
  }
}
const mapStoreToProps = reduxState => ({
  reduxState
})

export default connect(mapStoreToProps)(ActivityItem);