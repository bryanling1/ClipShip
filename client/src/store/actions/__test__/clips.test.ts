import { ClipActions, editClipStartEnd, enableLabel, moveClip, setLabelPosition } from '../clips';
import { LabelPosition } from '../../reducers/types';

describe('Actions', () => {
  it('should create an action to edit start and end of a clip', () => {
    const payload = {
      index: 1,
      start: 0,
      end: 5,
    };
    const expectedAction = {
      type: ClipActions.EDIT_CLIP_START_END,
      payload,
    };
    expect(editClipStartEnd(payload)).toEqual(expectedAction);
  });

  it('should create an action to swap clips indeces', () => {
    const payload = {
      index1: 0,
      index2: 1,
    };
    const expectedAction = {
      type: ClipActions.SWAP_CLIPS,
      payload,
    };
    expect(moveClip(payload.index1, payload.index2)).toEqual(expectedAction);
  });

  it('should create an action to enable label', () => {
    const payload = {
      index: 5,
      val: true,
    };
    const expectedAction = {
      type: ClipActions.ENABLE_LABEL,
      payload,
    };
    expect(enableLabel(payload.index, payload.val)).toEqual(expectedAction);
  });

  it('should create an action to enable label', () => {
    const payload = {
      index: 5,
      position: LabelPosition.CENTER_BOTTOM,
    };
    const expectedAction = {
      type: ClipActions.SET_LABEL_POSITION,
      payload,
    };
    expect(setLabelPosition(payload.index, payload.position)).toEqual(expectedAction);
  });
});
