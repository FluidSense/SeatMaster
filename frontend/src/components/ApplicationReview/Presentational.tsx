import KnappBase from 'nav-frontend-knapper';
import React from 'react';
import { Link } from 'react-router-dom';
import { APP_NOT_FOUND } from '../Login/constants';
import InfoPanel from './InfoPanel';
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
  applicationInfo: any;
}

const createInformationDiv = (object: object) => {
  return Object.entries(object).map(array => (
    <InfoPanel key={array[0]} title={array[0]} text={array[1]} />
  ));
};

const Presentational: React.FunctionComponent<IProps> = (props) => {
  const { applicationInfo } = props;
  const userInfoObject = {
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
      <div className="user-information">{createInformationDiv(userInfoObject)}</div>
      <div className="room-information">{createInformationDiv(roomInfoObject)}</div>
      <div className={'needs-information'}>
        {<InfoPanel title={_NEEDS} text={applicationInfo.needs} />}
      </div>
      <KnappBase type="hoved">{_EDIT_APPLICATION}</KnappBase>
    </>
  );
};

export default Presentational;
