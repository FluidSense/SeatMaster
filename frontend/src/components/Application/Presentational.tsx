import * as React from 'react';
import ApplicationForm from '../ApplicationForm';
import ConfirmationModal from './../ApplicationForm/ConfirmationModal';

interface IProps {
  modalIsOpen: boolean;
  changeModal: (modalOpen: boolean) => void;
}

export const Presentational: React.FunctionComponent<IProps> = (props) => {
  return (
    <>
      <ConfirmationModal modalIsOpen={props.modalIsOpen} changeModal={props.changeModal} />
      <ApplicationForm changeModal={props.changeModal} />
    </>
  );
};

export default Presentational;
