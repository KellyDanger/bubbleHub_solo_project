import React, { Component } from 'react';
import { connect } from 'react-redux';


class ActivityItem extends Component {
  //TO DO...send value of checked box to hubNumber Saga and add to saga State
//TODO conditional rendering of button text/functionality


  render(){
    return(
      <>
        <td>{this.props.activity.description}</td>
        <td><button id={this.props.activity.id} onClick={(event) => this.props.handleClick(event, this.props.activity)}>Add to My Activities</button></td>
      </>
    )
  }
}

const mapStoreToProps = reduxState => ({
  reduxState
})

export default connect(mapStoreToProps)(ActivityItem);