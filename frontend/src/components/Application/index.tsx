import * as React from 'react';

import ApplicationForm from '../ApplicationForm';
import ConfirmationModal from './../ApplicationForm/ConfirmationModal';

interface IState {
  modalIsOpen: boolean;
}

export class Application extends React.Component<{}, IState> {
  constructor(props: object) {
    super(props);
    this.state = {
      modalIsOpen: false,
    };
  }

  public render() {
    return (
      <div>
        <h1>My application</h1>
        <ConfirmationModal modalIsOpen={this.state.modalIsOpen} changeModal={this.changeModal} />
        <ApplicationForm changeModal={this.changeModal} />
      </div >
    );
  }

  private changeModal = (modalOpen: boolean) => { this.setState({ modalIsOpen: modalOpen }); };
}

export default Application;
