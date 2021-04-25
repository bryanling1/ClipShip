import { ModalSeverity } from '..//types';
import Modal from 'components/modal';
import React from 'react';

interface StateProps {
  open: boolean;
  onClose: () => void;
}
const NoSaveModal = (props: StateProps): JSX.Element => {
  const { open, onClose } = props;

  function handleCloseModal() {
    onClose();
  }

  return (
    <Modal
      open={open}
      title="Current Project Not Saved"
      onCloseModal={handleCloseModal}
      onClickOk={handleCloseModal}
      confirmText="OK"
      alertType={ModalSeverity.ERORR}
      alertMessage={'Please save your current project to continue'}
      width="600px"
    />
  );
};

export default NoSaveModal;
