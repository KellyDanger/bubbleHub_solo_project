import React, { Component } from 'react';
import { connect } from 'react-redux';
// import mapStoreToProps from '../../redux/mapStoreToProps';

class RiskTolerance extends Component {
  state = {
    toleranceNum: 0,
    userId: this.props.reduxState.user.id
  }
// componentDidMount = () => {
//   this.props.dispatch({type: 'FETCH_USER_TOLERANCE', payload: this.props.reduxState.user.id});
// }

  handleCheck = (event, param) => {
    console.log(param);
    this.setState({
      toleranceNum: param
    })
  }
  //sends toleranceNum and userId to root saga/then tolerance saga
  handleSubmit = () => {
    this.props.dispatch({
      type: 'ADD_USER_TOLERANCE',
      payload: this.state
    })
    this.props.history.push('/activityselect')
  }


  render() {
    return(
      <>
        <p>{this.state.toleranceNum}</p>
        <div className="toleranceForm">
          <input type="radio" id="1" name="tolerance" value="1" onChange={(event) => this.handleCheck(event, '1')} />
          <label htmlFor="1">Level 1 stuff</label><br></br>
          <input type="radio" id="2" name="tolerance" value="2" onChange={(event) => this.handleCheck(event, '2')}/>
          <label htmlFor="2">Level 2 stuff</label><br></br>
          <input type="radio" id="3" name="tolerance" value="3" onChange={(event) => this.handleCheck(event, '3')}/>
          <label htmlFor="3">Level 3 stuff</label><br></br>
          <input type="radio" id="4" name="tolerance" value="4" onChange={(event) => this.handleCheck(event, '4')}/>
          <label htmlFor="4">Level 4 stuff</label><br></br>
          <input type="radio" id="5" name="tolerance" value="5" onChange={(event) => this.handleCheck(event, '5')}/>
          <label htmlFor="5">Level 5 stuff</label>
          <button onClick={this.handleSubmit}>Submit</button>
        </div>
      </>
    )
  }
}
const mapStoreToProps = reduxState => ({
  reduxState
})

export default connect(mapStoreToProps)(RiskTolerance);