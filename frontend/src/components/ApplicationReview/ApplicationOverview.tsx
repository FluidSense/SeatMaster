import KnappBase from 'nav-frontend-knapper';
import { Sidetittel } from 'nav-frontend-typografi';
import React from 'react';
import { boolToString } from '../../utils/typeFormatter';
import { IApplication } from '../Application/index';
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

interface IProps {
  application: IApplication;
  title?: string;
}

export interface IInformationObject {
  [_COMMENTS]?: string;
  [_NEEDS]?: string;
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
  const { application, title } = props;
  let partnerObject;
  if (!application.user) return null;
  const userInfoObject: IUserInfoObject = {
    [_NAME]: application.user.fullname,
    [_EMAIL]: application.user.email,
    [_MASTER_STATUS]: application.rank,
  };
  if (application.partnerApplication && application.partnerApplication.user) {
    partnerObject = application.partnerApplication.user !== undefined
      ? application.partnerApplication.user.fullname
      : undefined;
  }

  const roomInfoObject: IRoomInfoObject = {
    [_PARTNER]: partnerObject,
    [_PREFERRED_ROOM]: application.preferredRoom,
    [_SEAT_ROLLOVER]: boolToString(application.seatRollover),
  };
  return (
    <div id="application-review">
      <Sidetittel>{title ? title : _REVIEW_APPLICATION}</Sidetittel>
      <p style={{ fontStyle: 'italic' }} >
      If any of the information is wrong, add a comment or edit the information.
      </p>
      <div id="user-information">{<InformationList information={userInfoObject} />}</div>
      <div id="room-information">{<InformationList information={roomInfoObject} />}</div>
      <div className={'needs-information'}>
        <InfoPanel title={_NEEDS} text={application.needs} />
        <InfoPanel title={_COMMENTS} text={application.comments} />
      </div>
      <KnappBase id="edit-application" type="hoved">{_EDIT_APPLICATION}</KnappBase>
    </div>
  );
};

export default ApplicationOverview;
