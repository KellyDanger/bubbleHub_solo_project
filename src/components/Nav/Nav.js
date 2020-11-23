import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import LogOutButton from '../LogOutButton/LogOutButton';
import './Nav.css';
import mapStoreToProps from '../../redux/mapStoreToProps';

const Nav = (props) => {
  let loginLinkData = {
    path: '/login',
    text: 'Login / Register',
  };

  if (props.store.user.id != null) {
    loginLinkData.path = '/user';
    loginLinkData.text = 'Home';
  }
  return (
    <div className="nav">
      <div className="nav-right">
        <Link className="nav-link" to="/about">
          About
        </Link>
        <Link className="nav-link" to={loginLinkData.path}>
          {/* Show this link if they are logged in or not,
          but call this link 'Home' if they are logged in,
          and call this link 'Login / Register' if they are not */}
          {loginLinkData.text}
        </Link>
        {/* Show the link to the info page and the logout button if the user is logged in */}
        {props.store.user.id && (
          <>
            <Link className="nav-link" to="/createprofile">Edit Profile</Link>
            <Link className="nav-link" to="/bubblemates">BubbleMates</Link>
            <Link className="nav-link" to="/risktolerance">Tolerance</Link>
            <Link className="nav-link" to="/activityselect">Activities</Link>
            <LogOutButton className="nav-link" />   
          </>
        )}

      </div>
    </div>
  );
};

export default connect(mapStoreToProps)(Nav);
