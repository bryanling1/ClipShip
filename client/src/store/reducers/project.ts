import { Project } from './types';
import { ProjectAction, ProjectActions } from '../actions';

export const initState: Project = {
  id: null,
  name: null,
};

const projectReducer = (state: Project = initState, action: ProjectAction): Project => {
  switch (action.type) {
    case ProjectActions.EMPTY:
      return state;
    default:
      return state;
  }
};

export default projectReducer;
