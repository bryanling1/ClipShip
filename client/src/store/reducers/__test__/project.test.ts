import {
  ProjectActions,
  setName,
  setProject,
  setProjectError,
  setSelectedClip,
} from '../../actions/project';
import reducer, { initState } from '../../reducers/project';

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
    };

    expect(reducer(initState, setProjectError(true))).toEqual(expectedState);
  });

  it('set project name', () => {
    const expectedState = {
      id: null,
      name: 'hello',
      error: null,
      selectedClip: null,
    };
    expect(reducer(initState, setName('hello'))).toEqual(expectedState);
  });

  it('set project selected Clip', () => {
    const expectedState = {
      id: null,
      name: null,
      error: null,
      selectedClip: 100,
    };
    expect(reducer(initState, setSelectedClip(100))).toEqual(expectedState);
  });
});
