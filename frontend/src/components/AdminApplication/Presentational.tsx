import React from 'react';
import ApplicationOverview from '../ApplicationReview/ApplicationOverview';
import { IRegisteredApplicationState } from './../Home/reducer';

interface IProps {
  application: IRegisteredApplicationState;
}

const Presentational: React.FunctionComponent<IProps> = (props) => {
  const { application } = props;

  return (
    <div className="main-content">
      <ApplicationOverview applicationInfo={application}/>
    </div>
  );
};

export default Presentational;
