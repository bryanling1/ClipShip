import CopyBroadcasters from './copy-broadcasters';
import Download from './download';
import React from 'react';
import styled from 'styled-components';

const PostActionsCard = (): JSX.Element => {
  return (
    <MainWrapper>
      <SectionWrapper>
        <Download />
      </SectionWrapper>
      <SectionWrapper>
        <CopyBroadcasters />
      </SectionWrapper>
    </MainWrapper>
  );
};

export default PostActionsCard;

const MainWrapper = styled.div`
  width: 100%;
  background-color: ${(props) => props.theme.colors.white1};
  display: flex;
  border-radius: 8px;
  box-shadow: #050505 3px 3px 10px;
  padding: 20px;
  margin-top: 20px;
`;

const SectionWrapper = styled.div`
  border-radius: 8px;
  display: flex;
  flex: 1;
  background-color: ${(props) => props.theme.colors.white0};
  align-items: center;
  height: 200px;

  &:first-child {
    margin-right: 20px;
  }
`;
