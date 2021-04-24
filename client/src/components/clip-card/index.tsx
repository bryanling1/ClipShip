import Avatar from '@material-ui/core/Avatar';
import Badge from '@material-ui/core/Badge';
import GlobeIcon from '@material-ui/icons/Public';
import HeightIcon from '@material-ui/icons/Height';
import LabelIcon from '@material-ui/icons/Label';
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
  trimmed?: boolean;
  labeled?: boolean;
  labeledGlobal?: boolean;
}
const ClipCard = (props: OwnProps): JSX.Element => {
  const {
    imageurl,
    height,
    width,
    margin,
    onClick,
    border,
    cursor,
    opacity,
    trimmed,
    labeled,
    labeledGlobal,
  } = props;
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
    >
      <IconsWrapper>
        {trimmed && (
          <SquareAvatar variant="square">
            <Rotate90>
              <HeightIcon />
            </Rotate90>
          </SquareAvatar>
        )}
        {labeled && (
          <Badge
            overlap="circle"
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            badgeContent={
              labeledGlobal && (
                <SmallAvatar>
                  <GlobeIcon />
                </SmallAvatar>
              )
            }
          >
            <SquareAvatar variant="square">
              <LabelIconWrapper />
            </SquareAvatar>
          </Badge>
        )}
      </IconsWrapper>
    </MainWrapper>
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

const Rotate90 = styled.div`
   {
    transform: rotate(90deg);
  }
`;
const SmallAvatar = styled(Avatar)`
  && {
    width: 20px;
    height: 20px;
    transform: scale(0.8);
    background-color: rgb(136, 84, 208);
  }
`;

const SquareAvatar = styled(Avatar)`
  && {
    width: 25px;
    height: 25px;
    background-color: rgb(136, 84, 208);
  }
`;

const IconsWrapper = styled.div`
  heigth: 100%;
  width: 30px;
`;

const LabelIconWrapper = styled(LabelIcon)`
  && {
    transform: scale(0.8);
  }
`;
