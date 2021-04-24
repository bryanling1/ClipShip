import React from 'react';
import styled from 'styled-components';

const Player = (): JSX.Element => {
  return (
    <MainWrapper>
      <iframe
        src="https://clips.twitch.tv/embed?clip=ShakingPoliteQuailGingerPower&tt_medium=clips_api&tt_content=embed"
        width="640"
        height="360"
        frameBorder="0"
        scrolling="no"
      />
    </MainWrapper>
  );
};

export default Player;

const MainWrapper = styled.div`
  width: 100%;
  heigth: 100%;
`;
