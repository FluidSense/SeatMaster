import KnappBase from 'nav-frontend-knapper';
import { Sidetittel } from 'nav-frontend-typografi';
import React from 'react';
import { IApplicationInfoObject } from '.';
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

interface IProps {
  applicationInfo: IApplicationInfoObject;
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
  [_SEAT_ROLLOVER]?: string;
}
const ApplicationOverview: React.FunctionComponent<IProps> = (props) => {
  const { applicationInfo } = props;
  const userInfoObject: IUserInfoObject = {
    [_NAME]: applicationInfo.user !== undefined
      ? applicationInfo.user.username
      : applicationInfo.fullname,
    [_EMAIL]: applicationInfo.email,
    [_PHONE]: applicationInfo.phone,
    [_MASTER_STATUS]: applicationInfo.status,
  };
  const roomInfoObject: IRoomInfoObject = {
    [_PARTNER]: applicationInfo.partner,
    [_PREFERRED_ROOM]: applicationInfo.room,
    [_SEAT_ROLLOVER]: applicationInfo.seatRollover,
  };
  return (
    <div id="application-review">
      <Sidetittel>{_REVIEW_APPLICATION}</Sidetittel>
      <div id="user-information">{<InformationList information={userInfoObject} />}</div>
      <div id="room-information">{<InformationList information={roomInfoObject} />}</div>
      <div className={'needs-information'}>
        {<InfoPanel title={_NEEDS} text={applicationInfo.needs} />}
      </div>
      <KnappBase id="edit-application" type="hoved">{_EDIT_APPLICATION}</KnappBase>
    </div>
  );
};

export default ApplicationOverview;
