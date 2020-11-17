import React, { Component } from 'react';
import { connect } from 'react-redux';
// import mapStoreToProps from '../../redux/mapStoreToProps';

class ActivitySelect extends Component {
  state = {
    isChecked: false
  }

  componentDidMount = () => {
    this.props.dispatch({
      type: 'FETCH_ACTIVITIES'
    })
  }
  
  handleCheck = (event) => {
    this.setState({
      isChecked: !this.state.isChecked,
    })
  }

  render() {
    return(
      <div>
        <p>This is where you Select your Activities</p>
        {/* {JSON.stringify(this.props.reduxState.activityReducer)} */}
          {this.props.reduxState.activityReducer.map((activity) => {
            return (
            <div key={activity.id}>
              <input type="checkbox" onChange={this.handleCheck} value={activity.description} id={activity.id}/>
              <label htmlFor={activity.id}>{activity.description}</label>
            </div>
            )
          })}
      </div>
    )
  }
}
const mapStoreToProps = reduxState => ({
  reduxState
})

export default connect(mapStoreToProps)(ActivitySelect);