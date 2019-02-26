import React, { Component } from 'react';
import Presentational from './Presentational';

export interface IRoom {
  id: number;
  name: string;
  info: string;
  seat: number;
}

export interface IStateProps {
  rooms: IRoom[];
}

// tslint:disable-next-line:class-name
class ViewRoom extends Component<{}, IStateProps> {
  constructor(props: {}) {
    super(props);
    this.state = {
      rooms: [],
    };
  }
  public componentDidMount = () => {
    fetch('http://localhost:5000/room/')
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

export default ViewRoom;
