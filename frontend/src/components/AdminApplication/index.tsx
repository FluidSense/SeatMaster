import React from 'react';
import { IApplication } from '../Application';
import ApplicationOverview from '../ApplicationReview/ApplicationOverview';
import AssignSeat from '../AssignSeat';
import { IRoom, ISeat } from '../ViewRooms';
import ApplicationSeatDisplay from './ApplicationSeatDisplay';

interface IAdminApplication extends IApplication {
  seat?: ISeat;
}

interface IProps {
  location: {
    application?: IAdminApplication;
    rooms?: IRoom[];
  };
}

const Presentational: React.FunctionComponent<IProps> = (props) => {
  const { application, rooms } = props.location;
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
      <ApplicationSeatDisplay seat={application.seat} room={selectedRooms[0]}/>
      <AssignSeat rooms={rooms} application={application}/>
    </div>
  );
};

export default Presentational;
