import { Clip } from '../../store/reducers/types';
import { areClipsSame } from '../clips';

const mockClips1: Clip[] = [
  {
    id: '3',
    url:
      'https://clips.twitch.tv/embed?clip=AmazonianEncouragingLyrebirdAllenHuhu&tt_medium=clips_api&tt_content=embed',
    start: 0,
    end: 32.000333,
    duration: 32.000333,
    label: true,
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
const mockClips2: Clip[] = [
  {
    id: '3',
    url:
      'https://clips.twitch.tv/embed?clip=AmazonianEncouragingLyrebirdAllenHuhu&tt_medium=clips_api&tt_content=embed',
    start: 0,
    end: 32.000333,
    duration: 32.000333,
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
const mockClips3: Clip[] = [
  {
    id: '3',
    url:
      'https://clips.twitch.tv/embed?clip=AmazonianEncouragingLyrebirdAllenHuhu&tt_medium=clips_api&tt_content=embed',
    start: 0,
    end: 32.000333,
    duration: 32.000333,
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
describe('Clips Utils', () => {
  describe('areClipsSame function', () => {
    it('returns true when both clips are empty', () => {
      expect(areClipsSame([], [])).toEqual(true);
    });
    it('returns false when clips have different lengths', () => {
      expect(areClipsSame(mockClips1, [])).toEqual(false);
    });
    it('returns false when clips have different values', () => {
      expect(areClipsSame(mockClips1, mockClips2)).toEqual(false);
    });

    it('returns true when clips have same values', () => {
      expect(areClipsSame(mockClips3, mockClips2)).toEqual(true);
    });
  });
});
