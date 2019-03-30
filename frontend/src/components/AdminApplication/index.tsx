import React, { Component } from 'react';
import { connect } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
import { IPostAdminApplicationForm } from '../../API/interfaces';
import { IStore } from '../../store';
import { IApplication } from '../Application';
import { removeStudent } from '../AssignSeat/actions';
import { APP_NOT_FOUND } from '../commonConstants';
import { updateSingleApplication } from '../EditApplication/actions';
import LoadingPageSpinner from '../LoadingPageSpinner';
import Page404 from '../Page404';
import { IRoom, ISeat } from '../ViewRooms';
import { fetchAllRooms } from '../ViewRooms/actions';
import { fetchApplicationDirectly, resetPageStatus } from './actions';
import Presentational from './Presentational';

export interface IAdminApplication extends IApplication {
  seat?: ISeat;
}

interface IStateToProps {
  fetchedApplication?: IApplication;
  rooms: IRoom[];
  status: number;
}

interface IStateProps {
  seatInfo?: ISeat;
  modalOpen: boolean;
}

interface ILinkProps {
  location: {
    application?: IApplication;
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
  resetStatus: () => void;
  updateApplication: (id: number, app: IPostAdminApplicationForm) => void;
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
      fetchApplication,
      fetchRooms,
      location,
    } = this.props;
    const locationApplication = location.application;
    const locationRooms = location.rooms;
    const urlId = this.props.match.params.id;
    if (locationRooms) this.setState({ rooms: locationRooms });
    else await fetchRooms();
    if (locationApplication) {
      this.setState({ application: locationApplication });
    } else {
      await fetchApplication(Number(urlId));
      this.setState({ fetched: true });
    }
  }

  public componentDidUpdate = (prevProps: Props, prevState: IState) => {
    const { fetchedApplication } = this.props;
    const { fetched, rooms } = this.state;
    if (prevState.fetched !== fetched
      && fetchedApplication
      && fetchedApplication.status !== APP_NOT_FOUND) {
      this.setState({ application: fetchedApplication });
    }
    if (this.props.rooms !== rooms) this.setState({ rooms: this.props.rooms });
  }

  public componentWillUnmount = () => this.props.resetStatus();

  public render() {
    const { removeStudentFromSeat, status, updateApplication } = this.props;
    const { application, rooms } = this.state;
    if (status === 404) return <Page404 />;
    if (!(application && rooms) || !rooms.length) return <LoadingPageSpinner />;
    return (
       <Presentational
        application={application}
        rooms={rooms}
        removeStudentFromSeat={removeStudentFromSeat}
        updateApplication={updateApplication}
       />
    );
  }
}

const mapStateToProps = (state: IStore) => ({
  fetchedApplication: state.adminReviewApplication.application,
  rooms: state.rooms.rooms,
  status: state.adminReviewApplication.api.status,
});

const mapDispatchToProps = (dispatch: ThunkDispatch<{}, {}, any>) => ({
  fetchApplication: (id: number) => dispatch(fetchApplicationDirectly(id)),
  fetchRooms: () => dispatch(fetchAllRooms()),
  removeStudentFromSeat: (roomId: number, seatId: string) =>
    dispatch(removeStudent(roomId, seatId)),
  resetStatus: () => dispatch(resetPageStatus()),
  updateApplication: (id: number, app: IPostAdminApplicationForm) => {
    return dispatch(updateSingleApplication(id, app));
  },
});

const Container = connect(
  mapStateToProps,
  mapDispatchToProps,
)(AdminApplication);

export default Container;
