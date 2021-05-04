import { Clip } from '@clipship/common';
import { getClipWidths, getMinutes, getTotalTime } from '../timeline';

const clip1: Clip = {
  id: '1',
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
};
const clip2: Clip = {
  id: '1',
  url:
    'https://clips.twitch.tv/embed?clip=AmazonianEncouragingLyrebirdAllenHuhu&tt_medium=clips_api&tt_content=embed',
  start: 0,
  end: 3600,
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
};

const clip3: Clip = {
  id: '1',
  url:
    'https://clips.twitch.tv/embed?clip=AmazonianEncouragingLyrebirdAllenHuhu&tt_medium=clips_api&tt_content=embed',
  start: 0,
  end: 3600 + 60 * 10,
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
};
const clip4: Clip = {
  id: '1',
  url:
    'https://clips.twitch.tv/embed?clip=AmazonianEncouragingLyrebirdAllenHuhu&tt_medium=clips_api&tt_content=embed',
  start: 0,
  end: 9,
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
};

const clip5: Clip = {
  id: '1',
  url:
    'https://clips.twitch.tv/embed?clip=AmazonianEncouragingLyrebirdAllenHuhu&tt_medium=clips_api&tt_content=embed',
  start: 0,
  end: 3600 + 59,
  duration: 3600 + 59,
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
const mockClips: Clip[] = [clip1];
describe('Timeline Utils', () => {
  it('gets the correct widths', () => {
    expect(getClipWidths(mockClips)).toEqual([1]);
  });
  it('gets the correct total minutes with 0 hours and seconds >= 10', () => {
    expect(getTotalTime(mockClips)).toEqual('0:32');
  });
  it('gets the correct total minutes with 0 hours and seconds <= 10', () => {
    expect(getTotalTime([clip4])).toEqual('0:09');
  });
  it('gets the correct total minutes with > 0 hours and minutes <= 10 and seconds <= 10', () => {
    expect(getTotalTime([clip2])).toEqual('1:00:00');
  });
  it('gets the correct total minutes with > 0 hours and minutes >= 10 and seconds <= 10', () => {
    expect(getTotalTime([clip3])).toEqual('1:10:00');
  });
  it('gets the correct total minutes with > 0 hours and minutes <= 10 and seconds >= 10', () => {
    expect(getTotalTime([clip5])).toEqual('1:00:59');
  });
  it('gets the number of minutes for clip1', () => {
    expect(getMinutes([clip1])).toEqual(0.5333388833333333);
  });
});
