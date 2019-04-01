import KnappBase from 'nav-frontend-knapper';
import { Sidetittel } from 'nav-frontend-typografi';
import React from 'react';
import { Redirect } from 'react-router';
import { IPostAdminApplicationForm, IUser } from '../../API/interfaces';
import CSVButton from '../AdminRoom/CSVButton';
import { IApplication } from '../Application';
import { ISeat } from '../Seats';
import { IRoom } from '../ViewRooms';
import SeatPlacer from './SeatPlacer';
import { _EDIT_ROOM_BUTTON } from './strings';

interface IStateProps {
  match: {
    params: {
      id: string,
    },
  };
  applications?: IApplication[];
  rooms: IRoom[];
}

interface IDispatchProps {
  assign: (user: IUser, seat: ISeat) => void;
  delete: (seat: ISeat) => void;
  getAllApplications: () => void;
  fetchRooms: () => void;
  fetchRoom: (roomId: number) => void;
  updateApplication: (id: number, app: IPostAdminApplicationForm) => void;

}

interface IState {
  redirect: boolean;
  fetchedRooms: boolean;
  fetchedApplications: boolean;
}

type Props = IStateProps & IDispatchProps;

class Presentational extends React.Component<Props, IState> {
  constructor(props: Props) {
    super(props);
    this.state = {
      fetchedApplications: false,
      fetchedRooms: false,
      redirect: false,
    };
  }

  public componentDidMount() {
    if (!this.props.rooms.length && !this.state.fetchedRooms) {
      this.setState({ fetchedRooms: true });
      this.props.fetchRooms();
    }
  }

  public render() {
    const { applications, rooms, fetchRoom } = this.props;
    const roomId = parseInt(this.props.match.params.id, 10);
    const { redirect } = this.state;
    const room = rooms.find(iterroom => iterroom.id === roomId);
    if (!room) return null; // Insert spinner here
    const seats = this.seatsPlacers(room.seats.seats, applications);
    if (redirect) {
      return (
        <Redirect
          to={{ room, pathname: `/admin/rooms/${room.id}/update-room` }}
        />);
    }

    return (
      <div className="main-content">
        <div className="title-and-button">
          <Sidetittel>{room.name}</Sidetittel>
          <CSVButton room={room} fetchRoomInfo={fetchRoom} />
          <KnappBase type="hoved" onClick={this.setRedirect}>
            {_EDIT_ROOM_BUTTON}
          </KnappBase>
        </div>
        <h2>Info</h2>
        <p>{room.info}</p>
        <div>
          {seats}
        </div>
      </div>
    );
  }

  private setRedirect = () => {
    this.setState({ redirect: true });
  }

  private seatsPlacers = (seats: ISeat[], applications?: IApplication[]) => {
    if (!(applications && applications.length) && !this.state.fetchedApplications) {
      this.setState({ fetchedApplications: true });
      this.props.getAllApplications();
      return;
    }
    const apps = applications ? applications : [];
    const users = apps.map(application => application.user);
    return seats.map((seat, index) => {
      return (
        <SeatPlacer
          delete={this.props.delete}
          key={index}
          seat={seat}
          users={users}
          assign={this.props.assign}
          applications={this.props.applications}
          updateApplication={this.props.updateApplication}
        />
      );
    });
  }
}

export default Presentational;
