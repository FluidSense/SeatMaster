import React, { Component } from 'react';
import { connect } from 'react-redux';
import Presentational from './Presentational';

// TODO Change values from string to strin/boolean/number
interface IState {
  notesValue: string;
  nameValue: string;
  seatValue: string;
  buttonDisabled: string;
  [key: string]: string;
}

export type validValues = boolean | string | number;

// tslint:disable-next-line:class-name
class _CreateRoom extends Component<{}, IState> {
  constructor(props: {}) {
    super(props);
    this.state = {
      buttonDisabled: 'false',
      nameValue: '',
      notesValue: '',
      seatValue: '0',
    };
  }

  public componentDidUpdate = (prevState: IState) => {
    if (prevState === this.state) return;
  }

  public render() {
    const { nameValue, notesValue, seatValue, buttonDisabled } = this.state;
    // Sending down the array entries so each field can
    // update themselves with a single updateState function written below
    const stateEntries = Object.entries(this.state);
    const buttonEntry = stateEntries[0];
    const nameEntry = stateEntries[1];
    const notesEntry = stateEntries[2];
    const seatEntry = stateEntries[3];
    return (
      <Presentational
        nameEntry={nameEntry}
        notesEntry={notesEntry}
        seatEntry={seatEntry}
        buttonEntry={buttonEntry}
        updateState={this.updateState}
      />
    );
  }

  // Given the key (from state) as a key and a new value
  private updateState = (key: string, value: string) => {
    console.log(value)
    this.setState({ [key]: value });
  }
}

const CreateRoom = connect(
  null,
  null,
)(_CreateRoom);

export default CreateRoom;
