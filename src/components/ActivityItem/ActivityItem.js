import React, { Component } from 'react';
import { connect } from 'react-redux';


class ActivityItem extends Component {
//TODO conditional rendering of button text/functionality


  render(){
    return(
      <>
        <td>{this.props.activity.description}</td>
        <td>
          <button id={this.props.activity.id} onClick={(event) => this.props.handleClick(event, this.props.activity)}>I do this</button>
        </td>
        <td>
          <button className='deleteActivity' onClick={(event) => this.props.deleteActivity(event, this.props.activity)}>not anymore</button>
        </td>
      </>
    )
  }
}

const mapStoreToProps = reduxState => ({
  reduxState
})

export default connect(mapStoreToProps)(ActivityItem);