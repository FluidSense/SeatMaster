import React from 'react';
import { connect } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
import { IPostAdminApplicationForm } from '../../API/interfaces';
import { IStore } from '../../store';
import { fetchAllApplications } from '../AdminApplicationOverview/actions';
import { IApplication } from '../Application';
import { IRoom } from '../ViewRooms';
import { fetchAllRooms } from '../ViewRooms/actions';
import { resetAppStatus, updateSingleApplication } from './actions';
import Presentational from './Presentational';

interface IDispatchProps {
  resetStatus: () => void;
  updateApplication: (id: number, app: IPostAdminApplicationForm) => void;
  getApplications: () => void;
  getRooms: () => void;
}

interface IStateProps {
  applications: IApplication[];
  status: number;
  rooms: IRoom[];
  match: {
    params: {
      id: string;
    },
  };
}

interface IOwnState {
  fetchedApplications: boolean;
  fetchedRooms: boolean;
}

type Props = IDispatchProps & IStateProps;

// tslint:disable-next-line:class-name
class _Container extends React.Component<Props, IOwnState> {
  constructor(props: Props) {
    super(props);
    const hasApplications = props.applications.length > 0;
    const hasRooms = props.rooms.length > 0;
    this.state = {
      fetchedApplications: hasApplications,
      fetchedRooms: hasRooms,
    };
  }

  public componentDidMount() {
    if (!this.state.fetchedRooms) {
      this.props.getRooms();
    }
    if (!this.props.applications.length && !this.state.fetchedApplications) {
      this.setState({ fetchedApplications: true });
      this.props.getApplications();
    }
  }

  public render() {
    return (
      <Presentational
        applications={this.props.applications}
        matchId={this.props.match.params.id}
        status={this.props.status}
        rooms={this.props.rooms}
        updateApplication={this.props.updateApplication}
        resetStatus={this.props.resetStatus}
      />
    );
  }
}

const mapStateToProps = (state: IStore) => ({
  applications: state.applications.applications,
  rooms: state.rooms.rooms,
  status: state.applications.api.status,
});

const mapDispatchToProps = (dispatch: ThunkDispatch<{}, {}, any>) => ({
  getApplications: () => dispatch(fetchAllApplications()),
  getRooms: () => dispatch(fetchAllRooms()),
  resetStatus: () => dispatch(resetAppStatus()),
  updateApplication: (id: number, application: IPostAdminApplicationForm) => {
    return dispatch(updateSingleApplication(id, application));
  },
});

const EditApplication = connect(
  mapStateToProps,
  mapDispatchToProps,
)(_Container);

export default EditApplication;
