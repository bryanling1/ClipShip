import LabelOptionAccordion from './option-accordion/accordions/label';
import React from 'react';
import styled from 'styled-components';

const Options = (): JSX.Element => {
  return (
    <MainWrapper>
      <LabelOptionAccordion />
    </MainWrapper>
  );
};

export default Options;

const MainWrapper = styled.div`
  width: 100%;
  height: 100%;
  background-color: white;
  box-sizing: border-box;
  border-radius: 6px;
`;
