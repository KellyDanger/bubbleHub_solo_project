import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';

class BMDashboard extends Component {
  state={
    searchEmail: null
  }

  handleChange = (event) => {
    this.setState({
      searchEmail: event.target.value
    })
    console.log(event.target.value);
  }

  //sends dispatch to BM SAGA to find a user by email
  searchUsers = () => {
    console.log('Clicked', this.state);
    this.props.dispatch({
      type: 'FETCH_BM',
      payload: this.state
    })
  }

  render() {
    return(
      <div>
        <input type="text" placehoder="description" onChange={(event) => this.handleChange(event)}/>
        <button onClick={this.searchUsers}>Search</button>
      </div>
    )
  }
}

export default connect(mapStoreToProps)(BMDashboard);