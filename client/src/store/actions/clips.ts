export enum ClipActions {
  EDIT_CLIP_START_END,
  SWAP_CLIPS,
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

interface EditClipStartEndAction {
  type: ClipActions.EDIT_CLIP_START_END;
  payload: StartEnd;
}

interface SwapClipsAction {
  type: ClipActions.SWAP_CLIPS;
  payload: Swap;
}

interface EmptyAction {
  type: ClipActions.EMPTY;
}
export type ClipAction = EditClipStartEndAction | SwapClipsAction | EmptyAction;

export function editClipStartEnd(payload: StartEnd): ClipAction {
  return { type: ClipActions.EDIT_CLIP_START_END, payload };
}

export function moveClip(index1: number, index2: number): ClipAction {
  return { type: ClipActions.SWAP_CLIPS, payload: { index1, index2 } };
}
