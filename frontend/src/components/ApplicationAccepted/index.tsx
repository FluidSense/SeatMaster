import React from 'react';
import { IApplication } from '../Application';
import { IRoom } from '../ViewRooms';
import SeatDisplay from './SeatDisplay';

interface IProps {
  application: IApplication;
  fetchRoomInfo: (id: number) => void;
  rooms: IRoom[];
}

const ApplicationAccepted: React.FunctionComponent<IProps> = (props) => {
  const { rooms, fetchRoomInfo } = props;
  const { seat } = props.application;

  if (!seat) return null;
  const seatedRoom = rooms.filter(room => room.id === seat.roomId);
  if (!seatedRoom.length) {
    fetchRoomInfo(seat.roomId);
    return null;
  }
  return (
    <>
    <h1>Your seat</h1>
    <SeatDisplay seat={seat} room={seatedRoom[0]}/>
    </>
  );
};

export default ApplicationAccepted;
