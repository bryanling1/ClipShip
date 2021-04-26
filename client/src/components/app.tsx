import ClipEditor from './clip-editor';
import ClipSelectModal from './clip-select-modal';
import Container from '@material-ui/core/Container';
import DownloadButton from '../components/button';
import DownloadIcon from '@material-ui/icons/GetApp';
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
        <DownloadButton variant="contained" startIcon={<DownloadIcon />}>
          Download
        </DownloadButton>
      </ContainerWrapper>
    </ThemeProvider>
  );
};

export default App;

const ContainerWrapper = styled(Container)`
  && {
    padding-right: 56px;
  }
`;
