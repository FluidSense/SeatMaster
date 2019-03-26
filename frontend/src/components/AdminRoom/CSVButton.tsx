import KnappBase from 'nav-frontend-knapper';
import React, { Component } from 'react';
import { CSVLink } from 'react-csv';
import formatCsv, { headers, IRoomWithUsers } from '../../utils/csvFormatter';
import { _DOWNLOAD_ROOM_AS_CSV } from './strings';

interface IProps {
  fetchRoomInfo: (roomId: number) => void;
  room: IRoomWithUsers;
}

class CSVButton extends Component<IProps> {

  public render() {
    const { room } = this.props;
    if (!room || !room.seats.count) return null;
    const data = formatCsv(room);
    return (
      <CSVLink data={data} headers={headers} separator={';'} filename={`${room.name}-users.csv`}>
        <KnappBase type="flat">{_DOWNLOAD_ROOM_AS_CSV}</KnappBase>
      </CSVLink>
    );
  }
}

export default CSVButton;
