import { LenkepanelBase } from 'nav-frontend-lenkepanel';
import React from 'react';
import { IRoom, IState as IProps } from './index';

const createRoomPanelList = (rooms: IRoom[]) => {
  return rooms.map(room => (
    <LenkepanelBase href="/admin/rooms/update-room">
      <div>
        {room.name}
      </div>
      <div>
        {room.info}
      </div>
    </LenkepanelBase>
  ));
};

const Presentational: React.FunctionComponent<IProps> = (props) => {
  const { rooms } = props;
  return (
    <>
      {createRoomPanelList(rooms)}
    </>
  );
};

export default Presentational;
