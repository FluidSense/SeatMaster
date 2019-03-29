import React from 'react';
import { connect } from 'react-redux';
import { AnyAction } from 'redux';
import { ThunkAction, ThunkDispatch } from 'redux-thunk';
import { IStore } from '../../store';
import { IApplication } from '../Application';
import { IRoom } from '../ViewRooms';
import { fetchAllRooms } from '../ViewRooms/actions';
import { approveAllApplications, fetchAllApplications } from './actions';
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
}

type Props = IStateProps & IDispatchProps;

// tslint:disable-next-line:class-name
class _Container extends React.Component<Props> {
  public componentDidMount() {
    this.props.getAllApplications();
    this.props.getRooms();
  }

  public render() {
    return (
      <Presentational
        applications={this.props.applications}
        rooms={this.props.rooms}
        fetching={this.props.fetching}
        approve={this.props.approve}
      />);
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
});

const Container = connect(
  mapStateToProps,
  mapDispatchToProps,
)(_Container);

export default Container;
