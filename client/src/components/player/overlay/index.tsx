import { LabelPosition } from '../../../store/reducers/types';
import {
  calcOverlayHeight,
  calcOverlayTop,
  calcRelativeFontSize,
  getLabelFlexDirection,
  getLabelTextAlign,
  getTextShadowOutlineString,
} from '../../../utils/player';
import React from 'react';
import styled from 'styled-components';

interface OwnProps {
  height: number;
  width: number;
  label?: string;
  labelPosition?: LabelPosition;
}
const Overlay = (props: OwnProps): JSX.Element => {
  const { height, width, label, labelPosition } = props;
  return (
    <MainWrapper height={height} width={width}>
      {label && (
        <LabelWrapper width={width} labelPosition={labelPosition || 0}>
          <Label>{label}</Label>
        </LabelWrapper>
      )}
    </MainWrapper>
  );
};

export default Overlay;

interface MainWrapperProps {
  height: number;
  width: number;
}
const MainWrapper = styled.div<MainWrapperProps>`
  width: 100%;
  height: ${(props) => calcOverlayHeight(props.width)}px;
  position: absolute;
  top: ${(props) => calcOverlayTop(calcOverlayHeight(props.width), props.height)}px;
  left: 0;
  pointer-events: none;
  display: block;
`;

interface LabelWrapperProps {
  width: number;
  labelPosition: LabelPosition;
}

const LabelWrapper = styled.div<LabelWrapperProps>`
  line-height: ${(props) => calcRelativeFontSize(1080, calcOverlayHeight(props.width), 100)}px;
  width: 100%;
  height: 100%;
  color: white;
  font-weight: bold;
  display: flex;
  padding: ${(props) => calcRelativeFontSize(1080, calcOverlayHeight(props.width), 20)}px;
  box-sizing: border-box;
  flex-direction: ${(props) => getLabelFlexDirection(props.labelPosition)};
  text-align: ${(props) => getLabelTextAlign(props.labelPosition)};
  font-family: oswald;
  font-size: ${(props) => calcRelativeFontSize(1080, calcOverlayHeight(props.width), 100)}px;
  -webkit-font-smoothing: antialiased;
  text-shadow: ${(props) =>
    getTextShadowOutlineString(
      calcRelativeFontSize(1080, calcOverlayHeight(props.width), 10),
      'black',
      15
    )};
`;

const Label = styled.div`
  display: block;
  width: 100%;
`;
