import React, { Component } from 'react';
import { connect } from 'react-redux';


class ActivityItem extends Component {
  //TO DO...send value of checked box to hubNumber Saga and add to saga State
  state = {
    clicked: false
  }

  handleClick = (event, param) => {
    console.log('clicked', param.riskLevel)
    event.preventDefault();
    // this.setState ({
    //   clicked: !this.state.clicked,
    //   // ...this.state.activity,
    //   activity: {
    //     id: param.id,
    //     description: param.description,
    //     riskLevel: param.riskLevel
    //   }
    // })
    // console.log('STATE', this.state.activity);
    this.props.dispatch({
        type: 'ADD_USER_ACTIVITY',
        payload: param
    })
  }


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