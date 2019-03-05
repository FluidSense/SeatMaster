import KnappBase from 'nav-frontend-knapper';
import { Sidetittel } from 'nav-frontend-typografi';
import React from 'react';
import { Link } from 'react-router-dom';
import { APP_NOT_FOUND } from '../Login/constants';
import ApplicationOverview from './ApplicationOverview';
import { IApplicationInfoObject } from './index';
import { _NEW_APPLICATION } from './strings';

interface IProps {
  applicationInfo: IApplicationInfoObject;
}

const Presentational: React.FunctionComponent<IProps> = (props) => {
  const { applicationInfo } = props;
  if (applicationInfo.applicationStatus === APP_NOT_FOUND) {
    return (
      <Link to="/application">
        <KnappBase type="hoved" htmlType="button" id="newAppButton">{_NEW_APPLICATION}</KnappBase>
      </Link>
    );
  }
  return (
    <ApplicationOverview applicationInfo={applicationInfo}/>
  );
};

export default Presentational;
