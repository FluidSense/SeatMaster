import React, { Component } from 'react';
import { connect } from 'react-redux';
import Presentational from './Presentational';

interface IState {
  notesValue: string;
  nameValue: string;
  seatValue: number;
  buttonDisabled: boolean;
  [key: string]: validValues;
}

export type validValues = boolean | string | number;

// tslint:disable-next-line:class-name
class _CreateRoom extends Component<{}, IState> {
  constructor(props: {}) {
    super(props);
    this.state = {
      buttonDisabled: false,
      nameValue: '',
      notesValue: '',
      seatValue: 0,
    };
  }

  public render() {
    const { nameValue, notesValue, seatValue, buttonDisabled } = this.state;
    return (
      <Presentational
        nameValue={nameValue}
        notesValue={notesValue}
        seatValue={seatValue}
        buttonDisabled={buttonDisabled}
        updateState={this.updateState}
      />
    );
  }

  private updateState = (key: string, value: validValues) => this.setState({ [key]: value });
}

const CreateRoom = connect(
  null,
  null,
)(_CreateRoom);

export default CreateRoom;
