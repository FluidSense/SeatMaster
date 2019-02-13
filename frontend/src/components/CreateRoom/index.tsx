import React, { Component } from 'react';
import { connect } from 'react-redux';
import Presentational from './Presentational';

interface IState {
  something?: any;
}

// tslint:disable-next-line:class-name
class _CreateRoom extends Component<{}, IState> {
  public render() {
    return (
      <Presentational />
    );
  }
}

const CreateRoom = connect(
  null,
  null,
)(_CreateRoom);

export default CreateRoom;
