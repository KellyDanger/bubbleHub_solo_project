import React, { Component } from 'react';
import { connect } from 'react-redux';
// import mapStoreToProps from '../../redux/mapStoreToProps';

class CreateProfile extends Component {
  state = {
    name: '',
    email: '',
    city: '',
    state: '',
    userId: this.props.reduxState.user.id,
    
  }
//TODO cleanup data entry state dropdown etc
//adds user data to local state
  handleChangeFor = (event, input) => {
    this.setState({
      ...this.state,
      [input]: event.target.value
    });
  }
//dispatches local state data to the profile saga
  handleSubmit = () => {
    this.props.dispatch({
      type: 'ADD_USER_DATA',
      payload: this.state
    })
    this.props.history.push('/risktolerance')
  }


  render() {
    return(
      <div>
        <label htmlFor="nameInput">First Name</label>
        <input className="profileInput" type="text" id="nameInput" placeholder="First Name" onChange={(event)=> this.handleChangeFor(event, 'name')}/>
        <label htmlFor="emailInput">Email Address</label>
        <input className="profileInput" type="email" id="emailInput" placeholder="Email Address" onChange={(event)=> this.handleChangeFor(event, 'email')}/>
        <label htmlFor="cityInput">City</label>
        <input className="profileInput" type="text" id="cityInput" placeholder="City" onChange={(event)=> this.handleChangeFor(event, 'city')}/>
        <label htmlFor="stateInput">State</label>
        <input className="profileInput" type="text" id="stateInput" placeholder="State" onChange={(event)=> this.handleChangeFor(event, 'state')}/>
        <button onClick={this.handleSubmit}>Next ></button>
      </div>
    )
  }
}

const mapStoreToProps = reduxState => ({
  reduxState
})

export default connect(mapStoreToProps)(CreateProfile);