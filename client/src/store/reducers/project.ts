import { Project } from './types';
import { ProjectAction } from '../actions';
import { Actions as ProjectActions } from '../actions/types';

export const initState: Project = {
  id: null,
  name: null,
  error: null,
  selectedClip: null,
  dbClips: [],
};

const projectReducer = (state: Project = initState, action: ProjectAction): Project => {
  switch (action.type) {
    case ProjectActions.SET_PROJECT:
      return {
        ...state,
        dbClips: [...state.dbClips],
        id: action.payload.id,
        name: action.payload.name,
      };
    case ProjectActions.SET_PROJECT_ERROR:
      return { ...state, dbClips: [...state.dbClips], error: action.val };
    case ProjectActions.EDIT_NAME:
      return { ...state, dbClips: [...state.dbClips], name: action.content };
    case ProjectActions.SET_PROJECT_SELECTED_CLIP:
      return { ...state, dbClips: [...state.dbClips], selectedClip: action.index };
    case ProjectActions.SET_DB_CLIPS:
      return { ...state, dbClips: action.clips };
    default:
      return state;
  }
};

export default projectReducer;
