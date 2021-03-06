import { Clip } from '@clipship/common';
import { ClipAction } from '../actions';
import { Actions as ClipActions } from '../actions/types';

const clipsReducer = (state: Clip[] = [], action: ClipAction): Clip[] => {
  switch (action.type) {
    case ClipActions.EDIT_CLIP_START_END:
      if (action.payload.index >= 0 && action.payload.index < state.length) {
        return state.map((data, i) =>
          i === action.payload.index
            ? { ...data, start: action.payload.start, end: action.payload.end }
            : { ...data }
        );
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
        return state.map((data, i) =>
          i === action.payload.index ? { ...data, label: action.payload.val } : { ...data }
        );
      } else {
        return state;
      }
    case ClipActions.SET_LABEL_POSITION:
      if (action.payload.index >= 0 && action.payload.index < state.length) {
        return state.map((data, i) =>
          i === action.payload.index
            ? { ...data, labelPosition: action.payload.position }
            : { ...data }
        );
      } else {
        return state;
      }
    case ClipActions.SET_GLOBAL_LABEL_POSITION:
      if (action.index >= 0 && action.index < state.length) {
        const labelPosition = state[action.index].labelPosition;
        const temp = [...state];
        for (let i = 0; i < temp.length; i++) {
          temp[i].labelGlobal = true;
          temp[i].label = true;
          temp[i].labelGlobalPosition = labelPosition;
        }
        return temp;
      } else {
        return state;
      }
    case ClipActions.SET_GLOBAL_LABEL:
      if (action.index >= 0 && action.index < state.length) {
        return state.map((data, i) =>
          i === action.index ? { ...data, labelGlobal: action.val } : { ...data }
        );
      } else {
        return state;
      }
    case ClipActions.ADD_CLIPS:
      return [...state, ...action.clips];
    case ClipActions.SET_CLIPS:
      return action.clips;
    case ClipActions.DELETE_CLIP:
      if (action.index >= 0 && action.index < state.length) {
        const temp = [...state];
        temp.splice(action.index, 1);
        return temp;
      } else {
        return state;
      }
    case ClipActions.SET_ALL_GLOBAL_LABELS_OFF:
      const temp = [...state];
      for (let i = 0; i < temp.length; i++) {
        temp[i].labelGlobal = false;
        temp[i].labelGlobalPosition = null;
      }
      return temp;
    default:
      return state;
  }
};

export default clipsReducer;
