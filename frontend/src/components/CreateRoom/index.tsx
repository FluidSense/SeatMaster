import React, { ChangeEvent, Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router';
import {
  POST_HEADERS,
  POST_NEW_ROOM_URL,
  POST_ROOM_NAME,
  POST_ROOM_NOTES,
} from '../commonConstants';
import Presentational from './Presentational';

interface IState {
  roomName: string;
  roomNotes: string;
  buttonDisabled: boolean;
  showAlert: boolean;
  redirect: boolean;
}

// tslint:disable-next-line:class-name
class _Container extends Component<{}, IState> {
  constructor(props: {}) {
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

  public render() {
    const { buttonDisabled, roomName, roomNotes, showAlert, redirect } = this.state;
    if (redirect) return <Redirect to={'/admin/room'} />;
    return (
      <>
        <Presentational
          roomName={roomName}
          roomNotes={roomNotes}
          buttonDisabled={buttonDisabled}
          setNotes={this.setNotes}
          setName={this.setName}
          createRoom={this.createRoom}
          showAlert={showAlert}
        />
      </>
    );
  }

  private setNotes = (notesEvent: ChangeEvent<HTMLInputElement>) =>  {
    const roomNotes = notesEvent.target.value;
    this.setState({ roomNotes });
  }
  private setName = (nameEvent: ChangeEvent<HTMLInputElement>) => {
    const roomName = nameEvent.target.value;
    this.setState({ roomName });
  }

  private createRoom = () => {
    const { roomName, roomNotes } = this.state;
    const body = { [POST_ROOM_NAME]: roomName, [POST_ROOM_NOTES]: roomNotes };
    fetch(POST_NEW_ROOM_URL, {
      body: JSON.stringify(body),
      headers: POST_HEADERS,
      method: 'post',
    })
    .then(response => response.status)
    .then((statusCode) => {
      if (statusCode === 201) this.setState({ redirect: true });
      if (statusCode === 400) this.setState({ showAlert: true });
    });
  }
}

const CreateRoom = connect(
  null,
  null,
)(_Container);

export default CreateRoom;
