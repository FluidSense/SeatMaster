import NavFrontendSpinner from 'nav-frontend-spinner';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
import { IStore } from '../../store';
import { IApplication } from '../Application';
import ApplicationOverview from '../ApplicationReview/ApplicationOverview';
import AssignSeat from '../AssignSeat';
import { removeStudent } from '../AssignSeat/actions';
import { APP_NOT_FOUND } from '../commonConstants';
import Page404 from '../Page404';
import { IRoom, ISeat } from '../ViewRooms';
import { fetchAllRooms } from '../ViewRooms/actions';
import { fetchApplicationDirectly } from './actions';
import ApplicationSeatDisplay from './ApplicationSeatDisplay';

export interface IAdminApplication extends IApplication {
  seat?: ISeat;
}

interface IStateToProps {
  applications: IApplication[];
  fetchedApplication: IApplication;
  rooms: IRoom[];
  status: number;
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

const pageSpinner = (
  <div className="main-content loading-page-spinner">
    <NavFrontendSpinner />
  </div>
);

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
    if (prevState.fetched !== fetched
      && fetchedApplication.status !== APP_NOT_FOUND) {
      this.setState({ application: fetchedApplication });
    }
    if (this.props.rooms !== rooms) {
      this.setState({ rooms: this.props.rooms });
    }
  }

  public render() {
    const { removeStudentFromSeat, status } = this.props;
    const { application, rooms } = this.state;
    if (status === 404) return <Page404 />;
    if (!(application && rooms) || !rooms.length) return pageSpinner;
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
  fetchedApplication: state.adminReviewApplication.application,
  rooms: state.rooms.rooms,
  status: state.adminReviewApplication.api.status,
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
