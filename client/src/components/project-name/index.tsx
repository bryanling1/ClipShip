import * as actions from '../../store/actions';
import { ConnectedProps, connect } from 'react-redux';
import { StoreState } from '../../store/reducers/types';
import ProjectNameEdit from './project-name';
import ProjectsDropdown from './project-dropdown';
import React from 'react';
import styled from 'styled-components';

const mapStateToProps = (state: StoreState) => ({
  project: state.project,
});

const connector = connect(mapStateToProps, actions);

type PropsFromRedux = ConnectedProps<typeof connector>;

type Props = PropsFromRedux;

const ProjectName = (props: Props) => {
  const { project, createProject, editName, fetchProject, setProject } = props;
  const handleSetProject = (id: string) => {
    fetchProject(id);
  };
  const handleCreate = (content: string) => {
    createProject(content);
  };
  const handleNameChange = (content: string) => {
    if (project.id) {
      editName(project.id, content);
    }
  };
  const handleNewProject = () => {
    setProject(null, null);
  };

  return (
    <MainWrapper>
      <ProjectsDropdown
        onSetProject={handleSetProject}
        onNewProject={handleNewProject}
        id={project.id}
      />
      <ProjectNameEdit
        content={project.name}
        editMode={false}
        onCreate={handleCreate}
        onNameChange={handleNameChange}
      />
    </MainWrapper>
  );
};

export default connector(ProjectName);

const MainWrapper = styled.div`
  display: flex;
  align-items: center;
`;
