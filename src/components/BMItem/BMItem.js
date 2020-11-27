import React, {Component} from 'react';
import {connect} from 'react-redux';
import '../BMDashboard/BMDashboard';

class BMItem extends Component {
  

  render(){
    return(
      <div className="bmCont">
        <div className={this.props.className}>
          <p>BM: {this.props.bm.name}</p> 
          <p>HubNumber: {this.props.bm.hubNumber}</p>
          <button onClick={(event)=>this.props.deleteBm(event, this.props.bm.id )}>Delete</button></div>
      </div>
    )
  }
}

const mapStoreToProps = reduxState => ({
  reduxState
})

export default connect(mapStoreToProps)(BMItem);