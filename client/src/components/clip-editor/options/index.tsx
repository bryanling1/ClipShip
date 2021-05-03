import * as actions from '../../../store/actions';
import { ConnectedProps, connect } from 'react-redux';
import { StoreState } from '../../../store/reducers/types';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import DeleteClipModal from '../../modal/modals/delete-clip';
import DeleteIcon from '@material-ui/icons/Delete';
import LabelOptionAccordion from './option-accordion/accordions/label';
import React, { useState } from 'react';
import Typography from '@material-ui/core/Typography';
import styled from 'styled-components';

const mapStateToProps = (state: StoreState) => ({
  clips: state.clips,
  project: state.project,
});
const connector = connect(mapStateToProps, actions);

type PropsFromRedux = ConnectedProps<typeof connector>;

type Props = PropsFromRedux;

const Options = (props: Props): JSX.Element => {
  const { project, deleteClip } = props;
  const { selectedClip } = project;
  const [isDeleteModal, setIsDeleteModal] = useState<boolean>(false);
  const handleCloseDeleteClipModal = () => {
    setIsDeleteModal(false);
  };

  const handleDeleteClip = () => {
    if (selectedClip !== null) {
      deleteClip(selectedClip);
    }
  };
  return (
    <MainWrapper>
      <DeleteClipModal
        open={isDeleteModal}
        handleClose={handleCloseDeleteClipModal}
        handleDelete={handleDeleteClip}
      />
      <AccordionWrapper
        expanded={false}
        square
        onChange={() => {
          setIsDeleteModal(true);
        }}
      >
        <AccordionSummaryWrapper
          expandIcon={<DeleteIcon />}
          aria-label="Expand"
          aria-controls="additional-actions1-content"
          id="additional-actions1-header"
        >
          <TypographyWrapper
            onClick={(event) => event.stopPropagation()}
            onFocus={(event) => event.stopPropagation()}
            variant="h5"
          >
            Clip Options
          </TypographyWrapper>
        </AccordionSummaryWrapper>
      </AccordionWrapper>
      <LabelOptionAccordion />
    </MainWrapper>
  );
};

export default connector(Options);

const MainWrapper = styled.div`
  width: 100%;
  height: 100%;
  background-color: ${(props) => props.theme.colors.white0};
  box-sizing: border-box;
  border-radius: 6px;
`;

const AccordionSummaryWrapper = styled(AccordionSummary)`
  && .MuiAccordionSummary-content {
    align-items: center;
  }
`;

const TypographyWrapper = styled(Typography)`
  && {
    flex: 1;
    text-align: center;
  }
`;

const AccordionWrapper = styled(Accordion)`
  && .MuiAccordion-root .Mui-expanded {
    margin-top: 0;
    margin-bottom: 0;
  }
`;
