import CheckIcon from '@material-ui/icons/Check';
import CloseIcon from '@material-ui/icons/Close';
import IconButton from '@material-ui/core/IconButton';
import React, { useState } from 'react';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import styled from 'styled-components';

interface stateProps {
  content: string | null;
  editMode: boolean;
}

const ProjectName = (props: stateProps): JSX.Element => {
  const { content, editMode } = props;
  const [isEditMode, setIsEditMode] = useState<boolean>(editMode || false);

  const handleEditModeOn = () => {
    setIsEditMode(true);
  };

  return (
    <MainWrapper>
      {!isEditMode && (
        <TypographyWrapper onClick={handleEditModeOn} variant={'h5'}>
          {content ? content : 'Create a New Project'}
        </TypographyWrapper>
      )}
      {isEditMode && (
        <>
          <TextField variant="outlined" size="small" autoFocus />
          <IconButton>
            <CheckIcon />
          </IconButton>
          <IconButton>
            <CloseIcon />
          </IconButton>
        </>
      )}
    </MainWrapper>
  );
};

export default ProjectName;

const MainWrapper = styled.div`
  display: flex;
  alight-items: center;
`;

const TypographyWrapper = styled(Typography)`
   {
    padding-left: 6px;
    padding-right: 6px;
  }
  &:hover {
    border: 2px solid rgba(0, 0, 0, 0.54);
    border-radius: 4px;
    cursor: pointer;
  }
`;
