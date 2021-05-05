import * as actions from '../store/actions';
import { ConnectedProps, connect } from 'react-redux';
import { ThemeProvider as MaterialThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import { StoreState } from '../store/reducers/types';
import ClipEditor from './clip-editor';
import ClipSelectModal from './clip-select-modal';
import Container from '@material-ui/core/Container';
import PostActionsCard from './post-actions-card';
import ProjectName from './project-name';
import React, { useState } from 'react';
import Timeline from './timeline';
import styled, { ThemeProvider, createGlobalStyle } from 'styled-components';
import theme from '../themes/default';

const darkTheme = createMuiTheme({
  palette: {
    type: 'dark',
  },
});

const mapStateToProps = (state: StoreState) => ({
  clips: state.clips,
  project: state.project,
});
const connector = connect(mapStateToProps, actions);

type PropsFromRedux = ConnectedProps<typeof connector>;

type Props = PropsFromRedux;

const App = (props: Props): JSX.Element => {
  const { project, clips } = props;
  const [openAddClips, setOpenAddClips] = useState<boolean>(false);
  const openClipFinder = () => {
    setOpenAddClips(true);
  };
  return (
    <ThemeProvider theme={theme}>
      <MaterialThemeProvider theme={darkTheme}>
        <ContainerWrapper>
          <GlobalStyle />
          <ClipSelectModal
            open={openAddClips}
            onClose={() => {
              setOpenAddClips(false);
            }}
          />
          <ProjectName />
          <ClipEditor />
          <Timeline onAdd={openClipFinder} />
          {project.id && project.name && clips.length > 0 && <PostActionsCard />}
        </ContainerWrapper>
      </MaterialThemeProvider>
    </ThemeProvider>
  );
};

export default connector(App);

const ContainerWrapper = styled(Container)`
  && {
    padding-right: 60px;
    position: relative;
    box-sizing: border-box;
    overflow: visible;
    min-width: 1280px;
    padding-top: 20px;
    display: flex;
    justify-content: center;
    flex-direction: column;
  }
`;

const GlobalStyle = createGlobalStyle`
    html, body, .wrapper {
        height: 100%;
        margin: 0;
        background-color: #191919;
    }
`;
