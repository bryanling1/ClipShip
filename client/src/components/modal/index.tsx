import { Severity } from './types';
import Alert from '@material-ui/lab/Alert';
import AlertTitle from '@material-ui/lab/AlertTitle';
import Button from '@material-ui/core/Button';
import CloseIcon from '@material-ui/icons/Close';
import Collapse from '@material-ui/core/Collapse';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import IconButton from '@material-ui/core/IconButton';
import LoadingAnimation from '../loader';
import React from 'react';
import styled from 'styled-components';

export interface ModalProps {
  open: boolean;
  title?: string | React.ReactElement | null;
  hasCloseX?: boolean;
  onCloseModal?: () => void;
  onClickOk?: () => void;
  confirmText?: string;
  onClickCancel?: () => void;
  isOk?: () => boolean;
  notOkMessage?: () => string;
  children?: string | React.ReactNode;
  alertType?: Severity;
  alertTitle?: string;
  alertMessage?: string;
  width?: string;
  isLoading?: boolean;
}

function modal(props: ModalProps): JSX.Element {
  const {
    open,
    title,
    hasCloseX = false,
    onCloseModal,
    onClickOk,
    confirmText,
    onClickCancel,
    children,
    alertType,
    alertTitle,
    alertMessage,
    isLoading,
    width,
  } = props;

  const handleClose = () => {
    onCloseModal && onCloseModal();
  };

  const handleCancel = () => {
    onClickCancel && onClickCancel();
  };

  const handleOk = () => {
    onClickOk && onClickOk();
  };

  return (
    <DialogWrapper
      open={open}
      onClose={hasCloseX ? undefined : handleClose}
      maxWidth={false}
      width={width}
    >
      <DialogTitle>
        {title}
        {hasCloseX && (
          <CloseButtonWrapper aria-label="close" onClick={handleClose}>
            <CloseIcon />
          </CloseButtonWrapper>
        )}
      </DialogTitle>
      <DialogContent>
        <Collapse in={alertMessage !== undefined && alertMessage !== ''}>
          <Alert severity={alertType}>
            {alertTitle && <AlertTitle>{alertTitle}</AlertTitle>}
            {alertMessage}
          </Alert>
        </Collapse>
        {children}
      </DialogContent>
      <DialogActions>
        {isLoading && <LoadingAnimation />}

        {onClickCancel && (
          <Button onClick={handleCancel} color="primary">
            Cancel
          </Button>
        )}
        {onClickOk && (
          <Button onClick={handleOk} color="primary" variant="contained">
            {confirmText}
          </Button>
        )}
      </DialogActions>
    </DialogWrapper>
  );
}

export default modal;

const CloseButtonWrapper = styled(IconButton)`
  && {
    position: absolute;
    top: 0;
    right: 0;
  }
`;

const DialogWrapper = styled((otherProps) => <Dialog {...otherProps} />)`
  && > .MuiDialog {
    &-container {
      align-items: start;
    }
  }
  & > .MuiDialog-container > .MuiPaper-root {
    min-width: ${(props) => props.width};
  }
`;
