import { Clip } from '@clipship/common';
import { ClipAction, setClips } from '../actions/clips';
import { Actions as ProjectActions } from './types';
import { StoreState } from '../reducers/types';
import { ThunkAction } from 'redux-thunk';
import axios from 'axios';

interface EmptyAction {
  type: ProjectActions.EMPTY;
}

interface SetProject {
  id: string | null;
  name: string | null;
}

interface SetProjectAction {
  type: ProjectActions.SET_PROJECT;
  payload: SetProject;
}

interface SetProjectErrorAction {
  type: ProjectActions.SET_PROJECT_ERROR;
  val: boolean;
}

interface SetProjectSelectedClipAction {
  type: ProjectActions.SET_PROJECT_SELECTED_CLIP;
  index: number | null;
}

interface EditNameAction {
  type: ProjectActions.EDIT_NAME;
  content: string;
}

interface SetDBClipsActions {
  type: ProjectActions.SET_DB_CLIPS;
  clips: Clip[];
}

interface fetchProjectQuerySingular {
  id: string;
  name: string;
  clips: Clip[];
}

interface PatchProjectQuery {
  clips: Clip[];
}

export type ProjectAction =
  | EmptyAction
  | SetProjectAction
  | SetProjectErrorAction
  | EditNameAction
  | SetProjectSelectedClipAction
  | SetDBClipsActions;

export function setProject(id: string | null, name: string | null): ProjectAction {
  return { type: ProjectActions.SET_PROJECT, payload: { id, name } };
}

export function setProjectError(val: boolean): ProjectAction {
  return { type: ProjectActions.SET_PROJECT_ERROR, val };
}

export function setName(content: string): ProjectAction {
  return { type: ProjectActions.EDIT_NAME, content };
}

export function setSelectedClip(index: number | null): ProjectAction {
  return { type: ProjectActions.SET_PROJECT_SELECTED_CLIP, index };
}

export function setDBClips(clips: Clip[]): ProjectAction {
  return { type: ProjectActions.SET_DB_CLIPS, clips };
}

export const fetchProject = (
  id: string
): ThunkAction<void, StoreState, unknown, ProjectAction | ClipAction> => async (dispatch) => {
  const query = `http://localhost:5000/project?id=${id}`;
  const result = await axios.get<fetchProjectQuerySingular>(query).catch((e) => {
    console.log(e);
  });
  if (result && result.data) {
    dispatch(setProject(result.data.id, result.data.name));
    dispatch(setProjectError(false));
    dispatch(setSelectedClip(result.data.clips && result.data.clips.length ? 0 : null));
    dispatch(setClips(result.data.clips || []));
    dispatch(setDBClips(result.data.clips || []));
  } else {
    dispatch(setProjectError(true));
  }
};

export const deleteProject = (
  id: string
): ThunkAction<void, StoreState, unknown, ProjectAction | ClipAction> => async (dispatch) => {
  let error = null;
  await axios.delete(`http://localhost:5000/project?id=${id}`).catch((e) => {
    error = e;
  });
  if (error) {
    dispatch(setProjectError(true));
    return;
  } else {
    dispatch(setProjectError(false));
    dispatch(setProject(null, null));
  }
};

export const editName = (
  id: string,
  content: string
): ThunkAction<void, StoreState, unknown, ProjectAction> => async (dispatch) => {
  let error;
  await axios.patch(`http://localhost:5000/project`, { id, name: content }).catch((e) => {
    error = e;
  });
  if (error) {
    dispatch(setProjectError(true));
    return;
  } else {
    dispatch(setProjectError(false));
    dispatch(setName(content));
    return;
  }
};

export const saveProject = (
  id: string,
  clips: Clip[]
): ThunkAction<void, StoreState, unknown, ProjectAction> => async (dispatch) => {
  let error;
  const result = await axios
    .patch<PatchProjectQuery>(`http://localhost:5000/project`, { id, clips })
    .catch((e) => {
      error = e;
    });
  if (error || !result) {
    dispatch(setProjectError(true));
  } else {
    dispatch(setProjectError(false));
    dispatch(setDBClips(result.data.clips));
  }
};

export const createProject = (
  name: string
): ThunkAction<void, StoreState, unknown, ProjectAction | ClipAction> => async (dispatch) => {
  let error;
  const result = await axios
    .post(`http://localhost:5000/project`, { name, clips: [] })
    .catch((e) => (error = e));
  if (error) {
    dispatch(setProjectError(true));
  } else {
    dispatch(setProjectError(false));
    dispatch(setProject(result.data.id, result.data.name));
    dispatch(setSelectedClip(null));
    dispatch(setClips([]));
    dispatch(setDBClips([]));
  }
};
