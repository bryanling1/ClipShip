import Button from '../../button';
import CheckIcon from '@material-ui/icons/Check';
import CloseIcon from '@material-ui/icons/Close';
import DeleteIcon from '@material-ui/icons/Delete';
import DeleteProjectModal from '../../modal/modals/delete-project';
import IconButton from '@material-ui/core/IconButton';
import Loader from '../../loader';
import React, { useEffect, useState } from 'react';
import SaveIcon from '@material-ui/icons/Save';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import styled from 'styled-components';

interface stateProps {
  content: string | null;
  editMode: boolean;
  onCreate: (content: string) => void;
  onNameChange: (content: string) => void;
  onSaveProject: () => void;
  canSave: boolean;
  onDeleteProject: () => void;
}

const ProjectName = (props: stateProps): JSX.Element => {
  const {
    content,
    editMode,
    onCreate,
    onNameChange,
    onSaveProject,
    canSave,
    onDeleteProject: deleteProject,
  } = props;
  const [isEditMode, setIsEditMode] = useState<boolean>(editMode || false);
  const [value, setValue] = useState<string>(content || '');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [deleteProjectButton, setDeleteProjectButton] = useState<boolean>(false);
  const [deleteModal, setDeleteModal] = useState(false);

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
      setDeleteProjectButton(false);
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
    setDeleteProjectButton(false);
  }, [content]);

  //For setting the loader animation for name change
  useEffect(() => {
    if (isLoading && content === value) {
      setIsLoading(false);
      setIsEditMode(false);
    }
  }, [isLoading, content, value]);

  //For setting the loader animation for save project
  const [saving, setSaving] = useState(false);
  useEffect(() => {
    if (saving && !canSave) {
      setSaving(false);
    }
  }, [saving, canSave]);

  const handleSaveProject = () => {
    if (!saving) {
      onSaveProject();
      setSaving(true);
    }
  };

  const handleCloseModal = () => {
    setIsEditMode(false);
    setDeleteModal(false);
  };

  const onDeleteProject = () => {
    deleteProject();
  };

  return (
    <MainWrapper>
      <DeleteProjectModal
        open={deleteModal}
        handleClose={handleCloseModal}
        handleDelete={onDeleteProject}
      />
      {!saving && (
        <ButtonWrapper
          variant="contained"
          startIcon={<SaveIcon />}
          onClick={handleSaveProject}
          disabled={!canSave}
        >
          Save Project
        </ButtonWrapper>
      )}
      {saving && <LoaderWrapper />}

      {!isEditMode && (
        <TypographyWrapper
          onClick={handleEditModeOn}
          variant={'h4'}
          onMouseEnter={() => {
            setDeleteProjectButton(true);
          }}
          onMouseLeave={() => {
            setDeleteProjectButton(false);
          }}
        >
          {content}
          {deleteProjectButton && (
            <IconButtonWrapper
              onClick={() => {
                setDeleteModal(true);
              }}
            >
              <DeleteIcon />
            </IconButtonWrapper>
          )}
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
  width: 100%;
  position: relative;
`;

const TypographyWrapper = styled(Typography)`
   {
    padding-left: 6px;
    padding-right: 6px;
    position: relative;
  }
  &:hover {
    border: 2px solid rgba(0, 0, 0, 0.54);
    border-radius: 4px;
    cursor: pointer;
    padding-right: 100px;
    padding-left: -2px;
  }
`;

const ButtonWrapper = styled(Button)`
  && {
    position: absolute;
    right: 0;
    top: 0;
  }
`;

const LoaderWrapper = styled(Loader)`
  &&& {
    position: absolute;
    right: 0;
    top: 0;
  }
`;

const IconButtonWrapper = styled(IconButton)`
  && {
    position: absolute;
    right: 0;
    top: -4px;
    z-index: 3;
    margin: 0;
  }
`;
