import React, { Component } from 'react';
import { getAllRooms } from '../../API/calls';
import Presentational from './Presentational';
import './viewRooms.css';

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
  public componentDidMount = () => getAllRooms().then(result => this.setState({ rooms: result }));

  public render() {
    const { rooms } = this.state;
    return (
      <Presentational rooms={rooms} />
    );
  }
}

export default ViewRoom;
