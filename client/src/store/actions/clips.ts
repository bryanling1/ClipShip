import { Clip, LabelPosition } from '../reducers/types';

export enum ClipActions {
  EDIT_CLIP_START_END,
  SWAP_CLIPS,
  ENABLE_LABEL,
  SET_LABEL_POSITION,
  SET_GLOBAL_LABEL_POSITION,
  ADD_CLIPS,
  SET_CLIPS,
  DELETE_CLIP,
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

interface SetGlobalLabelPositionAction {
  type: ClipActions.SET_GLOBAL_LABEL_POSITION;
  index: number;
}
interface AddClipsAction {
  type: ClipActions.ADD_CLIPS;
  clips: Clip[];
}
interface SetClipsAction {
  type: ClipActions.SET_CLIPS;
  clips: Clip[];
}
interface DeleteClipAction {
  type: ClipActions.DELETE_CLIP;
  index: number;
}
interface EmptyAction {
  type: ClipActions.EMPTY;
}
export type ClipAction =
  | EditClipStartEndAction
  | SwapClipsAction
  | EnableLabelAction
  | SetLabelPositionAction
  | SetGlobalLabelPositionAction
  | AddClipsAction
  | SetClipsAction
  | DeleteClipAction
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

export function setGlobalLabelPosition(index: number): ClipAction {
  return { type: ClipActions.SET_GLOBAL_LABEL_POSITION, index };
}

export function addClips(clips: Clip[]): ClipAction {
  return { type: ClipActions.ADD_CLIPS, clips };
}

export function setClips(clips: Clip[]): ClipAction {
  return { type: ClipActions.SET_CLIPS, clips };
}

export function deleteClip(index: number): ClipAction {
  return { type: ClipActions.DELETE_CLIP, index };
}
