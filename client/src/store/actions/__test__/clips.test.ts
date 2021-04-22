import { ClipActions, editClipStartEnd, moveClip } from '../clips';

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
});
