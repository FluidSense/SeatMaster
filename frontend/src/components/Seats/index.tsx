import React, { Component } from 'react';
import { connect } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
import { IStore } from '../../store';
import { createSeatAction, deleteSeatAction, updateSeatAction } from './actions';
import Presentational from './Presentational';
import { IPostSeat } from '../../API/interfaces';

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
  createSeat: (data: IPostSeat, roomId: number) => void;
  deleteSeat: (roomId: number, seatId: string) => void;
  updateSeat: (roomId: number, oldSeatId: string, newSeat: IPostSeat) => void;
}

interface IStateProps {
}

type Props = IDispatchProps & IStateProps & IProps;

const editSeatID = () => {
  // edit seat
};

const deleteSeat = () => {
  // delete seat
};

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

    const seat: IPostSeat = {
      id: nextID,
      info: '',
      roomId,
    };

    this.setState(prevState => ({
      seats: [
        ...prevState.seats,
        seat,
      ]
    }))

    createSeat(seat, roomId);
  }

  private delete = (id: string) => {
    const { deleteSeat } = this.props;
    const { roomId } = this.state;
    this.setState(prevState => ({
      seats: prevState.seats.filter(seat => seat.id !== id),
    }))
    deleteSeat(roomId, id);
  }

  private update = (oldId: string, newId: string) => {
    const { updateSeat } = this.props;
    const { roomId } = this.state;


    const newSeat: IPostSeat = {
      id: newId,
      info: '',
      roomId,
    }
    updateSeat(roomId, oldId, newSeat)
  }
}

const mapStateToProps = (state: IStore, ownProps: any) => ({
});

const mapDispatchToProps = (dispatch: ThunkDispatch<{}, {}, any>, ownProps: any) => ({
  createSeat: (data: IPostSeat) => dispatch(createSeatAction(data)),
  deleteSeat: (roomId: number, seatId: string) => dispatch(deleteSeatAction(roomId, seatId)),
  updateSeat: (roomId: number, oldId: string, newSeat: IPostSeat) => dispatch(updateSeatAction(roomId, oldId, newSeat)),
});

const Container = connect(
  mapStateToProps,
  mapDispatchToProps,
)(_Container);

export default Container;
