import AlertStripe from 'nav-frontend-alertstriper';
import HovedKnapp from 'nav-frontend-knapper';
import { Input, Textarea } from 'nav-frontend-skjema';
import { Sidetittel } from 'nav-frontend-typografi';
import React, { ChangeEvent, SyntheticEvent } from 'react';
import { ETIKETT_WARNING } from '../commonConstants';
import {
  _ALERT_CREATED_MESSAGE,
  _BUTTON_CREATE_ROOM,
  _BUTTON_DELETE_ROOM,
  _BUTTON_UPDATE_ROOM,
  _INPUT_LABEL_NAME,
  _INPUT_LABEL_NOTES,
  _TITLE_CREATE_NEW_ROOM,
  _TITLE_UPDATE_NEW_ROOM,
} from './strings';

interface IProps {
  roomName: string;
  roomNotes: string;
  setNotes: (roomNotes: ChangeEvent<HTMLInputElement>) => void;
  setName: (roomName: ChangeEvent<HTMLInputElement>) => void;
  buttonDisabled: boolean;
  onClick: () => void;
  deleteRoom: () => void;
  showAlert: boolean;
  alertMessage?: string;
  roomExists: boolean;
}

const Presentational: React.FunctionComponent<IProps> = (props) => {
  const {
    roomName,
    roomNotes,
    roomExists,
    setNotes,
    setName,
    buttonDisabled,
    onClick,
    deleteRoom,
    showAlert,
    alertMessage,
  } = props;
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
        <HovedKnapp id={'delete-room-button'} type="fare" onClick={deleteRoom}>
          {_BUTTON_DELETE_ROOM}
        </HovedKnapp>)
      : null;
  // TextArea returns the wrong type, so its type has to be forced
  const assertEventType = (event: SyntheticEvent<EventTarget, Event>) => {
    const changeEvent = event as ChangeEvent<HTMLInputElement>;
    setNotes(changeEvent);
  };

  return (
    <>
      <Sidetittel>{titleText}</Sidetittel>
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
      <div id="state-buttons">
        <HovedKnapp
          id={'create-room-button'}
          type="hoved"
          disabled={buttonDisabled}
          onClick={onClick}
        >
          {buttonText}
        </HovedKnapp>
        {deleteButton}
      </div>
    </>
  );
};

export default Presentational;
