import KnappBase from 'nav-frontend-knapper';
import Modal from 'nav-frontend-modal';
import React, { Component } from 'react';
import { _NO, _YES } from './strings';

interface IProps {
  modalOpen: boolean;
  toggleModal: () => void;
  accept: () => void;
  close: () => void;
  text?: string;
}

class CustomModal extends Component<IProps> {
  public componentDidMount = () => {
    Modal.setAppElement('body');
  }

  public render() {
    const { modalOpen, toggleModal, close, accept, text } = this.props;
    if (!modalOpen) return null;
    return (
      <>
        <Modal
          isOpen={modalOpen}
          onRequestClose={toggleModal}
          closeButton={false}
          contentLabel="Min modalrute"
        >
          {text}
          <div>
            <KnappBase id="modal-accept" type="flat" onClick={accept}>{_YES}</KnappBase>
            <KnappBase id="modal-decline" type="flat" onClick={close}>{_NO}</KnappBase>
          </div>
        </Modal>
      </>
    );
  }
}

export default CustomModal;
