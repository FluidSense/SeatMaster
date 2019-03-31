import KnappBase from 'nav-frontend-knapper';
import React from 'react';
import { IUser } from '../../API/interfaces';
import Modal from '../Modal';

interface IProps {

  users: IUser[];
/*   deleteStudent: (students: number[]) => void;
  deleteStudents: () => void;
  userToBeDeleted: (id: number) => void;
  filteredStudents: IUser[];
  usersToBeDeleted: number[];
 */
}

interface IState {
  modalOpen: boolean;
}

export class DeleteButton extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      modalOpen: false,
    };
  }

  public render() {
    const modalText = (
      <>
        <p>hei</p>
        <ul>
          hei
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
          tjena
        </KnappBase>
        <Modal
          modalOpen={this.state.modalOpen}
          toggleModal={this.toggleModal}
          accept={this.toggleModal}
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

export default DeleteButton;
