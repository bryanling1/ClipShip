import { Project } from './types';
import { ProjectAction, ProjectActions } from '../actions';

export const initState: Project = {
  id: null,
  name: null,
  error: null,
};

const projectReducer = (state: Project = initState, action: ProjectAction): Project => {
  switch (action.type) {
    case ProjectActions.SET_PROJECT:
      return { ...state, id: action.payload.id, name: action.payload.name };
    case ProjectActions.SET_PROJECT_ERROR:
      return { ...state, error: action.val };
    case ProjectActions.EDIT_NAME:
      return { ...state, name: action.content };
    default:
      return state;
  }
};

export default projectReducer;
