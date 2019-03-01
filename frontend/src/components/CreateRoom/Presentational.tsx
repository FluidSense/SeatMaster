import AlertStripe from 'nav-frontend-alertstriper';
import HovedKnapp from 'nav-frontend-knapper';
import { Input, Textarea } from 'nav-frontend-skjema';
import React, { ChangeEvent, SyntheticEvent } from 'react';
import { ETIKETT_WARNING } from '../commonConstants';
import {
  _ALERT_ERROR_MESSAGE,
  _BUTTON_CREATE_ROOM,
  _INPUT_LABEL_NAME,
  _INPUT_LABEL_NOTES,
  _TITLE_CREATE_NEW_ROOM,
} from './strings';
import { Sidetittel } from 'nav-frontend-typografi';

interface IProps {
  roomName: string;
  roomNotes: string;
  setNotes: (roomNotes: ChangeEvent<HTMLInputElement>) => void;
  setName: (roomName: ChangeEvent<HTMLInputElement>) => void;
  buttonDisabled: boolean;
  createRoom: () => any;
  showAlert: boolean;
}

const alertStripe = (
  <AlertStripe solid={true} type={ETIKETT_WARNING}>
    {_ALERT_ERROR_MESSAGE}
  </AlertStripe>
);

const Presentational: React.FunctionComponent<IProps> = (props) => {
  const { roomName, roomNotes, setNotes, setName, buttonDisabled, createRoom, showAlert } = props;
  const displayAlert = showAlert ? alertStripe : null;
  // TextArea returns the wrong type, so its type has to be forced
  const assertEventType = (event: SyntheticEvent<EventTarget, Event>) => {
    const changeEvent = event as ChangeEvent<HTMLInputElement>;
    setNotes(changeEvent);
  };

  return (
    <div className="main-content">
      <Sidetittel>{_TITLE_CREATE_NEW_ROOM}</Sidetittel>
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
        onClick={createRoom}
      >
        {_BUTTON_CREATE_ROOM}
      </HovedKnapp>
      {displayAlert}
    </div>
  );
};

export default Presentational;
