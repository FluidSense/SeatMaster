import React, { Component } from 'react';
import { connect } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
import { IStore } from '../../store';
import { fetchApplicationDirectly } from '../AdminApplicationOverview/actions';
import { IApplication } from '../Application';
import ApplicationOverview from '../ApplicationReview/ApplicationOverview';
import AssignSeat from '../AssignSeat';
import { removeStudent } from '../AssignSeat/actions';
import { IRoom, ISeat } from '../ViewRooms';
import { fetchAllRooms } from '../ViewRooms/actions';
import ApplicationSeatDisplay from './ApplicationSeatDisplay';

export interface IAdminApplication extends IApplication {
  seat?: ISeat;
}

interface IStateToProps {
  applications: IApplication[];
  fetchedApplication?: IApplication;
  rooms: IRoom[];
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
  match: {
    params: {
      id: string;
    };
  };
}

interface IDispatchProps {
  removeStudentFromSeat: (roomId: number, seatId: string) => void;
  fetchApplication: (id: number) => void;
  fetchRooms: () => void;
}

interface IState {
  application?: IApplication;
  fetched: boolean;
  rooms: IRoom[];
}

type Props = IStateProps & ILinkProps & IDispatchProps & IStateToProps;

// tslint:disable-next-line:variable-name
class AdminApplication extends Component<Props, IState> {
  constructor(props: Props) {
    super(props);
    this.state = {
      application: undefined,
      fetched: false,
      rooms: [],
    };
  }

  public componentDidMount = async () => {
    const {
      applications,
      fetchApplication,
      fetchedApplication,
      fetchRooms,
      location,
    } = this.props;
    const locationApplication = location.application;
    const locationRooms = location.rooms;
    const urlId = this.props.match.params.id;
    if (locationRooms) {
      this.setState({ rooms: locationRooms });
    } else {
      await fetchRooms();
    }
    if (locationApplication) {
      this.setState({ application: locationApplication });
    } else if (applications && applications.length) {
      const applicationInList = applications.find(app => app.id === Number(urlId));
      if (applicationInList) this.setState({ application: applicationInList });
    } else {
      await fetchApplication(Number(urlId));
      this.setState({ fetched: true });
    }
  }

  public componentDidUpdate = (prevProps: Props, prevState: IState) => {
    const { fetchedApplication } = this.props;
    const { fetched, rooms } = this.state;
    // console.log(prevState.fetched !== fetched);
    if (prevState.fetched !== fetched && fetchedApplication) {
      this.setState({ application: fetchedApplication });
    }
    if (prevState.rooms !== rooms) {
      this.setState({ rooms: this.props.rooms });
    }
  }

  public render() {
    const { removeStudentFromSeat } = this.props;
    const { application, rooms } = this.state;
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
  }
}

const mapStateToProps = (state: IStore) => ({
  applications: state.applications.applications,
  fetchedApplication: state.applications.fetchedApplication,
  rooms: state.rooms.rooms,
});

const mapDispatchToProps = (dispatch: ThunkDispatch<{}, {}, any>) => ({
  fetchApplication: (id: number) => dispatch(fetchApplicationDirectly(id)),
  fetchRooms: () => dispatch(fetchAllRooms()),
  removeStudentFromSeat: (roomId: number, seatId: string) =>
    dispatch(removeStudent(roomId, seatId)),
});

const Container = connect(
  mapStateToProps,
  mapDispatchToProps,
)(AdminApplication);

export default Container;
