import { ProjectActions } from '../../actions/project';
import reducer, { initState } from '../../reducers/project';

describe('Projects Reducer', () => {
  it('returns the initial state', () => {
    expect(reducer(undefined, { type: ProjectActions.EMPTY })).toEqual(initState);
  });
});
