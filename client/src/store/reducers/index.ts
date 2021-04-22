import { combineReducers } from 'redux';
import clipsReducer from './clips';

export default combineReducers({
  clips: clipsReducer,
});
