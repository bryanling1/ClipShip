import { ModalSeverity } from '..//types';
import Modal from 'components/modal';
import React from 'react';

interface StateProps {
  open: boolean;
  handleClose: () => void;
  handleDelete: () => void;
}
const Delete = (props: StateProps): JSX.Element => {
  const { open, handleClose, handleDelete: onDelete } = props;

  function handleCloseModal() {
    handleClose();
  }

  function handleDelete() {
    //Deletes Run
    handleClose();
    onDelete();
  }

  return (
    <Modal
      open={open}
      title="Delete Project"
      onCloseModal={handleCloseModal}
      onClickCancel={handleCloseModal}
      onClickOk={handleDelete}
      confirmText="Delete"
      alertTitle={'WARNING'}
      alertType={ModalSeverity.WARNING}
      alertMessage={'This action cannot be undone'}
      width="600px"
    />
  );
};

export default Delete;
