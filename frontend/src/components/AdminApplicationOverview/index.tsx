import React from 'react';
import { connect } from 'react-redux';
import { AnyAction } from 'redux';
import { ThunkAction, ThunkDispatch } from 'redux-thunk';
import { IPostAdminApplicationForm } from '../../API/interfaces';
import { IStore } from '../../store';
import { lowerIncludes } from '../../utils/searchBarFilter';
import { IApplication } from '../Application';
import { updateSingleApplication } from '../EditApplication/actions';
import { searchBarEvent } from '../SearchBar';
import { IRoom } from '../ViewRooms';
import { fetchAllRooms } from '../ViewRooms/actions';
import {
  approveAllApplications,
  fetchAllApplications,
  removeAllApplications,
  waitingListAllApplications,
} from './actions';
import Presentational from './Presentational';

interface IStateProps {
  applications: IApplication[];
  rooms: IRoom[];
  fetching: string;
}

interface IDispatchProps {
  getAllApplications: () => ThunkAction<void, {}, {}, AnyAction>;
  getRooms: () => ThunkAction<void, {}, {}, AnyAction>;
  approve: (ids: number[]) => ThunkAction<void, {}, {}, AnyAction>;
  close: () => void;
  putWaiting: (ids: number[]) => ThunkAction<void, {}, {}, AnyAction>;
  removeFromSeat: (ids: number[]) => ThunkAction<void, {}, {}, AnyAction>;
  updateApplication: (id: number, app: IPostAdminApplicationForm) => void;
}

interface IState {
  applications: IApplication[];
  filteredApplications: IApplication[];
}

type Props = IStateProps & IDispatchProps;

// tslint:disable-next-line:class-name
class _Container extends React.Component<Props, IState> {
  constructor(props: Props) {
    super(props);
    this.state = {
      applications: this.props.applications,
      filteredApplications: this.props.applications,
    };
  }
  public componentDidMount() {
    this.props.getAllApplications();
    this.props.getRooms();
  }

  public componentDidUpdate = (prevProps: Props) => {
    const { applications } = this.props;
    if (prevProps.applications !== applications) {
      this.setState({ applications, filteredApplications: applications });
    }
  }

  public render() {
    const { filteredApplications } = this.state;
    return (
      <Presentational
        applications={filteredApplications}
        filterFunction={this.filterApplications}
        rooms={this.props.rooms}
        fetching={this.props.fetching}
        approve={this.props.approve}
        putWaiting={this.props.putWaiting}
        removeFromSeat={this.props.removeFromSeat}
        updateApplication={this.props.updateApplication}
      />);
  }

  private filterApplications = (event: searchBarEvent) => {
    const { applications } = this.state;
    const { value } = event.target;
    const filteredApplications = applications.filter((application) => {
      const { user } = application;
      if (user) {
        if (lowerIncludes(user.username, value)
          || lowerIncludes(user.email, value)
          || lowerIncludes(user.fullname, value)
        ) return application;
      }
    });
    this.setState({ filteredApplications });
  }
}

const mapStateToProps = (state: IStore) => ({
  applications: state.applications.applications,
  fetching: state.applications.fetchingApplications,
  rooms: state.rooms.rooms,
});

const mapDispatchToProps = (dispatch: ThunkDispatch<{}, {}, any>) => ({
  approve: (ids: number[]) => dispatch(approveAllApplications(ids)),
  getAllApplications: () => dispatch(fetchAllApplications()),
  getRooms: () => dispatch(fetchAllRooms()),
  putWaiting: (ids: number[]) => dispatch(waitingListAllApplications(ids)),
  removeFromSeat: (ids: number[]) => dispatch(removeAllApplications(ids)),
  updateApplication: (id: number, app: IPostAdminApplicationForm) =>
    dispatch(updateSingleApplication(id, app)),
});

const Container = connect(
  mapStateToProps,
  mapDispatchToProps,
)(_Container);

export default Container;
