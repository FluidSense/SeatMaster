import { Component } from 'react';
import { connect } from 'react-redux';
import { ThunkAction, ThunkDispatch } from 'redux-thunk';
import { IStore } from '../../store';
import Presentational from './Presentational';

export interface ISeat {
  id: string;
  info: string;
  roomId: number;
}

const createSeat = () => {
  // create seat
};

const editSeatID = () => {
  // edit seat
};

const deleteSeat = () => {
  // delete seat
};

const mapStateToProps = (state: IStore) => ({
});

const mapDispatchToProps = (dispatch: ThunkDispatch<{}, {}, any>) => ({
  createSeat: () => createSeat(),
});

const Container = connect(
  mapStateToProps,
  mapDispatchToProps,
)(Presentational);

export default Container;
