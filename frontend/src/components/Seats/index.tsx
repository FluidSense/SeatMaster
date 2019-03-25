import React, { Component } from 'react';
import { connect } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
import { IStore } from '../../store';
import { createSeatAction, deleteSeatAction, updateSeatAction } from './actions';
import Presentational from './Presentational';

export interface ISeat {
  id: string;
  info: string;
  roomId: number;
}

interface IState {
  roomId: number;
  seats: ISeat[];
}

interface IProps {
  roomId: number;
  seats: ISeat[];
}

interface IDispatchProps {
  createSeat: (data: ISeat, roomId: number) => void;
  deleteSeat: (roomId: number, seatId: string) => void;
  updateSeat: (roomId: number, oldSeatId: string, newSeat: ISeat) => void;
}

type Props = IDispatchProps & IProps;

// tslint:disable-next-line:class-name
class _Container extends Component<Props, IState> {
  constructor(props: Props) {
    super(props);
    this.state = {
      roomId: -1,
      seats: [],
    };
  }

  public componentDidMount = () => {
    const { roomId, seats } = this.props;
    this.setState({ roomId, seats });
  }

  public render() {
    const { roomId, seats } = this.state;

    return (
      <Presentational
        roomId={roomId}
        seats={seats}
        createSeat={this.create}
        deleteSeat={this.delete}
        updateSeat={this.update}
      />
    );
  }

  private create = () => {
    const { seats, roomId } = this.state;
    const { createSeat } = this.props;
    let nextID = 'A1';
    if (seats.length > 0) {
      // Splits id in letters and numbers
      const idParts = seats[seats.length - 1].id.split(/([0-9]+)/);
      // Creates new id by incrementing the number on the last id
      nextID = `${idParts[0]}${parseInt(idParts[1], 10) + 1}`;
    }

    const seat: ISeat = {
      id: nextID,
      info: '',
      // tslint:disable-next-line:object-shorthand-properties-first
      roomId,
    };

    this.setState(prevState => ({
      seats: [
        ...prevState.seats,
        seat,
      ],
    }));

    createSeat(seat, roomId);
  }

  private delete = (id: string) => {
    const { deleteSeat } = this.props;
    const { roomId } = this.state;
    this.setState(prevState => ({
      seats: prevState.seats.filter(seat => seat.id !== id),
    }));
    deleteSeat(roomId, id);
  }

  private update = (oldId: string, newId: string) => {
    const { updateSeat } = this.props;
    const { roomId } = this.state;

    const newSeat: ISeat = {
      id: newId,
      info: '',
      // tslint:disable-next-line:object-shorthand-properties-first
      roomId,
    };
    updateSeat(roomId, oldId, newSeat);
  }
}

const mapDispatchToProps = (dispatch: ThunkDispatch<{}, {}, any>, ownProps: any) => ({
  createSeat: (data: ISeat) => dispatch(createSeatAction(data)),
  deleteSeat: (roomId: number, seatId: string) => dispatch(deleteSeatAction(roomId, seatId)),
  updateSeat: (
    roomId: number,
    oldId: string,
    newSeat: ISeat,
  ) => dispatch(updateSeatAction(roomId, oldId, newSeat)),
});

const Container = connect(
  null,
  mapDispatchToProps,
)(_Container);

export default Container;
