import React, { Component } from 'react';
import { connect } from 'react-redux';
import {HashRouter as Router, Link} from 'react-router-dom';
import {withRouter} from 'react-router';


class Header extends Component {
  componentDidMount() {
    this.props.dispatch({ type: 'FETCH_USER' });
    // this.props.dispatch({type: 'FETCH_MY_BMS'});
  }


  render(){
    return(
      <div className="container">
        <Router>
          <Link to="/home">
            <div className="row">
              <h1 className="col-sm-6">BubbleHub</h1>
              <h2 className="col-sm-6" id="welcome">Hello {this.props.reduxState.user.name}</h2>
            </div>
          </Link>
        </Router>
        <div id="numRender">
          <div className="row">
            <h2 className="col-sm-4">Your Tolerance is: {this.props.reduxState.userToleranceReducer}</h2>
            <h2 className="col-sm-8">Your Hub Number is: {this.props.reduxState.hubNumberReducer}</h2>
          </div>
        </div>
        
      </div>
    )
  }
}


const mapStoreToProps = reduxState => ({
  reduxState
})

export default withRouter(connect(mapStoreToProps)(Header));