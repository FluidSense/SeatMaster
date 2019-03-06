import { Component } from 'react';
import { connect } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
import { IStore } from '../../store';
import { createSeat } from './actions';
import Presentational from './Presentational';

export interface ISeat {
  id: string;
  info: string;
  roomId: number;
}

const editSeatID = () => {
  // edit seat
};

const deleteSeat = () => {
  // delete seat
};

const mapStateToProps = (state: IStore) => ({
});

const mapDispatchToProps = (dispatch: ThunkDispatch<{}, {}, any>, ownProps: any) => ({
  createSeatClick: (seats: ISeat[], roomId: number) => dispatch(createSeat(seats, roomId)),
});

const Container = connect(
  mapStateToProps,
  mapDispatchToProps,
)(Presentational);

export default Container;
