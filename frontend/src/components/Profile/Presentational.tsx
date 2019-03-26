import KnappBase from 'nav-frontend-knapper';
import Modal from 'nav-frontend-modal';
import { Normaltekst, Sidetittel, Systemtittel } from 'nav-frontend-typografi';
import { User } from 'oidc-client';
import * as React from 'react';
import { _PROFILE_DELETE_WARNING, _PROFILE_INFORMATION_TEXT } from './constants';
import './profile.css';

interface IDispatchProps {
  deleteAndRemoveUser: () => void;
}

interface IStateProps {
  isLoadingUser: boolean;
  user?: User;
}

type IProps = IDispatchProps & IStateProps;

interface IState {
  modalOpen: boolean;
}

export class Presentational extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      modalOpen: false,
    };
  }

  public render() {
    const { isLoadingUser } = this.props;

    return (
      <>
        <Modal
          className="deletionModal"
          isOpen={this.state.modalOpen}
          onRequestClose={this.changeModal}
          closeButton={true}
          contentLabel="Deletion confirmation"
        >
          <div style={{ padding: '2rem 2.5rem' }} className="modalContent">
            Are you sure you want to delete your user?
            This cannot be undone.
          <br />
            <br />
            <KnappBase
              className="deleteButton"
              type="fare"
              htmlType="submit"
              autoDisableVedSpinner={true}
              disabled={isLoadingUser}
              onClick={this.deleteUser}
            >
              Yes, I am sure
            </KnappBase>
          </div>
        </Modal>
        <div className="main-content">
          <Sidetittel tag="h1">
            Your profile information
        </Sidetittel>
          <Normaltekst>
            {_PROFILE_INFORMATION_TEXT}
          </Normaltekst>
          <br />
          <Systemtittel tag="h3">Information stored about you</Systemtittel>
          <Normaltekst tag="ul">
            <Normaltekst tag="li">
              Feide identity
          </Normaltekst>
            <Normaltekst tag="li">
              Full name
          </Normaltekst>
            <Normaltekst tag="li">
              Email
          </Normaltekst>
            <Normaltekst tag="li">
              Completed subjects and master status
          </Normaltekst>
            <Normaltekst tag="li">
              All your application preferences
          </Normaltekst>
          </Normaltekst>
          <br />
          <Normaltekst>
            {_PROFILE_DELETE_WARNING}
          </Normaltekst>
          <br />

          <KnappBase
            className="modalButton"
            type="fare"
            htmlType="submit"
            autoDisableVedSpinner={true}
            disabled={isLoadingUser}
            onClick={this.changeModal}
          >
            Delete my user
        </KnappBase>
        </div>
      </>
    );
  }

  private deleteUser = async (event: React.MouseEvent) => {
    const { deleteAndRemoveUser, user } = this.props;
    event.preventDefault();

    if (user && !user.expired) {
      await deleteAndRemoveUser();
    }
  }

  private changeModal = () => {
    const modalState = this.state.modalOpen ? false : true;
    this.setState({ modalOpen: modalState });
  }
}

export default Presentational;
