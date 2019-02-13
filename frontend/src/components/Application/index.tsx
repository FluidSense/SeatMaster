import * as React from 'react';

import ApplicationFormContainer from '../ApplicationForm/ApplicationFormContainer';
import ConfirmationModal from './../ApplicationForm/ConfirmationModal';

interface IProps {
  initAction: () => any;
}

interface IState {
  modalIsOpen: boolean;
}

export class Application extends React.Component<IProps, IState> {
  constructor(props: IProps) {
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
        <ApplicationFormContainer changeModal={this.changeModal} />
      </div >
    );
  }

  private changeModal = (modalOpen: boolean) => { this.setState({ modalIsOpen: modalOpen }); };
}

export default Application;
