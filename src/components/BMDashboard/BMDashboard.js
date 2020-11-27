import React, { Component } from 'react';
import { connect } from 'react-redux';
import BMItem from '../BMItem/BMItem';
import swal from 'sweetalert';
import './BMDashboard.css';

class BMDashboard extends Component {
  state={
    searchEmail: null,
    currentSearchHN: 0,
  }
  componentDidMount = () => {
    this.fetchMyBubbleMates();
  }
//retrieves bubblemates for logged in user
  fetchMyBubbleMates = () => {
    this.props.dispatch({type: 'FETCH_MY_BMS'})
  }

//sets state to user-input for searched email
  handleChange = (event) => {
    this.setState({
      searchEmail: event.target.value
    })
  }

  //sends dispatch to BM SAGA to find a user by email
  //sets the local state to the searched-user's hubNumber from bmReducer then SHOULD reset the bm reducer to an empty object and resets the form
  searchUsers = () => {
    this.props.dispatch({
      type: 'FETCH_BM',
      payload: this.state
    })
    this.setState({
      currentSearchHN: this.props.reduxState.bmReducer.hubNumber
    })
    document.getElementById('bmSearch').reset();
    this.props.dispatch({type: 'SET_BM', payload: {}})
    
  }

  // on click of "add" button, sends id number of searched BM to bm saga
  addUser = (event, param) => {
    this.props.dispatch({
      type: 'ADD_BM',
      payload: {bmId: param}
    })
    this.setState({
      currentSearchHN: 0
    })
    console.log(this.props.reduxState.bmReducer); 
  }

  //delete route for bms sends id number of clicked bm to the bm saga
  deleteBm = (event, param) => {
    this.props.dispatch({
      type: 'DELETE_BM',
      payload: {id:param}
    })
  }

  //mismatch alert
  mmAlert = (alert) => {
    swal(alert);
    this.props.dispatch({
      type: 'SET_BM',
      payload: {}
    })
    this.setState({
      currentSearchHN: 0
    })
  }

  render() {
    return(
      <div className="searchForm"> 
        <div>
          {this.props.reduxState.myBmReducer[0] && 
          this.props.reduxState.myBmReducer.map((bm) =>{
            return <BMItem key={bm.id} bm={bm} deleteBm={this.deleteBm}/>
          })}
        </div>
        <div>{this.props.reduxState.bmReducer.id && 
          <div>
            {/* if the searched bubblemate's hubNumber is lower than the user's tolerance number, user can add them to their bubble */}
            {this.props.state.currentSearchHN <= this.props.reduxState.user.tolerance &&
              <>
                <p className="bubbleMate">{this.props.reduxState.bmReducer.username}: {this.props.reduxState.bmReducer.hubNumber}</p>
                <button onClick={(event) => this.addUser(event, this.props.reduxState.bmReducer.id)}>Add {this.props.reduxState.bmReducer.username} to Your Bubble</button>
              </>
            } 
            {/* if the searched user's hubnumber is too high for the logged in user's tolerance, an alert will display */}
            {this.props.state.currentSearchHN > this.props.reduxState.user.tolerance &&
              <>
                {this.mmAlert(`Uh oh! ${this.props.reduxState.bmReducer.username} is taking too many risks for you!`)}
              </>
            } 
          </div>}
        </div>
        <form id="bmSearch">
          <label htmlFor='searchBm'>Enter a Friend's Email Address to Find Them on BubbleHub</label>
          <input id="searchBm" type="text" placehoder="email" onChange={(event) => this.handleChange(event)}/>
          <button id="searchBtn" onClick={this.searchUsers} >Search</button>
        </form>
        
      </div>
    )
  }
}

const mapStoreToProps = reduxState => ({
  reduxState
})

export default connect(mapStoreToProps)(BMDashboard);
