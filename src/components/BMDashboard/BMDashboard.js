import React, { Component } from 'react';
import { connect } from 'react-redux';
import BMItem from '../BMItem/BMItem';
import swal from 'sweetalert';
import './BMDashboard.css';

class BMDashboard extends Component {
  state={
    searchEmail: null,
  }

  componentDidMount = () => {
    this.fetchMyBubbleMates();
    this.props.dispatch({type: 'FETCH_USER_TOLERANCE'})
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
    document.getElementById('bmSearch').reset();
    this.setState({
      searchEmail: null
    })
  }

  // on click of "add" button, sends id number of searched BM to bm saga
  addUser = (event, param) => {
    this.props.dispatch({
      type: 'ADD_BM',
      payload: {bmId: param}
    })
    this.props.dispatch({type: 'RESET_BM'})
  }

  //delete route for bms sends id number of clicked bm to the bm saga
  deleteBm = (event, param) => {
    this.props.dispatch({
      type: 'DELETE_BM',
      payload: {id:param}
    })
  }
  cancel = () => {
    this.props.dispatch({type: 'RESET_BM'})
  }

  render() {
    return(
      
      <div className="searchForm"> 
        <form id="bmSearch">
            <label htmlFor='searchBm'>Enter a Friend's Email Address to Find Them on BubbleHub</label>
            <input id="searchBm" type="text" placehoder="email" onChange={(event) => this.handleChange(event)}/>
            <button id="searchBtn" onClick={this.searchUsers} >Search</button>
          </form>
        <div>{this.props.reduxState.bmReducer.id && 
          <div className="bmCont">
            {/* if the searched bubblemate's hubNumber is lower than the user's tolerance number, user can add them to their bubble */}
            {this.props.reduxState.bmReducer.hubNumber <= this.props.reduxState.user.tolerance &&
              <>
                <div className="bubbleMate">
                  <p>{this.props.reduxState.bmReducer.username}</p>
                  <p>Hubnumber: {this.props.reduxState.bmReducer.hubNumber}</p>
                  <p>Match: <i class="far fa-check-circle"></i></p>
                  <button className="addBtn" onClick={(event) => this.addUser(event, this.props.reduxState.bmReducer.id)}>Add {this.props.reduxState.bmReducer.username} to Your Bubble</button>
                  <button className="cancelBtn" onClick={this.cancel}>Cancel</button>
                </div>
                
              </>
            } 
            {/* if the searched user's hubnumber is too high for the logged in user's tolerance, an alert will display */}
            {this.props.reduxState.bmReducer.hubNumber > this.props.reduxState.user.tolerance &&
              <>
                <div className="bubbleMate">
                  <p>{this.props.reduxState.bmReducer.username}</p>
                  <p>Hubnumber:  {this.props.reduxState.bmReducer.hubNumber}</p>
                  <p> Not A Match: <i id="flag" class="far fa-flag"></i></p>
                  <button className="addBtn" onClick={(event) => this.addUser(event, this.props.reduxState.bmReducer.id)}>Add {this.props.reduxState.bmReducer.username} to Your Bubble</button>
                  <button className="cancelBtn" onClick={this.cancel}>Cancel</button>
                </div>
                
              </>
            } 
          </div>}
          <div>
            <h1 className="bmTitle">Your BubbleMates Are</h1>
            {this.props.reduxState.myBmReducer[0] && 
            this.props.reduxState.myBmReducer.map((bm) =>{
            return <div className="hubMatesCont"> 
            {bm.hubNumber > this.props.reduxState.user.tolerance &&
              <BMItem key={bm.id} bm={bm} deleteBm={this.deleteBm} className="bubbleMateMisMatch"/>
            }
            {bm.hubNumber <= this.props.reduxState.user.tolerance &&
              <BMItem key={bm.id} bm={bm} deleteBm={this.deleteBm} className="bubbleMateMatch"/>
            }
            </div> 
          })}
        </div>
        </div>
      </div>
    )
  }
}

const mapStoreToProps = reduxState => ({
  reduxState
})

export default connect(mapStoreToProps)(BMDashboard);
