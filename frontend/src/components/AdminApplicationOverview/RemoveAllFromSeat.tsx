import KnappBase from 'nav-frontend-knapper';
import React from 'react';
import { IPostAdminApplicationForm } from '../../API/interfaces';
import { IApplication } from '../Application';
import { APP_APPROVED, APP_SUBMITTED } from '../commonConstants';
import Modal from '../Modal';
import './adminApplicationOverview.css';
import {
  _PUT_ON_WAITING_LIST,
  _REMOVE_ALL_APPROVED,
  _REMOVE_FROM_SEAT,
  _WAITING_LIST_WARNING,
} from './strings';

interface IProps {
  applications: IApplication[];
  removeFromSeat: (numbers: number[]) => void;
}

interface IState {
  modalOpen: boolean;
}

interface IDispatchProps {
  getAllApplications: () => void;
  updateApplication: (id: number, app: IPostAdminApplicationForm) => void;
}

type Props = IProps & IDispatchProps;

export class RemoveAllFromSeat extends React.Component<Props, IState> {
  constructor(props: Props) {
    super(props);
    this.state = {
      modalOpen: false,
    };
  }

  public removeAll = () => {
    const removees = this.props.applications.filter(app => app.seat ? true : false);
    const removeeIds = removees.map(app => app.id);
    this.props.removeFromSeat(removeeIds);
    removees.map((app) => {
      if (app && app.status === APP_APPROVED) {
        this.props.updateApplication(app.id, { status: APP_SUBMITTED });
      }
    });
    this.props.getAllApplications();
    this.toggleModal();
  }

  public render() {
    const rem = this.props.applications.filter((app: IApplication) => {
      return app.seat;
    });
    const getsRemoved = rem.map((app, i) =>
      <li key={i}>{app.user.fullname}</li>);

    const modalText = (
      <>
        <p>{_REMOVE_ALL_APPROVED}</p>
      </>
    );

    return (
      <div>
        <KnappBase
          type="fare"
          htmlType="submit"
          onClick={this.toggleModal}
          className="remove-list-button"
        >
          {_REMOVE_FROM_SEAT}
        </KnappBase>
        <Modal
          modalOpen={this.state.modalOpen}
          toggleModal={this.toggleModal}
          accept={this.removeAll}
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

export default RemoveAllFromSeat;
