import React, { Component } from 'react';
import { connect } from 'react-redux';
import {HashRouter as Router, Route, Link} from 'react-router-dom';
import {withRouter} from 'react-router';


class Header extends Component {
  componentDidMount() {
    this.props.dispatch({ type: 'FETCH_USER' });
    // this.props.dispatch({type: 'FETCH_MY_BMS'});
  }


  render(){
    return(
      <>
        <Router>
          <Link to="/home">
            <h1>BubbleHub</h1>
          </Link>
        </Router>
        <div id="numRender">
          <h3>Your Tolerance is: {this.props.reduxState.userToleranceReducer}</h3>
          <h3>Your Hub Number is: {this.props.reduxState.hubNumberReducer}</h3>
        </div>
        
      </>
    )
  }
}


const mapStoreToProps = reduxState => ({
  reduxState
})

export default withRouter(connect(mapStoreToProps)(Header));