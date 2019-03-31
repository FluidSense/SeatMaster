import React, { Component } from 'react';
import { connect } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
import { IPostSeat, IUser } from '../../API/interfaces';
import { IStore } from '../../store';
import { createSeatAction, deleteSeatAction, updateSeatAction } from './actions';
import Presentational from './Presentational';

export interface ISeat {
  id: number;
  info: string;
  name?: string;
  roomId: number;
  user?: IUser;
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
  deleteSeat: (seatId: number) => void;
  updateSeat: (seatId: number, newName: string) => void;
}

interface IStateProps {
  latestSeatId: number;
}

type Props = IDispatchProps & IStateProps & IProps;

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
    const { createSeat, latestSeatId } = this.props;
    let nextName = 'A1';
    if (seats.length > 0) {
      const lastSeatName = seats[seats.length - 1].name || 'A1';
      // Splits id in letters and numbers
      const idParts = lastSeatName.split(/([0-9]+)/);
      // If there is no number parts we make one!
      idParts[1] = idParts[1] || '1';
      // Creates new id by incrementing the number on the last id
      nextName = `${idParts[0]}${parseInt(idParts[1], 10) + 1}`;
    }

    const seatToPost: IPostSeat = {
      info: '',
      name: nextName,
      // tslint:disable-next-line:object-shorthand-properties-first
      roomId,
    };

    const seatForState: ISeat = {
      id: latestSeatId + 1,
      info: '',
      name: nextName,
      // tslint:disable-next-line:object-shorthand-properties-first
      roomId,
    };

    this.setState(prevState => ({
      seats: [
        ...prevState.seats,
        seatForState,
      ],
    }));
    createSeat(seatToPost, roomId);
  }

  private delete = (id: number) => {
    const { deleteSeat } = this.props;
    this.setState(prevState => ({
      seats: prevState.seats.filter(seat => seat.id !== id),
    }));
    deleteSeat(id);
  }

  private update = (seatId: number, newName: string) => {
    const { updateSeat } = this.props;
    const { roomId } = this.state;

    const newSeat: ISeat = {
      id: seatId,
      info: '',
      name: newName,
      // tslint:disable-next-line:object-shorthand-properties-first
      roomId,
    };
    updateSeat(seatId, newName);
  }
}

const mapStateToProps = (state: IStore) => ({
  latestSeatId: state.latestSeatId.latestId,
});

const mapDispatchToProps = (dispatch: ThunkDispatch<{}, {}, any>, ownProps: any) => ({
  createSeat: (data: IPostSeat) => dispatch(createSeatAction(data)),
  deleteSeat: (seatId: number) => dispatch(deleteSeatAction(seatId)),
  updateSeat: (seatId: number, newName: string) => dispatch(updateSeatAction(seatId, newName)),
});

const Container = connect(
  mapStateToProps,
  mapDispatchToProps,
)(_Container);

export default Container;
