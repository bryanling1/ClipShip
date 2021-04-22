import { Clip } from '../../reducers/types';
import { ClipActions, editClipStartEnd } from '../../actions/clips';
import clipsReducer from '../clips';

const mockClips: Clip[] = [
  {
    id: '1',
    url:
      'https://clips.twitch.tv/embed?clip=AmazonianEncouragingLyrebirdAllenHuhu&tt_medium=clips_api&tt_content=embed',
    start: 0,
    end: 32.000333,
    length: 32.000333,
    label: null,
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
    label: null,
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
    label: null,
    labelPosition: null,
    labelGlobalPosition: null,
    thumbnailUrl:
      'https://ytexpert.net/wp-content/uploads/2019/11/How-To-Make-An-Eye-Catching-Thumbnail-For-More-Clicks-862x485.jpg',
    title: 'Clip Title Editing',
    broadcaster: 'TheBroadcasterGuy',
  },
];

describe('Reducers', () => {
  it('should return the initial state', () => {
    expect(clipsReducer(undefined, { type: ClipActions.EMPTY })).toEqual([]);
  });

  it('should return clips with a modified start and end time', () => {
    const payload = {
      index: 1,
      start: 500,
      end: 900,
    };

    expect(clipsReducer(mockClips, editClipStartEnd(payload))[1].start).toEqual(payload.start);
    expect(clipsReducer(mockClips, editClipStartEnd(payload))[1].end).toEqual(payload.end);
  });

  it('should return init state when modifiying start and end time on bad index', () => {
    const payload = {
      index: 500,
      start: 500,
      end: 900,
    };

    expect(clipsReducer(mockClips, editClipStartEnd(payload))[1].start).toEqual(mockClips[1].start);
    expect(clipsReducer(mockClips, editClipStartEnd(payload))[1].end).toEqual(mockClips[1].end);
  });
});
