import React, {Component} from 'react';
import {connect} from 'react-redux';

class BMItem extends Component {

  render(){
    return(
      <div>
        <li key={this.props.bm.id}>BM: {this.props.bm.name} ---HubNumber: {this.props.bm.hubNumber}<button onClick={(event)=>this.props.deleteBm(event, this.props.bm.id )}>Delete</button></li>
      </div>
    )
  }
}

const mapStoreToProps = reduxState => ({
  reduxState
})

export default connect(mapStoreToProps)(BMItem);