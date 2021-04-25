import { Clip, LabelPosition } from '../../reducers/types';
import { Actions as ClipActions } from '../types';
import {
  addClips,
  deleteClip,
  editClipStartEnd,
  enableLabel,
  moveClip,
  setAllGlobalLabelsOff,
  setClips,
  setGlobalLabel,
  setGlobalLabelPosition,
  setLabelPosition,
} from '../clips';

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

  it('should create an action to enable global label', () => {
    const payload = {
      index: 5,
    };
    const expectedAction = {
      type: ClipActions.SET_GLOBAL_LABEL_POSITION,
      index: payload.index,
    };
    expect(setGlobalLabelPosition(payload.index)).toEqual(expectedAction);
  });

  it('should create an action to add clips', () => {
    const clip: Clip = {
      id: '1',
      url:
        'https://clips.twitch.tv/embed?clip=AmazonianEncouragingLyrebirdAllenHuhu&tt_medium=clips_api&tt_content=embed',
      start: 0,
      end: 32.000333,
      length: 32.000333,
      label: false,
      labelContent: null,
      labelPosition: null,
      labelGlobalPosition: null,
      thumbnailUrl:
        'https://ytexpert.net/wp-content/uploads/2019/11/How-To-Make-An-Eye-Catching-Thumbnail-For-More-Clicks-862x485.jpg',
      title: 'Clip Title Editing',
      broadcaster: 'TheBroadcasterGuy',
      labelGlobal: false,
    };
    const expectedAction = {
      type: ClipActions.ADD_CLIPS,
      clips: [clip],
    };
    expect(addClips([clip])).toEqual(expectedAction);
  });

  it('should create an action to set clips', () => {
    const clip: Clip = {
      id: '1',
      url:
        'https://clips.twitch.tv/embed?clip=AmazonianEncouragingLyrebirdAllenHuhu&tt_medium=clips_api&tt_content=embed',
      start: 0,
      end: 32.000333,
      length: 32.000333,
      label: false,
      labelContent: null,
      labelPosition: null,
      labelGlobalPosition: null,
      thumbnailUrl:
        'https://ytexpert.net/wp-content/uploads/2019/11/How-To-Make-An-Eye-Catching-Thumbnail-For-More-Clicks-862x485.jpg',
      title: 'Clip Title Editing',
      broadcaster: 'TheBroadcasterGuy',
      labelGlobal: false,
    };
    const expectedAction = {
      type: ClipActions.SET_CLIPS,
      clips: [clip],
    };
    expect(setClips([clip])).toEqual(expectedAction);
  });

  it('should create an action to delete a clip', () => {
    const expectedAction = {
      type: ClipActions.DELETE_CLIP,
      index: 0,
    };
    expect(deleteClip(0)).toEqual(expectedAction);
  });

  it('should create an action to set to use global label', () => {
    const expectedAction = {
      type: ClipActions.SET_GLOBAL_LABEL,
      index: 0,
      val: true,
    };
    expect(setGlobalLabel(0, true)).toEqual(expectedAction);
  });

  it('should create an action to turn all global labels off', () => {
    const expectedAction = {
      type: ClipActions.SET_ALL_GLOBAL_LABELS_OFF,
    };
    expect(setAllGlobalLabelsOff()).toEqual(expectedAction);
  });
});
