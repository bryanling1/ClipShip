import React from 'react';
import styled from 'styled-components';

interface OwnProps {
  imageurl: string;
}
const ClipCard = (props: OwnProps): JSX.Element => {
  const { imageurl } = props;
  return <MainWrapper imageurl={imageurl} />;
};

export default ClipCard;

interface MainWrapperProps {
  imageurl: string;
}
const MainWrapper = styled.div<MainWrapperProps>`
  background-image: url(${(props) => props.imageurl});
  height: 100%;
  background-size: auto 100%;
  background-repeat: no-repeat;
  background-color: black;
  background-position: center center;
  border-radius: 5px;
`;
