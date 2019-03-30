import KnappBase from 'nav-frontend-knapper';
import React from 'react';
import { IApplication } from '../Application';
import { APP_APPROVED } from '../commonConstants';
import Modal from '../Modal';

interface IProps {
  applications: IApplication[];
  putWaiting: (numbers: number[]) => void;
}

interface IState {
  modalOpen: boolean;
}

export class PutOnWaitingList extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      modalOpen: false,
    };
  }

  public waitingListAllStudents = () => {
    this.toggleModal();
  }

  public render() {
    const waiters = this.props.applications.filter((app: IApplication) => {
      return app.seat && app.status !== APP_APPROVED ? true : false;
    });
    const waiterStudents = waiters.map((app, i) =>
    <li key={i}>{app.user.username}</li>);

    return(
      <div>
        <KnappBase
          type="hoved"
          htmlType="submit"
          onClick={this.toggleModal}
        >
          Her ska det runkas
        </KnappBase>
        <Modal
          modalOpen={this.state.modalOpen}
          toggleModal={this.toggleModal}
          accept={this.waitingListAllStudents}
          close={this.toggleModal}
        >
          {waiterStudents}
        </Modal>
      </div>
    );
  }

  private toggleModal = () => {
    const { modalOpen } = this.state;
    this.setState({ modalOpen: !modalOpen });
  }
}

export default PutOnWaitingList;
