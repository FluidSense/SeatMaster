import HovedKnapp from 'nav-frontend-knapper';
import { Input, Textarea } from 'nav-frontend-skjema';
import React from 'react';
import CreateRoom, { validValues } from './index';
import {
  _BUTTON_CREATE_ROOM,
  _INPUT_LABEL_NAME,
  _INPUT_LABEL_NOTES,
  _INPUT_LABEL_SEATS,
} from './strings';

interface IProps {
  nameValue: string;
  nameKey: string;
  notesValue: string;
  notesKey: string;
  updateState: (key: string, value: string) => any;
  buttonDisabled: boolean;
  createRoom: () => any;
}

const Presentational: React.FunctionComponent<IProps> = (props) => {
  const {
    nameValue,
    nameKey,
    notesKey,
    notesValue,
    buttonDisabled,
    updateState,
    createRoom,
  } = props;
  const setState = (e: any) => updateState(e.target.name, e.target.value);
  return (
    <>
      <h1>Create new room</h1>
      <Input
        name={nameKey}
        onChange={setState}
        value={nameValue}
        label={_INPUT_LABEL_NAME}
        bredde={'XL'}
      />
      <Textarea
        name={notesKey}
        onChange={setState}
        value={notesValue}
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

const log = (e: any) => console.log(e);

export default Presentational;
