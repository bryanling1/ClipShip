import ClipSelectModal from './clip-select-modal';
import Container from '@material-ui/core/Container';
import ProjectName from './project-name';
import React, { useState } from 'react';
import Timeline from './timeline';
import styled from 'styled-components';

const App = (): JSX.Element => {
  const [openAddClips, setOpenAddClips] = useState<boolean>(false);
  const openClipFinder = () => {
    setOpenAddClips(true);
  };
  return (
    <ContainerWrapper>
      <ClipSelectModal
        open={openAddClips}
        onClose={() => {
          setOpenAddClips(false);
        }}
      />
      <ProjectName />
      <Timeline onAdd={openClipFinder} />
    </ContainerWrapper>
  );
};

export default App;

const ContainerWrapper = styled(Container)`
  padding-right: 56px;
`;
