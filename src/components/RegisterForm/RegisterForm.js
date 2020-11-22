import React, { Component } from 'react';
import { connect } from 'react-redux';
import {withRouter} from 'react-router';
// import mapStoreToProps from '../../redux/mapStoreToProps';

class RegisterForm extends Component {
  state = {
    username: '',
    password: '',
  };

  registerUser = (event) => {
    event.preventDefault();
    this.props.dispatch({
      type: 'REGISTER',
      payload: {
        username: this.state.username,
        password: this.state.password,
      },
    });
    this.props.history.push('/createprofile');
  }; // end registerUser

  handleInputChangeFor = (propertyName) => (event) => {
    this.setState({
      [propertyName]: event.target.value,
    });
  };

  render() {
    return (
      <form className="formPanel" onSubmit={this.registerUser}>
        <h2>Register User</h2>
        {this.props.reduxState.errors.registrationMessage && (
          <h3 className="alert" role="alert">
            {this.props.reduxState.errors.registrationMessage}
          </h3>
        )}
        <div>
          <label htmlFor="username">
            Username:
            <input
              type="text"
              name="username"
              value={this.state.username}
              required
              onChange={this.handleInputChangeFor('username')}
            />
          </label>
        </div>
        <div>
          <label htmlFor="password">
            Password:
            <input
              type="password"
              name="password"
              value={this.state.password}
              required
              onChange={this.handleInputChangeFor('password')}
            />
          </label>
        </div>
        <div>
          <input className="btn" type="submit" name="submit" value="Register" />
        </div>
      </form>
    );
  }
}

const mapStoreToProps = reduxState => ({
  reduxState
})

export default withRouter(connect(mapStoreToProps)(RegisterForm));
