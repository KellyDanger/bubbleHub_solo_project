import React, { Component } from 'react';
import { connect } from 'react-redux';
import {HashRouter as Router, Link} from 'react-router-dom';
import {withRouter} from 'react-router';


class Header extends Component {
  componentDidMount() {
    this.props.dispatch({ type: 'FETCH_USER' });
  }


  render(){
    return(
      <div className="container">
        <Router>
          <Link to="/home">
            <div>
              <h1>BubbleHub</h1>
            </div>
          </Link>
        </Router>
        {this.props.reduxState.user.id && 
        <div id="numRender">
          <div className="row">
            <h2 className="col-sm-3" >Hello {this.props.reduxState.user.name}</h2>
            <h2 className="col-sm-3">Your Tolerance is: {this.props.reduxState.userToleranceReducer}</h2>
            <h2 className="col-sm-3">Your HubNumber is: {this.props.reduxState.hubNumberReducer}</h2>
          </div>
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