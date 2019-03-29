import { Knapp } from 'nav-frontend-knapper';
import Lukknapp from 'nav-frontend-lukknapp';
import { Panel } from 'nav-frontend-paneler';
import { Input } from 'nav-frontend-skjema';
import React, { Component } from 'react';
import { IUser } from '../../API/interfaces';
import Modal from '../Modal';
import { _CHANGE_ID, _DELETE_SEAT_CONFIRMATION, _SEAT_NOT_OCCUPIED } from './strings';

interface IProps {
  id: string;
  deleteSelf: (id: string) => void;
  updateSelf: (oldId: string, newId: string) => void;
  user?: IUser;
}

interface IState {
  inputContent: string;
  modalOpen: boolean;
}

class Seat extends Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      inputContent: '',
      modalOpen: false,
    };
  }

  public render() {
    const { id, user } = this.props;
    const { modalOpen } = this.state;
    const seatOccupied = user ? `${user.fullname} is occupying the seat.` : _SEAT_NOT_OCCUPIED;
    return (
      <>
        <Panel border={true}>
          <Input label={'Seat ID'} bredde="S" placeholder={id} onChange={this.handleInputChange} />
          <Knapp onClick={this.changeId}>{_CHANGE_ID}</Knapp>
          <Lukknapp bla={true} onClick={this.toggleModal} />
        </Panel>
        <Modal
          modalOpen={modalOpen}
          toggleModal={this.toggleModal}
          close={this.toggleModal}
          accept={this.deleteSeat}
          text={seatOccupied}
        >
          <b>{_DELETE_SEAT_CONFIRMATION}</b>
        </Modal>
      </>
    );
  }

  private toggleModal = () => this.setState({ modalOpen: !this.state.modalOpen });

  private deleteSeat = () => {
    const { id, deleteSelf } = this.props;
    deleteSelf(id);
  }

  private changeId = () => {
    const { id, updateSelf } = this.props;
    const { inputContent } = this.state;
    updateSelf(id, inputContent);
  }

  private handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ inputContent: e.target.value });
  }
}

export default Seat;
