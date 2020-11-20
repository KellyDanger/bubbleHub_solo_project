import React, { Component } from 'react';
import {
  HashRouter as Router,
  Route,
  Redirect,
  Switch,
} from 'react-router-dom';

import { connect } from 'react-redux';

import Nav from '../Nav/Nav';
import Footer from '../Footer/Footer';

import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';

import AboutPage from '../AboutPage/AboutPage';
import UserPage from '../UserPage/UserPage';
import InfoPage from '../InfoPage/InfoPage';
import LandingPage from '../LandingPage/LandingPage';
import LoginPage from '../LoginPage/LoginPage';
import RegisterPage from '../RegisterPage/RegisterPage';
import CreateProfile from '../CreateProfile/CreateProfile';
import RiskTolerance from '../RiskTolerance/RiskTolerance';
import ActivitySelect from '../ActivitySelect/ActivitySelect';
import BMDashboard from '../BMDashboard/BMDashboard';

import './App.css';

class App extends Component {
  componentDidMount() {
    this.props.dispatch({ type: 'FETCH_USER' });

  }
  componentDidUpdate() {
    this.props.dispatch({ type: 'FETCH_USER_TOLERANCE', payload: this.props.reduxState.user.id});
    this.props.dispatch({ type: 'FETCH_HUBNUMBER', payload: this.props.reduxState.user.id});
    console.log('This HUBNUMBER is', this.props.reduxState.hubNumberReducer);
    
  }

  render() {
    return (
      
      <Router>
        <header>
          <h1>Your Tolerance is: {this.props.reduxState.userToleranceReducer}</h1>
          <h1>Your Hub Number is: {this.props.reduxState.hubNumberReducer}</h1>
        </header>
        
        <div>
          <Nav />
          <Switch>
            {/* Visiting localhost:3000 will redirect to localhost:3000/home */}
            <Redirect exact from="/" to="/home" />

            {/* Visiting localhost:3000/about will show the about page. */}
            <Route
              // shows AboutPage at all times (logged in or not)
              exact
              path="/about"
              component={AboutPage}
            />

            {/* For protected routes, the view could show one of several things on the same route.
            Visiting localhost:3000/user will show the UserPage if the user is logged in.
            If the user is not logged in, the ProtectedRoute will show the LoginPage (component).
            Even though it seems like they are different pages, the user is always on localhost:3000/user */}
            <ProtectedRoute
              // logged in shows UserPage else shows LoginPage
              exact
              path="/user"
              component={UserPage}
            />

            <ProtectedRoute
              // logged in shows InfoPage else shows LoginPage
              exact
              path="/info"
              component={InfoPage}
            />

            {/* When a value is supplied for the authRedirect prop the user will
            be redirected to the path supplied when logged in, otherwise they will
            be taken to the component and path supplied. */}
            <ProtectedRoute
              // with authRedirect:
              // - if logged in, redirects to "/user"
              // - else shows LoginPage at /login
              exact
              path="/login"
              component={LoginPage}
              authRedirect="/user"
            />
            <ProtectedRoute
              // with authRedirect:
              // - if logged in, redirects to "/user"
              // - else shows RegisterPage at "/registration"
              exact
              path="/registration"
              component={RegisterPage}
              authRedirect="/user"
            />
            <ProtectedRoute
              // with authRedirect:
              // - if logged in, redirects to "/user"
              // - else shows LandingPage at "/home"
              exact
              path="/home"
              component={LandingPage}
              authRedirect="/user"
            />
            <ProtectedRoute
              // logged in shows UserPage else shows LoginPage
              exact
              path="/createprofile"
              component={CreateProfile}              
            />
            <ProtectedRoute
              // logged in shows UserPage else shows LoginPage
              exact
              path="/risktolerance"
              component={RiskTolerance}
            />
            <ProtectedRoute
              // logged in shows UserPage else shows LoginPage
              exact
              path="/activityselect"
              component={ActivitySelect}              
            />
            <ProtectedRoute
              // logged in shows UserPage else shows LoginPage
              exact
              path="/bubblemates"
              component={BMDashboard}              
            />

            {/* If none of the other routes matched, we will show a 404. */}
            <Route render={() => <h1>404</h1>} />
          </Switch>
          <Footer />
        </div>
      </Router>
    );
  }
}
                           
const mapStoreToProps = reduxState => ({
  reduxState
})

export default connect(mapStoreToProps)(App);
