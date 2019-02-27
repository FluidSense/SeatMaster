import React, { ChangeEvent, Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router';
import { ThunkDispatch } from 'redux-thunk';
import { IPostRoom } from '../../API/interfaces';
import { IStore } from '../../store';
import { IRoom } from '../ViewRooms';
import { createRoomAction, deleteRoomAction, resetPage, updateRoomAction } from './actions';
import Presentational from './Presentational';

interface IState {
  roomName: string;
  roomNotes: string;
  buttonDisabled: boolean;
  showAlert: boolean;
  redirect: boolean;
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
}

type Props = IDispatchProps & IStateProps & IProps;

// tslint:disable-next-line:class-name
class _Container extends Component<Props, IState> {
  constructor(props: Props) {
    super(props);
    this.state = {
      buttonDisabled: true,
      redirect: false,
      roomName: '',
      roomNotes: '',
      showAlert: false,
    };
  }

  public componentDidUpdate = (prevProps: Props, prevState: IState) => {
    const { roomName, roomNotes, showAlert } = this.state;
    const { submitted, reset } = this.props;
    // Display alertstripe
    if (submitted === false && prevProps.submitted === undefined) {
      this.setState({ showAlert: true });
      reset();
    }
    if (showAlert) setTimeout(() => this.setState({ showAlert: false }), 5000);
    // Disable or enable create room button
    if (prevState.roomName !== roomName || prevState.roomNotes !== roomNotes) {
      if (roomName.trim() !== '' && roomNotes.trim() !== '') {
        this.setState({ buttonDisabled: false });
      } else {
        this.setState({ buttonDisabled: true });
      }
    }
  }

  public componentDidMount = () => {
    const { room } = this.props.location;
    if (room) this.setState({ roomName: room.name, roomNotes: room.info });
  }

  public render() {
    const { buttonDisabled, roomName, roomNotes, showAlert } = this.state;
    const { submitted, location, reset, error } = this.props;
    const { room } = location;
    const onClick = room ? this.updateRoom : this.createRoom;
    const roomExists = room ? true : false;
    if (submitted) {
      reset();
      return <Redirect to={'/admin/rooms'} />;
    }
    return (
      <Presentational
        roomName={roomName}
        roomNotes={roomNotes}
        buttonDisabled={buttonDisabled}
        setNotes={this.setNotes}
        setName={this.setName}
        onClick={onClick}
        deleteRoom={this.delete}
        showAlert={showAlert}
        alertMessage={error}
        roomExists={roomExists}
      />
    );
  }

  private setNotes = (notesEvent: ChangeEvent<HTMLInputElement>) => {
    const roomNotes = notesEvent.target.value;
    this.setState({ roomNotes });
  }
  private setName = (nameEvent: ChangeEvent<HTMLInputElement>) => {
    const roomName = nameEvent.target.value;
    this.setState({ roomName });
  }

  private createRoom = () => {
    const { roomName, roomNotes } = this.state;
    const { createRoom } = this.props;
    const body = { info: roomNotes, name: roomName };
    createRoom(body);
  }

  private delete = () => {
    const { deleteRoom, location } = this.props;
    const { room } = location;
    if (!room) return null;
    deleteRoom(room.id);
  }

  private updateRoom = () => {
    const { roomName, roomNotes } = this.state;
    const { updateRoom, location } = this.props;
    if (!location.room) return null;
    const body = { info: roomNotes, name: roomName };
    updateRoom(body, location.room.id);
  }
}

const mapStateToProps = (state: IStore) => ({
  error: state.adminRoom.error,
  submitted: state.adminRoom.submitted,
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
