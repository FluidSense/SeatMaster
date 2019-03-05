import React from 'react';
import { IApplicationInfoObject } from '../ApplicationReview';
import ApplicationOverview from '../ApplicationReview/ApplicationOverview';

interface IProps {
  application: IApplicationInfoObject;
}

const Presentational: React.FunctionComponent<IProps> = (props) => {
  const { application } = props;

  return (
    <div className="main-content">
      <ApplicationOverview applicationInfo={application} title={application.fullname}/>
    </div>
  );
};

export default Presentational;
