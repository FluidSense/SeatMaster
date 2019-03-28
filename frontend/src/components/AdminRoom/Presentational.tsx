import AlertStripe from 'nav-frontend-alertstriper';
import KnappBase from 'nav-frontend-knapper';
import { Input, Textarea } from 'nav-frontend-skjema';
import { Sidetittel } from 'nav-frontend-typografi';
import React, { ChangeEvent, SyntheticEvent } from 'react';
import { ETIKETT_WARNING } from '../commonConstants';
import Modal from '../Modal';
import Seats from '../Seats';
import { IRoom } from '../ViewRooms';
import CSVButton from './CSVButton';
import {
  _ALERT_CREATED_MESSAGE,
  _BUTTON_CREATE_ROOM,
  _BUTTON_DELETE_ROOM,
  _BUTTON_UPDATE_ROOM,
  _DOWNLOAD_ROOM_AS_CSV,
  _INPUT_LABEL_NAME,
  _INPUT_LABEL_NOTES,
  _TITLE_CREATE_NEW_ROOM,
  _TITLE_UPDATE_NEW_ROOM,
  _USERS_OCCUPYING_ROOM,
  _USERS_OCCUPYING_ROOM_CONFIRMATION,
} from './strings';

interface IProps {
  room: IRoom;
  setNotes: (roomNotes: ChangeEvent<HTMLInputElement>) => void;
  setName: (roomName: ChangeEvent<HTMLInputElement>) => void;
  buttonDisabled: boolean;
  onClick: () => void;
  deleteRoom: () => void;
  showAlert: boolean;
  alertMessage?: string;
  roomExists: boolean;
  fetchRoom: (roomId: number) => void;
  modalOpen: boolean;
  toggleModal: () => void;
}

const usersInRoom = (room: IRoom) => {
  return room.seats.seats.map((seat) => {
    const user = seat.user;
    if (user) return <li>{user.fullname}</li>;
  });
};

const Presentational: React.FunctionComponent<IProps> = (props) => {
  const {
    room,
    roomExists,
    setNotes,
    setName,
    buttonDisabled,
    onClick,
    deleteRoom,
    showAlert,
    alertMessage,
    fetchRoom,
    modalOpen,
    toggleModal,
  } = props;
  const { name: roomName, info: roomNotes } = room;
  const seats = room.seats.seats;
  const displayAlert =
    showAlert
      ? (
        <AlertStripe solid={true} type={ETIKETT_WARNING}>
          {alertMessage}
        </AlertStripe>)
      : null;
  const titleText = roomExists ? _TITLE_UPDATE_NEW_ROOM : _TITLE_CREATE_NEW_ROOM;
  const buttonText = roomExists ? _BUTTON_UPDATE_ROOM : _BUTTON_CREATE_ROOM;
  const deleteButton =
    roomExists
      ? (
        <KnappBase id={'delete-room-button'} type="fare" onClick={toggleModal}>
          {_BUTTON_DELETE_ROOM}
        </KnappBase>)
      : null;

  const seatsElement =
    roomExists
      ? (<Seats seats={seats} roomId={room.id} />)
      : null;

  // TextArea returns the wrong type, so its type has to be forced
  const assertEventType = (event: SyntheticEvent<EventTarget, Event>) => {
    const changeEvent = event as ChangeEvent<HTMLInputElement>;
    setNotes(changeEvent);
  };

  return (
    <div className="main-content">
      <div className="title-and-button">
        <Sidetittel>{titleText}</Sidetittel>
        <CSVButton room={room} fetchRoomInfo={fetchRoom} />
      </div>
      {displayAlert}
      <Input
        id={'input-room-name'}
        onChange={setName}
        value={roomName}
        label={_INPUT_LABEL_NAME}
        bredde={'XL'}
      />
      <Textarea
        id={'input-room-notes'}
        onChange={assertEventType}
        value={roomNotes}
        label={_INPUT_LABEL_NOTES}
      />
      {seatsElement}
      <div className="title-and-button">
        <KnappBase
          id={'create-room-button'}
          type="hoved"
          disabled={buttonDisabled}
          onClick={onClick}
        >
          {buttonText}
        </KnappBase>
        {deleteButton}
        <Modal
          modalOpen={modalOpen}
          toggleModal={toggleModal}
          accept={deleteRoom}
          close={toggleModal}
          text={_USERS_OCCUPYING_ROOM}
        >
          <ul>{usersInRoom(room)}</ul>
          <b>{_USERS_OCCUPYING_ROOM_CONFIRMATION}</b>
        </Modal>
      </div>
    </div>
  );
};

export default Presentational;
