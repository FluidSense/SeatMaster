import React, { ChangeEvent, Component } from 'react';
import { Redirect } from 'react-router';
import { postRoom } from '../../API/calls';
import {
  POST_HEADERS,
  POST_NEW_ROOM_URL,
  POST_ROOM_NAME,
  POST_ROOM_NOTES,
} from '../commonConstants';
import { IRoom } from '../ViewRooms';
import Presentational from './Presentational';

interface IState {
  roomName: string;
  roomNotes: string;
  buttonDisabled: boolean;
  showAlert: boolean;
  redirect: boolean;
  room?: IRoom;
}

interface IProps {
  match: {
    params: {
      id: number;
    };
  };
}

// tslint:disable-next-line:class-name
class CreateRoom extends Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      buttonDisabled: true,
      redirect: false,
      roomName: '',
      roomNotes: '',
      showAlert: false,
    };
  }

  public componentDidUpdate = (prevProps: {}, prevState: IState) => {
    const { roomName, roomNotes, showAlert } = this.state;
    // Display alertstripe
    if (showAlert && !prevState.showAlert) {
      setTimeout(() => this.setState({ showAlert: false }), 5000);
    }
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
    const { id } = this.props.match.params;
    fetch(`http://localhost:5000/room/${id}`)
      .then(response => response.json())
      .then(room => this.setState({ room, roomName: room.name, roomNotes: room.info }));
  }

  public render() {
    const { id } = this.props.match.params;
    const { buttonDisabled, roomName, roomNotes, showAlert, redirect } = this.state;
    const onClick = id ? this.updateRoom : this.createRoom;
    if (redirect) return <Redirect to={'/admin/rooms'} />;
    return (
      <Presentational
        roomName={roomName}
        roomNotes={roomNotes}
        buttonDisabled={buttonDisabled}
        setNotes={this.setNotes}
        setName={this.setName}
        onClick={onClick}
        deleteRoom={this.deleteRoom}
        showAlert={showAlert}
        roomId={id}
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
    const body = { [POST_ROOM_NOTES]: roomNotes, [POST_ROOM_NAME]: roomName };
    postRoom(body)
      .then(() => this.setState({ redirect: true }), () => this.setState({ showAlert: true }));
  }

  private deleteRoom = () => {
    const { room } = this.state;
    if (!room) return null;
    fetch(`http://localhost:5000/room/${room.id}`, {
      headers: POST_HEADERS,
      method: 'delete',
    })
      .then(response => response.status)
      .then((statusCode) => {
        if (statusCode === 200) this.setState({ redirect: true });
        if (statusCode === 400) this.setState({ showAlert: true });
      });
  }

  private updateRoom = () => {
    const { roomName, roomNotes, room } = this.state;
    if (!room) return null;
    const body = { info: roomNotes, name: roomName };
    fetch(`http://localhost:5000/room/${room.id}`, {
      body: JSON.stringify(body),
      headers: POST_HEADERS,
      method: 'put',
    })
      .then(response => response.status)
      .then((statusCode) => {
        if (statusCode === 200) this.setState({ redirect: true });
        if (statusCode === 400) this.setState({ showAlert: true });
      });
  }
}

export default CreateRoom;
