import React, { Component } from 'react';
import { connect } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
import { IPostAdminApplicationForm } from '../../API/interfaces';
import { IStore } from '../../store';
import { fetchAllApplications } from '../AdminApplicationOverview/actions';
import { IApplication } from '../Application';
import { removeStudent } from '../AssignSeat/actions';
import { APP_NOT_FOUND } from '../commonConstants';
import { updateSingleApplication } from '../EditApplication/actions';
import LoadingPageSpinner from '../LoadingPageSpinner';
import Page404 from '../Page404';
import { IRoom, ISeat } from '../ViewRooms';
import { fetchAllRooms } from '../ViewRooms/actions';
import { resetPageStatus } from './actions';
import Presentational from './Presentational';

interface IStateProps {
  rooms: IRoom[];
  seatInfo?: ISeat;
  modalOpen: boolean;
  applications: IApplication[];
  match: {
    params: {
      id: string;
    };
  };
}

interface IDispatchProps {
  removeStudentFromSeat: (roomId: number, seatId: string) => void;
  fetchApplications: () => void;
  fetchRooms: () => void;
  resetStatus: () => void;
  updateApplication: (id: number, app: IPostAdminApplicationForm) => void;
}

interface IState {
  fetchedApplications: boolean;
  fetchedRooms: boolean;
}

type Props = IStateProps & IDispatchProps;

// tslint:disable-next-line:variable-name
class AdminApplication extends Component<Props, IState> {
  constructor(props: Props) {
    super(props);
    this.state = {
      fetchedApplications: false,
      fetchedRooms: false,
    };
  }

  public componentDidMount() {
    if (!this.props.applications.length && !this.state.fetchedApplications) {
      this.setState({ fetchedApplications: true });
      this.props.fetchApplications();
    }
    if (!this.props.rooms.length && !this.state.fetchedRooms) {
      this.setState({ fetchedRooms: true });
      this.props.fetchRooms();
    }
  }

  public render() {
    const { removeStudentFromSeat, applications, rooms, updateApplication } = this.props;
    const { id } = this.props.match.params;
    const application = applications.find(app => app.id === Number(id));
    if (!(applications.length && rooms) || !rooms.length) return <LoadingPageSpinner />;
    if (!application) return <Page404 />;

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
  applications: state.applications.applications,
  rooms: state.rooms.rooms,
});

const mapDispatchToProps = (dispatch: ThunkDispatch<{}, {}, any>) => ({
  fetchApplications: () => dispatch(fetchAllApplications()),
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
