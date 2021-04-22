import { Clip } from './types';
import { ClipAction, ClipActions } from '../actions';

const clipsReducer = (state: Clip[] = [], action: ClipAction): Clip[] => {
  switch (action.type) {
    case ClipActions.EDIT_CLIP_START_END:
      if (action.payload.index >= 0 && action.payload.index < state.length) {
        const temp = [...state];
        temp[action.payload.index].start = action.payload.start;
        temp[action.payload.index].end = action.payload.end;
        return temp;
      } else {
        return state;
      }

    default:
      return state;
  }
};

export default clipsReducer;
