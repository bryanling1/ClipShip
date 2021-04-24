import CheckIcon from '@material-ui/icons/Check';
import CloseIcon from '@material-ui/icons/Close';
import IconButton from '@material-ui/core/IconButton';
import Loader from '../../loader';
import React, { useEffect, useState } from 'react';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import styled from 'styled-components';

interface stateProps {
  content: string | null;
  editMode: boolean;
  onCreate: (content: string) => void;
  onNameChange: (content: string) => void;
}

const ProjectName = (props: stateProps): JSX.Element => {
  const { content, editMode, onCreate, onNameChange } = props;
  const [isEditMode, setIsEditMode] = useState<boolean>(editMode || false);
  const [value, setValue] = useState<string>(content || '');
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleEditModeOn = () => {
    setIsEditMode(true);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  const handleCancel = () => {
    if (content) {
      setValue(content);
      setIsEditMode(false);
    }
  };

  const submit = () => {
    if (value && value !== content && !isLoading) {
      setIsLoading(true);
      if (!content) {
        onCreate(value);
      } else {
        onNameChange(value);
      }
    } else {
      setIsEditMode(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' || e.key === 'Tab') {
      e.preventDefault();
      submit();
    } else if (e.key === 'Escape') {
      handleCancel();
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    submit();
  };

  //For switching between projects
  useEffect(() => {
    if (!content) {
      handleEditModeOn();
      setValue('');
    } else {
      setIsEditMode(false);
      setValue(content);
    }
    setIsLoading(false);
  }, [content]);

  //For setting the loader animation
  useEffect(() => {
    if (isLoading && content === value) {
      setIsLoading(false);
      setIsEditMode(false);
    }
  }, [isLoading, content, value]);

  return (
    <MainWrapper>
      {!isEditMode && (
        <TypographyWrapper onClick={handleEditModeOn} variant={'h5'}>
          {content}
        </TypographyWrapper>
      )}
      {isEditMode && (
        <>
          <form onSubmit={handleSubmit}>
            <TextField
              value={value}
              onChange={handleChange}
              variant="outlined"
              size="small"
              autoFocus
              onKeyDown={handleKeyDown}
              placeholder={'Project Name'}
            />
            {!isLoading && (
              <IconButton type="submit">
                <CheckIcon />
              </IconButton>
            )}
          </form>
          {!isLoading && (
            <IconButton onClick={handleCancel}>
              <CloseIcon />
            </IconButton>
          )}

          {isLoading && <Loader size={25} />}
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
