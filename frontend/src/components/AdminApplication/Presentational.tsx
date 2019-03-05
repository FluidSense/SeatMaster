import React from 'react';
import { IApplication } from '../Application';
import ApplicationOverview from '../ApplicationReview/ApplicationOverview';
import AssignSeat from '../AssignSeat';

interface IProps {
  application?: IApplication;
}

const Presentational: React.FunctionComponent<IProps> = (props) => {
  const { application } = props;
  if (!application) return null;
  return (
    <div className="main-content">
      <ApplicationOverview application={application} title={application.fullname}/>
      <AssignSeat />
    </div>
  );
};

export default Presentational;
