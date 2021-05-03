import { ThemeProvider as MaterialThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import ClipEditor from './clip-editor';
import ClipSelectModal from './clip-select-modal';
import Container from '@material-ui/core/Container';
import Download from './download';
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

const App = (): JSX.Element => {
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
          <br /> <br />
          <Download />
        </ContainerWrapper>
      </MaterialThemeProvider>
    </ThemeProvider>
  );
};

export default App;

const ContainerWrapper = styled(Container)`
  && {
    padding-right: 60px;
    position: relative;
    box-sizing: border-box;
    overflow: visible;
    min-width: 1280px;
    padding-top: 20px;
  }
`;

const GlobalStyle = createGlobalStyle`
    html, body, .wrapper {
        height: 100%;
        margin: 0;
        background-color: #222;
    }
`;
