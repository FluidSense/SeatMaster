import HovedKnapp from 'nav-frontend-knapper';
import { Input, Textarea } from 'nav-frontend-skjema';
import React, { ChangeEvent, SyntheticEvent } from 'react';
import {
  _BUTTON_CREATE_ROOM,
  _INPUT_LABEL_NAME,
  _INPUT_LABEL_NOTES,
  _TITLE_CREATE_NEW_ROOM,
} from './strings';

interface IProps {
  roomName: string;
  roomNotes: string;
  setNotes: (roomNotes: ChangeEvent<HTMLInputElement>) => void;
  setName: (roomName: ChangeEvent<HTMLInputElement>) => void;
  buttonDisabled: boolean;
  createRoom: () => any;
}

const Presentational: React.FunctionComponent<IProps> = (props) => {
  const { roomName, roomNotes, setNotes, setName, buttonDisabled, createRoom } = props;

  // TextArea returns the wrong type, so its type has to be forced
  const assertEventType = (event: SyntheticEvent<EventTarget, Event>) => {
    const changeEvent = event as ChangeEvent<HTMLInputElement>;
    setNotes(changeEvent);
  };

  return (
    <>
      <h1>{_TITLE_CREATE_NEW_ROOM}</h1>
      <Input
        onChange={setName}
        value={roomName}
        label={_INPUT_LABEL_NAME}
        bredde={'XL'}
      />
      <Textarea
        onChange={assertEventType}
        value={roomNotes}
        label={_INPUT_LABEL_NOTES}
      />
      <HovedKnapp
        type="hoved"
        disabled={buttonDisabled}
        onClick={createRoom}
      >
        {_BUTTON_CREATE_ROOM}
      </HovedKnapp>
    </>
  );
};

export default Presentational;
