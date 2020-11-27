import React, { Component } from 'react';
import { connect } from 'react-redux';


class ActivityItem extends Component {



  render(){
    return(
      <>
      {/* If the activity is NOT active in the DB */}
        {this.props.activity.active === false &&
          <>
          <td className="inactive">{this.props.activity.description}</td> 
          <td><button id={this.props.activity.id} onClick={(event) => this.props.addUserActivity(event, this.props.activity.id)}>Add Activity</button></td></>
        }
        {/* If the activity IS active in the DB */}
        {this.props.activity.active === true &&
          <>
          <td className="active" >{this.props.activity.description}</td> 
          <td className="active"><button id={this.props.activity.id} onClick={(event)=> this.props.deleteUserActivity(event, this.props.activity.id)}>Remove Activity</button></td></>
        }
        
      </>
    )
  }
}


const mapStoreToProps = reduxState => ({
  reduxState
})

export default connect(mapStoreToProps)(ActivityItem);