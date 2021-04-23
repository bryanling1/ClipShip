import { Clip } from '../reducers/types';
import { ClipAction, setClips } from '../actions/clips';
import { StoreState } from '../reducers/types';
import { ThunkAction } from 'redux-thunk';
import axios from 'axios';

export enum ProjectActions {
  EMPTY = 'EMPTY_PROJECT',
  SET_PROJECT = 'SET_PROJECT',
  SET_PROJECT_ERROR = 'SET_PROJECT_ERROR',
  EDIT_NAME = 'EDIT_NAME',
}

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

interface EditNameAction {
  type: ProjectActions.EDIT_NAME;
  content: string;
}

interface fetchProjectQuerySingular {
  id: string;
  name: string;
  clips: Clip[];
}

type fetchProjectQuery = fetchProjectQuerySingular[];

export type ProjectAction = EmptyAction | SetProjectAction | SetProjectErrorAction | EditNameAction;

export function setProject(id: string | null, name: string | null): ProjectAction {
  return { type: ProjectActions.SET_PROJECT, payload: { id, name } };
}

export function setProjectError(val: boolean): ProjectAction {
  return { type: ProjectActions.SET_PROJECT_ERROR, val };
}

export function setName(content: string): ProjectAction {
  return { type: ProjectActions.EDIT_NAME, content };
}

export const fetchProject = (
  id: string
): ThunkAction<void, StoreState, unknown, ProjectAction | ClipAction> => async (dispatch) => {
  let error = null;
  const result = await axios
    .get<fetchProjectQuery>(`http://localhost:3000/projects?id=${id}`)
    .catch((e) => {
      error = e;
    });
  if (error) {
    dispatch(setProjectError(true));
    return;
  }
  if (result && result.data.length) {
    dispatch(setProject(result.data[0].id, result.data[0].name));
    dispatch(setProjectError(false));
    dispatch(setClips(result.data[0].clips || []));
  } else {
    dispatch(setProjectError(true));
  }
};

export const editName = (
  id: string,
  content: string
): ThunkAction<void, StoreState, unknown, ProjectAction> => async (dispatch) => {
  let error;
  await axios.patch(`http://localhost:3000/projects/${id}`, { name: content }).catch((e) => {
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
  await axios.put(`http://localhost:3000/projects/${id}`, { clips }).catch((e) => {
    error = e;
  });
  if (error) {
    dispatch(setProjectError(true));
  } else {
    dispatch(setProjectError(false));
  }
};

export const createProject = (
  name: string
): ThunkAction<void, StoreState, unknown, ProjectAction | ClipAction> => async (dispatch) => {
  let error;
  const result = await axios
    .post(`http://localhost:3000/projects`, { name, clips: [] })
    .catch((e) => (error = e));
  if (error) {
    dispatch(setProjectError(true));
  } else {
    dispatch(setProjectError(false));
    dispatch(setProject(result.data.id, result.data.name));
    dispatch(setClips([]));
  }
};
