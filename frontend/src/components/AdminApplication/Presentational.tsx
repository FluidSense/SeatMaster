import React from 'react';
import { IPostAdminApplicationForm } from '../../API/interfaces';
import { IApplication } from '../Application';
import ApplicationOverview from '../ApplicationReview/ApplicationOverview';
import AssignSeat from '../AssignSeat';
import { IRoom } from '../ViewRooms';
import AcceptApplication from './AcceptApplication';
import './adminapplication.css';
import ApplicationSeatDisplay from './ApplicationSeatDisplay';
import SetWaitingList from './SetWaitingList';

interface IProps {
  rooms: IRoom[];
  application: IApplication;
  removeStudentFromSeat: (roomId: number, seatId: string) => void;
  updateApplication: (id: number, app: IPostAdminApplicationForm) => void;
}

const Presentational: React.FunctionComponent<IProps> = (props) => {
  const { application, rooms, removeStudentFromSeat, updateApplication } = props;
  if (!(application && rooms)) return null;
  const givenSeat = application.seat;
  const givenRoomId = givenSeat ? givenSeat.roomId : 0;
  const selectedRooms = rooms.filter(obj => obj.id === givenRoomId);

  return (
    <div className="main-content">
      <ApplicationOverview
        application={application}
        title={application.user ? application.user.fullname : ''}
        pathToEdit={`/admin/applications/${application.id}/edit`}
      />
      <div className="edit-lower-row">
        <AssignSeat rooms={rooms} application={application} />
        <ApplicationSeatDisplay
          seat={application.seat}
          room={selectedRooms[0]}
          removeFromSeat={removeStudentFromSeat}
        />
      </div>
      <div className="center-div">
        <SetWaitingList
          seat={application.seat}
          updateApplication={updateApplication}
          application={application}
        />
        <AcceptApplication application={application} updateApplication={updateApplication}/>
      </div>
    </div>
  );
};

export default Presentational;
