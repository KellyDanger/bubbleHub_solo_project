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

  fetchMyBubbleMates = () => {
    console.log('Fetching');
    this.props.dispatch({type: 'FETCH_MY_BMS'})
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
    // this.fetchMyBubbleMates();
  }
  
  //starting of delete route for bms
  deleteBm = (event, param) => {
    console.log('deleting', param);
  }
  

  render() {
    return(
      <div>
        <ul>
          {this.props.reduxState.myBmReducer[0] && 
          this.props.reduxState.myBmReducer.map((bm) =>{
            return <BMItem bm={bm} deleteBm={this.deleteBm}/>
          })}
        </ul>
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