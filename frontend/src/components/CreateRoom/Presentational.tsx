import HovedKnapp from 'nav-frontend-knapper';
import { Input, Textarea } from 'nav-frontend-skjema';
import React from 'react';
import { validValues } from './index';
import {
  _BUTTON_CREATE_ROOM,
  _INPUT_LABEL_NAME,
  _INPUT_LABEL_NOTES,
  _INPUT_LABEL_SEATS,
} from './strings';

interface IProps {
  notesValue: string;
  nameValue: string;
  seatValue: number;
  buttonDisabled: boolean;
  updateState: (key: string, value: validValues) => void;
}

const Presentational: React.FunctionComponent<IProps> = (props) => {
  const { nameValue, seatValue, notesValue, buttonDisabled } = props;
  return (
    <>
      <h1>Create new room</h1>
      <Input
        value={nameValue}
        label={_INPUT_LABEL_NAME}
        bredde={'XL'}
      />
      <Input
        value={seatValue}
        label={_INPUT_LABEL_SEATS}
        bredde={'XS'}
      />
      <Textarea
        value={notesValue}
        label={_INPUT_LABEL_NOTES}
        onChange={log}
      />
      <HovedKnapp type="hoved" disabled={buttonDisabled}>
        {_BUTTON_CREATE_ROOM}
      </HovedKnapp>
    </>
  );
};

const log = (e: any) => console.log(e.target.value);

export default Presentational;
