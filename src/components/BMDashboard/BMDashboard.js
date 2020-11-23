import React, { Component } from 'react';
import { connect } from 'react-redux';
import BMItem from '../BMItem/BMItem'

class BMDashboard extends Component {
  state={
    searchEmail: null
  }
  componentDidMount = () => {
    this.fetchMyBubbleMates();
  }
//retrieves bubblemates for logged in user
  fetchMyBubbleMates = () => {
    console.log('Fetching');
    this.props.dispatch({type: 'FETCH_MY_BMS'})
  }

//sets state to user-input
  handleChange = (event) => {
    this.setState({
      searchEmail: event.target.value
    })
  }

  //sends dispatch to BM SAGA to find a user by email
  searchUsers = () => {
    this.props.dispatch({
      type: 'FETCH_BM',
      payload: this.state
    })
  }

  // on click of "add" button, sends id number of searched BM to bm router
  addUser = (event, param) => {
    this.props.dispatch({
      type: 'ADD_BM',
      payload: {bmId: param}
    })
  }
  
  //delete route for bms
  deleteBm = (event, param) => {
    this.props.dispatch({
      type: 'DELETE_BM',
      payload: {id:param}
    })
  }

  render() {
    return(
      <div>
        <ul>
          {this.props.reduxState.myBmReducer[0] && 
          this.props.reduxState.myBmReducer.map((bm) =>{
            return <BMItem key={bm.id} bm={bm} deleteBm={this.deleteBm}/>
          })}
        </ul>
        <div>{this.props.reduxState.bmReducer.id && 
          <div>
            <p>{this.props.reduxState.bmReducer.username}: {this.props.reduxState.bmReducer.hubNumber}</p>
            {this.props.reduxState.bmReducer.hubNumber <= this.props.reduxState.user.tolerance &&
              <button onClick={(event) => this.addUser(event, this.props.reduxState.bmReducer.id)}>Add {this.props.reduxState.bmReducer.username} to Your Bubble</button>
            } 
            {this.props.reduxState.bmReducer.hubNumber > this.props.reduxState.user.tolerance &&
              <p>Uh Oh! {this.props.reduxState.bmReducer.username}'s hubNumber is higher than your tolerance!</p>
            } 
          </div>}
        </div>
        <label htmlFor='searchBm'>Enter a Friend's Email Address to Find Them on BubbleHub</label>
        <input id="searchBm" type="text" placehoder="email" onChange={(event) => this.handleChange(event)}/>
        <button onClick={this.searchUsers}>Search</button>
      </div>
    )
  }
}

const mapStoreToProps = reduxState => ({
  reduxState
})

export default connect(mapStoreToProps)(BMDashboard);
