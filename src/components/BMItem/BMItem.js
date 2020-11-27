import React, {Component} from 'react';
import {connect} from 'react-redux';
import '../BMDashboard/BMDashboard';

class BMItem extends Component {
  

  render(){
    return(
      <div>
        <div className={this.props.className}>BM: {this.props.bm.name} ---HubNumber: {this.props.bm.hubNumber}<button onClick={(event)=>this.props.deleteBm(event, this.props.bm.id )}>Delete</button></div>
      </div>
    )
  }
}

const mapStoreToProps = reduxState => ({
  reduxState
})

export default connect(mapStoreToProps)(BMItem);