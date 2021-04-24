import React from 'react';
import styled from 'styled-components';

interface OwnProps {
  imageurl: string;
  height?: number;
  width?: number;
  margin?: number;
  onClick?: () => void;
  border?: number;
  cursor?: string;
  opacity?: number;
}
const ClipCard = (props: OwnProps): JSX.Element => {
  const { imageurl, height, width, margin, onClick, border, cursor, opacity } = props;
  return (
    <MainWrapper
      imageurl={imageurl}
      height={height}
      width={width}
      margin={margin}
      onClick={onClick}
      border={border}
      cursor={cursor}
      opacity={opacity}
    />
  );
};

export default ClipCard;

interface MainWrapperProps {
  imageurl: string;
  height: number | undefined;
  width: number | undefined;
  margin: number | undefined;
  border: number | undefined;
  cursor: string | undefined;
  opacity: number | undefined;
}
const MainWrapper = styled.div<MainWrapperProps>`
  box-sizing: border-box;
  background-image: url(${(props) => props.imageurl});
  height: ${(props) => (props.height ? `${props.height}px` : '100%')};
  width: ${(props) => (props.width ? `${props.width}%` : '100%')};
  background-size: auto 100%;
  background-repeat: no-repeat;
  background-color: black;
  background-position: center center;
  border-radius: 5px;
  margin: ${(props) => (props.margin ? `${props.margin}px` : 0)};
  border: ${(props) => (props.border ? `${props.border}px` : 0)} solid rgb(136, 84, 208);
  cursor: ${(props) => (props.cursor ? props.cursor : 'initial')};
  opacity: ${(props) => (props.opacity ? props.opacity : 'initial')};
`;
