import { combineReducers } from 'redux';
import clipsReducer from './clips';
import projectsReducer from './project';

export default combineReducers({
  clips: clipsReducer,
  project: projectsReducer,
});
