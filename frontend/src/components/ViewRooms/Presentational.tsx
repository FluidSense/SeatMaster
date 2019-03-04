import KnappBase from 'nav-frontend-knapper';
import { Sidetittel } from 'nav-frontend-typografi';
import React from 'react';
import { IStateProps } from './index';
import RoomLink from './RoomLink';
import { _CREATE_ROOM_BUTTON, _VIEW_ROOM_TITLE } from './strings';

interface IProps extends IStateProps {
  onClick: () => void;
}

const Presentational: React.FunctionComponent<IProps> = (props) => {
  const { rooms, onClick } = props;
  if (!rooms) return null;
  if (!rooms.length) return null;
  const roomList = rooms.map(room => (
    <RoomLink key={room.id} room={room} />
  ));
  return (
    <div className="main-content">
      <div id="create-room-title">
        <Sidetittel>{_VIEW_ROOM_TITLE}</Sidetittel>
        <KnappBase id="redirect-new-room" type="hoved" onClick={onClick}>
          {_CREATE_ROOM_BUTTON}
        </KnappBase>
      </div>
      {roomList}
    </div>
  );
};

export default Presentational;
