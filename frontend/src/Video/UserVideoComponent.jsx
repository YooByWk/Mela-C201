import React, { Component } from 'react';
import OpenViduVideoComponent from './OvVideo';


export default class UserVideoComponent extends Component {
  getNicknameTag() {
    return JSON.parse(this.props.streamManager.stream.connection.data).clientData;
  }
  render() {
    return (
      <div style={{width: '100%', height: 'auto'}}>
        {this.props.streamManager !== undefined ? (
          <div style={{width: '100%', height: '100%', 'display' : 'flex', 'textAlign' : 'center', 'flexDirection':'column' }}>
            <OpenViduVideoComponent streamManager={this.props.streamManager} />
            <span>{this.getNicknameTag()}</span>
          </div>
        ) : null}
      </div>
    )
  }
}
