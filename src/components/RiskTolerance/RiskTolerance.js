import React, { Component } from 'react';
import { connect } from 'react-redux';
import swal from 'sweetalert';
import './RiskTolerance.css';


class RiskTolerance extends Component {
  state = {
    toleranceNum: 0,
  }

//sets the local state to the tolerance number associated with the user's choice
  handleCheck = (event, param) => {
    console.log(param);
    this.setState({
      toleranceNum: param
    })
  }
  //sends toleranceNum and userId to tolerance saga
  handleSubmit = () => {
    this.props.dispatch({
      type: 'ADD_USER_TOLERANCE',
      payload: this.state
    })
    swal({
      title: 'Success!',
      text: 'You Updated Your Tolerance Level!',
      icon: 'success',
      button: 'Next'
    }).then(()=> {
      this.props.history.push('/activityselect')
    })
  }


  render() {
    return(
      <>
        <button className="activityBtn" onClick={this.handleSubmit}>Get My Tolerance Number</button>
        <div className="toleranceForm">
          <h2>Select the Option that Best Fits Your Caution Level</h2>
          <input type="radio" id="1" name="tolerance" value="1" onChange={(event) => this.handleCheck(event, '1')} />
          <label htmlFor="1">Level 1</label>
          <ul>
            <li>
              I don't go beyond my own yard, and I wear a mask when I do
            </li>
            <li>
              Contactless delivery of essential items ONLY
            </li>
            <li>
              I sanitize everything that comes into my home 
            </li>
            <li>
              No contact with anyone outside my household
            </li>
            <li>
              No takout
            </li>
            <li>
              Distance learning for my kids
            </li>
          </ul>
          <input type="radio" id="2" name="tolerance" value="2" onChange={(event) => this.handleCheck(event, '2')}/>
          <label htmlFor="2">Level 2</label>
          <ul>
            <li>
              I leave my house on occasion, and always mask
            </li>
            <li>
              Curbside pickup please
            </li>
            <li>
              I've ordered one or two non-essential items
            </li>
            <li>
              I need takeout sometimes but I replate it at home, and wash my hands for 2 minutes before eating
            </li>
            <li>
              I have socially distanced, masked, outdoor visits with responsible friends
            </li>
          </ul>
          <input type="radio" id="3" name="tolerance" value="3" onChange={(event) => this.handleCheck(event, '3')}/>
          <label htmlFor="3">Level 3</label>
            <ul>
              <li>
                I wear a mask every time I go into a place of business or if social distancing isn't guaranteed
              </li>
              <li>
                I carry a mask with me at all times just in case
              </li>
              <li>
                I get my own groceries and exercise care at the store
              </li>
              <li>
                Takeout twice a week please
              </li>
              <li>
                I hire a well-screened babysitter on occasion and set up socially distanced playdates for my older kids
              </li>
            </ul>
          <input type="radio" id="4" name="tolerance" value="4" onChange={(event) => this.handleCheck(event, '4')}/>
          <label htmlFor="4">Level 4</label>
          <ul>
            <li>
              I only wear a mask when I'm required to
            </li>
            <li>
              I opt to shop in-store rather than online
            </li>
            <li>
              I am not an essential worker, but I go the the office as needed
            </li>
            <li>
              I dine in at my favorite restaurant
            </li>
            <li>
              My kids will go to school in person as long as possible
            </li>
          </ul>
          <input type="radio" id="5" name="tolerance" value="5" onChange={(event) => this.handleCheck(event, '5')}/>
          <label htmlFor="5">Level 5</label>
          <ul>
            <li>The pandemic is a hoax</li>
            <li>Masks are bad for your health</li>
            <li>**sneeze**cough**</li>
          </ul>   
        </div>
      </>
    )
  }
}
const mapStoreToProps = reduxState => ({
  reduxState
})

export default connect(mapStoreToProps)(RiskTolerance);