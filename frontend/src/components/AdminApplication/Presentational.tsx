import React from 'react';
import { IApplication } from '../Application';
import ApplicationOverview from '../ApplicationReview/ApplicationOverview';

interface IProps {
  application?: IApplication;
}

const Presentational: React.FunctionComponent<IProps> = (props) => {
  const { application } = props;
  if (!application) return null;
  return (
    <div className="main-content">
      <ApplicationOverview application={application} />
    </div>
  );
};

export default Presentational;
