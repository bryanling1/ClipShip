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
  marginBottom?: string;
  onClick?: () => void;
  border?: number;
  cursor?: string;
  opacity?: number;
  trimmed?: boolean;
  labeled?: boolean;
  labeledGlobal?: boolean;
  backgroundImageOpacity?: number;
  selected?: boolean;
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
    marginBottom,
    backgroundImageOpacity,
    selected,
  } = props;
  return (
    <MainWrapper
      height={height}
      width={width}
      margin={margin}
      onClick={onClick}
      border={border}
      cursor={cursor}
      opacity={opacity}
      marginBottom={marginBottom}
    >
      <IconsWrapper>
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
        {trimmed && (
          <SquareAvatar variant="square">
            <Rotate90>
              <HeightIcon />
            </Rotate90>
          </SquareAvatar>
        )}
      </IconsWrapper>
      <SelectedWrapper selected={selected ? 1 : 0} />
      <BackgroundImage
        imageUrl={imageurl}
        opacity={backgroundImageOpacity || 1}
        height={height}
        width={width}
      />
    </MainWrapper>
  );
};

export default ClipCard;

interface MainWrapperProps {
  height: number | undefined;
  width: number | undefined;
  margin: number | undefined;
  border: number | undefined;
  cursor: string | undefined;
  opacity: number | undefined;
  marginBottom: string | undefined;
}
const MainWrapper = styled.div<MainWrapperProps>`
  box-sizing: border-box;
  height: ${(props) => (props.height ? `${props.height}px` : '100%')};
  width: ${(props) => (props.width ? `${props.width}%` : '100%')};
  background-size: auto 100%;
  background-repeat: no-repeat;
  background-color: black;
  background-position: center center;
  margin-left: ${(props) => (props.margin ? `${props.margin}px` : 0)};
  margin-right: ${(props) => (props.margin ? `${props.margin}px` : 0)};
  border: ${(props) => (props.border ? `${props.border}px` : 0)} solid
    ${(props) => props.theme.colors.primary};
  cursor: ${(props) => (props.cursor ? props.cursor : 'initial')};
  opacity: ${(props) => (props.opacity ? props.opacity : 'initial')};
  margin-bottom: ${(props) => (props.marginBottom ? props.marginBottom : 0)};
  position: relative;
`;

interface SelectedWrapperProps {
  selected: number;
}
const SelectedWrapper = styled.div<SelectedWrapperProps>`
  width: 100%;
  height: 100%;
  background-color: ${(props) => props.theme.colors.primaryDark};
  opacity: ${(props) => (props.selected ? 0.76 : 0)};
  position: absolute;
  top: 0;
  left: 0;
  z-index: 3;
`;

interface BackgroundImageProps {
  imageUrl: string;
  opacity: number;
  height: number | undefined;
  width: number | undefined;
}

const BackgroundImage = styled.div<BackgroundImageProps>`
  background-size: auto 100%;
  background-repeat: no-repeat;
  background-color: black;
  background-position: center center;
  height: 100%;
  width: 100%;
  background-image: url(${(props) => props.imageUrl});
  opacity: ${(props) => props.opacity};
  position: absolute;
  top: 0;
  left: 0;
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
    background-color: ${(props) => props.theme.colors.primary};
  }
`;

const SquareAvatar = styled(Avatar)`
  && {
    width: 25px;
    height: 25px;
    background-color: ${(props) => props.theme.colors.primary};
  }
`;

const IconsWrapper = styled.div`
  heigth: 100%;
  width: 30px;
  z-index: 4;
  position: absolute;
  top: 0;
  left: 0;
`;

const LabelIconWrapper = styled(LabelIcon)`
  && {
    transform: scale(0.8);
  }
`;
