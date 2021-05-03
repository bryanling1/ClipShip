import { LabelPosition } from '../store/reducers/types';

export const calcOverlayHeight = (width: number): number => {
  return (9 / 16) * width;
};

export const calcOverlayTop = (height: number, playerHeight: number): number => {
  return (playerHeight - height) / 2;
};

export const calcRelativeFontSize = (
  videoHeight: number,
  actualHeight: number,
  videoFontSize: number
): number => {
  return (videoFontSize * actualHeight) / videoHeight;
};

export const getTextShadowOutlineString = (
  width: number,
  color: string,
  directions = 6
): string => {
  const step = (2 * Math.PI) / directions;
  let currentStep = 0;
  let out = '';
  while (currentStep < 2 * Math.PI) {
    out += `${width * Math.cos(currentStep)}px ${width * Math.sin(currentStep)}px 0px ${color},`;
    currentStep += step;
  }
  return out.slice(0, out.length - 1);
};

export const getLabelFlexDirection = (position: LabelPosition): string => {
  if (
    position === LabelPosition.LEFT_TOP ||
    position === LabelPosition.CENTER_TOP ||
    position === LabelPosition.RIGHT_TOP
  ) {
    return 'row';
  } else if (
    position === LabelPosition.LEFT_BOTTOM ||
    position === LabelPosition.CENTER_BOTTOM ||
    position === LabelPosition.RIGHT_BOTTOM
  ) {
    return 'column-reverse';
  } else {
    return 'row';
  }
};

export const getLabelTextAlign = (position: LabelPosition): string => {
  if (position === LabelPosition.LEFT_TOP || position === LabelPosition.LEFT_BOTTOM) {
    return 'left';
  } else if (position === LabelPosition.CENTER_TOP || position === LabelPosition.CENTER_BOTTOM) {
    return 'center';
  } else if (position === LabelPosition.RIGHT_TOP || position === LabelPosition.RIGHT_BOTTOM) {
    return 'right';
  } else {
    return 'left';
  }
};
