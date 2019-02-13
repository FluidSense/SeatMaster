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
  notesEntry: [string, string];
  nameEntry: [string, string];
  seatEntry: [string, string];
  updateState: (key: string, value: string) => any;
  buttonEntry: [string, validValues];
}

const Presentational: React.FunctionComponent<IProps> = (props) => {
  const { notesEntry, nameEntry, seatEntry, buttonEntry, updateState } = props;
  const setState = (e: any) => updateState(e.target.name, e.target.value);
  return (
    <>
      <h1>Create new room</h1>
      <Input
        name={nameEntry[0]}
        onChange={setState}
        value={nameEntry[1]}
        label={_INPUT_LABEL_NAME}
        bredde={'XL'}
      />
      <Input
        name={seatEntry[0]}
        onChange={setState}
        value={seatEntry[1]}
        label={_INPUT_LABEL_SEATS}
        bredde={'XS'}
      />
      <Textarea
        name={notesEntry[0]}
        onChange={setState}
        value={notesEntry[1]}
        label={_INPUT_LABEL_NOTES}
      />
      <HovedKnapp type="hoved" disabled={buttonEntry[1] === 'false'}>
        {_BUTTON_CREATE_ROOM}
      </HovedKnapp>
    </>
  );
};

const log = (e: any) => console.log(e);

export default Presentational;
