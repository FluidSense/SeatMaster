import React from 'react';
import { connect } from 'react-redux';
import { AnyAction } from 'redux';
import { ThunkAction, ThunkDispatch } from 'redux-thunk';
import { IStore } from '../../store';
import { IRoom } from '../ViewRooms';
import { fetchAllRooms } from '../ViewRooms/actions';
import Presentational from './Presentational';

interface IDispatchProps {
  getRooms: () => ThunkAction<Promise<void>, {}, {}, AnyAction>;
}

interface IStateProps {
  rooms: IRoom[];
}

type Props = IDispatchProps & IStateProps;

// tslint:disable-next-line:class-name
class _Container extends React.Component<Props> {
  public componentDidMount() {
    this.props.getRooms();
  }

  public render() {
    return (<Presentational rooms={this.props.rooms} />);
  }
}

const mapStateToProps = (state: IStore) => ({
  rooms: state.rooms.rooms,
});

const mapDispatchToProps = (dispatch: ThunkDispatch<{}, {}, any>) => ({
  getRooms: () => dispatch(fetchAllRooms()),
});

const Container = connect(
  mapStateToProps,
  mapDispatchToProps,
)(_Container);

export default Container;
