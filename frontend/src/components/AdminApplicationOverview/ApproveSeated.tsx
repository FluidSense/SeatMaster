import KnappBase from 'nav-frontend-knapper';
import React from 'react';
import { IApplication } from '../Application';
import Modal from '../Modal';
import { _APPROVE_STUDENTS_WARNING } from './constants';

interface IProps {
  applications: IApplication[];
  approve: (numbers: number[]) => void;
}

interface IState {
  modalOpen: boolean;
}

export class ApproveSeated extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      modalOpen: false,
    };
  }

  public approveAllStudents = () => {
    const approved = this.props.applications.filter(app => app.seat ? true : false);
    const ids = approved.map(app => app.id);
    this.props.approve(ids);
    this.toggleModal();
  }

  public render() {
    const approved = this.props.applications.filter(app => app.seat ? true : false);
    const approvingStudents = approved.map((app, i) =>
    <li key={i}>{app.user.username}</li>);
    const modalText = (
      <>
        <p>{_APPROVE_STUDENTS_WARNING}</p>
        <ul>
          <li>{approvingStudents}</li>
        </ul>
      </>
    );

    return (
      <div>
        <KnappBase
          type="hoved"
          htmlType="submit"
          onClick={this.toggleModal}
        >
          Approve Applications
        </KnappBase>
        <Modal
          modalOpen={this.state.modalOpen}
          toggleModal={this.toggleModal}
          accept={this.approveAllStudents}
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

export default ApproveSeated;
