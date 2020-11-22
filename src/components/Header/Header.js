import React, { Component } from 'react';
import { connect } from 'react-redux';

class Header extends Component {
  componentDidMount() {
    this.props.dispatch({ type: 'FETCH_USER' });
    // this.props.dispatch({type: 'FETCH_MY_BMS'});
  }
  // componentDidUpdate() {
  //   // this.props.dispatch({ type: 'FETCH_USER_TOLERANCE', payload: this.props.reduxState.user.id});
  //   this.props.dispatch({ type: 'FETCH_HUBNUMBER'});
  // }

  render(){
    return(
      <>
        <h1>Your Tolerance is: {this.props.reduxState.userToleranceReducer}</h1>
        <h1>Your Hub Number is: {this.props.reduxState.hubNumberReducer}</h1>
      </>
    )
  }
}


const mapStoreToProps = reduxState => ({
  reduxState
})

export default connect(mapStoreToProps)(Header);