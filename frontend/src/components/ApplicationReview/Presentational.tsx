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
  _COMMENTS,
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

export interface IUserInfoObject {
  [_NAME]?: string;
  [_EMAIL]?: string;
  [_PHONE]?: string;
  [_MASTER_STATUS]?: string;
}

export interface IRoomInfoObject {
  [_PARTNER]?: string;
  [_PREFERRED_ROOM]?: string;
  [_SEAT_ROLLOVER]?: boolean;
}

export interface IInformationObject {
  [_COMMENTS]?: string;
  [_NEEDS]?: string;
}

const Presentational: React.FunctionComponent<IStateProps> = (props) => {
  const { applicationInfo, userInfo } = props;
  const { partnerApplication } = applicationInfo;
  const userInfoObject: IUserInfoObject = {
    [_NAME]: userInfo.username,
    [_EMAIL]: userInfo.email,
    [_PHONE]: 'no phone',
    [_MASTER_STATUS]: userInfo.masterStatus,
  };
  const roomInfoObject: IRoomInfoObject = {
    [_PARTNER]: partnerApplication !== undefined
      && partnerApplication.user !== undefined
      ? partnerApplication.user.username
      : '',
    [_PREFERRED_ROOM]: applicationInfo.preferredRoom,
    [_SEAT_ROLLOVER]: applicationInfo.seatRollover,
  };
  const informationInfoObject: IInformationObject = {
    [_COMMENTS]: applicationInfo.comments,
    [_NEEDS]: applicationInfo.needs,
  };

  if (applicationInfo.status === APP_NOT_FOUND) {
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
