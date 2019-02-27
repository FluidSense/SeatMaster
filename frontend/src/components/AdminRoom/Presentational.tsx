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
  roomId?: number;
}

const alertStripe = (
  <AlertStripe solid={true} type={ETIKETT_WARNING}>
    {_ALERT_CREATED_MESSAGE}
  </AlertStripe>
);

const Presentational: React.FunctionComponent<IProps> = (props) => {
  const {
    roomName,
    roomNotes,
    roomId,
    setNotes,
    setName,
    buttonDisabled,
    onClick,
    deleteRoom,
    showAlert,
  } = props;
  const displayAlert = showAlert ? alertStripe : null;
  const titleText = roomId ? _TITLE_UPDATE_NEW_ROOM : _TITLE_CREATE_NEW_ROOM;
  const buttonText = roomId ? _BUTTON_UPDATE_ROOM : _BUTTON_CREATE_ROOM;
  const deleteButton = roomId
    ? (
      <HovedKnapp id={'delete-room-button'} type="fare" onClick={deleteRoom}>
        {_BUTTON_DELETE_ROOM}
      </HovedKnapp>
    ) : null;
  // TextArea returns the wrong type, so its type has to be forced
  const assertEventType = (event: SyntheticEvent<EventTarget, Event>) => {
    const changeEvent = event as ChangeEvent<HTMLInputElement>;
    setNotes(changeEvent);
  };

  return (
    <>
      <Sidetittel>{titleText}</Sidetittel>
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
      <HovedKnapp
        id={'create-room-button'}
        type="hoved"
        disabled={buttonDisabled}
        onClick={onClick}
      >
        {buttonText}
      </HovedKnapp>
      {deleteButton}
      {displayAlert}
    </>
  );
};

export default Presentational;
