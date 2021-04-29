import * as actions from '../../store/actions';
import { ConnectedProps, connect } from 'react-redux';
import { StoreState } from '../../store/reducers/types';
import { areClipsSame } from '../../utils/clips';
import ProjectNameEdit from './project-name';
import ProjectsDropdown from './project-dropdown';
import React from 'react';
import styled from 'styled-components';

const mapStateToProps = (state: StoreState) => ({
  project: state.project,
  clips: state.clips,
});

const connector = connect(mapStateToProps, actions);

type PropsFromRedux = ConnectedProps<typeof connector>;

type Props = PropsFromRedux;

const ProjectName = (props: Props) => {
  const {
    project,
    createProject,
    editName,
    fetchProject,
    setProject,
    saveProject,
    clips,
    deleteProject,
  } = props;
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

  const handleSaveProject = () => {
    if (clips.length > 0 && project.id) {
      saveProject(project.id, clips);
    }
  };

  const handleDeleteProject = () => {
    if (project.id) {
      deleteProject(project.id);
    }
  };
  const canSave = !areClipsSame(project.dbClips, clips);

  return (
    <MainWrapper>
      <ProjectsDropdown
        onSetProject={handleSetProject}
        onNewProject={handleNewProject}
        id={project.id}
        canSave={canSave && (Boolean(project.name) || false)}
      />
      <ProjectNameEdit
        content={project.name}
        editMode={false}
        onCreate={handleCreate}
        onNameChange={handleNameChange}
        onSaveProject={handleSaveProject}
        canSave={canSave}
        onDeleteProject={handleDeleteProject}
      />
    </MainWrapper>
  );
};

export default connector(ProjectName);

const MainWrapper = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
`;
