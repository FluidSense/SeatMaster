import React from 'react';
import { IApplication } from '../Application';
import ApplicationOverview from '../ApplicationReview/ApplicationOverview';
import AssignSeat from '../AssignSeat';
import { IRoom, ISeat } from '../ViewRooms';
import ApplicationSeatDisplay from './ApplicationSeatDisplay';
import { IAdminApplication } from './index';

interface IProps {
  rooms: IRoom[];
  application: IAdminApplication;
  removeStudentFromSeat: (roomId: number, seatId: string) => void;
}

const Presentational: React.FunctionComponent<IProps> = (props) => {
  const { application, rooms, removeStudentFromSeat } = props;
  if (!(application && rooms)) return null;
  const givenSeat = application.seat;
  const givenRoomId = givenSeat ? givenSeat.roomId : 0;
  const selectedRooms = rooms.filter(obj => obj.id === givenRoomId);

  return (
    <div className="main-content">
      <ApplicationOverview
        application={application}
        title={application.user ? application.user.fullname : ''}
      />
      <ApplicationSeatDisplay
        seat={application.seat}
        room={selectedRooms[0]}
        removeFromSeat={removeStudentFromSeat}
      />
      <AssignSeat rooms={rooms} application={application} />
    </div>
  );
};

export default Presentational;
