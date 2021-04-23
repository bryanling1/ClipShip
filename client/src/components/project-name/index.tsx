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
  const { project } = props;
  return (
    <MainWrapper>
      <ProjectsDropdown />
      <ProjectNameEdit content={project.name} editMode={false} />
    </MainWrapper>
  );
};

export default connector(ProjectName);

const MainWrapper = styled.div`
  display: flex;
  align-items: center;
`;
