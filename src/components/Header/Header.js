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
      <>
        <Router>
          <Link to="/home">
            <div className="row"><h1 className="col-sm-12">BubbleHub</h1></div>
          </Link>
        </Router>
        <div id="numRender" className="container">
          <div className="row">
            <h2 className="col-sm-6">Your Tolerance is: {this.props.reduxState.userToleranceReducer}</h2>
            <h2 className="col-sm-6">Your Hub Number is: {this.props.reduxState.hubNumberReducer}</h2>
          </div>
        </div>
        
      </>
    )
  }
}


const mapStoreToProps = reduxState => ({
  reduxState
})

export default withRouter(connect(mapStoreToProps)(Header));