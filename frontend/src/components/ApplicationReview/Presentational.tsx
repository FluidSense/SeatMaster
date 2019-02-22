import KnappBase from 'nav-frontend-knapper';
import React from 'react';
import { Link } from 'react-router-dom';
import { APP_NOT_FOUND } from '../Login/constants';
import { IApplicationInfoObject } from './index';
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
  _PREFFERED_ROOM,
  _REVIEW_APPLICATION,
  _SEAT_ROLLOVER,
} from './strings';

interface IProps {
  applicationInfo: IApplicationInfoObject;
}

export interface IUserInfoObject {
  [_NAME]?: string;
  [_EMAIL]?: string;
  [_PHONE]?: string;
  [_MASTER_STATUS]?: string;
}

export interface IRoomInfObject {
  [_PARTNER]?: string;
  [_PREFFERED_ROOM]?: string;
  [_SEAT_ROLLOVER]?: string;
}

const Presentational: React.FunctionComponent<IProps> = (props) => {
  const { applicationInfo } = props;
  const userInfoObject: IUserInfoObject = {
    [_NAME]: applicationInfo.fullname,
    [_EMAIL]: applicationInfo.email,
    [_PHONE]: applicationInfo.phone,
    [_MASTER_STATUS]: applicationInfo.status,
  };
  const roomInfoObject = {
    [_PARTNER]: applicationInfo.partner,
    [_PREFFERED_ROOM]: applicationInfo.room,
    [_SEAT_ROLLOVER]: applicationInfo.seatRollover,
  };
  if (applicationInfo.applicationStatus === APP_NOT_FOUND) {
    return (
      <Link to="/application">
        <KnappBase type="hoved" htmlType="button" id="newAppButton">{_NEW_APPLICATION}</KnappBase>
      </Link>
    );
  }
  return (
    <>
      <h1>{_REVIEW_APPLICATION}</h1>
      <div className="user-information">{<InformationList information={userInfoObject} />}</div>
      <div className="room-information">{<InformationList information={roomInfoObject} />}</div>
      <div className={'needs-information'}>
        {<InfoPanel title={_NEEDS} text={applicationInfo.needs} />}
      </div>
      <KnappBase type="hoved">{_EDIT_APPLICATION}</KnappBase>
    </>
  );
};

export default Presentational;