import React, { Component } from 'react';
import { connect } from 'react-redux';


class ActivityItem extends Component {
  //TO DO...send value of checked box to hubNumber Saga and add to saga State
  state = {
    activity: {
      description: '',
      riskLevel: 0,
    },
    clicked: false
  }

  handleClick = (event, param) => {
    console.log('clicked', param)
    console.log(this.state.clicked)
    this.setState ({
      clicked: !this.state.clicked,
      description: param.description,
      riskLevel: param.riskLevel
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