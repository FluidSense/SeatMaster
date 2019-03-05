import React, { ChangeEvent } from 'react';
import { IRoom, ISeat } from '../ViewRooms';
import RoomPicker from './RoomPicker';
import SeatPicker from './SeatPicker';
import KnappBase from 'nav-frontend-knapper';

interface IState {
  selectedRoom?: IRoom;
  selectedSeat?: ISeat;
}

interface IProps {
  rooms: IRoom[];
  assignUserToSeat: (room: IRoom, seat: ISeat) => void;
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
      <form
        onSubmit={this.submitSeatSelection}
      >
        <RoomPicker rooms={rooms} setSelected={this.setRoom}/>
        <SeatPicker
          seats={selectedRoom ? selectedRoom.seats.seats : undefined}
          setSelected={this.setSeat}
        />
        <KnappBase
          id="submit-application"
          type="hoved"
          htmlType="submit"
          autoDisableVedSpinner={true}
          spinner={false}
        >
          Submit
        </KnappBase>
      </form>
    );
  }

  private setRoom = (e: React.FormEvent) => {
    const eventTarget = e.target as HTMLFormElement;
    const selectedRoomID = parseInt(eventTarget.value, 10);
    const selectedRooms = this.props.rooms.filter(obj => obj.id === selectedRoomID);
    const selectedRoom = selectedRooms[0];
    this.setState({ selectedRoom });
  }

  private setSeat = (e: React.FormEvent) => {
    const { selectedRoom } = this.state;
    const eventTarget = e.target as HTMLFormElement;
    const selectedSeatID = eventTarget.value;
    if (!selectedRoom) return;
    const selectedSeat = selectedRoom.seats.seats.filter(obj => obj.id === selectedSeatID)[0];
    this.setState({ selectedSeat });
  }

  private submitSeatSelection = (e: React.FormEvent) => {
    e.preventDefault();
    const { selectedRoom, selectedSeat } = this.state;
    if (!(selectedRoom && selectedSeat)) return;
    this.props.assignUserToSeat(selectedRoom, selectedSeat);
  }
}

export default Presentational;
