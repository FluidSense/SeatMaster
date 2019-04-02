import KnappBase from 'nav-frontend-knapper';
import Modal from 'nav-frontend-modal';
import * as React from 'react';
import { Link } from 'react-router-dom';
import { _ALERT_USER_SUBMISSION, _SUBMIT_BUTTON_MODAL } from './strings';

interface IProps {
  modalIsOpen: boolean;
  changeModal: (modalOpen: boolean) => void;
  accept: () => void;
}

export const ConfirmationModal: React.FunctionComponent<IProps> = (props) => {
  const { changeModal, accept } = props;
  const closeModal = () => changeModal(false);
  return (
    <Modal
      isOpen={props.modalIsOpen}
      onRequestClose={closeModal}
      closeButton={false}
      contentLabel="Form submitted"
    >
      <div style={{ padding: '2rem 2.5rem' }} className="modalContent">
        {_ALERT_USER_SUBMISSION}
        <br />
        <Link to="/">
          <KnappBase type="hoved" htmlType="submit" onClick={accept} autoDisableVedSpinner={true}>
            {_SUBMIT_BUTTON_MODAL}
          </KnappBase>
        </Link>
      </div>
    </Modal>
  );
};

export default ConfirmationModal;
