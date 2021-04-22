import { LabelPosition } from '../reducers/types';

export enum ClipActions {
  EDIT_CLIP_START_END,
  SWAP_CLIPS,
  ENABLE_LABEL,
  SET_LABEL_POSITION,
  EMPTY,
}

interface StartEnd {
  index: number;
  start: number;
  end: number;
}

interface Swap {
  index1: number;
  index2: number;
}

interface Enable {
  index: number;
  val: boolean;
}

interface SetLabelPosition {
  index: number;
  position: LabelPosition;
}

interface EditClipStartEndAction {
  type: ClipActions.EDIT_CLIP_START_END;
  payload: StartEnd;
}

interface SwapClipsAction {
  type: ClipActions.SWAP_CLIPS;
  payload: Swap;
}

interface EnableLabelAction {
  type: ClipActions.ENABLE_LABEL;
  payload: Enable;
}

interface SetLabelPositionAction {
  type: ClipActions.SET_LABEL_POSITION;
  payload: SetLabelPosition;
}

interface EmptyAction {
  type: ClipActions.EMPTY;
}
export type ClipAction =
  | EditClipStartEndAction
  | SwapClipsAction
  | EnableLabelAction
  | SetLabelPositionAction
  | EmptyAction;

export function editClipStartEnd(payload: StartEnd): ClipAction {
  return { type: ClipActions.EDIT_CLIP_START_END, payload };
}

export function moveClip(index1: number, index2: number): ClipAction {
  return { type: ClipActions.SWAP_CLIPS, payload: { index1, index2 } };
}

export function enableLabel(index: number, val: boolean): ClipAction {
  return { type: ClipActions.ENABLE_LABEL, payload: { index, val } };
}

export function setLabelPosition(index: number, position: LabelPosition): ClipAction {
  return { type: ClipActions.SET_LABEL_POSITION, payload: { index, position } };
}
