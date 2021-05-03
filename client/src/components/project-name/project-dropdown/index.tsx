import ErrorModal from '../../modal/modals/no-save';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import IconButton from '@material-ui/core/IconButton';
import Loader from '../../loader';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';

const ITEM_HEIGHT = 48;

interface Project {
  name: string;
  id: string;
}

interface OwnProps {
  onSetProject: (id: string) => void;
  onNewProject: () => void;
  id: string | null;
  canSave: boolean;
}

const ProjectDropdown = (props: OwnProps): JSX.Element => {
  const { onSetProject, onNewProject, id: projectId, canSave } = props;
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const [projectsList, setProjectList] = useState<Project[]>([]);
  const [id, setId] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [errorModal, setErrorModal] = useState<boolean>(false);

  useEffect(() => {
    if (open) {
      setLoading(true);
      setProjectList([]);
      axios
        .get<Project[]>('http://localhost:5000/projects')
        .then((result) => {
          setProjectList(
            result.data.map((project) => ({ name: project.name, id: project.id })).reverse()
          );
          setLoading(false);
        })
        .catch((err) => console.log(err));
    }
  }, [open]);

  useEffect(() => {
    if (id !== projectId) {
      setId(projectId || '');
    }
  }, [projectId, id]);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleCreateProject = () => {
    if (canSave) {
      setErrorModal(true);
    } else {
      handleClose();
      setId('');
      onNewProject();
    }
  };

  return (
    <>
      <ErrorModal
        open={errorModal}
        onClose={() => {
          setErrorModal(false);
        }}
      />
      <IconButton
        aria-label="more"
        aria-controls="long-menu"
        aria-haspopup="true"
        onClick={handleClick}
      >
        <ExpandMoreIcon />
      </IconButton>
      <Menu
        id="long-menu"
        anchorEl={anchorEl}
        keepMounted
        open={open}
        onClose={handleClose}
        PaperProps={{
          style: {
            maxHeight: ITEM_HEIGHT * 4.5,
            width: '40ch',
          },
        }}
      >
        <CreateProjectButton key={'create-new-project'} selected onClick={handleCreateProject}>
          + Create Project
        </CreateProjectButton>
        {loading && <Loader size={25} />}
        {projectsList.map((project) => (
          <MenuItemWrapper key={project.id} selected={id === project.id ? 1 : 0}>
            <MenuItem
              onClick={() => {
                if (canSave) {
                  setErrorModal(true);
                } else {
                  onSetProject(project.id);
                  handleClose();
                  setId(project.id);
                }
              }}
            >
              {project.name}
            </MenuItem>
          </MenuItemWrapper>
        ))}
      </Menu>
    </>
  );
};

export default ProjectDropdown;

const CreateProjectButton = styled(MenuItem)`
  &&& {
    color: white;
    background-color: ${(props) => props.theme.colors.primary};
    text-align: center;
    font-weight: bold;
  }
  &&&:hover {
    background-color: ${(props) => props.theme.colors.primary};
  }
`;

interface MenuItemWrapperProps {
  selected: number;
}
const MenuItemWrapper = styled.div<MenuItemWrapperProps>`
  color: ${(props) => (props.selected ? props.theme.colors.primary : 'white')};
  && .MuiMenuItem-root {
    font-weight: ${(props) => (props.selected ? 'bold' : 'initial')};
  }
`;
