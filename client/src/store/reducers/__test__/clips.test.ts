import { Clip } from '../../reducers/types';
import { ClipActions, editClipStartEnd, moveClip } from '../../actions/clips';
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
});
