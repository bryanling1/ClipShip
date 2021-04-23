import * as actions from '../../store/actions';
import { ConnectedProps, connect } from 'react-redux';
import { StoreState } from '../../store/reducers/types';
import ProjectsDropdown from './project-dropdown';
import React from 'react';
import Typography from '@material-ui/core/Typography';
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
      <Typography variant={'h5'}>{project.name ? project.name : 'Select a Project'}</Typography>
    </MainWrapper>
  );
};

export default connector(ProjectName);

const MainWrapper = styled.div`
  display: flex;
  align-items: center;
`;
