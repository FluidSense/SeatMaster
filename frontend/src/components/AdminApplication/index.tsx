import React from 'react';
import { connect } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
import { IApplication } from '../Application';
import ApplicationOverview from '../ApplicationReview/ApplicationOverview';
import AssignSeat from '../AssignSeat';
import { removeStudent } from '../AssignSeat/actions';
import { IRoom, ISeat } from '../ViewRooms';
import ApplicationSeatDisplay from './ApplicationSeatDisplay';

export interface IAdminApplication extends IApplication {
  seat?: ISeat;
}

interface IStateProps {
  seatInfo?: ISeat;
  modalOpen: boolean;
}

interface ILinkProps {
  location: {
    application?: IAdminApplication;
    rooms?: IRoom[];
  };
}

interface IDispatchProps {
  removeStudentFromSeat: (roomId: number, seatId: string) => void;
}

type Props = IStateProps & ILinkProps & IDispatchProps;

// tslint:disable-next-line:variable-name
const _Container: React.FunctionComponent<Props> = (props) => {
  const { removeStudentFromSeat } = props;
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
      <ApplicationSeatDisplay
        seat={application.seat}
        room={selectedRooms[0]}
        removeFromSeat={removeStudentFromSeat}
      />
      <AssignSeat rooms={rooms} application={application} />
    </div>
  );
};

const mapDispatchToProps = (dispatch: ThunkDispatch<{}, {}, any>) => ({
  removeStudentFromSeat: (roomId: number, seatId: string) =>
    dispatch(removeStudent(roomId, seatId)),
});

const Container = connect(
  null,
  mapDispatchToProps,
)(_Container);

export default Container;
