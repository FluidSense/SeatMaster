import { Knapp } from 'nav-frontend-knapper';
import Lukknapp from 'nav-frontend-lukknapp';
import { Panel } from 'nav-frontend-paneler';
import { Input } from 'nav-frontend-skjema';
import React from 'react';
import { _CHANGE_ID } from './strings';

interface IProps {
  id: string;
  deleteSelf: (id: string) => void;
}

const Presentational: React.FunctionComponent<IProps> = (props) => {
  const { id, deleteSelf } = props;

  const deleteSeat = () => {
    console.log('called delete', id);
    deleteSelf(id);
  }

  const changeId = () => {
    console.log('changeId button pressed.')
  }

  return (
    <>
      <Panel border={true}>
        <Input label={'Seat ID'} bredde="S" placeholder={id} />
        <Knapp onClick={changeId}>{_CHANGE_ID}</Knapp>
        <Lukknapp bla={true} onClick={deleteSeat} />
      </Panel>
    </>
  );
};

export default Presentational;
