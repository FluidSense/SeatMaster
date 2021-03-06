import KnappBase from 'nav-frontend-knapper';
import { Innholdstittel } from 'nav-frontend-typografi';
import React from 'react';
import { _CHANGE_STUDENT_WARNING } from '../AdminApplication/strings';
import Modal from '../Modal';
import { ISeat } from '../Seats';
import { IRoom } from '../ViewRooms';
import RoomPicker from './RoomPicker';
import SeatPicker from './SeatPicker';

const _TITLE = 'Assign seat';

interface IState {
  selectedRoom?: IRoom;
  selectedSeat?: ISeat;
}

interface IProps {
  accept: () => void;
  assignUserToSeat: (seat: ISeat) => void;
  checkSeat: (seatId: ISeat) => void;
  modalOpen: boolean;
  rooms: IRoom[];
  seatInfo?: ISeat;
  toggleModal: () => void;
}

class Presentational extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      selectedRoom: undefined,
    };
  }

  public render() {
    const { rooms, modalOpen, toggleModal, accept, seatInfo } = this.props;
    const { selectedRoom } = this.state;
    const occupyingUser = seatInfo ? seatInfo.user : undefined;
    const modalText = (
      <>
        <p>{_CHANGE_STUDENT_WARNING}</p>
        <ul>
          <li>{occupyingUser ? occupyingUser.fullname : ''}</li>
        </ul>
      </>
    );
    return (
      <div>
        <Innholdstittel>{_TITLE}</Innholdstittel>
          <form id="assign-seat-form" onSubmit={this.submitSeatSelection}>
            <div className="assign-seat">
              <RoomPicker rooms={rooms} setSelected={this.setRoom} />
              <SeatPicker
                seats={selectedRoom ? selectedRoom.seats.seats : undefined}
                setSelected={this.setSeat}
              />
            </div>
            <KnappBase
              id="submit-application"
              type="hoved"
              htmlType="submit"
              autoDisableVedSpinner={true}
              spinner={false}
              disabled={this.state.selectedSeat ? false : true}
            >
              {_TITLE}
            </KnappBase>
          </form>
        <Modal
          modalOpen={modalOpen}
          toggleModal={toggleModal}
          accept={accept}
          close={toggleModal}
        >
          {modalText}
        </Modal>
      </div>
    );
  }

  private setRoom = (e: React.FormEvent) => {
    const eventTarget = e.target as HTMLFormElement;
    const selectedRoomID = parseInt(eventTarget.value, 10);
    const selectedRooms = this.props.rooms.filter(obj => obj.id === selectedRoomID);
    const selectedRoom = selectedRooms[0];
    this.setState({ selectedRoom });
  }

  private setSeat = async (e: React.FormEvent) => {
    const { selectedRoom } = this.state;
    const eventTarget = e.target as HTMLFormElement;
    const selectedSeatID = parseInt(eventTarget.value, 10);
    if (!selectedRoom) return;
    const selectedSeat = selectedRoom.seats.seats.filter(obj => obj.id === selectedSeatID)[0];
    await this.props.checkSeat(selectedSeat);
    this.setState({ selectedSeat });
  }

  private submitSeatSelection = (e: React.FormEvent) => {
    e.preventDefault();
    const { selectedSeat } = this.state;
    if (!selectedSeat) return;
    this.props.assignUserToSeat(selectedSeat);
  }
}

export default Presentational;
