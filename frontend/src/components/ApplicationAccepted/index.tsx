import React from 'react';
import { IApplication } from '../Application';
import SeatDisplay from './SeatDisplay';

interface IProps {
  application: IApplication;
}

const ApplicationAccepted: React.FunctionComponent<IProps> = (props) => {
  const { seat } = props.application;

  if (!seat) return null;
  return (
    <>
    <h2>Your seat</h2>
    <SeatDisplay seat={seat} />
    </>
  );
};

export default ApplicationAccepted;