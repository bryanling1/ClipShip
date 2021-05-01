import ClipEditor from './clip-editor';
import ClipSelectModal from './clip-select-modal';
import Container from '@material-ui/core/Container';
import Download from './download';
import ProjectName from './project-name';
import React, { useState } from 'react';
import Timeline from './timeline';
import styled, { ThemeProvider } from 'styled-components';
import theme from '../themes/default';

const App = (): JSX.Element => {
  const [openAddClips, setOpenAddClips] = useState<boolean>(false);
  const openClipFinder = () => {
    setOpenAddClips(true);
  };
  return (
    <ThemeProvider theme={theme}>
      <ContainerWrapper>
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
  }
`;
