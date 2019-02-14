import React, { ChangeEvent, Component } from 'react';
import { connect } from 'react-redux';
import Presentational from './Presentational';

interface IState {
  roomName: string;
  roomNotes: string;
  buttonDisabled: boolean;
}

// tslint:disable-next-line:class-name
class _CreateRoom extends Component<{}, IState> {
  constructor(props: {}) {
    super(props);
    this.state = {
      buttonDisabled: true,
      roomName: '',
      roomNotes: '',
    };
  }

  public componentDidUpdate = (prevProps: {}, prevState: IState) => {
    const { roomName, roomNotes } = this.state;
    if (prevState.roomName !== roomName || prevState.roomNotes !== roomNotes) {
      if (roomName !== '' && roomNotes !== '') this.setState({ buttonDisabled: false });
    }
  }

  public render() {
    const { buttonDisabled, roomName, roomNotes } = this.state;
    return (
      <Presentational
        roomName={roomName}
        roomNotes={roomNotes}
        buttonDisabled={buttonDisabled}
        setNotes={this.setNotes}
        setName={this.setName}
        createRoom={this.createRoom}
      />
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
    console.log(roomName, roomNotes);
  }
}

const CreateRoom = connect(
  null,
  null,
)(_CreateRoom);

export default CreateRoom;
