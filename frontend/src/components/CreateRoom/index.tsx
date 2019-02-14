import React, { Component } from 'react';
import { connect } from 'react-redux';
import Presentational from './Presentational';

// TODO Change values from string to strin/boolean/number
interface IState {
  notesValue: string;
  nameValue: string;
  buttonDisabled: boolean;
  [key: string]: validValues;
}

export type validValues = boolean | string;

// tslint:disable-next-line:class-name
class _CreateRoom extends Component<{}, IState> {
  constructor(props: {}) {
    super(props);
    this.state = {
      buttonDisabled: true,
      nameValue: '',
      notesValue: '',
    };
  }

  public componentDidUpdate = (prevProps: {}, prevState: IState) => {
    if (prevState !== this.state) {
      const { nameValue, notesValue } = this.state;
      this.setState({ buttonDisabled: true });
    }
  }

  public render() {
    const { buttonDisabled, nameValue, notesValue } = this.state;
    // Sending down the array entries so each field can
    // update themselves with a single updateState function written below
    const stateEntries = Object.keys(this.state);
    const nameKey = stateEntries[1];
    const notesKey = stateEntries[2];
    return (
      <Presentational
        nameValue={nameValue}
        nameKey={nameKey}
        notesValue={notesValue}
        notesKey={notesKey}
        buttonDisabled={buttonDisabled}
        updateState={this.updateState}
        createRoom={this.createRoom}
      />
    );
  }

  // Given the key (from state) as a key and a new value
  private updateState = (key: string, value: string) => this.setState({ [key]: value });

  private createRoom = () => {
    console.log("ROOM CREATED BATCHES");
  }
}

const CreateRoom = connect(
  null,
  null,
)(_CreateRoom);

export default CreateRoom;
