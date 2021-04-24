import { Clip, LabelPosition } from '../../reducers/types';
import {
  ClipActions,
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
} from '../../actions/clips';
import clipsReducer from '../clips';

const mockClips: Clip[] = [
  {
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
  },
  {
    id: '2',
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
  },
  {
    id: '3',
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
  },
];

let clips: Clip[];

describe('Reducers', () => {
  beforeEach(() => {
    clips = [{ ...mockClips[0] }, { ...mockClips[1] }, { ...mockClips[2] }];
  });

  it('should return the initial state', () => {
    const result = clipsReducer(undefined, { type: ClipActions.EMPTY });
    expect(result).toEqual([]);
  });

  it('should return clips with a modified start and end time', () => {
    const payload = {
      index: 1,
      start: 500,
      end: 900,
    };

    const result = clipsReducer(clips, editClipStartEnd(payload));
    expect(result[1].start).toEqual(payload.start);
    expect(result[1].end).toEqual(payload.end);
  });

  it('should return init state when modifiying start and end time on bad index', () => {
    const payload = {
      index: 500,
      start: 500,
      end: 900,
    };

    const result = clipsReducer(clips, editClipStartEnd(payload));
    expect(result[1].start).toEqual(clips[1].start);
    expect(result[1].end).toEqual(clips[1].end);
  });
  it('should return clips with index 0 and 2 sapped', () => {
    const result = clipsReducer(clips, moveClip(0, 2));
    expect(result[0].id).toEqual('2');
    expect(result[2].id).toEqual('1');
  });

  it('should return init state if index is out of range', () => {
    const result = clipsReducer(clips, moveClip(-1, 5));
    expect(result[0].id).toEqual('1');
    expect(result[1].id).toEqual('2');
    expect(result[2].id).toEqual('3');
  });

  it('should enable label of the first clip', () => {
    const result = clipsReducer(clips, enableLabel(0, true));
    expect(result[0].label).toEqual(true);
  });

  it('should return initState when enableLabel index is out of range', () => {
    const result = clipsReducer(clips, enableLabel(10, true));
    expect(result[0].label).toEqual(false);
  });

  it('sets the labelPosition of the first clip', () => {
    const result = clipsReducer(clips, setLabelPosition(0, LabelPosition.LEFT_TOP));
    expect(result[0].labelPosition).toEqual(LabelPosition.LEFT_TOP);
  });

  it('return init state when index of setLabelPosition is out of range', () => {
    const result = clipsReducer(clips, setLabelPosition(4, LabelPosition.LEFT_TOP));
    expect(result[0].labelPosition).toEqual(null);
    expect(result[1].labelPosition).toEqual(null);
    expect(result[2].labelPosition).toEqual(null);
  });

  it('marks all global labels to the first clip', () => {
    let result = clipsReducer(clips, setLabelPosition(0, LabelPosition.LEFT_TOP));
    result = clipsReducer(result, setGlobalLabelPosition(0));
    expect(result[0].labelGlobal).toEqual(true);
    expect(result[1].labelGlobal).toEqual(true);
    expect(result[2].labelGlobal).toEqual(true);
    expect(result[0].labelGlobalPosition).toEqual(LabelPosition.LEFT_TOP);
    expect(result[1].labelGlobalPosition).toEqual(LabelPosition.LEFT_TOP);
    expect(result[2].labelGlobalPosition).toEqual(LabelPosition.LEFT_TOP);
  });

  it('returns init state when trying to set global position with index out of range', () => {
    let result = clipsReducer(clips, setLabelPosition(0, LabelPosition.LEFT_TOP));
    result = clipsReducer(result, setGlobalLabelPosition(-1));
    expect(result[0].labelGlobal).toEqual(false);
    expect(result[1].labelGlobal).toEqual(false);
    expect(result[2].labelGlobal).toEqual(false);
    expect(result[0].labelGlobalPosition).toEqual(null);
    expect(result[1].labelGlobalPosition).toEqual(null);
    expect(result[2].labelGlobalPosition).toEqual(null);
  });

  it('adds clips', () => {
    const result = clipsReducer(clips, addClips(clips));
    expect(result.length).toEqual(6);
  });

  it('set clips', () => {
    const result = clipsReducer(clips, setClips(clips.slice(0, 1)));
    expect(result.length).toEqual(1);
  });

  it('deletes a clip at index 0', () => {
    const result = clipsReducer(clips, deleteClip(0));
    expect(result.length).toEqual(2);
    expect(result[0].id).toEqual('2');
  });

  it('return init state when trying to delete a clip with bad index', () => {
    const result = clipsReducer(clips, deleteClip(100));
    expect(result.length).toEqual(3);
    expect(result[0].id).toEqual('1');
  });

  it('enables the global label option on the first clip', () => {
    const result = clipsReducer(clips, setGlobalLabel(0, true));
    expect(result[0].labelGlobal).toEqual(true);
  });

  it('returns init state when setting global label with bad index', () => {
    const result = clipsReducer(clips, setGlobalLabel(-1, true));
    expect(result[0].labelGlobal).toEqual(false);
  });

  it('turns all global labels off', () => {
    let result = clipsReducer(clips, setLabelPosition(0, LabelPosition.LEFT_TOP));
    result = clipsReducer(result, setGlobalLabelPosition(0));
    result = clipsReducer(result, setAllGlobalLabelsOff());
    expect(result[0].labelGlobal).toEqual(false);
    expect(result[1].labelGlobal).toEqual(false);
    expect(result[2].labelGlobal).toEqual(false);
    expect(result[0].labelGlobalPosition).toEqual(null);
    expect(result[1].labelGlobalPosition).toEqual(null);
    expect(result[2].labelGlobalPosition).toEqual(null);
  });
});
