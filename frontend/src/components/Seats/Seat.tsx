import { Input } from 'nav-frontend-skjema';
import React from 'react';

interface IProps {
}

const Presentational: React.FunctionComponent<IProps> = (props) => {
  const { } = props;

  return (
    <Input label={'This is a seat'} />
  );
};

export default Presentational;
