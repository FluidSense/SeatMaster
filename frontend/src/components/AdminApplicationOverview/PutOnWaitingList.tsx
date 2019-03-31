import KnappBase from 'nav-frontend-knapper';
import React from 'react';
import { IApplication } from '../Application';
import { APP_APPROVED, APP_WAITING } from '../commonConstants';
import Modal from '../Modal';
import './adminApplicationOverview.css';
import { _WAITING_LIST_WARNING } from './constants';
import { _PUT_ON_WAITING_LIST } from './strings';

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
    const waiters = this.props.applications.filter(app => app.seat ? false : true);
    const ids = waiters.map(app => app.id);
    this.props.putWaiting(ids);
    this.toggleModal();
  }

  public render() {
    const waiters = this.props.applications.filter((app: IApplication) => {
      return app.status !== APP_WAITING && app.status !== APP_APPROVED ? true : false;
    });
    const waiterStudents = waiters.map((app, i) =>
    <li key={i}>{app.user.username}</li>);
    const modalText = (
      <>
        <p>{_WAITING_LIST_WARNING}</p>
        <ul>
          {waiterStudents}
        </ul>
      </>
    );

    return(
      <div>
        <KnappBase
          type="flat"
          htmlType="submit"
          onClick={this.toggleModal}
          className="waiting-list-button"
        >
          {_PUT_ON_WAITING_LIST}
        </KnappBase>
        <Modal
          modalOpen={this.state.modalOpen}
          toggleModal={this.toggleModal}
          accept={this.waitingListAllStudents}
          close={this.toggleModal}
        >
          {modalText}
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
