import React, { Component } from 'react';
import { connect } from 'react-redux';
import BMItem from '../BMItem/BMItem'

class BMDashboard extends Component {
  state={
    searchEmail: null
  }
  componentDidUpdate = () => {
    this.fetchMyBubbleMates(this.props.reduxState.user.id);
  }

  fetchMyBubbleMates = (user) => {
    console.log('Fetching', user);
  }

//sets state to user-input
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
  // on click of "add" button, sends id number of searched BM to bm router
  addUser = (event, param) => {
    console.log('ADDING', param);
    this.props.dispatch({
      type: 'ADD_BM',
      payload: {bmId: param}
    })
  }
  

  render() {
    return(
      <div>
        <BMItem/>
        <div>{this.props.reduxState.bmReducer.id && <div>
          <p>{this.props.reduxState.bmReducer.username}</p>
          <button onClick={(event) => this.addUser(event, this.props.reduxState.bmReducer.id)}>Add {this.props.reduxState.bmReducer.username} to Your Bubble</button>
        </div>}
      </div>
        <input type="text" placehoder="description" onChange={(event) => this.handleChange(event)}/>
        <button onClick={this.searchUsers}>Search</button>
      </div>
    )
  }
}

const mapStoreToProps = reduxState => ({
  reduxState
})

export default connect(mapStoreToProps)(BMDashboard);
{/* <div>
<p>{this.props.reduxState.bmReducer.username}</p>
<button>Add {this.props.reduxState.bmReducer.username} to Your Bubble</button>
</div>} */}