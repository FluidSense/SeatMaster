import React from 'react';
import { IApplication } from '../Application';
import ApplicationOverview from '../ApplicationReview/ApplicationOverview';
import AssignSeat from '../AssignSeat';
import ApplicationSeatDisplay from './ApplicationSeatDisplay';

interface IProps {
  application?: IApplication;
}

const Presentational: React.FunctionComponent<IProps> = (props) => {
  const { application } = props;
  if (!application) return null;
  return (
    <div className="main-content">
      <ApplicationOverview application={application} title={application.fullname}/>
      <ApplicationSeatDisplay />
      <AssignSeat application={application}/>
    </div>
  );
};

export default Presentational;
