import {
  calcOverlayHeight,
  calcOverlayTop,
  calcRelativeFontSize,
  getLabelFlexDirection,
  getLabelTextAlign,
  getTextShadowOutlineString,
} from '../player';

import { LabelPosition } from '@clipship/common';

describe('Timeline Utils', () => {
  it('gets olverlay height', () => {
    expect(calcOverlayHeight(1920)).toEqual(1080);
  });
  it('gets olverlay top', () => {
    expect(calcOverlayTop(100, 80)).toEqual(-10);
  });
  it('gets relative font size', () => {
    expect(calcRelativeFontSize(1, 1, 1)).toEqual(1);
  });
  it('gets text shadow outline string', () => {
    expect(getTextShadowOutlineString(10, 'black', 1)).toEqual('10px 0px 0px black');
  });
  it('gets text shadow outline string', () => {
    expect(getTextShadowOutlineString(10, 'black')).toEqual(
      '10px 0px 0px black,5.000000000000001px 8.660254037844386px 0px black,-4.999999999999998px 8.660254037844387px 0px black,-10px 1.2246467991473533e-15px 0px black,-5.000000000000004px -8.660254037844386px 0px black,4.999999999999993px -8.66025403784439px 0px black,10px -1.1331077795295958e-14px 0px black'
    );
  });
  it('gets label flex direction for left_top', () => {
    expect(getLabelFlexDirection(LabelPosition.LEFT_TOP)).toEqual('row');
  });
  it('gets label flex direction for center_top', () => {
    expect(getLabelFlexDirection(LabelPosition.CENTER_TOP)).toEqual('row');
  });
  it('gets label flex direction for right_top', () => {
    expect(getLabelFlexDirection(LabelPosition.RIGHT_TOP)).toEqual('row');
  });
  it('gets label flex direction for default', () => {
    expect(getLabelFlexDirection(-1)).toEqual('row');
  });
  it('gets label flex direction for left_bottom', () => {
    expect(getLabelFlexDirection(LabelPosition.LEFT_BOTTOM)).toEqual('column-reverse');
  });
  it('gets label flex direction for center_bottom', () => {
    expect(getLabelFlexDirection(LabelPosition.CENTER_BOTTOM)).toEqual('column-reverse');
  });
  it('gets label flex direction for center_bottom', () => {
    expect(getLabelFlexDirection(LabelPosition.RIGHT_BOTTOM)).toEqual('column-reverse');
  });
  it('gets label text align for left_top', () => {
    expect(getLabelTextAlign(LabelPosition.LEFT_TOP)).toEqual('left');
  });
  it('gets label text align for left_bottom', () => {
    expect(getLabelTextAlign(LabelPosition.LEFT_BOTTOM)).toEqual('left');
  });
  it('gets label text align for center_top', () => {
    expect(getLabelTextAlign(LabelPosition.CENTER_TOP)).toEqual('center');
  });
  it('gets label text align for center_bottom', () => {
    expect(getLabelTextAlign(LabelPosition.CENTER_BOTTOM)).toEqual('center');
  });
  it('gets label text align for right_top', () => {
    expect(getLabelTextAlign(LabelPosition.RIGHT_TOP)).toEqual('right');
  });
  it('gets label text align for right_bottom', () => {
    expect(getLabelTextAlign(LabelPosition.RIGHT_BOTTOM)).toEqual('right');
  });
  it('gets label text align for default', () => {
    expect(getLabelTextAlign(-1)).toEqual('left');
  });
});
