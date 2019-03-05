import { Input } from 'nav-frontend-skjema';
import React from 'react';

interface IProps {
  label: string;
}

const Presentational: React.FunctionComponent<IProps> = (props) => {
  const { label } = props;

  return (
    <Input label={label} />
  );
};

export default Presentational;
