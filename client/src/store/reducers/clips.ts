import { Clip } from './types';
import { ClipAction } from '../actions';

export interface ClipsState {
  clips: Clip[];
}

const initState: ClipsState = {
  clips: [],
};

const clipsReducer = (state: ClipsState = initState, action: ClipAction): ClipsState => {
  switch (action.type) {
    default:
      return state;
  }
};

export default clipsReducer;
