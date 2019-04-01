import React, { ChangeEvent, Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router';
import { ThunkDispatch } from 'redux-thunk';
import { IPostRoom } from '../../API/interfaces';
import { IStore } from '../../store';
import { IRoom } from '../ViewRooms';
import {
  createRoomAction,
  deleteRoomAction,
  resetPage,
  updateRoomAction,
} from './actions';
import './adminRoom.css';
import { ROUTE_TO } from './constants';
import Presentational from './Presentational';

interface IState {
  buttonDisabled: boolean;
  redirect: boolean;
  room: IRoom;
  showAlert: boolean;
  modalOpen: boolean;
}

interface IProps {
  location: {
    room?: IRoom;
  };
}

interface IDispatchProps {
  createRoom: (data: IPostRoom) => void;
  updateRoom: (data: IPostRoom, id: number) => void;
  deleteRoom: (id: number) => void;
  reset: () => void;
}

interface IStateProps {
  submitted?: boolean;
  error?: string;
  room: any;
}

type Props = IDispatchProps & IStateProps & IProps;

// tslint:disable-next-line:class-name
class _Container extends Component<Props, IState> {
  constructor(props: Props) {
    super(props);
    this.state = {
      buttonDisabled: true,
      modalOpen: false,
      redirect: false,
      room: {
        id: -1,
        info: '',
        name: '',
        seats: {
          count: 0,
          seats: [],
        },
      },
      showAlert: false,
    };
  }

  public componentDidUpdate = (prevProps: Props, prevState: IState) => {
    const { room, showAlert } = this.state;
    const { submitted, reset } = this.props;
    // Display alertstripe
    if (submitted === false && prevProps.submitted === undefined) {
      this.setState({ showAlert: true });
      reset();
    }
    if (showAlert) setTimeout(() => this.setState({ showAlert: false }), 5000);
    // Disable or enable create room button
    if (prevState.room.name !== room.name || prevState.room.info !== room.info) {
      if (room.name.trim() !== '' && room.name.trim() !== '') {
        this.setState({ buttonDisabled: false });
      } else {
        this.setState({ buttonDisabled: true });
      }
    }
  }

  public componentDidMount = () => {
    const { room } = this.props.location;
    if (room) {
      this.setState({
        room,
      });
    }
  }

  public render() {
    const { buttonDisabled, room, showAlert, modalOpen } = this.state;
    const { submitted, reset, error } = this.props;
    const roomExists = room.id !== -1;
    const onClick = roomExists ? this.update : this.create;

    if (submitted) {
      reset();
      return <Redirect to={ROUTE_TO} />;
    }
    return (
      <Presentational
        alertMessage={error}
        buttonDisabled={buttonDisabled}
        deleteRoom={this.delete}
        onClick={onClick}
        room={room}
        roomExists={roomExists}
        setName={this.setName}
        setNotes={this.setNotes}
        showAlert={showAlert}
        toggleModal={this.toggleModal}
        modalOpen={modalOpen}
      />
    );
  }

  private setNotes = (notesEvent: ChangeEvent<HTMLInputElement>) => {
    const roomNotes = notesEvent.target.value;
    this.setState(prevState => ({
      room: {
        ...prevState.room,
        info: roomNotes,
      },
    }));
  }

  private setName = (nameEvent: ChangeEvent<HTMLInputElement>) => {
    const roomName = nameEvent.target.value;
    this.setState(prevState => ({
      room: {
        ...prevState.room,
        name: roomName,
      },
    }));
  }

  private create = () => {
    const { info: roomNotes, name: roomName } = this.state.room;
    const { createRoom } = this.props;
    const body = { info: roomNotes, name: roomName };
    createRoom(body);
  }

  private toggleModal = () => {
    this.setState({ modalOpen: !this.state.modalOpen });
  }

  private delete = () => {
    const { room } = this.state;
    const { deleteRoom } = this.props;
    if (!room) return null;
    deleteRoom(room.id);
  }

  private update = () => {
    const { room } = this.state;
    const { info: roomNotes, name: roomName } = room;
    const { updateRoom } = this.props;
    if (!room) return null;
    const body = { info: roomNotes, name: roomName };
    updateRoom(body, room.id);
  }
}

const mapStateToProps = (state: IStore) => ({
  error: state.adminRoom.error,
  room: state.adminRoom.room,
  submitted: state.adminRoom.success,
});

const mapDispatchToProps = (dispatch: ThunkDispatch<{}, {}, any>) => ({
  createRoom: (data: IPostRoom) => dispatch(createRoomAction(data)),
  deleteRoom: (id: number) => dispatch(deleteRoomAction(id)),
  reset: () => dispatch(resetPage()),
  updateRoom: (data: IPostRoom, id: number) => dispatch(updateRoomAction(data, id)),
});

const AdminRoom = connect(
  mapStateToProps,
  mapDispatchToProps,
)(_Container);

export default AdminRoom;
