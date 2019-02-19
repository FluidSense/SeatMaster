import * as React from 'react';
import { Link } from 'react-router-dom';

import KnappBase from 'nav-frontend-knapper';
import Modal from 'nav-frontend-modal';
import { _ALERT_USER_SUBMISSION } from './Strings';

interface IProps {
  modalIsOpen: boolean;
  changeModal: (modalOpen: boolean) => void;
}

export const ConfirmationModal: React.FunctionComponent<IProps> = (props) => {
  const { changeModal } = props;
  const closeModal = () => changeModal(false);
  return (
    <Modal
      isOpen={props.modalIsOpen}
      onRequestClose={closeModal}
      closeButton={true}
      contentLabel="Form submitted"
    >
      <div style={{ padding: '2rem 2.5rem' }}>
        {_ALERT_USER_SUBMISSION}
        <br />
        <Link to="/">
          <KnappBase type="hoved" htmlType="submit" autoDisableVedSpinner={true}>Go home</KnappBase>
        </Link>
      </div>
    </Modal>
  );
};

export default ConfirmationModal;
