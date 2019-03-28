import KnappBase from 'nav-frontend-knapper';
import { Sidetittel } from 'nav-frontend-typografi';
import React from 'react';
import { TitleAndSpinner } from '../LoadingPageSpinner/TitleAndSpinner';
import { FETCHING_ROOMS } from './constants';
import { IStateProps } from './index';
import RoomLink from './RoomLink';
import { _CREATE_ROOM_BUTTON, _VIEW_ROOM_TITLE } from './strings';

interface IProps extends IStateProps {
  onClick: () => void;
}

const createRoom = (onClick: () => void) => (
  <div className="title-and-button">
    <Sidetittel>{_VIEW_ROOM_TITLE}</Sidetittel>
    <KnappBase id="redirect-new-room" type="hoved" onClick={onClick}>
      {_CREATE_ROOM_BUTTON}
    </KnappBase>
  </div>
);

const Presentational: React.FunctionComponent<IProps> = (props) => {
  const { rooms, onClick, fetching } = props;
  if (fetching === FETCHING_ROOMS) return <TitleAndSpinner title={_VIEW_ROOM_TITLE}/>;
  if (!rooms || !rooms.length) return <div className="main-content">{createRoom(onClick)}</div>;
  const roomList = rooms.map(room => (
    <RoomLink key={room.id} room={room} />
  ));
  return (
    <div className="main-content">
      {createRoom(onClick)}
      {roomList}
    </div>
  );
};

export default Presentational;
