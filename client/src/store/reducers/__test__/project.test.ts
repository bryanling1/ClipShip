import {
  ProjectActions,
  setDBClips,
  setName,
  setProject,
  setProjectError,
  setSelectedClip,
} from '../../actions/project';
import reducer, { initState } from '../../reducers/project';

const clip = {
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

describe('Projects Reducer', () => {
  it('returns the initial state', () => {
    expect(reducer(undefined, { type: ProjectActions.EMPTY })).toEqual(initState);
  });

  it('sets project data', () => {
    const expectedState = {
      id: '123',
      name: 'project_name',
      error: null,
      selectedClip: null,
      dbClips: [],
    };

    expect(reducer(initState, setProject(expectedState.id, expectedState.name))).toEqual(
      expectedState
    );
  });

  it('sets project error', () => {
    const expectedState = {
      id: null,
      name: null,
      error: true,
      selectedClip: null,
      dbClips: [],
    };

    expect(reducer(initState, setProjectError(true))).toEqual(expectedState);
  });

  it('set project name', () => {
    const expectedState = {
      id: null,
      name: 'hello',
      error: null,
      selectedClip: null,
      dbClips: [],
    };
    expect(reducer(initState, setName('hello'))).toEqual(expectedState);
  });

  it('set project selected Clip', () => {
    const expectedState = {
      id: null,
      name: null,
      error: null,
      selectedClip: 100,
      dbClips: [],
    };
    expect(reducer(initState, setSelectedClip(100))).toEqual(expectedState);
  });

  it('sets project database clips', () => {
    const expectedState = {
      id: null,
      name: null,
      error: null,
      selectedClip: null,
      dbClips: [clip],
    };
    expect(reducer(initState, setDBClips([clip]))).toEqual(expectedState);
  });
});
