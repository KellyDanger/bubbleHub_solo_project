import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';

import './LandingPage.css';

// CUSTOM COMPONENTS
import RegisterForm from '../RegisterForm/RegisterForm';

class LandingPage extends Component {
  state = {
    heading: 'Class Component',
  };

  onLogin = (event) => {
    this.props.history.push('/login');
  };

  render() {
    return (
      <div className="container">
        <h2>{this.state.heading}</h2>

        <div className="grid">
          <div className="grid-col grid-col_8">
            <p>The BubbleHub is a place to simplify your quarantine conversations. Register to start a profile,and fill out our simple surveys. Tell us how concerned you are about Covid-19 in the risk tolerance survey, and see what your Tolerance Number is. Then give us a picture of how you move through your life in the Activities Survey to see your own HubNumber, a numerical representation of how risky your day to day activities are. </p>
            <p>Next start adding your bubblemates. Search for BubbleMates by email and see if they are a match! If they are, then bubble up and enjoy the pandemic!</p> 
          </div>
          <div className="grid-col grid-col_4">
            <RegisterForm />

            <center>
              <h4>Already a Member?</h4>
              <button className="btn btn_sizeSm" onClick={this.onLogin}>
                Login
              </button>
            </center>
          </div>
        </div>
      </div>
    );
  }
}

export default connect(mapStoreToProps)(LandingPage);
