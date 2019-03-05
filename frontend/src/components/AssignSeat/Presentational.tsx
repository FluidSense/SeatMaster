import React, { ChangeEvent } from 'react';
import { IRoom } from '../ViewRooms';
import RoomPicker from './RoomPicker';
import SeatPicker from './SeatPicker';

interface IState {
  selectedRoom?: IRoom;
}

interface IProps {
  rooms: IRoom[];
}

class Presentational extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      selectedRoom: undefined,
    };
  }

  public render() {
    const { rooms } = this.props;
    const { selectedRoom } = this.state;
    return (
      <>
        <RoomPicker rooms={rooms} setSelected={this.setRoom}/>
        <SeatPicker seats={selectedRoom ? selectedRoom.seats.seats : undefined} />
      </>
    );
  }

  private setRoom = (e: React.FormEvent) => {
    const eventTarget = e.target as HTMLFormElement;
    const selectedRoomID = parseInt(eventTarget.value, 10);
    const selectedRooms = this.props.rooms.filter(obj => obj.id === selectedRoomID);
    const selectedRoom = selectedRooms[0];
    this.setState({ selectedRoom });
  }
}

export default Presentational;
