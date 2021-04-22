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
    case ClipActions.SWAP_CLIPS:
      if (
        action.payload.index1 >= 0 &&
        action.payload.index2 < state.length &&
        action.payload.index2 >= 0 &&
        action.payload.index2 < state.length
      ) {
        const { index1, index2 } = action.payload;
        const temp = [...state];
        const [removed] = temp.splice(index1, 1);
        temp.splice(index2, 0, removed);
        return temp;
      } else {
        return state;
      }
    case ClipActions.ENABLE_LABEL:
      if (action.payload.index >= 0 && action.payload.index < state.length) {
        const temp = [...state];
        temp[action.payload.index].label = action.payload.val;
        return temp;
      } else {
        return state;
      }
    case ClipActions.SET_LABEL_POSITION:
      if (action.payload.index >= 0 && action.payload.index < state.length) {
        const temp = [...state];
        temp[action.payload.index].labelPosition = action.payload.position;
        return temp;
      } else {
        return state;
      }
    case ClipActions.SET_GLOBAL_LABEL_POSITION:
      if (action.index >= 0 && action.index < state.length) {
        const labelPosition = state[action.index].labelPosition;
        const temp = [...state];
        for (let i = 0; i < temp.length; i++) {
          temp[i].labelGlobal = true;
          temp[i].labelGlobalPosition = labelPosition;
        }
        return temp;
      } else {
        return state;
      }
    default:
      return state;
  }
};

export default clipsReducer;
