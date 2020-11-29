import React, { Component } from 'react';
import { connect } from 'react-redux';
import {HashRouter as Router, Link} from 'react-router-dom';
import {withRouter} from 'react-router';
import "./Header.css";

import Nav from '../Nav/Nav';


class Header extends Component {
  componentDidMount() {
    this.props.dispatch({ type: 'FETCH_USER' });
  }


  render(){
    return(
      <div className="headContainer">
        <Router>
          <Link to="/home">
            <div id="title">
              <h1>BubbleHub</h1>
            </div>
          </Link>
        </Router>
        {this.props.reduxState.user.id && 
        <div id="numRender">
            <h2 className="numDisp">
              HubNumber: {this.props.reduxState.hubNumberReducer}</h2>
            <h2 className="numDisp">Tolerance: {this.props.reduxState.userToleranceReducer}</h2>
        </div>

        }
      </div>
    )
  }
}


const mapStoreToProps = reduxState => ({
  reduxState
})

export default withRouter(connect(mapStoreToProps)(Header));