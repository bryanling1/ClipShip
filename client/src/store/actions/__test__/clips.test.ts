import { ClipActions, editClipStartEnd } from '../clips';

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
});
