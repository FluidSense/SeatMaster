import React from 'react';
import { connect } from 'react-redux';
import { AnyAction } from 'redux';
import { ThunkAction, ThunkDispatch } from 'redux-thunk';
import { IStore } from '../../store';
import { IApplication } from '../Application';
import { IRoom } from '../ViewRooms';
import { fetchAllRooms } from '../ViewRooms/actions';
import { fetchAllApplications } from './actions';
import Presentational from './Presentational';

interface IStateProps {
  applications: IApplication[];
  rooms: IRoom[];
}

interface IDispatchProps {
  getAllApplications: () => ThunkAction<void, {}, {}, AnyAction>;
  getRooms: () => ThunkAction<void, {}, {}, AnyAction>;
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
      />);
  }
}

const mapStateToProps = (state: IStore) => ({
  applications: state.applications.applications,
  rooms: state.rooms.rooms,
});

const mapDispatchToProps = (dispatch: ThunkDispatch<{}, {}, any>) => ({
  getAllApplications: () => dispatch(fetchAllApplications()),
  getRooms: () => dispatch(fetchAllRooms()),
});

const Container = connect(
  mapStateToProps,
  mapDispatchToProps,
)(_Container);

export default Container;
