import React from 'react';
import { IApplication } from '../../API/interfaces';
import ApplicationLink from './ApplicationLink';

interface IProps {
  applications: IApplication[];
}

const Presentational: React.FunctionComponent<IProps> = (props) => {
  const { applications } = props;
  if (!applications) return null;
  if (!applications.length) return null;
  const applicationList = applications.map(application => (
    <ApplicationLink key={application.id} application={application} />
  ));
  return (
    <>
      {applicationList}
    </>
  );
};

export default Presentational;
