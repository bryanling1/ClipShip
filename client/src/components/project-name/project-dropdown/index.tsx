import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import IconButton from '@material-ui/core/IconButton';
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
}

const ProjectDropdown = (props: OwnProps): JSX.Element => {
  const { onSetProject, onNewProject, id: projectId } = props;
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const [projectsList, setProjectList] = useState<Project[]>([]);
  const [id, setId] = useState<string>('');

  useEffect(() => {
    if (open) {
      axios.get<Project[]>('http://localhost:3000/projects').then((result) => {
        setProjectList(result.data.map((project) => ({ name: project.name, id: project.id })));
      });
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
    handleClose();
    setId('');
    onNewProject();
  };

  return (
    <>
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
        {projectsList.map((project) => (
          <MenuItemWrapper key={project.id} selected={id === project.id ? 1 : 0}>
            <MenuItem
              onClick={() => {
                onSetProject(project.id);
                handleClose();
                setId(project.id);
              }}
            >
              {project.name}
            </MenuItem>
          </MenuItemWrapper>
        ))}
        <CreateProjectButton key={'create-new-project'} selected onClick={handleCreateProject}>
          + Create Project
        </CreateProjectButton>
      </Menu>
    </>
  );
};

export default ProjectDropdown;

const CreateProjectButton = styled(MenuItem)`
  && {
    color: white;
    background-color: #8854d0;
    text-align: center;
    font-weight: bold;
  }
  &&:hover {
    background-color: #8854d0;
  }
`;

interface MenuItemWrapperProps {
  selected: number;
}
const MenuItemWrapper = styled.div<MenuItemWrapperProps>`
  color: ${(props) => (props.selected ? ' #8854d0' : 'initial')};
`;
