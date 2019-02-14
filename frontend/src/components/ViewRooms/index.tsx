import React, { Component } from 'react';
import { connect } from 'react-redux';
import Presentational from './Presentational';

interface IState {
  room?: {
    id: number,
    name: string,
    info: string,
  };
}

// tslint:disable-next-line:class-name
class _Container extends Component<{}, IState> {
  constructor(props: {}) {
    super(props);
    this.state = {
      room: undefined,
    };
  }
  public componentDidMount = () => {
    fetch('http://localhost:5000/room/1')
    .then(response => response.json())
    .then(result => this.setState({ room: result }));
  }

  public render() {
    const { room } = this.state;
    if (room === undefined) return null;
    return(
      <Presentational room={room}/>
    );
  }
}

const ViewRoom = connect(
  null,
  null,
)(_Container);

export default ViewRoom;
