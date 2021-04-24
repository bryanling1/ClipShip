import Container from '@material-ui/core/container';
import ProjectName from './project-name';
import React from 'react';
import Timeline from './timeline';

const App = (): JSX.Element => {
  const openClipFinder = () => {
    console.log('add');
  };
  return (
    <Container>
      <ProjectName />
      <Timeline onAdd={openClipFinder} />
    </Container>
  );
};

export default App;
