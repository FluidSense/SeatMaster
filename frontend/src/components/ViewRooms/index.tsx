import React, { Component } from 'react';
import { connect } from 'react-redux';
import Presentational from './Presentational';

export interface IRoom {
  id: number;
  name: string;
  info: string;
  seat: number;
}

export interface IState {
  rooms: IRoom[];
}

// tslint:disable-next-line:class-name
class _Container extends Component<{}, IState> {
  constructor(props: {}) {
    super(props);
    this.state = {
      rooms: [],
    };
  }
  public componentDidMount = () => {
    fetch('http://localhost:5000/room/all')
      .then(response => response.json())
      .then(result => this.setState({ rooms: result }));
  }

  public render() {
    const { rooms } = this.state;
    return (
      <Presentational rooms={rooms} />
    );
  }
}

const ViewRoom = connect(
  null,
  null,
)(_Container);

export default ViewRoom;
