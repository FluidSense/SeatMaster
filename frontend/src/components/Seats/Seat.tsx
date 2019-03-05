import { Knapp } from 'nav-frontend-knapper';
import Lukknapp from 'nav-frontend-lukknapp';
import { Panel } from 'nav-frontend-paneler';
import { Input } from 'nav-frontend-skjema';
import React from 'react';
import { _CHANGE_ID } from './strings';

interface IProps {
  id: string;
}

const Presentational: React.FunctionComponent<IProps> = (props) => {
  const { id } = props;

  return (
    <>
      <Panel border={true}>
        <Input label={'Seat ID'} bredde="S" placeholder={id} />
        <Knapp>{_CHANGE_ID}</Knapp>
        <Lukknapp bla={true} />
      </Panel>
    </>
  );
};

export default Presentational;
