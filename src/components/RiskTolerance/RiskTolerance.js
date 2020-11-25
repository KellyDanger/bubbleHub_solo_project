import React, { Component } from 'react';
import { connect } from 'react-redux';
// import mapStoreToProps from '../../redux/mapStoreToProps';

class RiskTolerance extends Component {
  state = {
    toleranceNum: 0,
  }

//sets the local state to the tolerance number associated with the user's choice
  handleCheck = (event, param) => {
    console.log(param);
    this.setState({
      toleranceNum: param
    })
  }
  //sends toleranceNum and userId to tolerance saga
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
        <div className="toleranceForm">
          <input type="radio" id="1" name="tolerance" value="1" onChange={(event) => this.handleCheck(event, '1')} />
          <label htmlFor="1">I never leave my house</label><br></br>
          <input type="radio" id="2" name="tolerance" value="2" onChange={(event) => this.handleCheck(event, '2')}/>
          <label htmlFor="2">I only leave for groceries</label><br></br>
          <input type="radio" id="3" name="tolerance" value="3" onChange={(event) => this.handleCheck(event, '3')}/>
          <label htmlFor="3">A person can't stay TOTALLY isolated </label><br></br>
          <input type="radio" id="4" name="tolerance" value="4" onChange={(event) => this.handleCheck(event, '4')}/>
          <label htmlFor="4">A trip to the gym is worth the risk</label><br></br>
          <input type="radio" id="5" name="tolerance" value="5" onChange={(event) => this.handleCheck(event, '5')}/>
          <label htmlFor="5">What pandemic?</label>
          <br></br>
          <button onClick={this.handleSubmit}>Get My Tolerance Number</button>
        </div>
      </>
    )
  }
}
const mapStoreToProps = reduxState => ({
  reduxState
})

export default connect(mapStoreToProps)(RiskTolerance);