import { ProjectActions, setProject, setProjectError } from '../project';

describe('Project action creators', () => {
  it('generates an action creator for setting the project', () => {
    const expectedState = {
      type: ProjectActions.SET_PROJECT,
      payload: {
        id: '123',
        name: 'project_name',
      },
    };
    expect(setProject(expectedState.payload.id, expectedState.payload.name)).toEqual(expectedState);
  });
  it('generates an action creator for setting the project error', () => {
    const expectedState = {
      type: ProjectActions.SET_PROJECT_ERROR,
      val: true,
    };
    expect(setProjectError(true)).toEqual(expectedState);
  });
});
