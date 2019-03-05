import KnappBase from 'nav-frontend-knapper';
import { Sidetittel } from 'nav-frontend-typografi';
import React from 'react';
import { Link } from 'react-router-dom';
import ApplicationOverview from './ApplicationOverview';
import { APP_NOT_FOUND } from '../commonConstants';
import { IRegisteredApplicationState } from './../Home/reducer';
import { IRegisteredUserState } from './../RegisterUser/reducer';
import InfoPanel from './InfoPanel';
import InformationList from './InformationList';
import {
  _EDIT_APPLICATION,
  _EMAIL,
  _MASTER_STATUS,
  _NAME,
  _NEEDS,
  _NEW_APPLICATION,
  _PARTNER,
  _PHONE,
  _PREFERRED_ROOM,
  _REVIEW_APPLICATION,
  _SEAT_ROLLOVER,
} from './strings';

interface IStateProps {
  applicationInfo: IRegisteredApplicationState;
  userInfo: IRegisteredUserState;
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
