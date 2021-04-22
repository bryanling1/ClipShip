export enum ClipActions {
  EDIT_CLIP_START_END,
  EMPTY,
}

interface StartEnd {
  index: number;
  start: number;
  end: number;
}

export type ClipAction =
  | {
      type: ClipActions.EDIT_CLIP_START_END;
      payload: StartEnd;
    }
  | { type: ClipActions.EMPTY };

export function editClipStartEnd(payload: StartEnd): ClipAction {
  return { type: ClipActions.EDIT_CLIP_START_END, payload };
}
