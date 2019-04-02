import * as React from 'react';
import ApplicationForm from '../ApplicationForm';

interface IProps {
  modalIsOpen: boolean;
  changeModal: () => void;
}

export const Presentational: React.FunctionComponent<IProps> = (props) => {
  const { modalIsOpen, changeModal } = props;
  return (
    <ApplicationForm modalIsOpen={modalIsOpen} changeModal={changeModal} />
  );
};

export default Presentational;
